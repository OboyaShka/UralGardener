import {Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "../service/auth.service";
import {UserService} from "../../user/user.service";
import {LocalStrategy} from "../service/local.strategy";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
  }


  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Post('/register')
  async register(@Request() req) {
    console.log(2)
    return this.authService.register(req.body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('refresh')
  async refresh(@Request() req) {
    const user = await this.userService.find(req.user.id)
    return this.authService.login(user)
  }

}