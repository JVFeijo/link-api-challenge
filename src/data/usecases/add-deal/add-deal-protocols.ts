import { Deal } from '@/data/models/deal/deal'
import { Result } from '@/utils/types/result'

export interface DealInfo {
  pipedriveId: number
  title: string
  clientName: string
  value: number
  wonAt: Date
}

export interface IAddDeal {
  add: (pipedriveDealInfo: DealInfo) => Promise<Result<Deal, Error>>
}
