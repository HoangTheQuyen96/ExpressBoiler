const { Pool } = require('pg');

let pool;

const connect = (pgUrl) => new Promise((resolve, reject) => {
  try {
    pool = new Pool({
      connectionString: pgUrl,
    });
    resolve(pool);
  } catch (error) {
    reject(error);
  }
});

module.exports = {
  query: (query) => pool.query(query),
  client: () => pool.connect(),
  connect,
};
