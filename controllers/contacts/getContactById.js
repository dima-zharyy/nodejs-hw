const { NotFound } = require('http-errors');
const contactService = require('../../service');

const getContactById = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const result = await contactService.getContactById(contactId);

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.status(200).json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
