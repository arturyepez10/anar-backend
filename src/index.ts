import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import { config } from '../config';
import apiRouter from './routes';
import { initConnection } from './database/config';

const app: Application = express();

app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined'));

// We initialize and sync the database connection
initConnection();

app.use("/api", apiRouter);

app.listen(config.APP_PORT, () => {
  console.log(`Server is running on PORT ${config.APP_PORT}`)
});
