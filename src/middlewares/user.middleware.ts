import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { failure } from '../utilities/response';
import { UserService } from '../user/user.service';
import { duplicateUser } from '../utilities/messages/user/failure';

@Injectable()
export class UserExistReturn implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const {
      body: { email },
    } = req;
    const user = await this.userService.getUserByEmail(email);
    if (user) return failure(res, 409, duplicateUser());
    return next();
  }
}
