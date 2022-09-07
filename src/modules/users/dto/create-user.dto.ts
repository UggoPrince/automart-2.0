import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseUserDto } from './base-user.dto';

export class CreateUserDto extends BaseUserDto {
  @ApiProperty()
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  firstName: string;

  @ApiProperty()
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  lastName: string;

  @ApiHideProperty()
  isAdmin: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  address: string;
}
