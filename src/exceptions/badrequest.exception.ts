import { BadRequestException } from '@nestjs/common';

export class BadRequestError extends BadRequestException {
  constructor(public badRequestError: any) {
    super();
  }
}
