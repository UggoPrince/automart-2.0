import { Controller, Request, Post, UseGuards, HttpCode, Logger } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SigninUserDto } from './dto/signin-user.dto';
import { Res as Resp } from '../../docs/auth/response';
import { Req as Reqq } from '../../docs/auth/request';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Authentication')
  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiBody(Reqq.loginBody)
  @ApiResponse(Resp.login_200)
  @ApiResponse(Resp.login_422)
  @ApiResponse(Resp.login_400)
  @ApiBody({ type: SigninUserDto })
  async login(@Request() req) {
    const { access_token } = await this.authService.signToken(req.user);
    Logger.log('Authenticating user:', req.user);
    return { statusCode: 200, message: 'Success', data: { access_token, ...req.user } };
  }
}
