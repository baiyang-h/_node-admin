var express = require('express');
var router = express.Router();
var Admin = require('../controller/admin');

router.post('/login', Admin.login);
router.post('/forgetPassword',Admin.forgetPassword)
router.post('/register', Admin.register)

module.exports = router;