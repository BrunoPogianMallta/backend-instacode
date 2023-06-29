const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

// Rota para o cadastro de um novo usuário
router.post('/', UserController.createUser);
router.post('/auth', UserController.loginUser);
router.get('/:email',UserController.getUserByEmail);
router.post('/reset-password', UserController.resetPassword);

module.exports = router;