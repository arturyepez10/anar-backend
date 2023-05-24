import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { handleError } from '../../utils/errors';
import { UserAuthData, Email, UserAccount } from '../../models';
import { config } from '../../../config';

export const registerController = async (req: Request, res: Response) => {
  const {
    email,
    password,
    first_name,
    last_name,
    username
  } = req.body;

  try {
    // Check if email exists in the database
    let bdEmail = await Email.findOne({ where: { address: email }, attributes: ['address', 'user_auth', 'user_id'] });

    // If email exist and is associated with an account, return error
    if (bdEmail && bdEmail.user_auth) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // We chek if the username is already taken
    const authUser = await UserAuthData.findOne({ where: { username }, attributes: ['user_id', 'username', 'password_salt', 'password_hash', 'recovery_time', 'recovery_token', 'email', 'status', 'token_time', 'token_code', 'hash_algorithm', 'createdAt', 'updatedAt'] });
    if (authUser) return res.status(400).json({ message: 'Username already taken' });

    // if email doesn't exist, create it
    if (!bdEmail) bdEmail = await Email.create({ address: email });

    // We create a new user account and then associate it with the email
    const userAuth = await UserAccount.create({
      id: uuidv4(),
      first_name,
      last_name,
    });

    bdEmail.update({ user_auth: userAuth.id });

    // We create the salt of the user and hash for the password
    const password_salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(password, password_salt);

    // We create the user auth data
    const authUserData = await UserAuthData.create({
      user_id: userAuth.id,
      username,
      password_salt,
      password_hash,
      email: bdEmail.address,
      status: 'pending',
      hash_algorithm: 'Bcrypt'
    });

    // Create the token
    const token = jwt.sign({ id: authUserData.user_id }, config.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token });
  } catch (error) {
    // If something fails, we shold delete the user account and auth data}
    await UserAccount.destroy({ where: { email } });
    await UserAuthData.destroy({ where: { email } });

    // Check if email exists in the database
    let bdEmail = await Email.findOne({ where: { address: email }, attributes: ['address', 'user_auth', 'user_id'] });

    // If email exist and is associated with an account, we deassociate it
    if (bdEmail && bdEmail.user_auth) await Email.update({ user_auth: null }, { where: { address: email } });

    handleError(res, error);
  }
};