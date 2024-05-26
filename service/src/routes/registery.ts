import express from "express"
import * as registerController from "../controllers/docker"

const registery = express.Router()
registery.post("/register",registerController.registerDockerContainer)