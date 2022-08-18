import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BadRequestError } from '../exceptions/badrequest.exception';

@Catch(BadRequestError)
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: BadRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp(),
      response = ctx.getResponse();
    return response.status(400).json({
      statusCode: 400,
      message: exception.badRequestError,
      error: exception.message,
    });
  }
}
