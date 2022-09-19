import {createWriteStream, WriteStream} from 'fs';
import {FileWriterInterface} from './file-writer.interface.js';

export default class TSVFileWriter implements FileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly filename: string) {
    this.stream = createWriteStream(this.filename, {
      flags: 'w',
      encoding: 'utf8',
      highWaterMark: 2 ** 16, // 64KB
      autoClose: true,
    });
  }

  public async write(films: string): Promise<void> {
    if (!this.stream.write(`${films}\n`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();
  }
}
