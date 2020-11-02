import { DbError } from '@/infra/db/error/db-error'
import { Result } from '@/utils/types/result'

export interface TotalByDay {
  totalValue: number
  day: string
}

export interface ILoadTotalValueByDayRepository {
  load: () => Promise<Result<TotalByDay[], DbError>>
}
