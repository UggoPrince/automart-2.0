import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { getTokenSecret } from '../../utilities/getEnv';

const secret = getTokenSecret();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UsersService) {}

  async signToken(user: any) {
    const payload = { ...user };
    return {
      access_token: this.jwtService.sign(payload, { secret }),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
