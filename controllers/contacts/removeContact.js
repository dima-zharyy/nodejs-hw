const { NotFound } = require('http-errors');
const { Contact } = require('../../model/contact');

const removeContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const result = await Contact.findByIdAndRemove({ _id: contactId });

    if (!result) {
      throw new NotFound('Not found');
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
