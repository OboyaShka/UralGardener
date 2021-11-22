import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Position, PositionSchemas} from "./schemas/position.chemas";

@Module({
  controllers: [PositionController],
  providers: [PositionService],
  imports: [
    MongooseModule.forFeature([
      {name: Position.name, schema: PositionSchemas}
    ])
  ]
})
export class PositionModule {}
