import chalk from 'chalk';
import got from 'got';
import TSVFileWriter from '../common/file-writer/tsv-file-writer.js';
import FilmGenerator from '../common/film-generator/film-generator.js';
import {MockData} from '../types/mock-data.type.js';
import {CliCommandInterface} from './cli-command.interface.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const filmCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(chalk.red.bold(`Can't fetch data from ${url}`));
    }

    const filmGeneratorString = new FilmGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    const filmString = [...Array(filmCount)].map(() => filmGeneratorString.generate()).join('\n');

    await tsvFileWriter.write(filmString);

    console.log(chalk.greenBright.bold(`File ${chalk.blue(filepath)} was created!`));
  }
}

