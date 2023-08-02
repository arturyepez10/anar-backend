import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../classes';
import { getAuthToken, getUserAuthFromJwtAuthString } from '../utils/auth';

export const verifyAuth = async (originalReq: Request, res: Response, next: NextFunction) => {
  const req = originalReq as AuthRequest;
  try {
    const token = getAuthToken(req);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userAuth = getUserAuthFromJwtAuthString(token);
    req.auth = userAuth;

    next();
  } catch (error) {
    console.log("error from auth ->", error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
