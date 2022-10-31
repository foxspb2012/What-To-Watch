import * as jose from 'jose';
import crypto from 'crypto';
import {GenreType} from '../types/genre.enum.js';
import {Film} from '../types/film.type.js';
import {plainToInstance} from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, date, genre, year, rating, preview, video, actors,
    director, duration, commentCount, name, email, avatar, poster, backgroundImage, backgroundColor] = tokens;
  return {
    title,
    description,
    publicationDate: new Date(date),
    genre: GenreType[genre as 'comedy' | 'crime' | 'documentary' | 'drama' | 'horror' | 'family' | 'romance' | 'scifi' | 'thriller'],
    year: Number.parseInt(year, 10),
    rating: Number.parseInt(rating, 10),
    preview,
    video,
    actors: actors.split(';'),
    director,
    duration: Number.parseInt(duration, 10),
    commentCount: Number.parseInt(commentCount, 10),
    user: {name, email, avatar},
    poster,
    backgroundImage,
    backgroundColor,
  } as Film;

};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHarsher = crypto.createHmac('sha256', salt);
  return shaHarsher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});

export const createJWT = async (algorithm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({alg: algorithm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
