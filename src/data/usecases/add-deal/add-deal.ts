import { IAddDealRepository } from '@/data/protocols/add-deal-repository'
import { Nothing } from '@/utils/types/maybe'
import { err, isErr, Result, success } from '@/utils/types/result'
import { DealInfo, IAddDeal } from './add-deal-protocols'

export class AddDeal implements IAddDeal {
  constructor (
    private readonly addDealRepository: IAddDealRepository
  ) {}

  async add (dealInfo: DealInfo): Promise<Result<Nothing, Error>> {
    const addResult = await this.addDealRepository.add({
      ...dealInfo
    })

    if (isErr(addResult)) {
      return err(addResult.error)
    }

    return success(Nothing())
  }
}
