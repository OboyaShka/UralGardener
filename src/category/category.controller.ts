import {Body, Controller, Post, Get, Query} from "@nestjs/common";
import {createCategoryDto} from "./dto/create-category.dto";
import {CategoryService} from "./category.service";
import {Category} from "./schemas/category.schemas";
import {QueryInterface} from "../division/division.interface";

@Controller('category')
export class CategoryController {

  constructor(private categoryServices: CategoryService) {
  }


  @Post('create')
  createCategory(@Body() createCategoryDto: createCategoryDto): Promise<Category> {
    return this.categoryServices.create(createCategoryDto)
  }

  @Get('all')
  getAllCategory(): Promise<Category[]> {
    return this.categoryServices.getAll()
  }

  @Get('get')
  getCategory(@Query() query): Promise<Category[]> {
    return this.categoryServices.getCategory(query)
  }

}