import CreateFavoriteDto from './dto/create-favorite.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {FavoriteEntity} from './favorite.entity.js';

export interface FavoriteServiceInterface {
  pushToFavorite(dto: CreateFavoriteDto): Promise<DocumentType<FavoriteEntity> | null>;
  pullFromFavorite(dto: CreateFavoriteDto): Promise<DocumentType<FavoriteEntity> | null>;
  getFavoriteByUserId(userId: string): Promise<DocumentType<FavoriteEntity>[]>;
}
