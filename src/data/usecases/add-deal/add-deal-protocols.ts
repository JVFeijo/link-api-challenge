import { Nothing } from '@/utils/types/maybe'
import { Result } from '@/utils/types/result'

export interface DealInfo {
  data: {
    id: number
    title: string
    person_name: string
    value: number
    status: string
    won_time: Date
  }
}

export interface IAddDeal {
  add: (pipedriveDealInfo: DealInfo) => Promise<Result<Nothing, Error>>
}
