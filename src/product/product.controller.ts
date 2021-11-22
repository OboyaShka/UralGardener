import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {PositionService} from "../position/position.service";
import {createPositionDto} from "../position/dto/create-position.dto";
import {Position} from "../position/schemas/position.chemas";
import {ProductService} from "./product.service";
import {createProductDto} from "./dto/create-product.dto";
import {Product} from "./schemas/product.schema";

@Controller('product')
export class ProductController {

  constructor(private productService: ProductService) {
  }

  @Post('create')
  createPosition(@Body() productDto: createProductDto): Promise<Product> {
    return this.productService.create(productDto)
  }

}
