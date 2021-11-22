import {Body, Controller, Post, Get, Query, UploadedFile, UseInterceptors, UseGuards} from "@nestjs/common";
import {FileService} from "./file.service";
import {FileInterceptor} from "@nestjs/platform-express";
import path =  require("path");
import {diskStorage} from 'multer'
import {v4 as uuidv4} from 'uuid'

import {AuthService} from "../auth/service/auth.service";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../auth/service/admin.service";


export const storage = {
  storage: diskStorage({
    destination: './uploads/images',
    filename: (req: any, file: any, cb: any) => {

      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
      const extension: string = path.parse(file.originalname).ext

      cb(null, `${filename}${extension}`)
    }


  })
}

@Controller('file')
export class FileController {

  constructor(
    private fileService: FileService,
  ) {
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @Post('image/upload')
  @UseInterceptors(FileInterceptor('image', storage))
  createDivision(@UploadedFile() file: Express.Multer.File): any {
    return {url: file.path}
  }

}