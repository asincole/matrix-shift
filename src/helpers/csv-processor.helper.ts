import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { createObjectCsvStringifier } from 'csv-writer';
import { rotateTable } from './rotate-matrix.helper';

export function processCsvFile(filePath) {
  let isFirstRow = true;
  const parser = parse({
    delimiter: ',',
  });
  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: 'id', title: 'id' },
      { id: 'json', title: 'json' },
      { id: 'is_valid', title: 'is_valid' },
    ],
    fieldDelimiter: ',',
  });

  createReadStream(filePath)
    .on('error', error => {
      if (error['code'] === 'ENOENT') {
        console.error(`File not found: ${filePath}`);
      } else {
        console.error(`An error occurred while reading the file: ${error.message}`);
      }
    })
    .pipe(parser)
    .on('readable', () => {
      let record;
      while ((record = parser.read()) !== null) {
        if (isFirstRow) {
          process.stdout.write(csvStringifier.getHeaderString() ?? '');
          isFirstRow = false;
          continue;
        }
        const [id, table] = record;
        try {
          const rotatedMatrixResult = rotateTable(JSON.parse(table));
          process.stdout.write(
            csvStringifier.stringifyRecords([
              {
                id: id,
                json: JSON.stringify(rotatedMatrixResult.result),
                is_valid: rotatedMatrixResult.is_valid,
              },
            ])
          );
        } catch (e) {
          console.error(`Something went wrong while trying to process row with id: ${id}`);
          process.stdout.write(
            csvStringifier.stringifyRecords([
              {
                id,
                json: '[]',
                is_valid: false,
              },
            ])
          );
        }
      }
    })
    .on('error', function (err) {
      console.error(`the following error occurred while attempting to parse your csv file => ${err.message}`);
    })
    .on('end', () => {
      // let user know processing is done
    });
}
