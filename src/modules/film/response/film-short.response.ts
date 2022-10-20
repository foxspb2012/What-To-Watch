import {Expose, Type} from 'class-transformer';
import {GenreType} from '../../../types/genre.enum.js';
import UserResponse from '../../user/response/user.response.js';

export default class FilmShortResponse {
  @Expose()
  public title!: string;

  @Expose()
  public publicationDate!: string;

  @Expose()
  public genre!: keyof typeof GenreType;

  @Expose()
  public video!: string;

  @Expose()
  public poster!: string;

  @Expose()
  public commentCount!: number;

  @Expose()
  @Type(() => UserResponse)
  public userId!: UserResponse;
}
