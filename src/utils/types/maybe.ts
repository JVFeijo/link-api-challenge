export type Maybe<T> = Just<T> | Nothing

interface Just<T> {
  type: MaybeType.JUST
  value: T
}

export interface Nothing {
  type: MaybeType.NOTHING
}

const enum MaybeType {
  JUST = 'just',
  NOTHING = 'nothing'
}

// Type constructors
export function Just<T> (val: T): Just<T> {
  return {
    type: MaybeType.JUST,
    value: val
  }
}

export function Nothing (): Nothing {
  return {
    type: MaybeType.NOTHING
  }
}

// TypeGuard helpers
export const isNothing = <T>(input: Maybe<T>): input is Nothing => {
  return input.type === MaybeType.NOTHING
}
