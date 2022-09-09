import type {User} from './user.type.js';
import type {GenreType} from './genre.enum.js';
import type {Actors} from './actors.type.js';

export type Film = {
  title: string;
  description: string;
  publicationDate: Date;
  genre: GenreType;
  year: number;
  rating: number;
  preview: string;
  video: string;
  actors: Actors[];
  director: string;
  duration: number;
  commentCount: number;
  user: User;
  poster: string;
  backgroundImage: string;
  backgroundColor: string;
}
