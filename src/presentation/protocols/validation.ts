import { Result } from '@/utils/types/result'
import { ValidationError } from '../validation/validation'

export interface IValidation<T> {
  validate: (data: any) => Result<T, ValidationError>
}
