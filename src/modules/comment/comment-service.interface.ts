import CreateCommentDto from './dto/create-comment.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';

export interface CommentServiceInterface {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  getCommentsByFilmId(filmId: string): Promise<DocumentType<CommentEntity>[]>;
  update(filmId: string, dto: Partial<CreateCommentDto>): Promise<DocumentType<CommentEntity> | null>;
  delete(movieId: string): Promise<void>;
}
