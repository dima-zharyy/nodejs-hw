const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');

const { User, userJoiSchema } = require('../../model/auth');

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

    const result = await User.create({ email, password: hashPassword });
    const { email: userEmail, subscription: userSubscription } = result;

    res.status(201).json({
      status: 'success',
      code: 201,
      user: { email: userEmail, subscription: userSubscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
