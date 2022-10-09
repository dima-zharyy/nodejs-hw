const { Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const { User, userJoiSchema } = require('../../model/auth');

const signIn = async (req, res, next) => {
  try {
    const { error } = userJoiSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const comparePass = bcrypt.compareSync(password, user.password);

    if (!user || !comparePass) {
      throw new Unauthorized('Email or password is wrong');
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      status: 'success',
      code: 200,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signIn;
