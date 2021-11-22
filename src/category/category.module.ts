import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {CategoryService} from "./category.service";
import {CategoryController} from "./category.controller";
import {Category, CategorySchemas} from "./schemas/category.schemas";

@Module({  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [
    MongooseModule.forFeature([
      {name: Category.name, schema: CategorySchemas}
    ])
  ]})
export class CategoryModule {}
