export * from "./errors";
export * from "./password";

export const getEnumValues = <T extends string | number>(e: any): T[] =>
  e !== null && typeof e === "object" ? Object.keys(e).map((key) => e[key]) : [];