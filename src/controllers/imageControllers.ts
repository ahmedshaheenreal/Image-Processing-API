import { Request, Response, NextFunction } from "express";

export const uploadImageHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.file?.mimetype.includes("image")) {
      res.status(400).json({
        success: false,
        message: "This is not an image, please try again!",
      });
    }
    const responseObj = {
      success: true,
      message: "File uploaded successfully",
      data: {
        fileName: req.file?.filename,
        fileType: req.file?.mimetype,
        fileSize: req.file?.size,
      },
    };
    if (req.file) console.log("log req.file: ", req.file);
    res.status(201).json(responseObj);
  } catch (err) {
    next(err);
  }
};

export const resizeImage = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {};
