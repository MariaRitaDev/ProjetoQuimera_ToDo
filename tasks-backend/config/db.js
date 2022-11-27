const config = require('../knexfile.js');
const knex =  require('knex')(config);

knex.migrate.latest([config]);
module.exports = knex; //sempre que for rodar um comando do knex, usar npx antes