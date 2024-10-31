import bodyParser from "body-parser";
import imageRouter from "./routes/imageRoutes";
import morgan from "morgan";
import express, { Request, Response, NextFunction } from "express";

import { myErrorMiddleware } from "./utils/errorHandler";
const app = express();

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//request logger
app.use(morgan("combined"));

app.use(imageRouter);

//error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  myErrorMiddleware(err, req, res, next);
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
