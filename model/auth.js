const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

// DB

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model('user', userSchema);

// Validation

const userJoiSchema = Joi.object({
  password: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org'] },
    })
    .required(),
});

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

module.exports = {
  User,
  userJoiSchema,
  subscriptionJoiSchema,
};
