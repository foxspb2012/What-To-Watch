import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';
import {GenreType} from '../../types/genre.enum.js';

const {prop, modelOptions} = typegoose;

export interface FilmEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'films'
  }
})
export class FilmEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 100
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
    minlength: 20,
    maxlength: 1024
  })
  public description!: string;

  @prop({
    required: true,
    default: new Date
  })
  public publicationDate!: Date;

  @prop({
    required: true,
    type: () => String,
    enum: GenreType
  })
  public genre!: GenreType;

  @prop({required: true})
  public year!: string;

  @prop({required: true})
  public rating!: number;

  @prop({required: true})
  public preview!: string;

  @prop({required: true})
  public video!: string;

  @prop({
    type: () => [String],
    required: true,
    default: []
  })
  public actors!: string[];

  @prop({required: true})
  public director!: string;

  @prop({required: true})
  public duration!: number;

  @prop({default: 0})
  public commentCount!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({required: true})
  public poster!: string;

  @prop({required: true})
  public backgroundImage!: string;

  @prop({required: true})
  public backgroundColor!: string;
}

export const FilmModel = getModelForClass(FilmEntity);
