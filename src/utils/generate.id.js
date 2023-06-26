const {ulid} = require('ulid');

exports.generateId = (modelName) => `${modelName.toUpperCase()}_${ulid()}`;
