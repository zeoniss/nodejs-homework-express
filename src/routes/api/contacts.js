const express = require("express")

const router = express.Router()

const { asyncCover } = require("../../helpers/apiHelpers")

const {
  postValidation,
  patchValidation,
} = require("../../middlewares/contactValidationMiddleware")
const ContactsController = require("../../controllers/contactControllers")

router.get("/", asyncCover(ContactsController.getContact))

router.get("/:contactId", asyncCover(ContactsController.getContactWithId))

router.post("/", postValidation, asyncCover(ContactsController.postContact))

router.delete("/:contactId", asyncCover(ContactsController.deleteContact))

router.patch(
  "/:contactId",
  patchValidation,
  asyncCover(ContactsController.patchContact)
)

router.patch(
  "/:contactId/favorite",
  patchValidation,
  asyncCover(ContactsController.patchContactStatus)
)

module.exports = router
