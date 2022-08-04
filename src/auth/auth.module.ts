import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.TOKEN_TIME },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
