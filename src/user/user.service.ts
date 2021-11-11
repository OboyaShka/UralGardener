import {Injectable} from "@nestjs/common";
import {UserDto} from "./dto/user.dto";
import {UserModule} from "./user.module";
import { Model } from 'mongoose'
import {User, UserDocument} from "./schemas/user.schemas";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class UserService {


  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    return this.userModel.findOne({phone: phone})
  }

  async find(id: string) : Promise<User | undefined> {
    return this.userModel.findById(id)
  }


  async create(user: UserDto): Promise<User | undefined> {
    user.role = 'user'
    const newUser = new this.userModel(user)
    return newUser.save()
  }

  async patch(user: UserDto): Promise<UserDto> {

    return this.userModel.findByIdAndUpdate(user._id, user, {})
  }
}