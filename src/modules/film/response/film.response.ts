import {Expose, Type} from 'class-transformer';
import {GenreType} from '../../../types/genre.enum.js';
import UserResponse from '../../user/response/user.response.js';

export default class FilmResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public publicationDate!: string;

  @Expose()
  public genre!: keyof typeof GenreType;

  @Expose()
  public year!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public preview!: string;

  @Expose()
  public video!: string;

  @Expose()
  public actors!: string[];

  @Expose()
  public director!: string;

  @Expose()
  public duration!: number;

  @Expose()
  public commentCount!: number;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public poster!: string;

  @Expose()
  public backgroundColor!: string;

  @Expose()
  @Type(() => UserResponse)
  public userId!: UserResponse;
}
