import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {createDivisionDto} from "./dto/create-division.dto";
import {Division, DivisionDocument} from "./schemas/division.chemas";
import {QueryInterface} from "./division.interface";


@Injectable()
export class DivisionService {
  private filter: QueryInterface = {};

  constructor(@InjectModel(Division.name) private divisionModule: Model<DivisionDocument>) {
  }

  async create(divisionDto: createDivisionDto): Promise<Division> {
    const newDivision = new this.divisionModule(divisionDto)
    return newDivision.save()
  }

  async getDivision(query: any): Promise<Division[]> {

    this.filter = {}

    if (query.category_uniq) {
      this.filter.category_uniq = query.category_uniq
    }

    if (query.uniq_name) {
      this.filter.uniq_name = query.uniq_name
    }

    return this.divisionModule.find(this.filter).exec()
  }

}