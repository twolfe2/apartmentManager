'use strict';


const express = require('express');



let router = express.Router();


router.use('/apartments', require('./apartments'));
router.use('/tenants', require('./tenants'));





module.exports = router;  