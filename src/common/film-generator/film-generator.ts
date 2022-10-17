import dayjs from 'dayjs';
import {MockData} from '../../types/mock-data.type.js';
import {GenreType} from '../../types/genre.enum.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../utils/random.js';
import {FilmGeneratorInterface} from './film-generator.interface.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_YEAR = 1984;
const MAX_YEAR = 2022;

const MIN_RATING = 2;
const MAX_RATING = 10;

const MIN_DURATION = 90;
const MAX_DURATION = 164;

export default class FilmGenerator implements FilmGeneratorInterface {

  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publicationDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const genre = getRandomItem([GenreType.comedy, GenreType.crime, GenreType.drama, GenreType.family, GenreType.horror]);
    const year = generateRandomValue(MIN_YEAR, MAX_YEAR).toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const preview = getRandomItem<string>(this.mockData.previews);
    const video = getRandomItem<string>(this.mockData.videos);
    const actors = getRandomItems<string>(this.mockData.actors).join(';');
    const director = getRandomItem<string>(this.mockData.directors);
    const duration = generateRandomValue(MIN_DURATION, MAX_DURATION).toString();
    const commentCount = generateRandomValue(0, 20).toString();
    const user = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const poster = getRandomItem<string>(this.mockData.posters);
    const bgImage = getRandomItem<string>(this.mockData.bgImages);
    const bgColor = getRandomItem<string>(this.mockData.bgColors);

    return [title, description, publicationDate, genre, year,
      rating, preview, video, actors, director, duration, commentCount,
      user, email, avatar, poster, bgImage, bgColor].join('\t');
  }
}
