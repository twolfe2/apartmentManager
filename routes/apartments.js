'use strict';


const express = require('express');



// api/apartments
let router = express.Router();

let Apartment = require('../models/apartment');




//CRUD for aparments
router.route('/')
  .get((req, res) => {
    Apartment
    .find({})
    // .populate('tenants')
    .sort('createdAt')
    .exec((err, apartments) => {
      if (err) return res.status(400).send(err);
      res.send(apartments);

    });
  })
  .post((req, res) => {
    Apartment.create(req.body, (err, savedDoc) => {
      if (err) return res.status(400).send(err);

      res.send(savedDoc);
    });

  });

router.route('/:id')
  .delete((req, res) => {
    Apartment.findByIdAndRemove(req.params.id, (err) => {
      if (err) return res.status(400).send(err);
      res.send();
    });
  })
  .get((req, res) => {
    Apartment.findById(req.params.id, (err, apartment) => {
      if (err) return res.status(400).send(err);
      res.send(apartment);
    });
  })
  .put((req, res) => {
    Apartment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, apartment) => {
      if (err) return res.status(400).send(err);
      res.send(apartment);
    });
  });


//additional operations

//add a tenant to an apartment
router.put('/:apartmentId/addTenant/:tenantId', (req, res) => {

  Apartment.findById(req.params.apartmentId, (err, apartment) =>{
    if (err || !apartment) return res.status(400).send(err || { error: "Apartment not found" });

    if(apartment.curCapacity+1 > apartment.maxCapacity) {
      res.status(400).send({error:"Apartment Full, you must remove a tenant before adding a new one"});
    } else {
      apartment.tenants.push(req.params.tenantId);

      apartment.save((err, savedApt) => {
        res.status(err ? 400:200).send(err || savedApt);
      });
    }

  });
});

//remove tenant from apartment
router.delete('/:apartmentId/removeTenant/:tenantId', (req, res) => {

  Apartment.findById(req.params.apartmentId, (err, apartment) =>{
    if (err || !apartment) return res.status(400).send(err || { error: "Apartment not found" });

    
      // apartment.tenants.push(req.params.tenantId);

      apartment.update({$pull: {tenants: {_id: req.params.tenantId}}}, (err, result) => {
        if (err) return res.status(400).send(err);
        res.send(result);
      })
    

  });
});




module.exports = router;
