import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

export class Deal {
  public id?: ObjectId

  @prop()
  public title!: string

  @prop()
  public pipedriveId!: number

  @prop()
  public clientName!: string

  @prop()
  public value?: number

  @prop()
  public createdAt!: Date
}
