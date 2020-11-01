import Joi from 'joi'

const currentValidation = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  person_name: Joi.string().required(),
  value: Joi.number().required(),
  status: Joi.string().required(),
  won_time: Joi.date().required()
}).unknown(true)

export const PipedriveDealSchema = Joi.object({
  current: currentValidation
}).unknown(true)
