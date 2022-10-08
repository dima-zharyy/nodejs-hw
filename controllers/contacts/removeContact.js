const { NotFound } = require('http-errors');
const contactService = require('../../service');

const removeContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const result = await contactService.removeContact(contactId);

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
