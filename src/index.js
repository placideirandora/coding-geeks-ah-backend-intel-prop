import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import db from './sequelize/models/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use((req, res) => {
  res.status(404).json({ status: 404, error: 'route not found' });
});

app.use((error, req, res, next) => {
  res.status(500).json({ status: 500, error: error.message, next });
});

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database Connected!');
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  });

export default app;