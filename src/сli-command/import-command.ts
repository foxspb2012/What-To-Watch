import chalk from 'chalk';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import {CliCommandInterface} from './cli-command.interface.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  public execute(filename: string): void {
    if (!filename) {
      console.log(`
        After ${chalk.cyan('\'--import\'')} add ${chalk.cyan('<path>')} to file as an argument.
        For more information use ${chalk.cyan('\'--help\'')} command.
      `);
      return;
    }

    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(chalk.blue.bold('Результат выполнения команды \'import\':'), fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw Error;
      }

      console.log(`Не удалось импортировать данные из файла по причине: «${err.message}»`);
    }
  }
}
