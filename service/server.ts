import express from "express"
import cors from "cors"
import litRouter from "./src/routes/lit"


const app = express()
app.use(express.json())
app.use(cors())
app.use("/lit",litRouter)

export default app