const userSrv = require('../../services/user.service');

const getUserById = req =>
  new Promise(async (resole, reject) => {
    try {
      const { rows } = await userSrv.register(req.body);
      resole({
        headers: { Foo: 'Bar' },
        status: 201,
        body: rows[0],
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getUserById,
};
