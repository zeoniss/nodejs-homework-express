const express = require("express")
const Joi = require("joi")
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

router.post("/", async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().alphanum().min(3).max(30).required(),
      phone: Joi.string().alphanum().min(3).max(30).required(),
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details })
    }
    return res
      .status("201")
      .json({ status: "success", code: "201", data: { contact } })
  } catch (err) {
    next(err)
  }
})

router.put("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().alphanum().min(3).max(30).required(),
      phone: Joi.string().alphanum().min(3).max(30).required(),
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details })
    }
    if (contact) {
      return res.json({ status: "success", code: "200", data: { contact } })
    }
    return res.json({ status: "error", code: "404", message: "Not found" })
  } catch (err) {
    next(err)
  }
})
module.exports = router
