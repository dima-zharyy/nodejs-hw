const addContact = require('./addContact');
const getContactById = require('./getContactById');
const getContacts = require('./getContacts');
const removeContact = require('./removeContact');
const updateContact = require('./updateContact');
const updateContactFavoriteStatus = require('./updateContactFavoriteStatus');

module.exports = {
  addContact,
  getContactById,
  getContacts,
  removeContact,
  updateContact,
  updateContactFavoriteStatus,
};
