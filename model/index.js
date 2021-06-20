const path = require("path")
const contacts = path.join(__dirname, "./contacts.json")
const fs = require("fs").promises

const listContacts = async () => {
  try {
    const data = await fs.readFile(contacts, "utf-8")
    const parseResult = JSON.parse(data)
    return parseResult
  } catch (err) {
    console.log(err.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contacts, "utf-8")
    const contactsList = JSON.parse(data)
    const [contactById] = contactsList.filter((item) => contactId == item.id)
    return contactById
  } catch (error) {
    console.error(error.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contacts, "utf-8")
    const removeCont = JSON.parse(data).filter((item) => item.id != contactId)

    const dataString = JSON.stringify(removeCont)
    fs.writeFile("./contactNew", dataString, "utf-8")
    return removeCont
  } catch (error) {
    console.log(error.message)
  }
}
const addContact = async (body) => {
  try {
    const data = await fs.readFile(contacts)
    const contacts = parse.JSON(data)
    const newContact = {
      id: Date.now(),
      ...body
    }
    contacts.push(newContact)
    await fs.writeFile(contacts, JSON.stringify(contacts, null, 2))
    return newContact
  } catch (error) {
    console.log(error.message);
  }

}
const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contacts)
    const contact = JSON.parse(data)
​
    const findingContact = contact.find(
      contact => contact.id.toString() === contactId
    )
​
    if (!findingContact) {
      return null
    }
​
    const changedContact = {
      ...findingContact,
      ...body,
    }
​
    const newContacts = contact.map(contact => {
      if (contact.id === contactId) {
        return changedContact
      }
      return contact
    })
​
    await fs.writeFile(contacts, JSON.stringify(newContacts, null, 2))
​
    return changedContact
  } catch (err) {
    next(err)
  }
}
​

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
