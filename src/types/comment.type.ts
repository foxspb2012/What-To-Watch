import{User} from './user.type.js';

export type Comment = {
  text: string;
  rating: number;
  postDate: Date;
  author: User;
}
