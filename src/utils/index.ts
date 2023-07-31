export * from "./errors";

export const getEnumValues = <T extends string | number>(e: any): T[] =>
  typeof e === "object" ? Object.keys(e).map((key) => e[key]) : [];