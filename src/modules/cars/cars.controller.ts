import { Express, Response, Request } from 'express';
import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  Patch,
  Param,
  Get,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiResponse,
  ApiHeader,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { FileStorageService } from '../../services/FileStorage';
import { CarsService } from './cars.service';
import { success } from '../../utilities/response';
import {
  carAdded,
  carGotten,
  carListGotten,
  carUpdated,
} from '../../utilities/messages/car/success';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileUploadPipe } from '../../pipes/file-upload.pipe';
import { CarToCreateDto } from './dto/car-to-create.dto';
import { diskStorage } from 'multer';
import { authHeader, unAuthorized } from '../../docs/general-types';
import { Resp } from '../../docs/car/response';
import { CarBelongsToUser, CarExist } from '../../decorators/car.decorator';
import { UpdateCarDto } from './dto/update-car.dto';
import { GetCarsQueryDto } from './dto/get-cars-query.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  @ApiHeader(authHeader)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CarToCreateDto })
  @ApiCreatedResponse(Resp.createCar_201)
  @ApiResponse(Resp.createCar_422)
  @ApiResponse(unAuthorized)
  @UseInterceptors(FileInterceptor('photo', { storage: diskStorage({}) }))
  async create(
    @UploadedFile(new FileUploadPipe())
    photo: Express.Multer.File,
    @Body() carToCreateDto: CarToCreateDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    Logger.log('Add Car');
    const { user } = req;
    const { _id }: any = user;
    const { url } = await FileStorageService.uploadImage(photo);
    const car = await this.carsService.create({ ...carToCreateDto, owner: _id, imageUrl: url });
    return success(res, 201, carAdded(), car);
  }

  @UseGuards(JwtAuthGuard, CarExist, CarBelongsToUser)
  @Patch(':id')
  @HttpCode(200)
  @ApiHeader(authHeader)
  @ApiBody({ type: UpdateCarDto })
  @ApiResponse(Resp.updateCar_200)
  @ApiResponse(Resp.updateCar_400)
  @ApiResponse(Resp.car404)
  @ApiResponse(unAuthorized)
  async update(@Param('id') id: string, @Body() body: UpdateCarDto, @Res() res: Response) {
    Logger.log('Update Car');
    const car = await this.carsService.update(id, body);
    return success(res, 200, carUpdated(), car);
  }

  @UseGuards(CarExist)
  @Get(':id')
  @HttpCode(200)
  @ApiResponse(Resp.getCar_200)
  @ApiResponse(Resp.updateCar_400)
  @ApiResponse(Resp.car404)
  async get(@Res() res: Response, @Req() req: Request) {
    Logger.log('Get Car');
    const { car } = req;
    return success(res, 200, carGotten(), car);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse(Resp.getCars_200)
  @ApiResponse(Resp.getCars_422)
  async getCars(@Query() query: GetCarsQueryDto, @Res() res: Response) {
    Logger.log('Get a list of Cars');
    const cars = await this.carsService.getCars(query);
    return success(res, 200, carListGotten(), cars);
  }
}
