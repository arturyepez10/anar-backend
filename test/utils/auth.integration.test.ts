import { UserAuthData } from "../../src/models";
import { getUserAuthFromJwtAuthString, generateJwtAuthString } from "../../src/utils/auth";

import { testUserMock } from "../../src/scripts/mock/data";

describe("[UTILS] - JWT Generation", () => {
  let user: UserAuthData

  beforeAll(async () => {
    const dbUser = await UserAuthData.findOne({ where: { username: testUserMock.username }, attributes: ['user_id', 'username', 'password_salt', 'password_hash', 'recovery_time', 'recovery_token', 'email', 'status', 'token_time', 'token_code', 'hash_algorithm', 'createdAt', 'updatedAt']});

    if (dbUser) user = dbUser;
  });

  it("[SUCCESS] JWT can be generated for a user", async() => {
    const token = await generateJwtAuthString(user);

    expect(typeof token).toBe('string');
  });
});