'use strict';

const mongoose = require('mongoose');



let tenantSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  age: {type: Number}
});

let Tenant = mongoose.model('Tenant', tenantSchema);



module.exports = Tenant;