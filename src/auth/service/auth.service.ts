import {UserService} from "../../user/user.service";
import {UserDto} from "../../user/dto/user.dto";
import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {AST} from "eslint";
import Token = AST.Token;

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(phone: string, pass: string): Promise<UserDto | null> {
    const user = await this.userService.findByPhone(phone)

    if (user && user.password === pass) {
      const {password, ...secureUser} = user
      return secureUser
    }
    return null
  }

  // @ts-ignore
  async decodeTokenId(token: string): Promise<string> {
    const jwtDecode = await this.jwtService.decode(token)
    // @ts-ignore
    return jwtDecode._id
  }

  async login(user: UserDto) {
    const payload = { _id: user._id }
    const jwt = this.jwtService.sign(payload)
    let jwtDecode = this.jwtService.decode(this.jwtService.sign(payload))

    return {
      accessToken: jwt,
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN_SECONDS')
    }
  }

  async register(user: UserDto) {
    const newUser = await this.userService.create(user)
    return this.login(newUser)
  }
}