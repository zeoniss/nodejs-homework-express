const express = require("express")
const Contacts = require("../../model")
const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await Contacts.listContacts()
    res.json({ allContacts })
  } catch (err) {
    next(err)
  }
})

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact === undefined) {
      await res.status(404).json({ message: "Not Found" })
      return
    }
    await res.status(200).json({ contact })
  } catch (err) {
    next(err)
  }
})

router.delete("/:contactId", async (req, res) => {
  try {
    const filtredContact = await Contacts.removeContact(req.params.contactId)
    if (!filtredContact) {
      await res.status(404).json({
        message: "Not found",
      })
      return
    }
    await res.status(200).json({ filtredContact, message: "contact deleted" })
  } catch (error) {
    next(err)
  }
})

router.post("/", async (req, res) => {
  console.log(req.body)
  const { name, email, phone } = req.body
  contacts.push({ id: Date.now(), name, email, phone })
  try {
    if (!name || !email || !phone) {
      await res.status(400).json({ message: "missing required field" })
      return
    }
    await res.status(201).json(contacts)
  } catch (error) {
    await res.status(404).json({ message: error })
  }
})

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" })
})

module.exports = router
