import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {CanActivate, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {UserService} from "../../user/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private authService: AuthService,
  ) {
  }

  // @ts-ignore
  async canActivate(context: any): Promise<boolean | Promise<boolean>> {
    const request = context.switchToHttp().getRequest();
    const role = await this.authService.decodeTokenRole(request.headers.authorization.slice(7))

    if (role === "admin") {
      return true
    }

    return false
  }
}