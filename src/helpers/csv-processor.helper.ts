import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { createObjectCsvStringifier } from 'csv-writer';
import { rotateMatrix } from './rotate-matrix.helper';

export function processCsvFile(filePath) {
  let isFirstRow = true;
  const parser = parse({
    delimiter: ',',
  });
  const rows: {
    id: string;
    json: string;
    is_valid: boolean;
  }[] = [];

  createReadStream(filePath)
    .on('error', error => {
      if (error['code'] === 'ENOENT') {
        process.stdout.write(`File not found: ${filePath}`);
      } else {
        process.stdout.write(`An error occurred while reading the file: ${error.message}`);
      }
    })
    .pipe(parser)
    .on('readable', () => {
      let record;
      while ((record = parser.read()) !== null) {
        if (isFirstRow) {
          isFirstRow = false;
          continue;
        }
        const [id, matrix] = record;
        const rotatedMatrixResult = rotateMatrix(JSON.parse(matrix));

        rows.push({
          id: id,
          json: JSON.stringify(rotatedMatrixResult.result),
          is_valid: rotatedMatrixResult.is_valid,
        });
      }
    })
    .on('error', function (err) {
      process.stdout.write(`the following error occurred while attempting to parse your csv file => ${err.message}`);
    })
    .on('end', () => {
      const csvStringifier = createObjectCsvStringifier({
        header: [
          { id: 'id', title: 'id' },
          { id: 'json', title: 'json' },
          { id: 'is_valid', title: 'is_valid' },
        ],
        fieldDelimiter: ',',
      });
      process.stdout.write(csvStringifier.getHeaderString() ?? '');
      rows.forEach(row => process.stdout.write(csvStringifier.stringifyRecords([row])));
    });
}
