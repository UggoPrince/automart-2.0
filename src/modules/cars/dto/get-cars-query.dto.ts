import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class GetCarsQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  skip: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  limit: string;
}
