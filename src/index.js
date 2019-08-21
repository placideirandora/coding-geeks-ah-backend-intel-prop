import swaggerUi from 'swagger-ui-express';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import SwaggerDocument from '../swagger.json';
import db from './sequelize/models';
import router from './routes/routes';
import passConfig from './config/passport/passport';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
passConfig(passport);

app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocument));

app.use(router);

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

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database Connected!');
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
});

export default app;
