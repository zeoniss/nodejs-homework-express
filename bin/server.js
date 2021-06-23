const express = require("express")
const morgan = require("morgan")
require("dotenv").config()
const MongoClient = require("mongodb").MongoClient

const app = express()
const { contactsRouter } = require("../routes/api/contacts")

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(morgan("tiny"))

app.use("/api/contacts", contactsRouter)

const start = async () => {
  // Подключаемся к БД
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //из клиента достаем БД
  const db = client.db()
  const Contacts = db.collection("contacts")
  const contacts = await Contacts.find({}).toArray()
  console.log(contacts)

  app.listen(PORT, (err) => {
    if (err) console.error("Error at aserver launch:", err)
    console.log(`Server works at port ${PORT}!`)
  })
}

start()
