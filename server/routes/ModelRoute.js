import express from "express"
import { upload } from "../config/multerConfig.js";
import { uplaodModel, getModels } from "../controller/ModelController.js";


const router = express.Router()

router.post("/upload", upload.single('model'), uplaodModel)
router.get("/models", getModels )

export default router



