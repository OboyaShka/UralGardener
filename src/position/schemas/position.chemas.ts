import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose'

export type PositionDocument = Position & Document

@Schema()
export class Position {

  @Prop()
  title: string

  @Prop()
  category_id: string

  @Prop()
  division_id: string

}

export const PositionSchemas = SchemaFactory.createForClass(Position)