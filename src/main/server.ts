/* eslint-disable @typescript-eslint/restrict-template-expressions */
import 'module-alias/register'
import env from './config/env'
import { MongooseHelper } from '@/infra/db/mongodb/helpers/mongoose-helper/mongoose-helper'

MongooseHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at port: ${env.port}`))
  })
  .catch(console.error)
