/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This script implements logic delegated from the GitHub Actions workflows.
 * The workflow invokes the API interface using the CLI with the following command:
 *
 *  node ci --function functionOne --params '{"param1": "value1", "param2": "value2"}'
 */
const functions = require("./functions");

// process command line arguments
const args = process.argv.slice(2);

// checks the arguments
if (args.length < 2 || args[0] !== "--function") {
  console.error(
    'Correct usage: node ci --function <functionName> --params \'{"param1": "value1", "param2": "value2"}\'',
  );
  process.exit(1);
}

const functionName = args[1];

let params;
if (args[3]) {
  params = JSON.parse(args[3]);
}

// Execute the function invoked
try {
  functions[functionName](params);
} catch (e) {
  console.error("Error: the function invoked does not exists");
}
