import { DealInfo } from '@/data/usecases/add-deal/add-deal-protocols'
import faker from 'faker'

export const mockDealInfo = (): DealInfo => {
  return {
    title: faker.random.word(),
    pipedriveId: faker.random.number(),
    clientName: faker.name.firstName(),
    value: faker.random.number(),
    wonAt: new Date()
  }
}
