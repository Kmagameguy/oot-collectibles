export const AGES = ["Adult", "Child"] as const;
export type Age = (typeof AGES)[number];

export const AGE_REQUIREMENTS = ["Any", "Both", ...AGES] as const;
export type AgeRequirement = (typeof AGE_REQUIREMENTS)[number];

export function isValidAge(age: string): age is AgeRequirement {
  return AGE_REQUIREMENTS.includes(age as AgeRequirement);
}
