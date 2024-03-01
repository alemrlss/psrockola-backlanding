import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DuplicateKeyFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (
      exception.message.includes(
        'duplicate key value violates unique constraint'
      )
    ) {
      const postgresDetails = exception['detail'];
      const columnName = postgresDetails
        ? this.extractColumnNameFromDetail(postgresDetails)
        : 'unknown';

      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: `Este usuario ya se encuentra registrado`
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error interno del servidor'
      });
    }
  }

  private extractColumnNameFromDetail(detail: string): string {
    const match = /Key \((.*?)\)=/i.exec(detail);
    return match ? match[1] : 'unknown';
  }
}
