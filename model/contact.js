const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

// DB

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model('contact', contactSchema);

// Validation

const contactJoiSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org'] },
    })
    .required(),
  phone: Joi.string().min(5).max(30).required(),
  favorite: Joi.bool(),
});

const contactStatusJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  Contact,
  contactJoiSchema,
  contactStatusJoiSchema,
};
