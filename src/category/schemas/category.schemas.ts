import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose'

export type CategoryDocument = Category & Document

@Schema()
export class Category {

  @Prop()
  title: string

  @Prop()
  uniq_name: string

  @Prop()
  image: string

}

export const CategorySchemas = SchemaFactory.createForClass(Category)