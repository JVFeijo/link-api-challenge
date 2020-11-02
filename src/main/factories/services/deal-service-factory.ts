import { DealService } from '@/data/services/deal/deal-service'
import { IDealService } from '@/data/services/deal/deal-service-protocols'
import { MongoDealRepository } from '@/infra/db/mongodb/mongo-deal-repository/mongo-deal-repository'

export const makeDealService = (): IDealService => {
  const loadTotalValueByDayRepository = new MongoDealRepository()
  return new DealService(loadTotalValueByDayRepository)
}
