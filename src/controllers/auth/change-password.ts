import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { handleError } from '../../utils/errors';
import { UserAuthData, Email, UserAccount } from '../../models';

export const changePasswordController = async (req: Request, res: Response) => {
  try {
    const {
      email,
      oldPassword,
      newPassword,
      newPasswordRepeated
    } = req.body;

    // We obtain the user auth data
    const authUser = await UserAuthData.findOne({ where: { email }, attributes: ['user_id', 'username', 'password_salt', 'password_hash', 'recovery_time', 'recovery_token', 'email', 'status', 'token_time', 'token_code', 'hash_algorithm', 'createdAt', 'updatedAt'] });

    if (!authUser) {
      return res.status(404).json({ message: 'Invalid information of the user' });
    }

    // We check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(oldPassword, authUser.password_hash);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid information of the user' });
    }

    // We check if new password is equal

    if (newPassword !== newPasswordRepeated) {
      return res.status(400).json({ message: 'New password is not the same' });
    }

    const password_hash = await bcrypt.hash(newPassword, authUser.password_salt);

    await authUser.update({
      password_hash
    });

    res.status(200).json({ message: 'Information was updated successfully' });
  } catch (error) {
    handleError(res, error);
  }
}