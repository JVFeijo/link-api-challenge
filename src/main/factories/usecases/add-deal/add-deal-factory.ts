import { AddDeal } from '@/data/usecases/add-deal/add-deal'
import { IAddDeal } from '@/data/usecases/add-deal/add-deal-protocols'
import { makeAddDealRepository } from '../../repositories/add-deal-repository/add-deal-repository-factory'

export const makeAddDeal = (): IAddDeal => {
  const addDealRepository = makeAddDealRepository()
  const addDeal = new AddDeal(addDealRepository)
  return addDeal
}
