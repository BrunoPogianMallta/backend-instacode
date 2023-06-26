const { customerCode } = require('../models/customerCode');
const {Customer} = require('../models')


exports.findByName = async (name) => {
  return await customerCode.findOne({ where: { name } });
};

exports.findById = async (id) => {
  return await customerCode.findByPk(id);
};

exports.getByNameAndCode = async () => {
  try {
    const customers = await customerCode.findAll({
      order:[['name','ASC']],
      attributes:['name','customerCode']
    });
    return customers;
  } catch (error) {
    throw error;
  }
};

exports.getAll = async () => {
  try {
    const customers = await customerCode.findAll();
    return customers;
  } catch (error) {
    throw error;
  }
};

exports.findByNameAndCode = async (name, customerCode) => {
  try {
    const customer = await Customer.findOne({
      where: {
        name,
        customerCode,
      },
    });
    return customer;
  } catch (error) {
    throw error;
  }
};


exports.create = async (data) => {
  try {
    const createdCustomer = await customerCode.create(data);
    return createdCustomer;
  } catch (error) {
    throw error;
  }
};