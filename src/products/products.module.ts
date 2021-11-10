import {Module} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {ProductsController} from "./products.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Product, ProductSchemas} from "./schemas/product.schemas";

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    MongooseModule.forFeature([
      {name: Product.name, schema: ProductSchemas}
    ])
  ]
})
export class ProductsModule {
  
}