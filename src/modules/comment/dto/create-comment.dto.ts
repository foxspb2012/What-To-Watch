import {IsInt, IsMongoId, Length, Min, Max} from 'class-validator';

export default class CreateCommentDTO {
  @Length(5, 1024, {message: 'text must be length is 5, max is 1024'})
  public text!: string;

  @IsInt({message: 'Rating must be an integer'})
  @Min(0, {message: 'minimum value must be at least 0'})
  @Max(10, {message: 'maximum value must no more than 10'})
  public rating!: number;

  @IsMongoId({message: 'filmId field must be valid an id'})
  public filmId!: string;

  public author!: string;

  deleted?: boolean;
}
