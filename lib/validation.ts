export function validateSurname(s: string): string | null {
  if (!s) return "Surname is required.";
  if (!/^[\u4e00-\u9fff]{1,2}$/.test(s))
    return "Please enter 1–2 Chinese characters for the surname.";
  return null;
}

export function validateGender(g: string): string | null {
  if (!["male", "female", "neutral"].includes(g))
    return "Gender must be male, female, or neutral.";
  return null;
}
