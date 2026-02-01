export const TIMES = ["Day", "Night"] as const;
export type Time = (typeof TIMES)[number];

export const TIME_REQUIREMENTS = ["Any", ...TIMES] as const;
export type TimeRequirement = (typeof TIME_REQUIREMENTS)[number];

export function isValidTime(time: string): time is TimeRequirement {
  return TIME_REQUIREMENTS.includes(time as TimeRequirement);
}
