import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose'

export type DivisionDocument = Division & Document

@Schema()
export class Division {

  @Prop()
  title: string

  @Prop()
  category_id: string

  @Prop()
  category_uniq: string

  @Prop()
  uniq_name: string
}


export const DivisionSchemas = SchemaFactory.createForClass(Division)