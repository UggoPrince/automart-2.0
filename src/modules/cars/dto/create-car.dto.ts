import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty()
  state: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  manufacturer: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  bodyType: string;

  @ApiProperty()
  imageUrl: string;
}
