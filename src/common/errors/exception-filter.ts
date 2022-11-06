import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {StatusCodes} from 'http-status-codes';
import {ExceptionFilterInterface} from './exception-filter.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../logger/logger.interface.js';
import HttpError from './http-error.js';
import {createErrorObject} from '../../utils/common.js';
import {ServiceError} from '../../types/service-error.enum.js';
import ValidationError from './validation-error.js';

@injectable()
export default class ExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface
  ) {
    this.logger.info('Register ExceptionFilter');
  }

  public handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.info(`${error.detail}: ${error.httpStatusCode} - ${error.message}`);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(ServiceError.HttpError, error.message));
  }

  public handleValidationError(error: ValidationError, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(`[Validation Error]: ${error.message}`);
    error.details.forEach(
      (errorField) => this.logger.error(`[${errorField.property}] — ${errorField.messages}`)
    );

    res
      .status(error.httpStatusCode)
      .json(createErrorObject(
        ServiceError.ValidationError,
        error.message,
        error.details
      ));
  }

  public handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.info(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ServiceError.ServiceError, error.message));
  }

  public catch(error: Error | HttpError | ValidationError, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    }

    if (error instanceof ValidationError) {
      return this.handleValidationError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }
}
