const path = require("path")
const contacts = path.join(__dirname, "./contacts.json")
const fs = require("fs").promises

const listContacts = async () => {
  try {
    const data = await fs.readFile(contacts, "utf-8")
    return (ParseResult = JSON.parse(data))
  } catch (err) {
    console.log(err.message)
  }
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
