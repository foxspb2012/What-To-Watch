import {inject, injectable} from 'inversify';
import {FilmServiceInterface} from './film-service.interface.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {FilmEntity} from './film.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {SortType} from '../../types/sort-type.enum.js';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>
  ) {
  }

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New film created: ${dto.title}`);

    return result;
  }

  public async findByTitle(title: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findOne({title});
  }

  public async updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, dto, {new: true})
      .populate('userId')
      .exec();
  }

  public async updateImageById(filmId: string, newFile: object): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, newFile, {new: true})
      .populate('userId')
      .exec();
  }

  public async deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndDelete(filmId)
      .exec();
  }

  public async find(offset:number, limit:number): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .find()
      .sort({createdAt: SortType.Down})
      .skip(offset)
      .limit(limit)
      .populate('userId')
      .exec();
  }

  public async findByGenre(genreType: string, offset:number, limit:number): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .find({genre: genreType})
      .sort({createdAt: SortType.Down})
      .skip(offset)
      .limit(limit)
      .populate('userId')
      .exec();
  }

  public async findById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findById(filmId)
      .populate('userId')
      .exec();
  }

  public async findPromoFilm(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findById(filmId)
      .populate('userId')
      .exec();
  }

  public async calcRatingCommentCount(filmId: string, rating: number): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, {
        '$inc': {
          commentCount: 1,
          rating: rating,
        }
      }).exec();
  }

  public async exists(filmId: string): Promise<boolean> {
    return this.filmModel
      .exists({_id: filmId}) !== null;
  }
}
