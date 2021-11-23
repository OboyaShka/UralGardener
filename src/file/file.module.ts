import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import {AuthModule} from "../auth/auth.module";
import {UploadsController} from "./uploads.controller";


@Module({
  imports: [AuthModule],
  controllers: [FileController, UploadsController],
  providers: [FileService]
})
export class FileModule {}