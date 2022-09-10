import {readFileSync} from 'fs';
import {GenreType} from '../../types/genre.enum.js';
import {Film} from '../../types/film.type.js';
import {FileReaderInterface} from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
        title,
        description,
        date,
        genre,
        year,
        rating,
        preview,
        video,
        actors,
        director,
        duration,
        commentCount,
        name,
        email,
        avatar,
        passwordHash,
        poster,
        backgroundImage,
        backgroundColor
      ]) => ({
        title,
        description,
        publicationDate: new Date(date),
        genre: GenreType[genre as 'Comedy' | 'Crime' | 'Documentary' | 'Drama' | 'Horror' | 'Family' | 'Romance' | 'Scifi' | 'Thriller'],
        year: Number.parseInt(year, 10),
        rating: Number.parseInt(rating, 10),
        preview,
        video,
        actors: actors.split(';').map((actor) => ({name: actor})),
        director,
        duration: Number.parseInt(duration, 10),
        commentCount: Number.parseInt(commentCount, 10),
        user: {name, email, avatar, passwordHash},
        poster,
        backgroundImage,
        backgroundColor,
      }));
  }
}

