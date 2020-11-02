import { Express, Router } from 'express'
import setupWonDealController from '@/main/routes/won-deal-route/won-deal-route'
import setupGetTotalValueByDayController from '@/main/routes/get-total-value-by-day-route/get-total-value-by-day-route'

export default (app: Express): void => {
  const router = Router()

  setupWonDealController(router)
  setupGetTotalValueByDayController(router)

  app.use('/api', router)
}
