import { getEnumValues } from "../../src/utils";

describe("[UTILS] - getEnumValues()", () => {
  it("[SUCCESS] should return an array of string with enum values", () => {
    enum TestEnum {
      A = "a",
      B = "b",
      C = "c",
    }
    const values = getEnumValues(TestEnum);
    expect(values).toEqual(["a", "b", "c"]);
  });

  it("[SUCCESS] should return an empty array when enum is empty", () => {
    enum TestEnum {}
    const values = getEnumValues(TestEnum);
    expect(values).toEqual([]);
  });

  it("[FAIL] should return an empty array when enum is undefined", () => {
    const values = getEnumValues(undefined);
    expect(values).toEqual([]);
  });

  it("[FAIL] should return an empty array when enum is null", () => {
    console.log(typeof null === 'object')
    const values = getEnumValues(null);
    expect(values).toEqual([]);
  });

});