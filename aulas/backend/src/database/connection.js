const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); // setando ambiente de desenvolvimento

module.exports = connection;