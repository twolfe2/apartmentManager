'use strict';


const express = require('express');



// api/apartments
let router = express.Router();

let Apartment = require('../models/apartment');
let Tenant = require('../models/tenant');






//CRUD for aparments
router.route('/')
  .get((req, res) => {
    Apartment
      .find({})
      .populate('tenants')
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

  Apartment.findById(req.params.apartmentId, (err, apartment) => {
    if (err || !apartment) return res.status(400).send(err || { error: "Apartment not found" });

    //check to see if the apartment is full
    if (apartment.curCapacity + 1 > apartment.maxCapacity) {
      res.status(400).send({ error: "Apartment Full, you must remove a tenant before adding a new one" });
    } else {

      //add the tenant to the apartment
      apartment.curCapacity++;
      apartment.tenants.push(req.params.tenantId);

      apartment.save((err, savedApt) => {
        if(err) return res.status(400).send(err);


        //add the apartment to the tenant
        Tenant.findById(req.params.tenantId, (err, tenant) => {
          if (err || !tenant) return res.status(400).send(err || { error: "Tenant not found" });
          tenant.apartment = req.params.apartmentId;
          tenant.save((err, savedTenant) => {
            return res.status(err ? 400 : 200).send(err || savedTenant);
            // res.send(savedTenant);

          });

        });


      });
    }

  });
});

//remove tenant from apartment
router.delete('/:apartmentId/removeTenant/:tenantId', (req, res) => {

  Apartment.findById(req.params.apartmentId, (err, apartment) => {
    if (err || !apartment) return res.status(400).send(err || { error: "Apartment not found" });


    apartment.update({ $pull: { tenants: req.params.tenantId} }, (err, result) => {

      if (err) return res.status(400).send(err);
      // console.log(apartment.curCapacity,apartment.tenants.length);
      // console.log(result.nModified);
      apartment.curCapacity -= 1;
      Tenant.findById(req.params.tenantId, (err, tenant) => {
        if (err || !tenant) return res.status(400).send(err || { error: "Tenant not found" });
        tenant.apartment = null;
        tenant.save((err, savedTenant) => {
          if(err) return res.status(err ? 400 : 200).send(err);
          // res.send(result);
          apartment.save((err,savedApt) => {
            if(err) return res.status(400).send(err);
            res.send(savedApt);
          })
        });

      })

    })


  });
});




module.exports = router;
