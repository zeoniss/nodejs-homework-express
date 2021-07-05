const jwt = require("jsonwebtoken")
const { findUser } = require("../model/authService")

const { UnauthorizeError } = require("../helpers/errors")

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ")

    if (!token) {
      next(new UnauthorizeError("Please, provide a token"))
    }

    const user = jwt.decode(token, process.env.JWT_SECRET)
    const { _id } = user
    const checkUser = await findUser(_id)

    if (!checkUser) {
      next(new UnauthorizeError("User doesnt exist"))
    }
    checkUser.token = token
    await checkUser.save()

    req.user = await checkUser

    next()
  } catch (err) {
    next(new UnauthorizeError("Not authorized"))
  }
}

module.exports = {
  authMiddleware,
}
