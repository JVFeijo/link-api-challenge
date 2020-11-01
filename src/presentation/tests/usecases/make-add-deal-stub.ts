import { Deal } from '@/data/models/deal/deal'
import { mockDeal } from '@/data/tests/models/deal/mockDeal'
import { DealInfo, IAddDeal } from '@/data/usecases/add-deal/add-deal-protocols'
import { Result, success } from '@/utils/types/result'

export const makeAddDealStub = (): IAddDeal => {
  class AddDeal implements IAddDeal {
    async add (info: DealInfo): Promise<Result<Deal, Error>> {
      return success(mockDeal())
    }
  }

  return new AddDeal()
}
