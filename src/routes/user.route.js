const express = require('express');
const handler = require('../function/handler');
const validator = require('../middlewares/validator');
const schema = require('../schemas/user.scheme');

const router = express.Router();

router.post('/register', validator(schema.createUser)(), handler.getUserById);
// router.get('/test', handler.test);

module.exports = router;
