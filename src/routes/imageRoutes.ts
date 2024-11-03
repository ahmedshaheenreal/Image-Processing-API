import { Router } from "express";
import { upload } from "../utils/uploadMulterConfig";
import {
  uploadImageHandler,
  resizeImageHanlder,
  downloadImageHandler,
  cropImageHandler,
} from "../controllers/imageControllers";

const imageRouter = Router();

imageRouter.post("/uploadImage", upload.single("image"), uploadImageHandler);
imageRouter.post("/resize", resizeImageHanlder);
imageRouter.get("/crop", cropImageHandler);
imageRouter.get("/download/:filename", downloadImageHandler);

export default imageRouter;
