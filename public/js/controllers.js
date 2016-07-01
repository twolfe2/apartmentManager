'use strict';



var app = angular.module('myApp');


app.controller('mainCtrl', function() {
  console.log('hello!');
});



app.controller('dashboardCtrl', function($scope, Apartment) {

  // console.log('dashboardCtrl!');
  

  init();

  function init() {
    Apartment.getStats() 
      .then(res => {

       $scope.stats = res.data;
      })
  }
});


app.controller('apartmentManagerCtrl', function($scope,$state,Apartment,$stateParams) {

  $scope.altImage = 'http://us.flyingtiger.com/Content/img/noPicture.png';
  init();

  function init() {
    Apartment.getApartments()
      .then(res => {
        $scope.apartments = res.data;
      });

  }

  let flag = 0;
  $scope.deleteApartment = (id) => {

     flag ||alert('This action is not recommended. Click ok and then delete again to continue');
     if(!flag) {
      flag++;
      return;
     }

    Apartment.deleteApartment(id)
      .then(() => {
        alert('Apartment Deleted');
        flag=0;
        $state.reload('apartmentManager');

      })
  }
  


});


app.controller('tenantManagerCtrl', function(Tenant,$scope,$state) {
  // console.log('tenantManagerCtrl!');
 init();

  function init() {
    Tenant.getTenants()
      .then(res => {
        // console.log(res.data);
        $scope.tenants = res.data;
      });

  }


  $scope.invokeEdit = (id, tenant) => {
    $state.go('editTenant', {id, tenant});
  }




   $scope.deleteTenant = (id) => {


    Tenant.deleteTenant(id)
      .then(() => {
        alert('Tenant Deleted');
        $state.reload('tenantManager');

      })
  }

});


app.controller('apartmentInfoCtrl', function(Apartment,$scope, $stateParams) {
  // console.log('apartmentInfoCtrl!');
    
  init();


  function init() {
    Apartment.getApartment($stateParams.id) 
      .then(res => {
        // debugger;
        $scope.apartment = res.data;
      })
  }

});


app.controller('tenantInfoCtrl', function(Tenant,$scope, $stateParams) {
  // console.log('apartmentInfoCtrl!');
    
  init();

  function init() {
    Tenant.getTenant($stateParams.id) 
      .then(res => {
        $scope.tenant = res.data;
      })
  }

});


app.controller('addApartmentCtrl', function($scope, Apartment,$state) {
  // console.log('hello!');
  $scope.addApartment = () => {
    Apartment.addApartment($scope.newApartment)
      .then(() => {
        alert('added');
        $state.go('apartmentManager');
      })
  }
});




app.controller('addTenantCtrl', function($scope,Tenant,$state) {
  // console.log('hello!');
  $scope.addTenant = () => {
    Tenant.addTenant($scope.newTenant)
      .then(() => {
        alert('added');
        $state.go('tenantManager');
      })
  }
});


app.controller('addTenantToAptCtrl', function($scope,$stateParams,Apartment,$state, Tenant) {

  $scope.name = $stateParams.name;
  let apartmentId = $stateParams.id;

  init()

  $scope.addTenantToApt = (tenantId) => {
    // console.log(tenantId);
    Apartment.addTenantToApt(apartmentId,tenantId)
      .then(()=> {
        alert('Tenant added');
        $state.go('apartmentManager')
      })

  }

  function init() {
    Tenant.getTenants()
      .then(res => {
        // console.log(res.data);
        $scope.tenants = res.data;
      });
  }
  
});

app.controller('editApartmentCtrl', function($scope, $state, Apartment, $stateParams)  {
  
  $scope.newApartment = $stateParams.apartment;

  $scope.editApartment = () => {
    Apartment.editApartment($stateParams.id, $scope.newApartment)
      .then(() => {
        alert('Edit complete');
        $state.go('apartmentManager');
      })
  }

})



app.controller('editTenantCtrl', function($scope, $state, Tenant, $stateParams)  {
  
  $scope.newTenant = $stateParams.tenant;

  
  $scope.editTenant = () => {
    Tenant.editTenant($stateParams.id, $scope.newTenant)
      .then(() => {
        alert('Edit complete');
        $state.go('tenantManager');
      })
  }

})






