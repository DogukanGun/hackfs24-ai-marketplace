import express from "express"
import * as litController from "../controllers/lit"

const litRouter = express.Router()
litRouter.post("/encrpt",litController.litEncrpt)

export default litRouter;