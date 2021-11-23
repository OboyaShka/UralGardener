import {Body, Controller, Post, Get, Query, UploadedFile, UseInterceptors, UseGuards, Param, Res} from "@nestjs/common";
import {FileService} from "./file.service";
import {of} from 'rxjs'
import { join } from 'path';

@Controller('uploads')
export class UploadsController {

  constructor(
    private fileService: FileService,
  ) {
  }

  @Get('images/:id')
  createDivision(@Param('id') id: string, @Res() res): any {
    return of(res.sendFile(join(process.cwd(), 'uploads/images/' + id)))
  }

}