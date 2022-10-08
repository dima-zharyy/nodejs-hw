const { NotFound } = require('http-errors');
const { contactSchema } = require('../../schemas');
const contactsOperations = require('../../models/contacts');

const updateContact = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactSchema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const contactId = req.params.contactId;
    const result = await contactsOperations.updateContact(contactId, body);

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
