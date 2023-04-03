const fs = require('fs');
const path = require('path');

/*
  * This file is used to run the CLI. It only exists because I am avoiding transpiling the ts code to the root of the project.
  * and I want to keep in line as much as possible with the API specified in the code challenge document.
 */

(async () => {
  try {
    const distIndexPath = path.resolve(__dirname, './dist/index.js');

    if (!fs.existsSync(distIndexPath)) {
      console.error('Error: dist/index.js not found. Please make sure to build the project before running the CLI. You can do this by running `npm run build`');
      process.exit(1);
    }

   await import(distIndexPath);
  } catch (error) {
    console.error('Error importing or running the module:', error);
  }
})();
