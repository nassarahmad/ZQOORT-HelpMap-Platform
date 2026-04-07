const Joi = require('joi');
const { validate } = require('../../utils/validators');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

module.exports = validate(schema);