import { Deal } from '@/data/models/deal/deal'
import { DealInfo, IAddDeal } from '@/data/usecases/add-deal/add-deal-protocols'
import { isSuccess, Result } from '@/utils/types/result'
import { EventEmitter } from 'events'

export class AddDealEventDecorator implements IAddDeal {
  constructor (
    private readonly eventEmitter: EventEmitter,
    private readonly addDeal: IAddDeal
  ) {}

  async add (dealInfo: DealInfo): Promise<Result<Deal, Error>> {
    const addResult = await this.addDeal.add({ ...dealInfo })

    if (isSuccess(addResult)) {
      this.eventEmitter.emit('new-deal', addResult.result)
    }

    return addResult
  }
}
