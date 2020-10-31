import { err } from '@/utils/types/result'
import Joi, { ValidationError } from 'joi'
import { Validation } from './validation'

interface SutTypes {
  sut: Validation<any>
  schema: Joi.ObjectSchema<any>
}

const makeSut = (): SutTypes => {
  const schema = Joi.object({ name: Joi.string() })
  return {
    sut: new Validation<any>(schema),
    schema
  }
}

describe('Validation', () => {
  test('should return error if validation fails', async () => {
    const { sut, schema } = makeSut()
    jest.spyOn(schema, 'validate').mockReturnValueOnce({ error: new ValidationError('Error!', {}, {}), value: null })
    const result = sut.validate({ name: 1000 })
    expect(result).toEqual(err(expect.any(ValidationError)))
  })
})
