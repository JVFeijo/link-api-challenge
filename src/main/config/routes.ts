import { Express, Router } from 'express'
import setupWonDealController from '@/main/routes/won-deal-route/won-deal-route'

export default (app: Express): void => {
  const router = Router()

  setupWonDealController(router)

  app.use('/api', router)
}
