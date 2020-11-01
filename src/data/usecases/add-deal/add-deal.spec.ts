import { Deal } from '@/data/models/deal/deal'
import { IAddDealRepository } from '@/data/protocols/add-deal-repository'
import { DbError } from '@/infra/db/error/db-error'
import { err, Result, success } from '@/utils/types/result'
import { ObjectId } from 'mongodb'
import { IAddDeal } from './add-deal-protocols'
import { AddDeal } from './add-deal'
import { mockDeal } from '@/data/tests/models/deal/mockDeal'
import { mockDealInfo } from '@/data/tests/models/deal/mockDealInfo'

interface SutTypes {
  sut: IAddDeal
  addDealRepositoryStub: IAddDealRepository
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
  test('should return a deal on success', async () => {
    const { sut, addDealRepositoryStub } = makeSut()
    const fakeDealInfo = mockDealInfo()
    const fakeDeal = mockDeal()
    jest.spyOn(addDealRepositoryStub, 'add').mockResolvedValueOnce(success(fakeDeal))
    const result = await sut.add(fakeDealInfo)
    expect(result).toEqual(success(fakeDeal))
  })
})
