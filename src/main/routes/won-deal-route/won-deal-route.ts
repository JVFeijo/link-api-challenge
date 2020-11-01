import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeWonDealController } from '@/main/factories/controllers/won-deal-controller/won-deal-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/newdeal', adaptRoute(makeWonDealController()))
}
