import { WonDealController } from '@/presentation/controllers/won-deal-controller/won-deal-controller'
import { Controller } from '@/presentation/protocols/controller'
import { WonDealRequest } from '@/presentation/protocols/requests/won-deal-request'
import { PipedriveDealSchema } from '@/presentation/validation/pipedrive-deal/pipedrive-deal-schema'
import { Validation } from '@/presentation/validation/validation'
import { makeAddDealEventDecorator } from '../../decorators/add-deal-event-decorator/add-deal-event-decorator-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator/log-controller-decorator-factory'

export const makeWonDealController = (): Controller => {
  const validation = new Validation<WonDealRequest>(PipedriveDealSchema)
  const addDeal = makeAddDealEventDecorator()
  const wonDealController = new WonDealController(validation, addDeal)
  return makeLogControllerDecorator(wonDealController)
}
