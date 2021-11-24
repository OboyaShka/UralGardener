import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Category, CategoryDocument} from "./schemas/category.schemas";
import {QueryInterface} from "../division/division.interface";

class CreateCategoryDto {
}

@Injectable()
export class CategoryService {
  private filter: QueryInterface = {};

  constructor(@InjectModel(Category.name) private categoryModule: Model<CategoryDocument>) {
  }

  async create(categoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModule(categoryDto)
    return newCategory.save()
  }

  async getAll(): Promise<Category[]> {
    return this.categoryModule.find().exec()
  }

  async getCategory (query: any): Promise<Category[]> {

    this.filter = {}


    if (query.uniq_name) {
      this.filter.uniq_name = query.uniq_name
    }

    if (query.division_uniq) {
      this.filter.division_uniq = query.division_uniq
    }


    return this.categoryModule.find(this.filter).exec()
  }



}