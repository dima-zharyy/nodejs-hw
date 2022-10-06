const fs = require('fs/promises');
const path = require('path');
const { v4: genId } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const getContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  const parsedContacts = JSON.parse(contacts);

  return parsedContacts;
};

const getContactById = async contactId => {
  const contacts = await getContacts();
  const contact = contacts.find(item => item.id === contactId);

  return contact;
};

const addContact = async body => {
  const contacts = await getContacts();
  const id = genId();
  const newContact = { id, ...body };
  const updatedContacts = [...contacts, newContact];
  const jsonContacts = JSON.stringify(updatedContacts);

  await fs.writeFile(contactsPath, jsonContacts);

  return newContact;
};

const removeContact = async contactId => {
  const contacts = await getContacts();
  const contactToRemove = contacts.find(item => item.id === contactId);

  const updatedContacts = contacts.filter(item => item.id !== contactId);
  const jsonContacts = JSON.stringify(updatedContacts);

  await fs.writeFile(contactsPath, jsonContacts);

  return contactToRemove;
};

const updateContact = async (contactId, body) => {
  const contacts = await getContacts();
  const contactToUpdateIndex = contacts.findIndex(
    item => item.id === contactId
  );

  if (contactToUpdateIndex < 0) return null;

  contacts.splice(contactToUpdateIndex, 1, { id: contactId, ...body });
  const jsonContacts = JSON.stringify(contacts);

  await fs.writeFile(contactsPath, jsonContacts);

  return contacts[contactToUpdateIndex];
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
