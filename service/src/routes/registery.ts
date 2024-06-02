import express from "express"
import * as registerController from "../controllers/lillypad"

const lillypadRouter = express.Router()
lillypadRouter.post("/run-lilypad-cowsay",registerController.runLilyPadCowsay)

export default lillypadRouter