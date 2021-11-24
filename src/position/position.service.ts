import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Position, PositionDocument} from "./schemas/position.chemas";
import {createPositionDto} from "./dto/create-position.dto";
import {QueryInterface} from "../division/division.interface";



@Injectable()
export class PositionService {

  private filter: QueryInterface = {};

  constructor(@InjectModel(Position.name) private positionModule: Model<PositionDocument>) {
  }

  async create(positionDto: createPositionDto): Promise<Position> {
    const newPosition = new this.positionModule(positionDto)
    return newPosition.save()
  }

  async getPosition(query: any): Promise<Position[]> {
    this.filter = {}

    if (query.category_uniq) {
      this.filter.category_uniq = query.category_uniq
    }

    if (query.division_uniq) {
      this.filter.division_uniq = query.division_uniq
    }
    
    if (query.uniq_name) {
      this.filter.uniq_name = query.uniq_name
    }

    return this.positionModule.find(this.filter).exec()
  }

}