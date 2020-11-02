import { GetTotalByDayController } from '@/presentation/controllers/get-total-by-day/get-total-by-day-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator/log-controller-decorator-factory'
import { makeDealService } from '../../services/deal-service-factory'

export const makeGetTotalByDayController = (): Controller => {
  const dealService = makeDealService()
  const getTotalByDayController = new GetTotalByDayController(dealService)
  return makeLogControllerDecorator(getTotalByDayController)
}
