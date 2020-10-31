import { ServerError } from '@/presentation/errors'

export class DbError extends ServerError {
  constructor (e: Error) {
    super(e.message)
    this.name = 'DbError'
  }
}
