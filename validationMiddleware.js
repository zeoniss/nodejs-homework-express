const Joi = require("joi")

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().alphanum().min(3).max(30).required(),
      phone: Joi.string().alphanum().min(3).max(30).required(),
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details })
    }
    next()
  },
  updateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().alphanum().min(3).max(30).required(),
      phone: Joi.string().alphanum().min(3).max(30).required(),
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details })
    }
    next()
  },
}
