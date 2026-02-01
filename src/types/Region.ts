export const REGIONS = [
  "Death Mountain",
  "Desert Colossus",
  "Gerudo Valley",
  "Hyrule Castle",
  "Hyrule Field",
  "Ice Cavern",
  "Kokiri Forest",
  "Kakariko Village",
  "Lake Hylia",
  "Lon Lon Ranch",
  "Lost Woods",
  "Zora's River",
] as const;

export type Region = (typeof REGIONS)[number];
export const REGION_REQUIREMENTS = ["All", ...REGIONS] as const;
export type RegionRequirement = (typeof REGION_REQUIREMENTS)[number];

export function isValidRegion(region: string): region is Region {
  return REGIONS.includes(region as Region);
}
