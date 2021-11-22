import {Body, Controller, Get, Post, Query} from '@nestjs/common';

import {PositionService} from "./position.service";
import {createPositionDto} from "./dto/create-position.dto";
import {Position} from "./schemas/position.chemas";

@Controller('position')
export class PositionController {

  constructor(private positionService: PositionService) {
  }


  @Post('create')
  createPosition(@Body() positionDto: createPositionDto): Promise<Position> {
    return this.positionService.create(positionDto)
  }

  @Get('get')
  getPosition(@Query() query): Promise<Position[]> {
    return this.positionService.getPosition(query)
  }


}
