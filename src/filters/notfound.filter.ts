import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { NotFoundError } from '../exceptions/notfound.exception';

@Catch(NotFoundError)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp(),
      response = ctx.getResponse();
    return response.status(404).json({
      statusCode: 404,
      message: exception.notFoundError,
      error: exception.message,
    });
  }
}
