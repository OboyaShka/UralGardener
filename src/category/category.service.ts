import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
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