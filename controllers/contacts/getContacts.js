const contactService = require('../../service');

const getContacts = async (req, res, next) => {
  try {
    const result = await contactService.getContacts();
    res.json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
