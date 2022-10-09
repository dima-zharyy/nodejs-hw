const { Unauthorized } = require('http-errors');
const { User } = require('../model/auth');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const auth = async (req, _, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new Unauthorized('Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'invalid signature') {
      error.status = 401;
      error.message = 'Not authorized';
    }
    next(error);
  }
};

module.exports = auth;
