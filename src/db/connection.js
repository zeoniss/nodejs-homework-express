const mongoose = require("mongoose")

const mongoUrl = process.env.MONGO_URL

const connectMongo = async () => {
  return mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
module.exports = {
  connectMongo,
}
