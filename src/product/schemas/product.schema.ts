import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose'

export type ProductDocument = Product & Document

@Schema()
export class Product {

  @Prop()
  title: string

  @Prop()
  category_id: string

  @Prop()
  division_id: string

  @Prop()
  position_id: string

  @Prop()
  description: string

  @Prop()
  article_number: string

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
  image?: string

}

export const ProductSchemas = SchemaFactory.createForClass(Product)