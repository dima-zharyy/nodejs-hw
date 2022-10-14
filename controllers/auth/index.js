const signUp = require('./signUp');
const signIn = require('./signIn');
const signOut = require('./signOut');
const getCurrent = require('./getCurrent');
const setSubscription = require('./setSubscription');
const setAvatar = require('./setAvatar');
const verifyEmail = require('./verifyEmail');
const resendVerify = require('./resendVerify');

module.exports = {
  signUp,
  signIn,
  signOut,
  getCurrent,
  setSubscription,
  setAvatar,
  verifyEmail,
  resendVerify,
};
