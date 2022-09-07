import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class CreateFlagDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  @IsDefined()
  carId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  reason: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  description: string;
}
