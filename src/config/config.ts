import { Config } from 'src/types/Types';

require('dotenv').config();

export const config: Config = {
  uriApi: 'https://api.covid19api.com',
  port: process.env.PORT || 3000,
  token: process.env.TOKEN || null,
  pageToken: process.env.PAGE_TOKEN || null,
  uri: process.env.URI || null,
};
