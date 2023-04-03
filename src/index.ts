import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { processCsvFile } from './helpers/csv-processor.helper';

const argv = yargs(hideBin(process.argv))
  .usage('$0 <filePath>', 'Process the input file', yargs => {
    return yargs.positional('filePath', {
      describe: 'Enter the path to the CSV file',
      type: 'string',
    });
  })
  .demandCommand(1, 'You must provide the file path as an argument')
  .strict()
  .help().argv;

processCsvFile(argv['filePath']);
