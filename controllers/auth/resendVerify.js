const { NotFound, BadRequest } = require('http-errors');
const sendMail = require('../../helpers/sendEmail');
const { verifyJoiSchema, User } = require('../../model/auth');
const { HOST = 'https://localhost:3000' } = process.env;

const resendVerify = async (req, res, next) => {
  try {
    const { email: userEmail } = req.body;

    const { error } = verifyJoiSchema.validate(userEmail);

    if (error) {
      error.status = 400;
      throw error;
    }

    const user = await User.findOne({ userEmail });

    if (!user) {
      throw new NotFound('User not found');
    }

    if (user.verify) {
      throw new BadRequest('Verification has already been passed');
    }

    const verificationMail = {
      to: userEmail,
      subject: 'Verify you account on Phonebook app',
      html: `<a href='${HOST}/api/users/verify/${user.verficationToken}' target="_blank">Click to verify your account<a>`,
    };

    await sendMail(verificationMail);

    res.json({ message: 'Verification email sent' });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerify;
