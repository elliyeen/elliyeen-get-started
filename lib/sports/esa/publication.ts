import type { GameCardResponse } from "./types";

// A game is only eligible for public indexing (sitemap inclusion, search
// engines) once its record has actually cleared verification — never on the
// strength of "the route exists." See the ESA architecture proposal's
// publishing state machine: only PUBLISHED analysis is public. This fixture
// contract doesn't yet carry a separate `publicationStatus` field, so
// eligibility is derived from the two fields that already encode it;
// introduce `publicationStatus` directly on GameCardResponse if/when the
// real ESA pipeline lands, and switch this check to read that instead.
export function isPublishable(card: GameCardResponse): boolean {
  return card.recordStatus === "verified" && card.gamebookVerified === true;
}
