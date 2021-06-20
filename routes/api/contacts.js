const express = require("express")
const Joi = require("joi")
const Contacts = require("../../model")
const router = express.Router()
const {
  addValidationContact,
  updateValidationContact,
} = require("./validationMiddleware")

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

router.post("/", addValidationContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    return res
      .status("201")
      .json({ status: "success", code: "201", data: { contact } })
  } catch (err) {
    next(err)
  }
})

router.put("/:contactId", updateValidationContact, async (req, res, next) => {
  try {
    if (contact) {
      return res.json({ status: "success", code: "200", data: { contact } })
    }
    return res.json({ status: "error", code: "404", message: "Not found" })
  } catch (err) {
    next(err)
  }
})
module.exports = router
