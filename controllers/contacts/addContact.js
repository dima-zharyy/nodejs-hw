const contactsOperations = require('../../models/contacts');
const { contactSchema } = require('../../schemas');

const addContact = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactSchema.validate(body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const result = await contactsOperations.addContact(body);
    res.status(201).json({ status: 'success', code: 201, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
