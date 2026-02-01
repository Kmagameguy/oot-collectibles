import type { HeartPiece } from "../types/HeartPiece";
import { isValidAge } from "../types/Age";
import { isValidRegion } from "../types/Region";
import { isValidTime } from "../types/Time";
import rawHeartPieces from "./heartPieces.json";

export const pieces: HeartPiece[] = rawHeartPieces.map((piece) => {
  if (!isValidAge(piece.age)) {
    throw new Error(
      `Invalid age "${piece.age}" in heartPieces.json at index "${piece.id}"`,
    );
  }

  if (!isValidRegion(piece.region)) {
    throw new Error(
      `Invalid region "${piece.region}" in heartPieces.json at index "${piece.id}"`,
    );
  }

  if (!isValidTime(piece.timeOfDay)) {
    throw new Error(
      `Invalid time of day "${piece.timeOfDay}" in heartPieces.json at index "${piece.id}"`,
    );
  }

  return {
    ...piece,
    age: piece.age,
    region: piece.region,
    timeOfDay: piece.timeOfDay,
  } as HeartPiece;
});

const seenIds = new Set<string>();
const duplicateIds: string[] = [];
for (const piece of pieces) {
  if (seenIds.has(piece.id)) {
    duplicateIds.push(piece.id);
  }
  {
    seenIds.add(piece.id);
  }
}

if (duplicateIds.length > 0) {
  throw new Error(
    `Duplicate heart piece IDs found: ${[...new Set(duplicateIds)].join(", ")}`,
  );
}

export const heartPieces: HeartPiece[] = pieces;
