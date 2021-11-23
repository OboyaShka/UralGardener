import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose'

export type PositionDocument = Position & Document

@Schema()
export class Position {

  @Prop()
  title: string

  @Prop()
  category_uniq: string

  @Prop()
  division_uniq: string

  @Prop()
  uniq_name: string

}

export const PositionSchemas = SchemaFactory.createForClass(Position)