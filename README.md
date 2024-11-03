Here’s a detailed README for your Image Processing API project:

---

# Image Processing API

## Description

This project is a backend API built with TypeScript, and Express for processing images uploaded by users. The API provides various image processing functionalities such as resizing, cropping, and watermarking, allowing users to apply transformations and download the processed images. It focuses on efficient image processing techniques, robust error handling, and follows industry-standard best practices.

## Features

- **Image Upload:** Allows users to upload images to the server for processing.
- **Image Resizing:** Resize images to custom dimensions specified by the user.
- **Image Cropping:** Crop images to a specified area.
- **Image Download:** Download the processed images with applied transformations.
- **Error Handling:** Comprehensive error handling for failed processing tasks and invalid requests.

## Tech Stack

- **Express**
- **TypeScript**
- **Sharp** - High-performance image processing library
- **Jest** - For unit testing
- **GitHub Actions** - For CI/CD to ensure safe deployments

## Project Structure

```
project-directory/
│
├── src/
│   ├── controllers/
│   │   └── imageController.ts     # Handles image processing logic
│   ├── routes/
│   │   └── imageRoutes.ts         # Defines API routes for image endpoints
│   ├── utils/
│   │   └── errorHandler.ts        # Custom error handling utilities
│   └── server.ts                  # Initializes server and routes
│
├── .gitignore                     # Files to ignore in Git
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation
```

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone <repo-url>
   cd project-directory
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   - Create a `.env` file in the root directory and define necessary environment variables such as:
     ```env
     PORT=3000
     ```

4. **Run the Application:**

   ```bash
   npm run dev
   ```

5. **Build and Start in Production:**
   ```bash
   npm run build
   npm start
   ```

## Image Processing with Sharp

This API leverages the [Sharp](https://sharp.pixelplumbing.com/) library for high-performance image processing. It supports resizing, cropping, and more, enabling the API to handle transformations efficiently.

## Testing

This project includes unit tests to ensure that image processing functions perform correctly and error handling is effective. Tests are written using Jest and can be run with:

```bash
npm run test
```

## Continuous Integration & Deployment

- **GitHub Actions** are set up to automatically test and validate code changes, ensuring that the main branch remains stable.
- **Deploymed version:**

  https://ahmed-shaheen-typescript.onrender.com

## API Endpoints

| Method | Endpoint        | Description                   |
| ------ | --------------- | ----------------------------- |
| POST   | `/api/upload`   | Uploads an image              |
| POST   | `/api/resize`   | Resizes the uploaded image    |
| POST   | `/api/crop`     | Crops the uploaded image      |
| GET    | `/api/download` | Downloads the processed image |

## License

This project is licensed under the MIT License.
