import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/shemas/user.schema';

export class CreateCarDto {
  @ApiProperty()
  owner: User;

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
