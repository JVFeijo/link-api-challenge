/* eslint-disable @typescript-eslint/no-misused-promises */
import { AddDealEventDecorator } from '@/data/decorators/add-deal-decorator/add-deal-event-decorator'
import { makeAddBlingOrder } from '@/data/observers/new-deal/add-bling-order'
import { AddDeal } from '@/data/usecases/add-deal/add-deal'
import { IAddDeal } from '@/data/usecases/add-deal/add-deal-protocols'
import myEventEmitter from '../../observers/event-emitter-factory'
import { makeAddDealRepository } from '../../repositories/add-deal-repository/add-deal-repository-factory'

export const makeAddDealEventDecorator = (): IAddDeal => {
  const addDealRepository = makeAddDealRepository()
  const addDeal = new AddDeal(addDealRepository)
  myEventEmitter.on('new-deal', makeAddBlingOrder(myEventEmitter))
  return new AddDealEventDecorator(myEventEmitter, addDeal)
}
