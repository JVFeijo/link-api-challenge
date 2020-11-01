/* eslint-disable @typescript-eslint/no-misused-promises */
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { EventEmitter } from 'events'

const myEventEmitter = new EventEmitter()

const logRepository = new LogMongoRepository()
myEventEmitter.on('error', logRepository.logError)

export default myEventEmitter
