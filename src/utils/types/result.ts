export type Result<T, E> = Success<T> | Err<E>

export class Success<T> {
  result: T

  constructor (result: T) {
    this.result = result
  }
}

export class Err<E> {
  error: E

  constructor (err: E) {
    this.error = err
  }
}

export const success = <T>(t: T): Success<T> => new Success(t)

export const err = <E>(e: E): Err<E> => new Err(e)

export const isErr = <T, E>(result: Result<T, E>): result is Err<E> => {
  return result instanceof Err
}

export const isSuccess = <T, E>(result: Result<T, E>): result is Success<T> => {
  return result instanceof Success
}
