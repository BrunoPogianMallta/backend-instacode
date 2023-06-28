const customerRepository = require('../repositories/customer.repository');
const formatData = require('../utils/formatData');
const { generateId } = require('../utils/generate.id');

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await customerRepository.getAll();
    res.json(customers);
  } catch (error) {
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
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

exports.getCustomerByName = async (req, res, next) => {
  const { name } = req.params;

  try {
    const customer = await customerRepository.findByName(name);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    next(error);
  }
};


exports.createCustomer = async (req, res, next) => {
  const { name, lastName, city, state, address, customerCode } = req.body;
  const id = generateId('customerCode'); // Gerar ID usando o ulid
  console.log(name, customerCode);

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