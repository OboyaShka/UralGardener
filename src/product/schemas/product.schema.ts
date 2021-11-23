import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose'

export type ProductDocument = Product & Document

@Schema()
export class Product {

  @Prop()
  title: string

  @Prop()
  category_uniq: string

  @Prop()
  division_uniq: string

  @Prop()
  position_uniq: string

  @Prop()
  description: string

  @Prop()
  article_number: number

  @Prop()
  packing: string

  @Prop()
  packing_type?: string

  @Prop()
  price: number

  @Prop()
  brand_id?: string

  @Prop()
  count: number

  @Prop()
  uniq_name: string

  @Prop()
  image?: string

}

export const ProductSchemas = SchemaFactory.createForClass(Product)