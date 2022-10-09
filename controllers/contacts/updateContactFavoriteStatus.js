const { NotFound } = require('http-errors');
const { contactFavoriteStatusValidateSchema } = require('../../service');
const contactService = require('../../service');

const updateContactFavoriteStatus = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactFavoriteStatusValidateSchema.validate(body);
    if (error) {
      error.status = 400;
      error.message = 'missing field favorite';
      throw error;
    }

    const contactId = req.params.contactId;
    const result = await contactService.updateContactFavoriteStatus(
      contactId,
      body
    );

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error.message);
  }
};

module.exports = updateContactFavoriteStatus;
