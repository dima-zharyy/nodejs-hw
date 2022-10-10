const { NotFound } = require('http-errors');
const { Contact, contactJoiSchema } = require('../../model/contact');

const updateContact = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactJoiSchema.validate(body);
    if (error) {
      error.status = 400;
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

module.exports = updateContact;
