import { NotFoundException } from '@nestjs/common';

export class NotFoundError extends NotFoundException {
  constructor(public notFoundError: any) {
    super();
  }
}
