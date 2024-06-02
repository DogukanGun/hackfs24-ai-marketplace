import express from "express"
import cors from "cors"
import lillypadRouter from "./src/routes/registery"


const app = express()
app.use(express.json())
app.use(cors())
app.use("/api", lillypadRouter)

export default app