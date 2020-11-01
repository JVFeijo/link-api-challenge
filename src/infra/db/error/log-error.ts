import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

export class LogError {
  public id?: ObjectId

  @prop()
  public name!: string

  @prop()
  public message!: string

  @prop()
  public stack!: string

  @prop()
  public createdAt!: Date
}
