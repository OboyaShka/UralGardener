import {Global, Module} from '@nestjs/common';
import {UserModule} from "../user/user.module";
import {AuthService} from "./service/auth.service";
import {LocalStrategy} from "./service/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {AuthController} from "./controller/auth.controller";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtStrategy} from "./service/jwt.strategy";
import {RolesGuard} from "./service/admin.service";


@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN')},
      }),
      inject: [ConfigService]

    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard],
  exports: [AuthService, LocalStrategy, JwtStrategy, RolesGuard]
})
export class AuthModule {}
