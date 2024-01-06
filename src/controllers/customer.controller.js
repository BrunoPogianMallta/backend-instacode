const { customerCode } = require('../models');
const customerRepository = require('../repositories/customer.repository');
const formatData = require('../utils/formatData');
const { generateId } = require('../utils/generate.id');


exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await customerRepository.getAll();
    console.log('cliente',customers)
    res.json(customers);
  } catch (error) {
    console.log(error)
    next(error);
  }
  
};

exports.getCustomerById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const customer = await customerRepository.findById(id);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    console.log('Resultado da consulta no banco de dados:', customer.id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};


exports.getCustomersBySearch = async (req, res) => {
  try {
      const { name } = req.params;

      if (!name) {
          return res.status(400).json({ error: 'O parâmetro de pesquisa (name) é obrigatório.' });
      }

      const customers = await customerRepository.getAllOfSearch(name);

      if (customers.length === 0) {
          return res.status(404).json({ error: 'Nenhum cliente encontrado para o nome fornecido.' });
      }

      res.json(customers);
  } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

exports.getCustomerByName = async (req, res, next) => {
  const { name } = req.params; // Alterado para req.query para corresponder à consulta na URL

  try {
    const customerName = await customerRepository.getCustomersBySearch(name );
    console.log('Resultado da busca:', customerName);
    if (!customerName) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ name: customerName }); // Retorna apenas o campo 'name'
  } catch (error) {
    next(error);
  }
};



exports.createCustomer = async (req, res, next) => {
  const { name, lastName, city, state, address, customerCode } = req.body;
  const id = generateId('customerCode'); // Gerar ID usando o ulid
  console.log('nome',name,'codigo', customerCode);

  try {
    const existingCustomer = await customerRepository.getByNameAndCode();

    const filteredCustomers = existingCustomer.filter(
      (customer) =>
        customer.name === name &&
        customer.lastName === lastName &&
        customer.state === state &&
        customer.customerCode === customerCode
    );

    if (filteredCustomers.length > 0) {
      return res.status(409).json({ error: 'A customer with the given name, last name, state, and customer code already exists' });
    }

    const createdCustomer = await customerRepository.create({
      id,
      name,
      lastName,
      city,
      state,
      address,
      customerCode
    });
    res.status(201).json(createdCustomer);
  } catch (error) {
    next(error);
  }
};