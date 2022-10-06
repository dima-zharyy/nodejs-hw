const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org'] },
    })
    .required(),
  phone: Joi.string().min(5).max(30).required(),
});

module.exports = contactSchema;
