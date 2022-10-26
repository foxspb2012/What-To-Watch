import {IsMongoId} from 'class-validator';

export default class CreateFavoriteDto {
  @IsMongoId({message: 'userId field must be valid an id'})
  public userId!: string;

  @IsMongoId({message: 'filmId field must be valid an id'})
  public filmId!: string;
}
