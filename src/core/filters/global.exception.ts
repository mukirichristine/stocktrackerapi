import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError } from 'typeorm';
import { GlobalResponseError } from '../interfaces/response.error.interface';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let message = (exception as any).message.message;
        let code = 'HttpException';

        //Logger.error(message, (exception as any).stack, `${request.method} ${request.url}`);
        console.log(message);

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        
        switch (exception.constructor) {
            case HttpException:
                status = (exception as HttpException).getStatus();
                break;
            case QueryFailedError:  // this is a TypeOrm error
                status = HttpStatus.UNPROCESSABLE_ENTITY
                message = (exception as QueryFailedError).message;
                code = (exception as any).code;
                console.log("!111111111111111!!!!!!!!!!",message);
                break;
            case EntityNotFoundError:  // this is another TypeOrm error
                status = HttpStatus.UNPROCESSABLE_ENTITY
                message = (exception as EntityNotFoundError).message;
                code = (exception as any).code;
                
                break;
            case CannotCreateEntityIdMapError: // and another
                status = HttpStatus.UNPROCESSABLE_ENTITY
                message = (exception as CannotCreateEntityIdMapError).message;
                code = (exception as any).code;
                break;
            default:
                status = HttpStatus.INTERNAL_SERVER_ERROR
        }

        response.status(status).json(GlobalResponseError(status, message, code, request));
    }
}

