import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Product, ProductSchemas} from "./schemas/product.schema";

// @ts-ignore
@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    MongooseModule.forFeature([
      {name: Product.name, schema: ProductSchemas}
    ])
  ]
})
export class ProductModule {
}
