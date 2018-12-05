/* @flow */
// We are intentionally rejecting empty strings as though they are null:
// flowlint sketchy-null-string:off
//
import dotenv from 'dotenv';

export type Config = {|
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

  return {
    pgUrl: requireEnv('DATABASE_URI'),
    debug,
  };
}
