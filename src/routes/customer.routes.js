const express = require('express');
const customerController = require('../controllers/customer.controller');
const { validateCustomerData } = require('../guards/customer.guard');
const {verifyJWT} =require('../utils/verify.jwt');


const router = express.Router();

router.get('/name/:name', customerController.getCustomersBySearch);
router.get('/:id', customerController.getCustomerById);
router.get('/', customerController.getAllCustomers); 

router.post('/', validateCustomerData, customerController.createCustomer);

module.exports = router;