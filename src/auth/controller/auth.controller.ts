import {Controller, Get, Patch, Post, Request, UseGuards} from "@nestjs/common";
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
    return this.authService.login(req.user._doc)
  }

  @Post('/register')
  async register(@Request() req) {
    return this.authService.register(req.body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    const id = await this.authService.decodeTokenId(req.headers.authorization.slice(7))
    const user = await this.userService.find(id)
    return user
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  async patchProfile(@Request() req) {
    const user = await this.userService.patch(req.body)
    return user
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('refresh')
  async refresh(@Request() req) {
    const user = await this.userService.find(req.user.id)
    return this.authService.login(user)
  }

}