import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { handleError } from '../../utils/errors';
import { UserAuthData, Email, UserAccount } from '../../models';
import moment from 'moment';

export const confirmEmailController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const { token } = req.query;

    // Check if email exists in the database
    let bdEmail = await Email.findOne({ where: { address: email }, attributes: ['address', 'user_auth', 'user_id'] });

    // If email doesn't exist, return error
    if (!bdEmail) {
      return res.status(400).json({ message: "Email doesn't exist" });
    }

    // We chek if the status of the user is pending
    const authUser = await UserAuthData.findOne({ where: { email }, attributes: ['user_id', 'username', 'password_salt', 'password_hash', 'recovery_time', 'recovery_token', 'email', 'status', 'token_time', 'token_code', 'hash_algorithm', 'createdAt', 'updatedAt'] });
    if (authUser && authUser.status === "active") return res.status(400).json({ message: 'User already active' });

    if (!token) {
      // We create a token to send to the user and confirm email
      const token_time = moment().add(2, 'h').toISOString();
      const token_code = await bcrypt.hash(token_time, 10);

      await authUser?.update({
        token_time,
        token_code
      })

      res.status(200).json({ token_code });
    } else {
      // We check if the user has a token
      if (authUser && !authUser.token_code) {
        return res.status(400).json({ message: 'User has no token associated' });
      }

      // We check if the user token is expired
      if (moment(authUser?.token_time).isBefore(moment())) {
        return res.status(400).json({ message: 'Token is expired' });
      }

      // We compare if the token is the same
      if (authUser?.token_code !== token) {
        return res.status(400).json({ message: 'Invalid token' });
      }

      // Update the user to active status
      await authUser?.update({
        status: "active",
        token_time: null,
        token_code: null
      });

      res.status(200).json({ message: 'User has been confirmed' });
    }
  } catch (error) {
    handleError(res, error);
  }
}