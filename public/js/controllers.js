'use strict';



var app = angular.module('myApp');


app.controller('mainCtrl', function() {
  console.log('hello!');
});



app.controller('dashboardCtrl', function() {
  console.log('dashboardCtrl!');
});


app.controller('apartmentManagerCtrl', function($scope,$state,Apartment,$stateParams) {


  init();

  function init() {
    Apartment.getApartments()
      .then(res => {
        $scope.apartments = res.data;
      });

  }
  


});


app.controller('tenantManagerCtrl', function() {
  console.log('tenantManagerCtrl!');
});


app.controller('apartmentInfoCtrl', function(Apartment,$scope, $stateParams) {
  // console.log('apartmentInfoCtrl!');
    
  init();

  function init() {
    Apartment.getApartment($stateParams.id) 
      .then(res => {
        $scope.apartment = res.data;
      })
  }

});



app.controller('addApartmentCtrl', function() {
  console.log('hello!');
});




app.controller('addTenantCtrl', function() {
  console.log('hello!');
});
