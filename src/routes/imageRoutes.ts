import { Router } from "express";
import { upload } from "../utils/uploadMulterConfig";
import { uploadImageHandler } from "../controllers/imageControllers";

const imageRouter = Router();

imageRouter.post("/uploadImage", upload.single("image"), uploadImageHandler);

export default imageRouter;
