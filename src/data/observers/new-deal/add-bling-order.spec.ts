import { EventEmitter } from 'events'
import { makeAddBlingOrder } from './add-bling-order'
import axios from 'axios'
import { mockDeal } from '@/data/tests/models/deal/mockDeal'
import env from '@/main/config/env'
import qs from 'qs'
import { Nothing } from '@/utils/types/maybe'

jest.mock('axios', () => ({
  request: jest.fn()
}))

interface SutTypes {
  sut: ReturnType<typeof makeAddBlingOrder>
  eventEmitterStub: EventEmitter
}

const makeSut = (): SutTypes => {
  const eventEmitterStub = new EventEmitter()
  eventEmitterStub.on('error', () => Nothing())
  const sut = makeAddBlingOrder(
    eventEmitterStub
  )
  return {
    sut,
    eventEmitterStub
  }
}

describe('Add Blings Deal', () => {
  test('should call axios with the correct values', async () => {
    const { sut } = makeSut()
    const axiosSpy = jest.spyOn(axios, 'request')
    const fakeDeal = mockDeal()
    const queryString = qs.stringify({
      apiKey: env.blingToken,
      xml: {
        pedido: {
          cliente: fakeDeal.clientName
        }
      }
    })
    await sut(fakeDeal)
    expect(axiosSpy).toHaveBeenCalledWith({
      method: 'POST',
      baseURL: env.blingApi,
      url: '/pedido/json/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': queryString.length
      },
      data: queryString
    })
  })
  test('should return Nothing on success', async () => {
    const { sut } = makeSut()
    const fakeDeal = mockDeal()
    const result = await sut(fakeDeal)
    expect(result).toEqual(Nothing())
  })
  test('should emit error if axios throws', async () => {
    const { sut, eventEmitterStub } = makeSut()
    jest.spyOn(axios, 'request').mockImplementationOnce(() => { throw new Error() })
    const emitSpy = jest.spyOn(eventEmitterStub, 'emit')
    const fakeDeal = mockDeal()
    await sut(fakeDeal)
    expect(emitSpy).toHaveBeenCalledWith('error', new Error())
  })
})
