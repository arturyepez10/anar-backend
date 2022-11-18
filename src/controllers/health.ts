import { Request, Response } from "express";

export const healthController = (req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };

  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error as string;
    res.status(503).send();
  }
}