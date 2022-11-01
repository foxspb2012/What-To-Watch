import {DocumentType} from '@typegoose/typegoose';
import {FilmEntity} from './film.entity.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import {DocumentExistsInterface} from '../../types/document-exists.interface.js';

export interface FilmServiceInterface extends DocumentExistsInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  findByTitle(title: string): Promise<DocumentType<FilmEntity> | null>
  updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null>;
  updateImageById(filmId: string, newFile: object): Promise<DocumentType<FilmEntity> | null>
  deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null>
  find(offset: number, limit: number): Promise<DocumentType<FilmEntity>[]>;
  findByGenre(genre: string, offset: number, limit: number): Promise<DocumentType<FilmEntity>[]>;
  findById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  findPromoFilm(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  calcRatingCommentCount(filmId: string, rating: number): Promise<DocumentType<FilmEntity> | null>;
  exists(filmId: string): Promise<boolean>;
}
