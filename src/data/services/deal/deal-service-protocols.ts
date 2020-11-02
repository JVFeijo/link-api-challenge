import { TotalByDay } from '@/data/protocols/deal/load-total-by-day-repository'
import { Result } from '@/utils/types/result'

export interface IDealService {
  load: () => Promise<Result<TotalByDay[], Error>>
}
