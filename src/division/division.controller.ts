import {Body, Controller, Post, Get, Query} from "@nestjs/common";
import {DivisionService} from "./division.service";
import {createDivisionDto} from "./dto/create-division.dto";
import {Division} from "./schemas/division.chemas";


@Controller('division')
export class DivisionController {

  constructor(private divisionService: DivisionService) {
  }


  @Post('create')
  createDivision(@Body() createDivisionDto: createDivisionDto): Promise<Division> {
    return this.divisionService.create(createDivisionDto)
  }

  @Get('get')
  getDivision(@Query() query): Promise<Division[]> {

    return this.divisionService.getDivision(query)
  }



}