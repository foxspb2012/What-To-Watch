import {GenreType} from '../../../types/genre.enum.js';

export default class CreateFilmDto {
  public title!: string;
  public description!: string;
  public publicationDate!: Date;
  public genre!: GenreType;
  public year!: number;
  public rating!: number;
  public preview!: string;
  public video!: string;
  public actors!: string[];
  public director!: string;
  public duration!: number;
  public commentCount!: number;
  public userId!: string;
  public poster!: string;
  public backgroundImage!: string;
  public backgroundColor!: string;
}
