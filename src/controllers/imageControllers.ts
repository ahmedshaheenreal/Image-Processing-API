import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import path from "path";
import fs from "fs";
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

export const resizeImageHanlder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("This is the target: ", req.body);

  try {
    const targetPic: string = path.join(process.cwd(), "data", req.body.name);
    const output: string = path.join(
      process.cwd(),
      "data",
      `output-${req.body.width}-${req.body.height}-` + req.body.name
    );
    //check if file already processed
    if (fs.existsSync(output)) {
      console.log(output);
      console.log("Aloooo");
      res.status(201).json({
        success: true,
        message: "File Already resized, you can download it.",
      });

      return;
    }
    const bg = req.body.isbackgroundWhite
      ? { r: 255, g: 255, b: 255, alpha: 0.5 }
      : { r: 0, g: 0, b: 0, alpha: 0.5 };

    await sharp(targetPic)
      .resize(+req.body.width, +req.body.height, {
        kernel: sharp.kernel.nearest,
        fit: req.body.fit || "contain",
        position: req.body.position || "center",
        background: bg,
      })
      .toFile(output);

    res.status(201).json({
      success: true,
      message: "Image resized successfully",
    });
  } catch (err) {
    next(err);
  }
};
export const downloadImageHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Construct the file path based on request parameters
    const fileName = req.params.filename;
    const filePath = path.join(process.cwd(), "data", fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      res.status(404).json({
        success: false,
        message: "File not found.",
      });
      return;
    }

    // Set the headers to prompt a download in the browser
    res.download(filePath, fileName, (err) => {
      if (err) {
        next(err); // Forward any errors to the error handler
      }
    });
  } catch (err) {
    console.error("Error during file download:", err); // Log error
    next(err);
  }
};
