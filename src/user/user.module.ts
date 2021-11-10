import { Module } from '@nestjs/common';
import {UserService} from "./user.service";
import {User, UserSchemas} from "./schemas/user.schemas";
import {MongooseModule} from "@nestjs/mongoose";


@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchemas}
    ])
  ]
})
export class UserModule {}
