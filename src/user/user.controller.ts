import { Controller, Post, Body, HttpCode, Req, Res } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { Res as Resp } from '../docs/auth/response';
import { Req as Reqq } from '../docs/auth/request';
import { errorInvalidEmailPass } from '../utilities/messages/user/failure';
import { failure2 as failure, success } from '../utilities/response';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @ApiTags('Authentication')
  @Post('auth/signup')
  @HttpCode(201)
  @ApiResponse(Resp.signup_201)
  @ApiResponse(Resp.signup_422)
  @ApiResponse(Resp.signup_409)
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    delete user.password;
    const { access_token } = await this.authService.signToken(user);
    return success(res, 201, 'Success', { access_token, ...user });
  }

  @ApiTags('Authentication')
  @Post('auth/login')
  @HttpCode(200)
  @ApiBody(Reqq.loginBody)
  @ApiResponse(Resp.login_200)
  @ApiResponse(Resp.login_422)
  @ApiResponse(Resp.login_400)
  async login(@Req() req: Request, @Res() res: Response) {
    const { email, password } = req.body;
    const user = await this.userService.getUserByEmail(email);
    if (!user) return failure(res, 400, errorInvalidEmailPass());
    if (user.password !== password) return failure(res, 400, errorInvalidEmailPass());
    delete user.password;
    const { access_token } = await this.authService.signToken(user);
    return success(res, 200, 'Success', { access_token, ...user });
  }
}
