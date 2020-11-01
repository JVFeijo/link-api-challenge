import { Deal } from '@/data/models/deal/deal'
import { IAddDealRepository } from '@/data/protocols/add-deal-repository'
import { err, Result, success } from '@/utils/types/result'
import { DbError } from '../../error/db-error'
import { MongooseHelper } from '../helpers/mongoose-helper/mongoose-helper'

export class MongoDealRepository implements IAddDealRepository {
  async add (dealData: Deal): Promise<Result<Deal, DbError>> {
    try {
      const DealModel = await MongooseHelper.getModel(Deal)
      const dealDoc = await DealModel.create({ ...dealData })
      const deal = MongooseHelper.map(dealDoc.toObject())
      return success(deal)
    } catch (e) {
      return err(new DbError(e))
    }
  }
}
