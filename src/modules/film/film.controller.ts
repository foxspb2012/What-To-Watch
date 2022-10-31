import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {FilmServiceInterface} from './film-service.interface.js';
import {CommentServiceInterface} from '../comment/comment-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import FilmResponse from './response/film.response.js';
import FilmShortResponse from './response/film-short.response.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import CommentResponse from '../comment/response/comment.response.js';
import {fillDTO} from '../../utils/common.js';
import HttpError from '../../common/errors/http-error.js';
import {RequestQuery} from '../../types/request-query.js';
import * as core from 'express-serve-static-core';
import {GenreType} from '../../types/genre.enum.js';
import {DEFAULT_FILM_COUNT} from './film.constant.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-objectid.middleware.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists.middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
    @inject(Component.CommentServiceInterface) private commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for FilmController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateFilmDto)]
    });
    this.addRoute({
      path: '/promo',
      method: HttpMethod.Get,
      handler: this.getPromo,
      middlewares: [
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
    this.addRoute({
      path: '/:filmId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]});
    this.addRoute({
      path: '/genre/:genre',
      method: HttpMethod.Get,
      handler: this.getByGenre
    });
  }

  public async index(
    {query}: Request<core.ParamsDictionary, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {

    const offset = parseInt(query.offset ?? '0', 10);
    const limit = parseInt(query.limit ?? '0', 10) || DEFAULT_FILM_COUNT;

    const films = await this.filmService.find(offset, limit);
    this.ok(res, fillDTO(FilmShortResponse, films));
  }

  public async create(
    {body, user}: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response): Promise<void> {
    const {title} = body;
    const existsFilm = await this.filmService.findByTitle(title);

    if (existsFilm) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Film with title «${title}» does exists.`,
        'FilmController'
      );
    }

    const result = await this.filmService.create({ ...body, userId: user.id });

    if (!result) {
      throw new HttpError(
        StatusCodes.NO_CONTENT,
        `Film with title «${title}» does not created.`,
        'FilmController'
      );
    }

    this.created(res, fillDTO(FilmResponse, result));
  }

  public async show(
    {params}: Request<core.ParamsDictionary>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;
    const film = await this.filmService.findById(filmId);

    this.ok(res, fillDTO(FilmResponse, film));
  }

  public async getByGenre(
    {params, query}: Request<core.ParamsDictionary, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {
    const {genre} = params;
    const offset = parseInt(query.offset ?? '0', 10);
    const limit = parseInt(query.limit ?? '0', 10) || DEFAULT_FILM_COUNT;

    const result = await this.filmService.findByGenre(genre as GenreType, offset, limit);

    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with genre ${genre} does not exist`,
        'FilmController'
      );
    }

    this.ok(res, fillDTO(FilmShortResponse, result));
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary, Record<string, unknown>, UpdateFilmDto>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;
    const updatedFilm = await this.filmService.updateById(filmId, body);

    this.ok(res, fillDTO(FilmResponse, updatedFilm));
  }

  public async delete(
    {params}: Request<core.ParamsDictionary>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;
    const film = await this.filmService.deleteById(filmId);

    await this.commentService.deleteById(filmId);

    this.noContent(res, film);
  }

  public async getPromo(
    _req: Request,
    res: Response
  ): Promise<void> {
    const films = await this.filmService.find(0, 1);
    const film = await this.filmService.findPromoFilm(films[0].id);

    this.ok(res, fillDTO(FilmResponse, film));
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary, object, object>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;

    const comments = await this.commentService.findByFilmId(filmId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }
}
