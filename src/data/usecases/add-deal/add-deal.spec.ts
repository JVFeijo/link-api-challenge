import { Deal } from '@/data/models/deal/deal'
import { IAddDealRepository } from '@/data/protocols/add-deal-repository'
import { DbError } from '@/infra/db/error/db-error'
import { err, Result, success } from '@/utils/types/result'
import { ObjectId } from 'mongodb'
import { DealInfo, IAddDeal } from './add-deal-protocols'
import faker from 'faker'
import { AddDeal } from './add-deal'
import { Nothing } from '@/utils/types/maybe'

interface SutTypes {
  sut: IAddDeal
  addDealRepositoryStub: IAddDealRepository
}

const mockDealInfo = (): DealInfo => {
  return {
    title: faker.random.word(),
    pipedriveId: faker.random.number(),
    clientName: faker.name.firstName(),
    value: faker.random.number(),
    wonAt: new Date()
  }
}

const mockDeal = (): Deal => {
  return {
    ...mockDealInfo()
  }
}

const makeAddDealRespositoryStub = (): IAddDealRepository => {
  class AddDealRepositoryStub implements IAddDealRepository {
    async add (deal: Deal): Promise<Result<Deal, DbError>> {
      return success({ ...mockDeal(), ...deal, id: new ObjectId() })
    }
  }

  return new AddDealRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addDealRepositoryStub = makeAddDealRespositoryStub()
  const sut = new AddDeal(addDealRepositoryStub)
  return {
    sut,
    addDealRepositoryStub
  }
}

describe('AddDeal', () => {
  test('should call AddDealRepository with the correct values', async () => {
    const { sut, addDealRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addDealRepositoryStub, 'add')
    const fakeDealInfo = mockDealInfo()
    await sut.add(fakeDealInfo)
    expect(addSpy).toHaveBeenCalledWith(fakeDealInfo)
  })
  test('should return error if addDealRepository returns error', async () => {
    const { sut, addDealRepositoryStub } = makeSut()
    jest.spyOn(addDealRepositoryStub, 'add').mockResolvedValueOnce(err(new Error()))
    const fakeDealInfo = mockDealInfo()
    const result = await sut.add(fakeDealInfo)
    expect(result).toEqual(err(new Error()))
  })
  test('should return Nothing on success', async () => {
    const { sut } = makeSut()
    const fakeDealInfo = mockDealInfo()
    const result = await sut.add(fakeDealInfo)
    expect(result).toEqual(success(Nothing()))
  })
})
