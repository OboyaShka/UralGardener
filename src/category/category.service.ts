import {Injectable} from "@nestjs/common";
import {CreateProductDto} from "../products/dto/create-product.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from "../products/schemas/product.schemas";
import {Model} from "mongoose";
import {Category, CategoryDocument} from "./schemas/category.schemas";

class CreateCategoryDto {
}

@Injectable()
export class CategoryService {

  constructor(@InjectModel(Category.name) private categoryModule: Model<CategoryDocument>) {
  }

  async create(categoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModule(categoryDto)
    return newCategory.save()
  }

  async getAll(): Promise<Category[]> {
    return this.categoryModule.find().exec()
  }

}