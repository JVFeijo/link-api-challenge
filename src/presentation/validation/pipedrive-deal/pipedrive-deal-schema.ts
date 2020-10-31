import Joi from 'joi'

export const PipedriveDealSchema = Joi.object({
  data: Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    person_name: Joi.string().required(),
    value: Joi.number().required(),
    status: Joi.string().equal('won'),
    won_time: Joi.date().required()
  }).unknown().required()
}).unknown()
