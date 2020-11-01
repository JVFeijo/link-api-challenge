import { LogMongoRepository } from './log-mongo-repository'
import { MongooseHelper } from '../helpers/mongoose-helper/mongoose-helper'
import { ReturnModelType } from '@typegoose/typegoose'
import { LogError } from '../../error/log-error'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('LogMongoRepository', () => {
  let LogErrorModel: ReturnModelType<typeof LogError>

  beforeAll(async () => {
    await MongooseHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  beforeEach(async () => {
    LogErrorModel = await MongooseHelper.getModel(LogError)
    await LogErrorModel.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(new Error('fail'))
    const count = await LogErrorModel.countDocuments()
    expect(count).toBe(1)
  })
})
