import { Deal } from '@/data/models/deal/deal'
import { mockDealInfo } from './mockDealInfo'

export const mockDeal = (): Deal => {
  return {
    ...mockDealInfo()
  }
}
