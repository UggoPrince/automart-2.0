import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signToken(user: any) {
    const payload = { ...user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
