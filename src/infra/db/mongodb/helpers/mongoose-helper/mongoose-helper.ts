import mongoose from 'mongoose'
import { ReturnModelType, getModelForClass } from '@typegoose/typegoose'
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types'

export const MongooseHelper = {
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  },

  async disconnect (): Promise<void> {
    await mongoose.disconnect()
  },

  isConnected (): boolean {
    return mongoose.connection.readyState === 1
  },

  async getModel <T extends AnyParamConstructor<any>> (entity: T): Promise<ReturnModelType<T>> {
    if (this.isConnected() === false) {
      await this.connect(this.uri)
    }
    return getModelForClass(entity)
  },

  map (data: any): any {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id: id, __v, ...rest } = data
    for (const key in rest) {
      if (rest[key] === null) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete rest[key]
      }
    }
    return { ...rest, id }
  }
}
