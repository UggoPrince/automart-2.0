import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { PasswordValidation, PasswordValidationRequirement } from 'class-validator-password-check';

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};

export class BaseUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @ApiProperty()
  @Validate(PasswordValidation, [passwordRequirement])
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
