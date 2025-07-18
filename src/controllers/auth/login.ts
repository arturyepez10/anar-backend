import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { handleError } from '../../utils/errors';
import { UserAuthData, Email } from '../../models';
import { generateJwtAuthString } from '../../utils/auth';

export const loginController = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      application
    } = req.body;

    // Check if email exists in the database
    const bdEmail = await Email.findOne({ where: { address: email }, attributes: ['address', 'user_auth', 'user_id'] });

    if (!bdEmail || !bdEmail.user_auth) {
      return res.status(400).json({ message: 'Email does not exist' });
    }

    // We obtain the user auth data
    const authUser = await UserAuthData.findOne({ where: { user_id: bdEmail.user_auth }, attributes: ['user_id', 'username', 'password_salt', 'password_hash', 'recovery_time', 'recovery_token', 'email', 'status', 'token_time', 'token_code', 'hash_algorithm', 'createdAt', 'updatedAt'] });

    if (!authUser) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // We check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, authUser.password_hash);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid information of the user' });
    }

    // Create the token
    const token = await generateJwtAuthString(authUser, application);

    res.status(200).json({ token });
  } catch (error) {
    handleError(res, error);
  }
}