# Matrix Rotator

This is a program that rotates a matrix with identical rows and columns to the left.

## Installation

Run `npm install` to install the dependencies.

## Structure

The program is structured as follows:
- The `src` folder contains the source code.
- The `dist` folder contains the built code.
- The `data` folder contains the test csv data.

## Usage

You can run the program with `npm start` and supply the path to the csv file that needs to be processed as an argument. For example: `npm run start -- ./data/test.csv`. I have provided a test file in the root of the project; you can find it at `./data/test.csv`.

You can also run the built program directly like this: `node cli.js ./data/test.csv`. For this to work, you need to run `npm run build` first. Since the instructions talk about this being evaluated against an automated system, you might want to install, and build the program first, so it does not output extra irrelevant data to the console.

## Testing

You can run the tests with `npm test`. I have provided test files for tested code directly beside the code file it tests. I have also tried to keep the test coverage as high as possible (this is shown when you run the tests).

## Assumptions

- The matrix is always a 2D array (i.e. while being a flat array, there are no empty rows or columns while processing).
- The matrix is always a valid csv file (i.e. the file is always a valid csv file and the csv file is always contains a valid matrix).
- The json column always contains a valid json string (i.e. the json column always contains a valid json string).
- The supplied file path leads to a valid csv file (i.e. the supplied file path always leads to a valid csv file). If the file does not contain any data, the program will output "id,json,is_valid" to the console.
