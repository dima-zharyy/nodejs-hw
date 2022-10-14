const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { HOST = 'https://localhost:3000' } = process.env;

const { User, userJoiSchema } = require('../../model/auth');

const sendMail = require('../../helpers/sendEmail');
const { v4: uuidv4 } = require('uuid');

const signUp = async (req, res, next) => {
  try {
    const { error } = userJoiSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict('Email in use');
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();

    const result = await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const verificationMail = {
      to: email,
      subject: 'Verify you account on Phonebook app',
      html: `<a href='${HOST}/api/users/verify/${verificationToken}' target="_blank">Click to verify your account<a>`,
    };

    await sendMail(verificationMail);

    const {
      email: userEmail,
      subscription: userSubscription,
      avatarURL: userAvatar,
    } = result;

    res.status(201).json({
      status: 'success',
      code: 201,
      user: {
        email: userEmail,
        subscription: userSubscription,
        avatarURL: userAvatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
