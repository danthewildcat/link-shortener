/* @flow */
// We are intentionally rejecting empty strings as though they are null:
// flowlint sketchy-null-string:off
//
import dotenv from 'dotenv';

export type Config = {|
  numberSystemArray: $ReadOnlyArray<string>,
  pgUrl: string,
  debug: boolean,
|};

function requireEnv(fieldName: string): string {
  const val = process.env[fieldName];
  if (val == null) {
    throw new Error(`Missing required environment variable: ${fieldName}`);
  }
  return val;
}

function validateNumberSystem(numberSystemStr: string): $ReadOnlyArray<string> {
  const validationSet = new Set();
  const numSystemArray = numberSystemStr.split('');
  numSystemArray.forEach(val => validationSet.add(val));
  if (numSystemArray.length < validationSet.size) {
    throw new Error(`'NUMBER_SYSTEM_CHARACTERS' contained duplicate characters: ${numberSystemStr}`);
  }
  return numSystemArray;
}

export default function getConfig(): Config {
  if (process.env.SETTINGS) {
    dotenv.config({path: process.env.SETTINGS});
  } else {
    // Use the default expected path of ${PROJECT_ROOT}/.env
    dotenv.config();
  }

  const {
    NODE_ENV,
  } = process.env;

  const debug = NODE_ENV === 'development';
  const numberSystemStr = requireEnv('NUMBER_SYSTEM_CHARACTERS');
  const numberSystemArray = validateNumberSystem(numberSystemStr);

  return {
    pgUrl: requireEnv('DATABASE_URL'),
    numberSystemArray,
    debug,
  };
}
