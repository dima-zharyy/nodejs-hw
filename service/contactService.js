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
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model('contact', contactSchema);

// Validation

const contactValidateSchema = Joi.object({
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

const contactFavoriteStatusValidateSchema = Joi.object({
  favorite: Joi.bool().required(),
});

// API

const getContacts = async () => {
  return Contact.find();
};

const getContactById = async contactId => {
  return Contact.findOne({ _id: contactId });
};

const addContact = async body => {
  return Contact.create(body);
};

const removeContact = async contactId => {
  return Contact.findByIdAndRemove({ _id: contactId });
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

const updateContactFavoriteStatus = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactFavoriteStatus,
  contactValidateSchema,
  contactFavoriteStatusValidateSchema,
};
