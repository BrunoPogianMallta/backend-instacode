const { customerCode } = require('../models/customerCode');
const {Customer} = require('../models')


exports.findByName = async (name) => {
  try {
    console.log('Executando consulta no banco de dados para o cliente com nome:', name);

    const customer = await customerCode.findOne({ where: { name } });

    console.log('Resultado da consulta no banco de dados:', customer);

    return customer;
  } catch (error) {
    console.error('Erro durante a consulta no banco de dados:', error);
    throw error;
  }
};


exports.findById = async (id) => {
  return await customerCode.findByPk(id);
};

exports.getByNameAndCode = async () => {
  try {
    const customers = await customerCode.findAll({
      order:[['name','ASC']],
      attributes:['name','lastName','state','customerCode']
      
    });
    // console.log('Resultado da consulta no banco de dados:', customer);
    return customers;
  } catch (error) {
    throw error;
  }
};

const { Op } = require('sequelize');

exports.getAllOfSearch = async (searchCriteria) => {
    try {
        const customers = await customerCode.findAll({
            where: {
                // Adicione aqui os critérios de pesquisa específicos
                // Exemplo: nome contém a string fornecida em searchCriteria
                name: {
                    [Op.like]: `%${searchCriteria}%`
                }
            }
        });
        return customers;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
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