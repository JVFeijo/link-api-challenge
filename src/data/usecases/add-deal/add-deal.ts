import { Deal } from '@/data/models/deal/deal'
import { IAddDealRepository } from '@/data/protocols/deal/add-deal-repository'
import { err, isErr, Result, success } from '@/utils/types/result'
import { DealInfo, IAddDeal } from './add-deal-protocols'

export class AddDeal implements IAddDeal {
  constructor (
    private readonly addDealRepository: IAddDealRepository
  ) {}

  async add (dealInfo: DealInfo): Promise<Result<Deal, Error>> {
    const addResult = await this.addDealRepository.add({
      ...dealInfo
    })

    if (isErr(addResult)) {
      return err(addResult.error)
    }

    return success(addResult.result)
  }
}
