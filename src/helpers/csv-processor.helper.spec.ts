import { processCsvFile } from './csv-processor.helper';
import { Readable } from 'stream';
import * as fs from 'fs';

jest.mock('fs');

describe('processCsvFile', () => {
  const originalWrite = process.stdout.write;
  const filePath = '../data/test.csv';

  beforeEach(() => {
    process.stdout.write = jest.fn();
    jest.resetAllMocks();
  });

  afterEach(() => {
    process.stdout.write = originalWrite;
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
    expect(process.stdout.write).toHaveBeenCalledWith('File not found: ../data/test.csv');
  });
});
