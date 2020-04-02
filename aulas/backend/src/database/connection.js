const knex = require('knex');
const configuration = require('../../knexfile');
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development; // para poder 
// acima esta para poder escolher o ambiante de desenvolvimento 
const connection = knex(config); // setando ambiente de desenvolvimento

module.exports = connection;