import { Module } from '@nestjs/common';
import { DivisionController } from './division.controller';
import { DivisionService } from './division.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Division, DivisionSchemas} from "./schemas/division.chemas";

@Module({
  controllers: [DivisionController],
  providers: [DivisionService],
  imports: [
    MongooseModule.forFeature([
      {name: Division.name, schema: DivisionSchemas}
    ])
  ]
})
export class DivisionModule {}
