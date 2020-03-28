const { getUserById } = require('./sync/user.function');
const wrapF = require('../helpers/wrap');
// const test = require('./sync/test');

module.exports = {
  getUserById: wrapF(getUserById),

};
