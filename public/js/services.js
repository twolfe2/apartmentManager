'use strict';

var app = angular.module('myApp');



app.service('Apartment', function($http) {
  this.getStats = () => {
    return $http.get('/api/apartments/stats')
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

  this.getApartments = () => {
    return $http.get('/api/apartments')
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

  this.getApartment = (apartmentId) => {
    return $http.get(`/api/apartments/${apartmentId}`)
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

  this.editApartment = (apartmentId, apartmentObj) => {
    return $http.put(`/api/apartments/${apartmentId}`, apartmentObj)
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

  this.addApartment = apartmentObj => {
    return $http.post('/api/apartments', apartmentObj)
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

  this.deleteApartment = apartmentId => {
    return $http.delete(`/api/apartments/${apartmentId}`)
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

  this.addTenantToApt = (aptId, tenantId) => {
    return $http.put(`/api/apartments/${aptId}/addTenant/${tenantId}`)
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

});






app.service('Tenant', function($http) {

  this.getTenants = () => {
    return $http.get('/api/tenants')
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

  this.getTenant = (tenantId) => {
    return $http.get(`/api/tenants/${tenantId}`)
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }



  this.addTenant = tenantObj => {
    return $http.post('/api/tenants', tenantObj)
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }


  this.editTenant = (tenantId, tenantObj) => {
    return $http.put(`/api/tenants/${tenantId}`, tenantObj)
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

  this.deleteTenant = tenantId => {
    return $http.delete(`/api/tenants/${tenantId}`)
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }


})
