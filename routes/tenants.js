'use strict';


const express = require('express');



// api/tenants
let router = express.Router();

let Tenant = require('../models/tenant');
let Apartment = require('../models/apartment');
const mongoose = require('mongoose');




// router.get('/',(req,res) => {
//   Tenant.find({}, (err, tenants) => {
//     Apartment.find({}, (err, apartments) => {

//       tenants = tenants.map(tenant => {
//         let residingApt = apartments.filter(apartment=> {
//           return  apartments.tenants.indexOf(tenant._id) !== -1;
//         });

//         tenant.apts = residingApt;
//         return tenant;

//       });
//       res.send(tenants);


//     });
//   });
// });




router.route('/')
  .get((req, res) => {

    Tenant.find({}, (err, tenants) => {
      if (err) return res.status(400).send(err);
      res.send(tenants);

    });
  })
  .post((req, res) => {



    Tenant.create(req.body, (err, savedDoc) => {
      if (err) return res.status(400).send(err);

      res.send(savedDoc);
    });

  });

router.route('/:id')
  .delete((req, res) => {

    Tenant.findByIdAndRemove(req.params.id, (err, tenant) => {
      if (err) return res.status(400).send(err);
      // console.log(tenant);
      let apartmentId = tenant.apartment;

      //remove the tenant from an apartment if they are in one
      if (apartmentId instanceof mongoose.Types.ObjectId) {
        Apartment.findById(apartmentId, (err, apartment) => {
          if (err || !apartment) return res.status(400).send(err || { error: "Apartment not found" });


          apartment.update({ $pull: { tenants: req.params.id } }, (err, result) => {

            if (err) return res.status(400).send(err);

            apartment.curCapacity -= 1;
            apartment.save((err, savedApt) => {
              if (err) return res.status(400).send(err);
              res.send();
            })
            // res.send();
          })
        })
      } else {
        res.send()
      }
    })
  })

.get((req, res) => {

    Tenant.findById(req.params.id, (err, tenant) => {
      if (err) return res.status(400).send(err);

      res.send(tenant);
    });
  })
  .put((req, res) => {

    Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, tenant) => {
      if (err) return res.status(400).send(err);

      res.send(tenant);
    });
  });
module.exports = router;
