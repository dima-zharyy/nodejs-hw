const { NotFound } = require('http-errors');
const { Contact } = require('../../model/contact');

const getContactById = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const result = await Contact.findOne({ _id: contactId });

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.status(200).json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
