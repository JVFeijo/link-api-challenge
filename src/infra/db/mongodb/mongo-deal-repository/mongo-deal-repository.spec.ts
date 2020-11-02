import { Deal } from '@/data/models/deal/deal'
import { mockDeal } from '@/data/tests/models/deal/mockDeal'
import { success, err } from '@/utils/types/result'
import { ReturnModelType, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { DbError } from '../../error/db-error'
import { MongooseHelper } from '../helpers/mongoose-helper/mongoose-helper'
import { MongoDealRepository } from './mongo-deal-repository'

let DealModel: ReturnModelType<typeof Deal>

describe('MongoDealRepository', () => {
  beforeAll(async () => {
    await MongooseHelper.connect(process.env.MONGO_URL)
    DealModel = getModelForClass(Deal)
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  beforeEach(async () => {
    await DealModel.deleteMany({})
  })

  const makeSut = (): MongoDealRepository => {
    return new MongoDealRepository()
  }

  describe('add()', () => {
    test('should return a deal on success', async () => {
      const sut = makeSut()
      const fakeDeal = mockDeal()
      const result = await sut.add(fakeDeal)
      expect(result).toEqual(success({
        ...fakeDeal,
        id: expect.any(ObjectId)
      }))
    })
    test('should return DbError if MongoDB throws', async () => {
      const sut = makeSut()
      jest.spyOn(DealModel, 'create').mockImplementationOnce((input: any) => { throw new Error() })
      const result = await sut.add(mockDeal())
      expect(result).toEqual(err(new DbError(new Error())))
    })
  })

  describe('loadTotalByDay()', () => {
    test('should return an array of TotalByDay objects on success', async () => {
      const sut = makeSut()
      await DealModel.insertMany([{ ...mockDeal() }, { ...mockDeal() }, { ...mockDeal() }])
      const result = await sut.load()
      expect(result).toEqual(success(expect.arrayContaining([{
        totalValue: expect.any(Number),
        day: expect.any(String)
      }])))
    })
    test('should return DbError if MongoDB throws', async () => {
      const sut = makeSut()
      jest.spyOn(DealModel, 'aggregate').mockImplementationOnce((input: any) => { throw new Error() })
      const result = await sut.load()
      expect(result).toEqual(err(new DbError(new Error())))
    })
  })
})
