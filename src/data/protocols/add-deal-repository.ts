import { DbError } from '@/infra/db/error/db-error'
import { Result } from '@/utils/types/result'
import { Deal } from '../models/deal/deal'

export interface IAddDealRepository {
  add: (deal: Deal) => Promise<Result<Deal, DbError>>
}
