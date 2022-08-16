import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseUserDto } from './base-user.dto';

export class CreateUserDto extends BaseUserDto {
  @ApiProperty()
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiHideProperty()
  isAdmin: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
}
