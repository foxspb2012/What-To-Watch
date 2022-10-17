import {DocumentType} from '@typegoose/typegoose';
import {FilmEntity} from './film.entity.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';

export interface FilmServiceInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  findByTitle(title: string): Promise<DocumentType<FilmEntity> | null>
  updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null>;
  deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null>
  find(count: number): Promise<DocumentType<FilmEntity>[]>;
  findByGenre(genre: string, count: number): Promise<DocumentType<FilmEntity>[]>;
  findById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  findPromoFilm(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  incCommentCount(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  calcRating(filmId: string, rating: number): Promise<DocumentType<FilmEntity> | null>;
  exist(filmId: string): Promise<boolean>;
}
