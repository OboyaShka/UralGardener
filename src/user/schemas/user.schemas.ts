import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {


  @Prop({ required: true })
  phone: string

  @Prop()
  password: string

  @Prop()
  email: string

  @Prop()
  role: string

  @Prop()
  fio: string
}

export const UserSchemas = SchemaFactory.createForClass(User)