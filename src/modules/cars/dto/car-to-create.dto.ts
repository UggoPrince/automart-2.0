import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CarToCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsIn(['new', 'used'])
  @IsString()
  state: string;

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
  manufacturer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bodyType: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'photo of the car' })
  photo: any;
}
