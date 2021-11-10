import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProductsModule} from "./products/products.module";
import {MongooseModule} from "@nestjs/mongoose";
import { ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    MongooseModule.forRoot(`mongodb+srv://poznanskiy:poz123@cluster0.tnzoj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`),
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
