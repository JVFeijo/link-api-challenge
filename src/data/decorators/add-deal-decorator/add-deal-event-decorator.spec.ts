import { mockDeal } from '@/data/tests/models/deal/mockDeal'
import { mockDealInfo } from '@/data/tests/models/deal/mockDealInfo'
import { IAddDeal } from '@/data/usecases/add-deal/add-deal-protocols'
import { makeAddDealStub } from '@/presentation/tests/usecases/make-add-deal-stub'
import { err, success } from '@/utils/types/result'
import { EventEmitter } from 'events'
import { AddDealEventDecorator } from './add-deal-event-decorator'

interface SutTypes {
  addDealStub: IAddDeal
  eventEmitterStub: EventEmitter
  sut: AddDealEventDecorator
}

const makeSut = (): SutTypes => {
  const addDealStub = makeAddDealStub()
  const eventEmitterStub = new EventEmitter()
  const sut = new AddDealEventDecorator(eventEmitterStub, addDealStub)
  return {
    sut,
    addDealStub,
    eventEmitterStub
  }
}

describe('AddDeal Event Decorator', () => {
  test('should emit new-deal event with the correct values on success', async () => {
    const { sut, eventEmitterStub, addDealStub } = makeSut()
    const fakeDeal = mockDeal()
    const emitSpy = jest.spyOn(eventEmitterStub, 'emit')
    jest.spyOn(addDealStub, 'add').mockResolvedValueOnce(success(fakeDeal))
    await sut.add(mockDealInfo())
    expect(emitSpy).toHaveBeenCalledWith('new-deal', fakeDeal)
  })
  test('should return the AddDeal result', async () => {
    const { sut, addDealStub } = makeSut()
    const fakeDeal = mockDeal()
    jest.spyOn(addDealStub, 'add').mockResolvedValueOnce(success(fakeDeal))
    const result = await sut.add(mockDealInfo())
    expect(result).toEqual(success(fakeDeal))
  })
  test('should not call the eventEmitter if AddDeal result returns an error', async () => {
    const { sut, addDealStub, eventEmitterStub } = makeSut()
    const emitSpy = jest.spyOn(eventEmitterStub, 'emit')
    jest.spyOn(addDealStub, 'add').mockResolvedValueOnce(err(new Error()))
    await sut.add(mockDealInfo())
    expect(emitSpy).not.toBeCalled()
  })
})
