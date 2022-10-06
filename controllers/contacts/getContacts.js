const contactsOperations = require('../../models/contacts');

const getContacts = async (req, res, next) => {
  try {
    const result = await contactsOperations.getContacts();
    res.json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
