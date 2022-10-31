import {GenreType} from '../../../types/genre.enum.js';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Contains
} from 'class-validator';

export default class CreateFilmDto {
  @MinLength(2, {message: 'Minimum title length must be 2'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'publicationDate must be valid ISO date'})
  public publicationDate!: Date;

  @IsEnum(GenreType, {message: 'type must be in enum GenreType'})
  public genre!: GenreType;

  @IsInt({message: 'Year must be an integer'})
  public year!: number;

  @IsNumber({},{message: 'Rating must be a number'})
  public rating!: number;

  @IsString({message: 'Preview must be an string'})
  public preview!: string;

  @IsString({message: 'Video must be an string'})
  public video!: string;

  @IsArray({message: 'Field actors must be an array'})
  @IsString({each: true, message: 'Actors field must be an array of string'})
  public actors!: string[];

  @IsString({message: 'Director must be an string'})
  @MinLength(2, {message: 'Minimum director length must be 2'})
  @MaxLength(50, {message: 'Maximum director length must be 50'})
  public director!: string;

  @IsInt({message: 'Duration must be an integer'})
  public duration!: number;

  @IsInt({message: 'Comment count must be an integer'})
  public commentCount!: number;

  public userId!: string;

  @Contains('.jpg',{message: 'Poster should be with the extension .jpg'})
  public poster!: string;

  @Contains('.jpg',{message: 'Background should be with the extension .jpg'})
  public backgroundImage!: string;

  @IsString({message: 'Background color must be an string'})
  public backgroundColor!: string;
}
