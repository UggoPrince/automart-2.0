import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFlagDto } from './dto/create-flag.dto';
import { Flag, FlagDocument } from './schemas/flag.schema';

const getData = (result: any) => {
  if (result) return result._doc;
  return result;
};

@Injectable()
export class FlagsService {
  constructor(@InjectModel(Flag.name) private readonly flagModel: Model<FlagDocument>) {}
  create(createCarDto: CreateFlagDto): Promise<Flag> {
    return new this.flagModel(createCarDto).save().then(getData);
  }
}
