import { TotalByDay } from '@/data/protocols/deal/load-total-by-day-repository'
import { IDealService } from '@/data/services/deal/deal-service-protocols'
import { err, Result, success } from '@/utils/types/result'
import { GetTotalByDayController } from './get-total-by-day-controller'
import faker from 'faker'
import { DbError } from '@/infra/db/error/db-error'
import { HttpRequest } from '@/presentation/protocols/http'
import { badRequest, ok, serverError } from '@/presentation/helpers/http-helper'

interface SutTypes {
  sut: GetTotalByDayController
  dealServiceStub: IDealService
}

const mockTotalByDay = (): TotalByDay => {
  return {
    totalValue: faker.random.number(),
    day: new Date().toDateString()
  }
}

const makeDealServiceStub = (): IDealService => {
  class DealServiceStub implements IDealService {
    async load (): Promise<Result<TotalByDay[], Error>> {
      return success([{ ...mockTotalByDay() }])
    }
  }

  return new DealServiceStub()
}

const makeSut = (): SutTypes => {
  const dealServiceStub = makeDealServiceStub()
  const sut = new GetTotalByDayController(dealServiceStub)
  return {
    sut,
    dealServiceStub
  }
}

const mockRequest = (): HttpRequest => {
  return {}
}

describe('GetTotalByDayController', () => {
  test('should return serverError if dealService returns ServerError', async () => {
    const { sut, dealServiceStub } = makeSut()
    jest.spyOn(dealServiceStub, 'load').mockResolvedValueOnce(err(new DbError(new Error())))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new DbError(new Error())))
  })
  test('should badRequest if dealService returns any other error', async () => {
    const { sut, dealServiceStub } = makeSut()
    jest.spyOn(dealServiceStub, 'load').mockResolvedValueOnce(err(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest())
  })
  test('should an array of TotalByDay on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(expect.arrayContaining([{
      totalValue: expect.any(Number),
      day: expect.any(String)
    }])))
  })
})
