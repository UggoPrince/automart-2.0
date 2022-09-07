import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsIn, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CarToCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsIn(['new', 'used'])
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @IsDefined()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  manufacturer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  model: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  bodyType: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'photo of the car' })
  photo: any;
}
