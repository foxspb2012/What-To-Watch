import {inject, injectable} from 'inversify';
import {FavoriteServiceInterface} from './favorite-service.interface.js';
import CreateFavoriteDto from './dto/create-favorite.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {FavoriteEntity} from './favorite.entity.js';
import {Component} from '../../types/component.types.js';

@injectable()
export default class FavoriteService implements FavoriteServiceInterface {
  constructor(
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>
  ) {}

  public async pushToFavorite(dto: CreateFavoriteDto): Promise<DocumentType<FavoriteEntity> | null> {
    return this.favoriteModel
      .findByIdAndUpdate(dto.userId, {
        'push': {
          favorites: dto.filmId
        }
      }).exec();
  }

  public async pullFromFavorite(dto: CreateFavoriteDto): Promise<DocumentType<FavoriteEntity> | null> {
    return this.favoriteModel
      .findByIdAndUpdate(dto.userId, {
        'pull': {
          favorites: dto.filmId
        }
      }).exec();
  }

  public async getFavoriteByUserId(userId: string): Promise<DocumentType<FavoriteEntity>[]> {
    return this.favoriteModel
      .find({userId})
      .exec();
  }
}
