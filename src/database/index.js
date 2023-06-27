const Sequelize = require('sequelize');

const DB_URI = "postgres://BrunoPogianMallta:QkZNLhAno37W@ep-jolly-butterfly-142296.us-east-2.aws.neon.tech/coletor-de-codigo?sslmode=require;" // Defina a variável de ambiente DB_URI com a URI de conexão

let sequelize;

if (DB_URI) {
  sequelize = new Sequelize(DB_URI, {
    timezone: '-03:00',
    dialect: 'postgres',
    protocol: 'postgres',
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_DATABASE || 'coletor-de-codigo',
    process.env.DB_USERNAME || 'postgres',
    process.env.DB_PASSWORD || 'postgres', {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      timezone: '-03:00',
      dialect: 'postgres',
      protocol: 'postgres',
    }
  );
}

module.exports = sequelize;