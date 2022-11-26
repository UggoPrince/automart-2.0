import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class UpdateCarDto {
  @ApiProperty()
  @IsIn(['new', 'used'])
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsIn(['available', 'sold'])
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bodyType: string;
}
