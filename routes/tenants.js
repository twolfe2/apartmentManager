'use strict';


const express = require('express');



// api/tenants
let router = express.Router();

let Tenant = require('../models/tenant');





router.route('/')
  .get((req,res) => {
  
  Tenant.find({}, (err, tenants)=> {
    if(err) return res.status(400).send(err);
    res.send(tenants);

  });
})
  .post((req,res) => {


    
    Tenant.create(req.body, (err, savedDoc) => {
      if(err) return res.status(400).send(err);

      res.send(savedDoc);
    });
   
});
  
  router.route('/:id')
    .delete((req,res) => {
      
      Tenant.findByIdAndRemove(req.params.id, (err) => {
        if(err) return res.status(400).send(err);

        res.send();
      });
    })
    .get((req,res) => {
      
      Tenant.findById(req.params.id, (err, tenant) => {
        if(err) return res.status(400).send(err);

        res.send(tenant);
      });
    })
    .put((req, res) => {
      
      Tenant.findByIdAndUpdate(req.params.id, req.body,{new: true}, (err, tenant) => {
        if(err) return res.status(400).send(err);

        res.send(tenant);
      });
    });
module.exports = router;
