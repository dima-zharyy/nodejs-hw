const { contactValidateSchema } = require('../../service');
const contactService = require('../../service');

const addContact = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactValidateSchema.validate(body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const result = await contactService.addContact(body);
    res.status(201).json({ status: 'success', code: 201, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
