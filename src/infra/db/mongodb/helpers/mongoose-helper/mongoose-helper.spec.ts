import { Deal } from '@/data/models/deal/deal'
import { MongooseHelper as sut } from './mongoose-helper'

describe('Mongoose Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    await sut.disconnect()
    expect(sut.isConnected()).toBe(false)
    await sut.getModel(Deal)
    expect(sut.isConnected()).toBe(true)
  })
})
