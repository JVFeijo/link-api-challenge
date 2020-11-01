import { LogErrorRepository } from '@/data/protocols/log/log-error-repository'
import { LogError } from '../../error/log-error'
import { MongooseHelper } from '../helpers/mongoose-helper/mongoose-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (error: Error): Promise<void> {
    const LogErrorModel = await MongooseHelper.getModel(LogError)
    await LogErrorModel.create({
      name: error.name,
      message: error.message,
      stack: error.stack,
      createdAt: new Date()
    })
  }
}
