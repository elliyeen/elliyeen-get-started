#!/usr/bin/env bash
# Proves rollback of the agents 07/09/24 upgrade against the exact pre-merge commit. Local only: temp worktree and temp branches, no push.
# Usage: verify-rollback.sh <base-sha> <head-ref>
set -euo pipefail
BASE="${1:?base sha}"; HEAD_REF="${2:?head ref}"
REPO="$(git rev-parse --show-toplevel)"; cd "$REPO"
BASE_SHA="$(git rev-parse "$BASE^{commit}")"; HEAD_SHA="$(git rev-parse "$HEAD_REF^{commit}")"
TMP="$(mktemp -d)"; WT="$TMP/wt"; B1="rollback-verify-merge-$$"; B2="rollback-verify-manual-$$"
cleanup() { git worktree remove --force "$WT" >/dev/null 2>&1 || true; git branch -D "$B1" "$B2" >/dev/null 2>&1 || true; }
trap cleanup EXIT
pass=0; fail=0
ok()  { echo "PASS  $1"; pass=$((pass+1)); }
bad() { echo "FAIL  $1"; fail=$((fail+1)); }
echo "base (pre-merge) : $BASE_SHA"; echo "head (PR)        : $HEAD_SHA"

PILOT="agents/07-apple-design.md agents/09-conversion.md agents/24-seo-growth-engineering.md"
# 1. Only expected paths change
CHANGED="$(git diff --name-only "$BASE_SHA" "$HEAD_SHA")"
UNEXPECTED="$(echo "$CHANGED" | grep -vE '^(agents/(07-apple-design|09-conversion|24-seo-growth-engineering)\.md|agents/AUDIT\.md|agents/agent-structure\.test\.ts|agents/tools/audit-evidence/|agents/baselines/|\.gitignore)' || true)"
[ -z "$UNEXPECTED" ] && ok "PR touches only the pilot agents, AUDIT.md, tests, tooling, baselines, .gitignore" || bad "unexpected paths changed: $UNEXPECTED"

# 2. The other 21 agent files (and every other file in agents/) are byte-identical at base and head
OTHERS=0; DIFFS=0
for f in $(git ls-tree -r --name-only "$BASE_SHA" agents | grep -E '^agents/[0-9]{2}-[a-z-]+\.md$'); do
  case " $PILOT " in *" $f "*) continue;; esac
  OTHERS=$((OTHERS+1))
  [ "$(git rev-parse "$BASE_SHA:$f")" = "$(git rev-parse "$HEAD_SHA:$f")" ] || { DIFFS=$((DIFFS+1)); echo "  differs: $f"; }
done
[ "$OTHERS" -eq 21 ] && ok "found exactly 21 non-pilot numbered agent files" || bad "expected 21 non-pilot agent files, found $OTHERS"
[ "$DIFFS" -eq 0 ] && ok "all $OTHERS non-pilot agent files are byte-identical (git blob ids)" || bad "$DIFFS non-pilot agent files changed"

# 3. Their version headers are all still v1.0 at head
V=0; for f in $(git ls-tree -r --name-only "$HEAD_SHA" agents | grep -E '^agents/[0-9]{2}-[a-z-]+\.md$'); do case " $PILOT " in *" $f "*) continue;; esac; git show "$HEAD_SHA:$f" | grep -q '^\*\*Version:\*\* 1\.0$' && V=$((V+1)); done
[ "$V" -eq 21 ] && ok "all 21 non-pilot agents still declare Version 1.0 at head" || bad "only $V of 21 non-pilot agents declare Version 1.0"

# 4. Pilot agents moved forward at head and are v1.0 at base
for f in $PILOT; do
  git show "$BASE_SHA:$f" | grep -q '^\*\*Version:\*\* 1\.0$' && ok "base $f is v1.0" || bad "base $f is not v1.0"
  git show "$HEAD_SHA:$f" | grep -qE '^\*\*Version:\*\* 1\.[1-9]' && ok "head $f is upgraded" || bad "head $f not upgraded"
done

# 5. Revert path: merge the PR onto base, revert the merge, tree must equal base exactly
git worktree add -q --detach "$WT" "$BASE_SHA"
( cd "$WT" && git checkout -q -b "$B1" && git -c user.name=verify -c user.email=verify@invalid merge -q --no-ff -m "simulated merge" "$HEAD_SHA" >/dev/null \
  && git -c user.name=verify -c user.email=verify@invalid revert -m 1 --no-edit HEAD >/dev/null )
if [ "$(git rev-parse "$B1^{tree}")" = "$(git rev-parse "$BASE_SHA^{tree}")" ]; then ok "git revert -m 1 of the merge restores the exact base tree ($(git rev-parse --short "$B1^{tree}"))"; else bad "revert did not restore the base tree"; fi

# 6. Manual path from the PR text: restore pilot files + AUDIT.md from base, remove new paths, compare to base
( cd "$WT" && git checkout -q --detach "$HEAD_SHA" && git checkout -q -b "$B2" \
  && git rm -q -r agents/tools/audit-evidence agents/baselines agents/agent-structure.test.ts \
  && git checkout "$BASE_SHA" -- $PILOT agents/AUDIT.md .gitignore )
LEFT="$(cd "$WT" && git diff --name-only --cached "$BASE_SHA")"
[ -z "$LEFT" ] && ok "manual rollback (restore files from base, git rm the new directories) matches base" || bad "manual rollback left differences: $LEFT"

# 7. Collector leaves no state outside its output directory (static check)
if git show "$HEAD_SHA:agents/tools/audit-evidence/collect.mjs" | grep -E 'writeFileSync|mkdirSync|appendFileSync' | grep -v 'G\.safeWrite' | grep -q .; then bad "collector writes without safeWrite"; else ok "collector writes only through safeWrite (no direct fs writes)"; fi

echo "RESULT: $pass passed, $fail failed"; [ "$fail" -eq 0 ]
