import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {FavoriteServiceInterface} from './favorite-service.interface.js';
import CreateFavoriteDto from './dto/create-favorite.dto.js';
import FavoriteResponse from './response/favorite-response.dto.js';
import {fillDTO} from '../../utils/common.js';
import {StatusCodes} from 'http-status-codes';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';

@injectable()
export default class CategoryController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FavoriteServiceInterface) private readonly favoriteService: FavoriteServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoriteController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateFavoriteDto)]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Delete,
      handler: this.delete
    });
  }

  public async index(
    {body}: Request<Record<string, unknown>, Record<string, unknown>>,
    res: Response): Promise<void> {
    const {userId} = body;

    const favorites = await this.favoriteService.getFavoriteByUserId(userId);
    this.send(res, StatusCodes.OK, fillDTO(FavoriteResponse, favorites));
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateFavoriteDto>,
    res: Response): Promise<void> {
    await this.favoriteService.pushToFavorite(body);

    const favorites = await this.favoriteService.getFavoriteByUserId(body.userId);
    this.created(res, fillDTO(FavoriteResponse, favorites));
  }

  public async delete(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateFavoriteDto>,
    res: Response): Promise<void> {
    await this.favoriteService.pullFromFavorite(body);

    const favorites = await this.favoriteService.getFavoriteByUserId(body.userId);
    this.ok(res, fillDTO(FavoriteResponse, favorites));
  }
}
