const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { UsersModel } = require("../db/usersModel")
const {
  RegistrationConflictError,
  UnauthorizeError,
} = require("../helpers/errors")

const createUser = async (email, password) => {
  const existEmail = await UsersModel.findOne({ email })
  if (existEmail) {
    throw new RegistrationConflictError("Email in use")
  }

  const user = new UsersModel({
    email,
    password,
  })
  return await user.save()
}

const loginUser = async (email, password) => {
  //достаем пользователя по email
  const user = await UsersModel.findOne({ email })
  //Если пользователь не найден, прислали неверный email,
  //можем вернуть UnauthorizeError
  if (!user) {
    throw new UnauthorizeError(`No user with email '${email}' found`)
  }
  // если пользователь найден нужно сравнить пароль
  const userCheck = await bcrypt.compare(password, user.password)
  if (!userCheck) {
    throw new UnauthorizeError("Wrong password")
  }
  //Если все ок, подписываем новый токен
  //для пользователя
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      subscription: user.subscription,
    },
    process.env.JWT_SECRET
  )

  return { user, token }
}

const findUser = async (id) => {
  return await UsersModel.findById(id)
}

module.exports = { createUser, loginUser, findUser }
