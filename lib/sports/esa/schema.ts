import { z } from "zod";
import type { GameCardResponse } from "./types";

// Runtime validation mirroring lib/sports/esa/types.ts. Every ESA game card
// payload is validated through this schema before it is ever rendered —
// invented or malformed data must fail loudly, not degrade into a guess.

export const teamIdSchema = z.enum(["DEN", "KC"]);
export const unitSchema = z.enum(["offense", "defense"]);
export const recordStatusSchema = z.enum(["preliminary", "verified", "blocked"]);
export const validationStatusSchema = z.enum(["passed", "failed", "unresolved", "unavailable"]);

export const metricValueSchema = z.object({
  metricId: z.string().min(1),
  label: z.string().min(1),
  coachingLabel: z.string().min(1),
  unit: z.string(),
  value: z.union([z.number(), z.string(), z.null()]),
  formattedValue: z.string().min(1),
  validationStatus: validationStatusSchema,
  lineageId: z.string().min(1).nullable(),
});

export const findingSchema = z.object({
  findingId: z.string().min(1),
  title: z.string().min(1),
  shortEvidence: z.string().min(1),
  evidence: z.string().min(1),
  evidenceGrade: z.enum(["A", "B", "C", "D"]),
  controllability: z.enum(["high", "partial", "minimal", "uncontrollable"]),
  publicationStatus: z.enum(["published", "withheld"]),
});

export const coachingPrioritySchema = z.object({
  priority: z.number().int().positive(),
  title: z.string().min(1),
  practiceMeasure: z.string().min(1),
  gameMeasure: z.string().min(1),
  evidenceFindingIds: z.array(z.string().min(1)),
});

export const unitAnalysisSchema = z.object({
  teamId: teamIdSchema,
  unit: unitSchema,
  thesis: z.string().min(1),
  primaryFinding: z.string().min(1),
  primaryMetricIds: z.array(z.string().min(1)),
  metrics: z.array(metricValueSchema),
  findings: z.array(findingSchema),
  priorities: z.array(coachingPrioritySchema),
});

export const gameCardResponseSchema = z.object({
  schemaVersion: z.literal("1.0"),
  gameId: z.string().min(1),
  recordVersion: z.string().min(1),
  recordStatus: recordStatusSchema,
  generatedAtUtc: z.string().min(1),
  dataQualityScore: z.number().min(0).max(1),
  gamebookVerified: z.boolean(),
  game: z.object({
    date: z.string().min(1),
    week: z.number().int().positive(),
    status: z.literal("FINAL"),
    away: z.object({
      teamId: teamIdSchema,
      name: z.string().min(1),
      score: z.number().int().min(0),
      colorToken: z.literal("denver-blue"),
    }),
    home: z.object({
      teamId: teamIdSchema,
      name: z.string().min(1),
      score: z.number().int().min(0),
      colorToken: z.literal("chiefs-red"),
    }),
  }),
  analyses: z.array(unitAnalysisSchema),
});

export function parseGameCardResponse(input: unknown) {
  const result = gameCardResponseSchema.safeParse(input);
  // The schema is hand-maintained to mirror lib/sports/esa/types.ts exactly
  // (see the comment there); this assertion pins the parsed output to that
  // canonical type rather than the structurally-equivalent zod-inferred one.
  return result as
    | { success: true; data: GameCardResponse }
    | { success: false; error: (typeof result)["error"] };
}
