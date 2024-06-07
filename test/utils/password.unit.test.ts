import { validatePassword } from "../../src/utils";

describe("[UTILS] - validatePassword()", () => {
  it("[SUCCESS] return an empty array of errors when a password is valid", () => {
    const passwordErrors = validatePassword("*Ab123456");
    expect(passwordErrors).toEqual([]);
  });

  it("[FAIL] should return an array errors when a password is invalid", () => {
    const passwordErrors = validatePassword("*ab123456");
    expect(passwordErrors).toEqual(["Password must contain at least one uppercase letter"]);
  });

  it("[FAIL] password should be at least 8 characters long", () => {
    const passwordErrors = validatePassword("*Ab1234");
    expect(passwordErrors).toEqual(["Password must be at least 8 characters long"]);
  });

  it("[FAIL] password should have at least one lowercase letter", () => {
    const passwordErrors = validatePassword("*AB123456");
    expect(passwordErrors).toEqual(["Password must contain at least one lowercase letter"]);
  });

  it("[FAIL] password should have at least one uppercase letter", () => {
    const passwordErrors = validatePassword("*ab123456");
    expect(passwordErrors).toEqual(["Password must contain at least one uppercase letter"]);
  });

  it("[FAIL] password should have at least one number", () => {
    const passwordErrors = validatePassword("*Abcdefghi");
    expect(passwordErrors).toEqual(["Password must contain at least one number"]);
  });

  it("[FAIL] password should have at least one special character", () => {
    const passwordErrors = validatePassword("Ab123456");
    expect(passwordErrors).toEqual(["Password must contain at least one special character"]);
  });
});