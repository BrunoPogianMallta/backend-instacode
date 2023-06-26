const express = require('express');
const customerRoutes = require('../routes/customer.routes');

const app = express();

app.use(express.json());

app.get('/health-check', (req, res) => {
  res.json({ status: 200, message: 'OK' });
});

app.use('/customers', customerRoutes);



module.exports = app;