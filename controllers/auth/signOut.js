const { User } = require('../../model/auth');

const signOut = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json();
};

module.exports = signOut;
