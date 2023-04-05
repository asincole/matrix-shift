import { processCsvFile } from './csv-processor.helper';
import { Readable } from 'stream';
import * as fs from 'fs';

jest.mock('fs');

describe('processCsvFile', () => {
  const consoleErrSpy = jest.spyOn(console, 'error');
  const filePath = '../data/test.csv';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should log the correct result', async () => {
    const mockFileContent = `id,json
1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
2,"[40, 20, 90, 10]"
3,"[-5]"
9,"[2, -0]"
5,"[2, -5, -5]"
8,"[1, 1, 1, 1, 1]"
`;
    const readableStream = Readable.from(mockFileContent);
    (fs.createReadStream as jest.Mock).mockImplementation(() => readableStream);

    const promise = new Promise(resolve => {
      process.stdout.write = data => {
        if (data.includes('id,json')) {
          resolve(data);
        }
        return true;
      };
    });

    processCsvFile(filePath);

    expect(fs.createReadStream).toHaveBeenCalledWith(filePath);

    const data = await promise;
    expect(data).toContain('id,json,is_valid');
  });

  it('should log error if a row contains invalid JSON data', async () => {
    const mockFileContent = `id,json
1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
2,"[40, 20, 90, 10]"
3,"[-5]"
9,"[2, -0]"
5,"[2, -5, -5]"
8,"[1, 1, 1, 1, 1"
`;
    const readableStream = Readable.from(mockFileContent);
    (fs.createReadStream as jest.Mock).mockImplementation(() => readableStream);

    processCsvFile(filePath);

    expect(fs.createReadStream).toHaveBeenCalledWith(filePath);

    expect(consoleErrSpy).toHaveBeenCalledWith('Something went wrong while trying to process row with id: 8');
  });

  it('should log file not found error', async () => {
    expect.assertions(3);

    const readableStream = Readable.from('');
    (fs.createReadStream as jest.Mock).mockImplementation(() => readableStream);

    processCsvFile(filePath);

    expect(fs.createReadStream).toHaveBeenCalledWith(filePath);

    const errorPromise = new Promise(resolve => {
      readableStream.on('error', err => {
        resolve(err);
      });
    });

    readableStream.emit('error', { code: 'ENOENT' });

    const error = await errorPromise;
    expect(error).toEqual({ code: 'ENOENT' });
    expect(consoleErrSpy).toHaveBeenCalledWith('File not found: ../data/test.csv');
  });
});
