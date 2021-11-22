import { Injectable } from '@nestjs/common';
import {PositionQueryInterface} from "../position/position.interface";
import {InjectModel} from "@nestjs/mongoose";
import {Position, PositionDocument} from "../position/schemas/position.chemas";
import {Model} from "mongoose";
import {createPositionDto} from "../position/dto/create-position.dto";
import {Product, ProductDocument} from "./schemas/product.schema";
import {createProductDto} from "./dto/create-product.dto";

@Injectable()
export class ProductService {

  constructor(@InjectModel(Product.name) private productModule: Model<ProductDocument>) {}

  async create(productDto: createProductDto): Promise<Product> {
    const newProduct = new this.productModule(productDto)
    return newProduct.save()
  }

}
