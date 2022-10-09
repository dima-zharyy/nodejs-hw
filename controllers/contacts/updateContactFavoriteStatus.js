const { NotFound } = require('http-errors');
const { Contact, contactStatusJoiSchema } = require('../../model/contact');

const updateContactFavoriteStatus = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactStatusJoiSchema.validate(body);

    if (error) {
      error.status = 400;
      error.message = 'missing field favorite';
      throw error;
    }

    const contactId = req.params.contactId;
    const result = await Contact.findByIdAndUpdate({ _id: contactId }, body, {
      new: true,
    });

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactFavoriteStatus;
