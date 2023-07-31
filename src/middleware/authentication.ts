import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../classes';
import { getAuthToken, getUserAuthFromJwtAuthString } from '../utils/auth';

export const verifyAuth = async (originalReq: Request, res: Response, next: NextFunction) => {
  const req = originalReq as AuthRequest;
  const token = getAuthToken(req);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userAuth = getUserAuthFromJwtAuthString(token);
  req.auth = userAuth;

  next();
};
