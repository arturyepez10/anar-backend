import { Response } from "express";

export const handleError = (res: Response, error?: any, status = 500) => {
  console.error("ERROR -> ", error);
  
  const message = error instanceof Error ? error.message : error;
  res.status(status).send(message);
}