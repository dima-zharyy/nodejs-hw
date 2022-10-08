const { NotFound } = require('http-errors');
const { contactValidateSchema } = require('../../service');
const contactService = require('../../service');

const updateContact = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactValidateSchema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const contactId = req.params.contactId;
    const result = await contactService.updateContact(contactId, body);

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
