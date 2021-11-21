import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose'

export type DivisionDocument = Division & Document

@Schema()
export class Division {

  @Prop()
  title: string

  @Prop()
  category_id: string

}

export const DivisionSchemas = SchemaFactory.createForClass(Division)