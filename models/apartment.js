'use strict';

const mongoose = require('mongoose');



let apartmentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  curCapacity: {type: Number, default: 0},
  maxCapacity: {type: Number, required: true},
  tenants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tenant'}],
  createdAt: {type: Date, default: Date.now},
  cost: {type: Number, required: true},
  imageUrl: {type: String}
});


apartmentSchema.statics.getStats = function(cb) {
  this.find({}, (err, apartments) => {
    if(err) cb(err);
    // console.log(apartments);
    let totalRent = 0;
    let numTenants = 0; 
    let numRooms = 0;
    let possibleTotal = 0;

    apartments.forEach(apartment => {
      totalRent += apartment.curCapacity * apartment.cost;
      possibleTotal += apartment.maxCapacity * apartment.cost;
      numTenants += apartment.curCapacity;
      numRooms += apartment.maxCapacity;

    });
    let availableRooms = numRooms - numTenants;
    let stats = {totalRent,possibleTotal, numTenants, numRooms, availableRooms};
    cb(null, stats);

  })

}

let Apartment = mongoose.model('Apartment', apartmentSchema);


module.exports = Apartment;