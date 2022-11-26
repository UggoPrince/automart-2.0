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
  Delete,
  ParseBoolPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiResponse,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger';
import { FileStorageService } from '../../services/FileStorage';
import { CarsService } from './cars.service';
import { success } from '../../utilities/response';
import {
  carAdded,
  carDeleted,
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
import { GetCarQueryDto } from './dto/get-car-query.dto';
import { UsersService } from '../users/users.service';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly usersService: UsersService,
  ) {}
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
  async get(@Res() res: Response, @Req() req: Request, @Query() query: GetCarQueryDto) {
    Logger.log('Get Car');
    const { getOwner } = query;
    const { car } = req;
    const resData = { ...car };
    if (getOwner) {
      const { owner } = car;
      const { firstName, lastName, email, address, phoneNumber } =
        await this.usersService.getUserById(owner);
      resData.ownerDetails = { firstName, lastName, email, address, phoneNumber };
    }
    return success(res, 200, carGotten(), resData);
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard, CarExist, CarBelongsToUser)
  @HttpCode(200)
  @ApiHeader(authHeader)
  @ApiResponse(Resp.deleteCar_200)
  @ApiResponse(Resp.deleteCar_400)
  @ApiResponse(Resp.car404)
  @ApiResponse(unAuthorized)
  async deleteCar(@Param('id') id: string, @Res() res: Response) {
    Logger.log(`Delete car with id: ${id}`);
    const deletedCar = await this.carsService.delete(id);
    return success(res, 200, carDeleted(), deletedCar);
  }
}
