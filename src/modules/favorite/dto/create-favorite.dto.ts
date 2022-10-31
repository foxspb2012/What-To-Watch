import {IsMongoId} from 'class-validator';

export default class CreateFavoriteDto {
  public userId!: string;

  @IsMongoId({message: 'filmId field must be valid an id'})
  public filmId!: string;
}
