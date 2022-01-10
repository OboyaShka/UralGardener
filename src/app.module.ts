import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { CategoryModule } from './category/category.module';
import { DivisionModule } from './division/division.module';
import { PositionModule } from './position/position.module';
import { FileModule } from './file/file.module';
import {JwtModule} from "@nestjs/jwt";
import { ProductModule } from './product/product.module';


@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env.mongoURI),
    ConfigModule.forRoot(),
    ProfileModule,
    CategoryModule,
    DivisionModule,
    PositionModule,
    FileModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
