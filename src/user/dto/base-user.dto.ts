import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

export class BaseUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiHideProperty()
  isAdmin: boolean;

  @ApiProperty()
  password: string;

  @ApiProperty()
  address: string;
}
