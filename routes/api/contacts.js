const express = require("express")
const Contacts = require("../../model")
const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await Contacts.listContacts()
    res.json({ message: "200", allContacts })
  } catch (err) {
    next(err)
  }
})

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" })
})

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" })
})

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" })
})

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" })
})

module.exports = router
