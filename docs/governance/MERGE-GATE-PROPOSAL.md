# Merge-gate proposal (draft, for a human to apply)

**Status:** proposal only. Claude Code changed no repository setting. Applying any of this needs the repository owner.

## What was found (read from the GitHub API on 2026-11-08, ~03:50 UTC)

| Check | Result |
|---|---|
| Branch protection on `master` | None (`404 Branch not protected`) |
| Repository rulesets | None (`[]`) |
| `CODEOWNERS` | None |
| Collaborators | One (`elliyeen`, admin) |
| Checks that ran on PR #10 | None. The only workflow, `deploy.yml`, runs on push to `master` |
| PR #10 reviews | 0 submitted; `reviewDecision` empty |
| PR #10 merge | Squash `5e3dc2772ed0f7513bebd0710313e6f5f9a4004a`, 2026-11-08T01:00:04Z, merged by the account `elliyeen` |
| Deploy on that commit | `Deploy to Cloudflare Pages` (push) succeeded |

**What this does and does not show.** Nothing in the repository would have stopped the merge: no review rule, no required check, no second person. The merge actor is recorded as the owner account. The same account is used by local tooling in this environment, so the record cannot distinguish a person clicking from a tool acting with that account's credentials. No claim is made about who or what pressed merge.

## Proposed controls (least privilege)

1. **Ruleset on `master`** (Settings → Rules → Rulesets): require a pull request; require 1 approving review from someone other than the last pusher; dismiss stale approvals; require the `PR checks / agents` status check; block force pushes and deletion; **no bypass actors** (a bypass for the owner defeats the control on a one-person repository).
2. **A second human account** with at least write access who can review. A one-collaborator repository cannot satisfy "independent review"; this is the real blocker, not the YAML.
3. **`CODEOWNERS`** once a second reviewer exists, covering `agents/`, `.github/`, and `docs/governance/`. Not added in this PR because naming an owner is a human decision and one name would make the rule meaningless.
4. **Staging before production**: `deploy.yml` deploys production on every push to `master`. Until a separate Pages project or branch preview exists, every merge is a production release. Tracked in issue #12.
5. **Tokens**: PR #13 pins the deploy workflow's actions and sets `permissions: contents: read`.

## What this PR adds

`.github/workflows/pr-checks.yml`: typecheck plus `npx vitest run agents` on pull requests, read-only token, actions pinned to commit SHAs, no secrets. This gives a required check something to require. It is not a security review.

## Ruleset as JSON (for the owner to import; untested)

```json
{
  "name": "master-protection",
  "target": "branch",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["refs/heads/master"], "exclude": [] } },
  "bypass_actors": [],
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "pull_request", "parameters": { "required_approving_review_count": 1, "dismiss_stale_reviews_on_push": true, "require_code_owner_review": false, "require_last_push_approval": true, "required_review_thread_resolution": true } },
    { "type": "required_status_checks", "parameters": { "strict_required_status_checks_policy": true, "required_status_checks": [ { "context": "agents" } ] } }
  ]
}
```

Not tested: the exact `context` string depends on how GitHub names the job after the first run of this workflow.
