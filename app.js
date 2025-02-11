const express = require("express")
const logger = require("morgan")
const cors = require("cors")
require("dotenv").config()
const { connectMongo } = require("./src/db/connection")

const contactsRouter = require("./src/routes/api/contacts")
const usersRouter = require("./src/routes/api/users")
const avatarRouter = require("./src/routes/api/avatars")
const { errorHandler } = require("./src/helpers/apiHelpers")

const app = express()
const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use("/api/users", usersRouter)
app.use("/api/contacts", contactsRouter)
app.use("/avatars", avatarRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Not found" })
})

app.use(errorHandler)

const start = async () => {
  try {
    await connectMongo()
    console.log("Database connection successful")
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`)
    process.exit(1)
  }
}
start()

module.exports = app
