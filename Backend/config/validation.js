const Joi = require('joi');

module.exports = {
  validateEnv() {
    const schema = Joi.object({
      PORT: Joi.number().default(5000),
      MONGO_URI: Joi.string().uri().required(),
      JWT_SECRET: Joi.string().min(16).required(),
      NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    });
    const { error } = schema.validate(process.env);
    if (error) throw new Error(`❌ Invalid Env: ${error.message}`);
  }
};