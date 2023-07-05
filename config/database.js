const { Pool } = require('pg');
const { POSTGRES } = require('./index');

// ==> Conexão com a Base de Dados:
const pool = new Pool({
  connectionString: POSTGRES
});

pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('API connected to Postgre SQL');
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};