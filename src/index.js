/* eslint-disable no-console */
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { config } from 'dotenv';
import SwaggerDocument from '../swagger.json';
import db from './sequelize/models';
import router from './routes';
import passConfig from './config/passport/passport';
import './helpers/notification/eventEmitter';
import './helpers/notification/eventListener';
import SocketIO from './helpers/socketIo';

config();

const app = express();
const PORT = process.env.PORT || 4000;
SocketIO(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(passport.initialize());
passConfig(passport);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
  })
);

app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocument));

app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Authors Haven'
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'route not found' });
});

app.use((error, req, res, next) => {
  res.status(500).json({
    error: error.message,
    next
  });
});

db.sequelize.sync({ alter: false }).then(() => {
  console.log('Database Connected!');
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
});

export default app;
