const express = require('express');
const sequelize = require('./database');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'https://instacodehelper.cyclic.app'
};

app.use(cors(corsOptions));
app.use('/api/v1', routes);



sequelize.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o modelo com o banco de dados:', error);
  });

module.exports = app;