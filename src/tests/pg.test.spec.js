const pg = require('../core/pg.core');
const config = require('config');

test('test connect pg', async () => {
  const postgrest = await pg.connect(config.get('pgUrl'));

  const result = await pg.query('SELECT NOW()');

  expect(result.rows.length).toEqual(1);

  await postgrest.end();
});
