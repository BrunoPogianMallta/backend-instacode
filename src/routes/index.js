const express = require('express');
const customerRoutes = require('../routes/customer.routes');
const userRoutes = require('../routes/user.routes');
const {verifyJWT} =require('../utils/verify.jwt');

const app = express();

app.use(express.json());

app.get('/health-check', (req, res) => {
  res.json({ status: 200, message: 'OK' });
});

app.use('/customers',verifyJWT, customerRoutes);
app.use('/user',userRoutes);



module.exports = app;