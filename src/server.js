const express = require('express');
const sequelize = require('./database');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'https://instacodefood.vercel.app'
}));
app.use('/api/v1', routes);



sequelize.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o modelo com o banco de dados:', error);
  });

module.exports = app;