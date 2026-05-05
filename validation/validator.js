const Joi = require('joi')

exports.registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required()
})

exports.loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
})
