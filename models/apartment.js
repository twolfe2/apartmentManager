'use strict';

const mongoose = require('mongoose');



let apartmentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  curCapacity: {type: Number, default: 0},
  maxCapacity: {type: Number, required: true},
  tenants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tenant'}],
  createdAt: {type: Date, default: Date.now},
  imageUrl: {type: String}
});

let Apartment = mongoose.model('Apartment', apartmentSchema);



module.exports = Apartment;