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
import {fillDTO} from '../../utils/common.js';
import HttpError from '../../common/errors/http-error.js';
import {RequestQuery} from '../../types/request-query.js';
import * as core from 'express-serve-static-core';
import {GenreType} from '../../types/genre.enum.js';
import {DEFAULT_FILM_COUNT} from './film.constant.js';

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
    @inject(Component.CommentServiceInterface) private commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for FilmController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/promo', method: HttpMethod.Get, handler: this.getPromo});
    this.addRoute({path: '/:filmId', method: HttpMethod.Get, handler: this.getById});
    this.addRoute({path: '/:filmId', method: HttpMethod.Patch, handler: this.update});
    this.addRoute({path: '/:filmId', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({path: '/genre/:genre', method: HttpMethod.Get, handler: this.getByGenre});
  }

  public async index(
    {query}: Request<core.ParamsDictionary, unknown, unknown, RequestQuery>,
    res: Response
  ):Promise<void> {
    const limit = parseInt(query.limit ?? '0', 10) || DEFAULT_FILM_COUNT;
    const films = await this.filmService.find(limit);
    this.send(res, StatusCodes.OK, fillDTO(FilmShortResponse, films));
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response): Promise<void> {
    const existsFilm = await this.filmService.findByTitle(body.title);

    if (existsFilm) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Film with title «${body.title}» exists.`,
        'FilmController'
      );
    }

    const result = await this.filmService.create(body);
    if (!result) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `Film with title «${body.title}» not created.`,
        'FilmController'
      );
    }
    this.created(
      res,
      fillDTO(FilmResponse, result)
    );
  }

  public async getById(
    {params}: Request<core.ParamsDictionary>,
    res: Response
  ):Promise<void> {
    const existFilm = await this.filmService.findById(params.filmId);

    if (!existFilm) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Film with ID ${params.filmId} not exist`,
        'FilmController'
      );
    }

    this.ok(res, fillDTO(FilmResponse, existFilm));
  }

  public async getByGenre(
    {params, query}: Request<core.ParamsDictionary, unknown, unknown, RequestQuery>,
    res: Response
  ):Promise<void> {
    const limit = parseInt(query.limit ?? '0', 10) || DEFAULT_FILM_COUNT;
    const result = await this.filmService.findByGenre(params.genre as GenreType, limit);

    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with genre ${params.genre} not exist`,
        'FilmController'
      );
    }

    this.ok(res, fillDTO(FilmShortResponse, result));
  }

  public async update(
    {body, params}:  Request<core.ParamsDictionary , Record<string, unknown>, UpdateFilmDto>,
    res: Response
  ):Promise<void> {
    const updatedFilm = await this.filmService.updateById(params.filmId, body);
    if (!updatedFilm) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Film with ID: ${params.filmId} not found`,
        'FilmController'
      );
    }
    const result = await this.filmService.findById(updatedFilm.id);
    this.ok(res, fillDTO(FilmResponse, result));
  }

  public async delete(
    {params}:  Request<core.ParamsDictionary>,
    res: Response
  ):Promise<void> {
    const result = await this.filmService.deleteById(params.filmId);
    if (!result) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Film with ID: ${params.filmId} not deleted`,
        'FilmController'
      );
    }
    await this.commentService.delete(params.filmId);

    this.ok(res, fillDTO(FilmResponse, result));
  }

  public async getPromo(
    _req: Request,
    res: Response
  ):Promise<void> {
    const films = await this.filmService.find(1);
    const promoFilm = await this.filmService.findPromoFilm(films[0].id);

    if (!promoFilm) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        'Promo film not exist',
        'FilmController'
      );
    }

    this.ok(res, fillDTO(FilmResponse, promoFilm));
  }
}
