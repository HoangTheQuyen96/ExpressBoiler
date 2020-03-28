const pg = require('../core/pg.core');

module.exports.register = object =>
  pg.query({
    text: `INSERT INTO users(email, name, password) VALUES ($1, $2, $3) RETURN *`,
    values: [object.email, object.name, object.password],
  });
