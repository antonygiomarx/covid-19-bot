import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';
import cors = require('cors');
import morgan = require('morgan');
import { urlencoded } from 'express';
import bodyParser = require('body-parser');

const port: string = config.port;

async function init(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  //Middlewares
  app.use(cors());
  app.use(morgan('dev'));
  app.use(urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //Init
  await app.listen(port);
  console.log(`Server on port ${port}`);
}
init();
