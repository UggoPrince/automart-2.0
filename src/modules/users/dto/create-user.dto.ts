import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MinLength, IsPhoneNumber } from 'class-validator';
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

  @ApiProperty()
  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  phoneNumber: string;

  @ApiHideProperty()
  isAdmin: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  address: string;
}
