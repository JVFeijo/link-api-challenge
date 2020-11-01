import { IAddDealRepository } from '@/data/protocols/add-deal-repository'
import { MongoDealRepository } from '@/infra/db/mongodb/mongo-deal-repository/mongo-deal-repository'

export const makeAddDealRepository = (): IAddDealRepository => {
  return new MongoDealRepository()
}
