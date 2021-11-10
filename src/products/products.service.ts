import {Injectable} from "@nestjs/common";
import {CreateProductDto} from "./dto/create-product.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from "./schemas/product.schemas";
import {Model} from "mongoose"
import {UpdateProductDto} from "./dto/update-product.dto";

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModule: Model<ProductDocument>) {
  }

  async getAll(): Promise<Product[]> {
    return this.productModule.find().exec()
  }

  async getById(id: string): Promise<Product>{
    return this.productModule.findById(id).exec()
  }

  async create(productDto: CreateProductDto) {
    const newProduct = new this.productModule(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<Product> {
    return this.productModule.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product> {
    return this.productModule.findByIdAndUpdate(id, productDto, {new: true})
  }


}