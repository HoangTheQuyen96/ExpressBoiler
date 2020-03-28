/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    id: { type: 'string', notNull: true, primaryKey: true },
    name: { type: 'string' },
    username: { type: 'string', unique: true },
    email: { type: 'string', unique: true },
    password: { type: 'string' },
    email_verified: { type: 'boolean', default: 'false' },
    soft_delete: { type: 'boolean', default: false },
    verify_token: { type: 'jsonb' },
    reset_token: { type: 'jsonb' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('users');
};
