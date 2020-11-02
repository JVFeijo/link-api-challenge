import { ILoadTotalValueByDayRepository, TotalByDay } from '@/data/protocols/deal/load-total-by-day-repository'
import { Result } from '@/utils/types/result'
import { IDealService } from './deal-service-protocols'

export class DealService implements IDealService {
  constructor (
    private readonly loadTotalValueByDay: ILoadTotalValueByDayRepository
  ) {}

  async load (): Promise<Result<TotalByDay[], Error>> {
    return await this.loadTotalValueByDay.load()
  }
}
