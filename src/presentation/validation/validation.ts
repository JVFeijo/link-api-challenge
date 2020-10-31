import { Result, err, success } from '@/utils/types/result'
import { Schema } from 'joi'
import { BadRequestError } from '../errors'

export class ValidationError extends BadRequestError {}

export class Validation<T> {
  constructor (
    private readonly schema: Schema
  ) {}

  validate (data: any): Result<T, ValidationError> {
    const { error, value } = this.schema.validate(data)
    if (error !== undefined) {
      return err(error)
    }

    return success(value)
  }
}
