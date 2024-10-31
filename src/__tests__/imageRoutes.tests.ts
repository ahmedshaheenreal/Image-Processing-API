import request from "supertest";
import express from "express";
import imageRoutes from "../routes/imageRoutes"; // Adjust your import path accordingly
import path from "path";
const app = express();
app.use(express.json());
app.use(imageRoutes); // Use your image routes
const successPic = path.join(__dirname, "images", "success.png");
const failPic = path.join(__dirname, "images", "dumm.txt");

//uploading Test
describe("POST /uploadImage", () => {
  it("should successfully upload an image", async () => {
    const response = await request(app)
      .post("/uploadImage")
      .attach("image", successPic); // Adjust the path to your test image

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it("should return 400 for invalid file type", async () => {
    const response = await request(app)
      .post("/uploadImage")
      .attach("image", failPic); // Test with an invalid file type
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("success", false);
  });

  it("should return 404 for no file found", async () => {
    const response = await request(app)
      .post("/uploadImage")
      .attach("image", failPic); // Test with an invalid file type
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("success", false);
  });
});
