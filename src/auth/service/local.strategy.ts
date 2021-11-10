import {Strategy} from "passport-local";
import {PassportStrategy} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private authService: AuthService) {
    super({
      usernameField: 'phone'
    });
  }

  async validate(phone: string, password: string) {
    const user = await this.authService.validateUser(phone, password)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}