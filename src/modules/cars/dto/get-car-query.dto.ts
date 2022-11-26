import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsBooleanString, IsOptional } from 'class-validator';
import { ToBoolean } from 'src/decorators/boolean.decorator';

export class GetCarQueryDto {
  @ApiProperty({ required: false })
  @ToBoolean()
  @IsOptional()
  @IsBoolean()
  getOwner: boolean;
}
