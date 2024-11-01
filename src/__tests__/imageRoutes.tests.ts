import request from "supertest";
import express from "express";
import imageRoutes from "../routes/imageRoutes"; // Adjust your import path accordingly
import path from "path";
const app = express();
app.use(express.json());
app.use(imageRoutes); // Use your image routes
const successPic = path.join(__dirname, "images", "success.png");
const failPic = path.join(__dirname, "images", "dumm.txt");
// const wrongname = path.join(process.cwd(), "data", "wrong");

//uploading Test
describe("POST /uploadImage", () => {
  it("should successfully upload an image", async () => {
    const response = await request(app)
      .post("/uploadImage")
      .attach("image", successPic); // Adjust the path to your test image

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it("should return 404 for no file found", async () => {
    const response = await request(app)
      .post("/uploadImage")
      .attach("image", failPic); // Test with an invalid file type
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("success", false);
  });
});

//resize test
describe("POST /resize", () => {
  it("should return 500 for wrong file name", async () => {
    const response = await request(app).post("/resize").send({
      name: "wrong.png",
      width: 100,
      height: 100,
      isbackgroundWhite: true,
      fit: "cover",
      position: "center",
    });
    console.log(response.body);

    expect(response.status).toBe(500);
    // expect(response.body).toHaveProperty("success", false);
    // expect(response.body).toHaveProperty("message", "File not found");
  });

  it("should return 201 for Successful operation", async () => {
    const response = await request(app).post("/resize").send({
      name: "success.png",
      width: 150,
      height: 100,
      isbackgroundWhite: true,
      fit: "cover",
      position: "center",
    });

    expect(response.status).toBe(201);
  });

  it("should return 200 for already processed  images", async () => {
    const response = await request(app).post("/resize").send({
      name: "success.png",
      width: 100,
      height: 100,
      isbackgroundWhite: true,
      fit: "cover",
      position: "center",
    });

    expect(response.status).toBe(201);
  });
});

//crop test
describe("GET /crop", () => {
  it("should return 404 for wrong file name", async () => {
    const response = await request(app)
      .get("/crop")
      .send({
        name: "wrong.png",
        dimensions: { left: 200, top: 55, width: 400, height: 300 },
      });

    expect(response.status).toBe(404);
    // expect(response.body).toHaveProperty("success", false);
    // expect(response.body).toHaveProperty("message", "File not found");
  });

  it("should return 200 for Successful operation", async () => {
    const response = await request(app)
      .get("/crop")
      .send({
        name: "success.png",
        dimensions: { left: 200, top: 200, width: 400, height: 300 },
      });

    expect(response.status).toBe(200);
  });
});
