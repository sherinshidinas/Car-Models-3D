import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import modelRoutes from "./routes/ModelRoute.js";
import cors from "cors";
import fs from "fs";

//Get __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8802;
dotenv.config();

app.use(express.json());

// Use environment variable to set the allowed origin
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDb!!!");
  } catch (error) {
    errorHandler(error);
    console.log("error occured while connecting mongoDb!");
  }
};

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/api", modelRoutes);

app.use("/uploads", express.static(uploadDir));

//use the client app
app.use(
  express.static(path.join(__dirname, "/frontend/3d-model-viewer/build"))
);

//render client for any path
app.get("*", (req, res) =>
  res.sendFile(
    path.join(__dirname, "/frontend/3d-model-viewer/build/index.html")
  )
);



app.listen(port, () => {
  connect();
  console.log(`server running port on ${port}`);
});
