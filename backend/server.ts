import express, { Request, Response }  from "express"
import dotenv from "dotenv"

dotenv.config()

//Start the express server
const app = express()
const PORT = process.env.PORT

app.get("/", (request: Request, response: Response) => {
    response.send("Hello Word!")
})

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT)
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message)
  })
