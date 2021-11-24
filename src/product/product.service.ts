import { Injectable } from '@nestjs/common';
import {PositionQueryInterface} from "../position/position.interface";
import {InjectModel} from "@nestjs/mongoose";
import {Position, PositionDocument} from "../position/schemas/position.chemas";
import {Model} from "mongoose";
import {Product, ProductDocument} from "./schemas/product.schema";
import {createProductDto} from "./dto/create-product.dto";
import {QueryInterface} from "../division/division.interface";

@Injectable()
export class ProductService {

  private filter: QueryInterface = {};

  constructor(@InjectModel(Product.name) private productModule: Model<ProductDocument>) {}

  async create(productDto: createProductDto): Promise<Product> {
    const newProduct = new this.productModule(productDto)
    return newProduct.save()
  }

  async getProducts (query: any): Promise<Position[]> {

    this.filter = {}

    if (query.category_uniq) {
      this.filter.category_uniq = query.category_uniq
    }

    if (query.division_uniq) {
      this.filter.division_uniq = query.division_uniq
    }

    if (query.position_uniq) {
      this.filter.position_uniq = query.position_uniq
    }

    if (query.uniq_name) {
      this.filter.uniq_name = query.uniq_name
    }


    return this.productModule.find(this.filter).exec()
  }

}
