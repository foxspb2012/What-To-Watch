import {CliCommandInterface} from './cli-command.interface.js';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
       ${chalk.blue.bold('Программа для подготовки данных для REST API сервера.')}
       ${chalk.greenBright('Пример:')}
            main.js --<command> [--arguments]
       ${chalk.yellow('Команды:')}
            ${chalk.cyan('--version:')}                   ${chalk.green('# выводит номер версии')}
            ${chalk.cyan('--help:')}                      ${chalk.green('# печатает этот текст')}
            ${chalk.cyan('--import <path>:')}             ${chalk.green('# импортирует данные из TSV')}
            ${chalk.cyan('--generator <n> <path> <url>')} ${chalk.green('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
