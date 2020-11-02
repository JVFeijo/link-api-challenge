import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeGetTotalByDayController } from '@/main/factories/controllers/get-total-valeu-by-day-controller/get-total-value-by-day-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/newdeal', adaptRoute(makeGetTotalByDayController()))
}
