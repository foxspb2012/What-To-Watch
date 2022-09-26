import {GenreType} from '../types/genre.enum.js';
import {Film} from '../types/film.type.js';
import bcrypt from 'bcrypt';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, date, genre, year, rating, preview, video, actors,
    director, duration, commentCount, name, email, avatar, poster, backgroundImage, backgroundColor] = tokens;
  return {
    title,
    description,
    publicationDate: new Date(date),
    genre: GenreType[genre as 'Comedy' | 'Crime' | 'Documentary' | 'Drama' | 'Horror' | 'Family' | 'Romance' | 'Scifi' | 'Thriller'],
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

export const createSHA256 = (password: string, saltRounds: string): string => {
  const salt = bcrypt.genSaltSync(parseInt(saltRounds, 10));
  return bcrypt.hashSync(password, salt);
};
