import { Deal } from '@/data/models/deal/deal'
import { IAddDealRepository } from '@/data/protocols/deal/add-deal-repository'
import { ILoadTotalValueByDayRepository, TotalByDay } from '@/data/protocols/deal/load-total-by-day-repository'
import { err, Result, success } from '@/utils/types/result'
import { DbError } from '../../error/db-error'
import { MongooseHelper } from '../helpers/mongoose-helper/mongoose-helper'

export class MongoDealRepository implements IAddDealRepository, ILoadTotalValueByDayRepository {
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

  async load (): Promise<Result<TotalByDay[], DbError>> {
    try {
      const DealModel = await MongooseHelper.getModel(Deal)
      const rawTotalByDay = await DealModel.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$wonAt' } },
            totalValue: { $sum: '$value' }
          }
        }
      ])

      const formattedTotalByDay = rawTotalByDay.map(doc => {
        const { _id: day, totalValue } = doc
        return { day, totalValue }
      })

      return success(formattedTotalByDay)
    } catch (e) {
      return err(new DbError(e))
    }
  }
}
