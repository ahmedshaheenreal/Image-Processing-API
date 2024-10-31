import multer from "multer";
import path from "path";

const imgDirPath = path.join(process.cwd(), "data/");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imgDirPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
