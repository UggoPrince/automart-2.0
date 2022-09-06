import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { Res as Resp } from '../../docs/auth/response';
import { success } from '../../utilities/response';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('')
  @HttpCode(201)
  @ApiResponse(Resp.signup_201)
  @ApiResponse(Resp.signup_422)
  @ApiResponse(Resp.signup_409)
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    const { password, ...result } = user;
    const { access_token } = await this.authService.signToken(result);
    return success(res, 201, 'Success', { access_token, ...result });
  }
}
