import { Request, Response, NextFunction } from "express";
import multer from "multer";

export const myErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    console.log({ success: false, message: err.message });
    return res.status(500).json({ success: false, message: err.message });
  }
};
