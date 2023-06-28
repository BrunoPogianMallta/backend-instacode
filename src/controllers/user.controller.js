const { generateId } = require('../utils/generate.id');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SECRET = 'instacodehelpingyou'


// Função para gerar o token de autenticação
const generateAuthToken = (user) => {
  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '24h' });
  return token;
};
// Controlador para lidar com o cadastro de um novo usuário
async function createUser(req, res) {
  try {
    const { firstName, lastName, password, email, acceptedTerms } = req.body;

    // Gerar o ID do usuário usando a função generateId
    const id = generateId('USER');

    // Verificar se o usuário já existe no banco de dados
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Usuário já cadastrado' });
    }

    // Criar um hash da senha utilizando o bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar um novo usuário no banco de dados
    const newUser = await User.create({
      id,
      firstName,
      lastName,
      password: hashedPassword,
      email,
      acceptedTerms
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
}



async function getUserByEmail(req, res) {
  try {
    const email = req.params.email;

    // Buscar o usuário no banco de dados pelo email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Retornar os dados do usuário
    console.log(user.email)
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
}

// Controlador para lidar com o login do usuário
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Verificar se o usuário existe no banco de dados
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verificar se a senha está correta utilizando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    // Gerar o token de autenticação
    const token = generateAuthToken(user);

    // Retornar o token e os dados do usuário para o cliente
    return res.status(200).json({ token, firstName: user.firstName, lastName: user.lastName });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
}



module.exports = { createUser, loginUser, getUserByEmail};