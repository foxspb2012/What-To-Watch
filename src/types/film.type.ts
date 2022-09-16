import type {User} from './user.type.js';
import type {GenreType} from './genre.enum.js';

export type Film = {
  title: string;
  description: string;
  publicationDate: Date;
  genre: GenreType;
  year: number;
  rating: number;
  preview: string;
  video: string;
  actors: string[];
  director: string;
  duration: number;
  commentCount: number;
  user: User;
  poster: string;
  backgroundImage: string;
  backgroundColor: string;
}
