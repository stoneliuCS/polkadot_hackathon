import express, { Request, Response } from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import router from "./routes/router"
import cors from "cors"

dotenv.config()

//Start the express server
const app = express()
const PORT = process.env.PORT || 3001

//Middleware
app.use(bodyParser.json());
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Server listening
app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT)
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message)
  })

//Server Health Check
app.get("/", (request: Request, response: Response) => {
  response.json({"message" : "ok"})
})

app.use("/api", router)

