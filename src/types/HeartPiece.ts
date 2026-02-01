import type { AgeRequirement } from "./Age";
import type { Region } from "./Region";
import type { TimeRequirement } from "./Time";

export interface HeartPiece {
  id: string;
  name: string;
  age: AgeRequirement;
  region: Region;
  timeOfDay: TimeRequirement;
  requirements: string[];
  description: string;
}
