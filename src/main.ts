import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';
import cors = require('cors');
import morgan = require('morgan');

const port = config.port;

async function init() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(morgan('dev'));
  await app.listen(port);
  console.log(`Server on port ${port}`);
}
init();
