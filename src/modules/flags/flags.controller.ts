import { Body, Controller, Logger, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { flagSaved } from 'src/utilities/messages/flag/success';
import { success } from 'src/utilities/response';
import { CarExistFromBody } from '../../decorators/car.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateFlagDto } from './dto/create-flag.dto';
import { FlagsService } from './flags.service';
import { authHeader, unAuthorized } from '../../docs/general-types';
import { Resp as Resp4Car } from '../../docs/car/response';
import { Resp } from '../../docs/flag/response';

@Controller('flags')
@ApiTags('Flags')
export class FlagsController {
  constructor(private readonly flagsService: FlagsService) {}
  @UseGuards(JwtAuthGuard, CarExistFromBody)
  @Post('')
  @ApiBody({ type: CreateFlagDto })
  @ApiResponse(Resp.createFlag_201)
  @ApiResponse(Resp.createFlag_422)
  @ApiResponse(Resp4Car.car404)
  @ApiResponse(unAuthorized)
  @ApiHeader(authHeader)
  async reportAdvert(@Body() body: CreateFlagDto, @Res() res: Response) {
    Logger.log('Save flag.');
    const flag = await this.flagsService.create(body);
    return success(res, 201, flagSaved(), flag);
  }
}
