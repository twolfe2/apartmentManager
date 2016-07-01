'use strict';


var app = angular.module('myApp', ['ui.router']);


app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url:'/',
      templateUrl:'/html/home.html',
      controller: 'mainCtrl'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: '/html/dashboard.html',
      controller: 'dashboardCtrl'
    })
    .state('apartmentManager', {
      url: '/propertyManager',
      templateUrl: '/html/apartmentManager.html',
      controller: 'apartmentManagerCtrl'
    })
    .state('tenantManager', {
      url: '/tenantManager',
      templateUrl: '/html/tenantManager.html',
      controller: 'tenantManagerCtrl'
    })
    .state('apartmentInfo', {
      url: '/apartmentInfo/:id',
      templateUrl: '/html/apartmentInfo.html',
      controller: 'apartmentInfoCtrl'
    })
    .state('tenantInfo', {
      url: '/tenantInfo/:id',
      templateUrl: '/html/tenantInfo.html',
      controller: 'tenantInfoCtrl'
    })
    .state('addApartment', {
      url: '/addApartment',
      templateUrl: '/html/addApartment.html',
      controller: 'addApartmentCtrl'
    })
    .state('addTenant', {
      url: '/addTenant',
      templateUrl: '/html/addTenant.html',
      controller: 'addTenantCtrl'
    })
    .state('addTenantToApt', {
      url: '/addTenantToApt/:id',
      templateUrl:'/html/addTenantToApt.html',
      controller: 'addTenantToAptCtrl',
      params: {name: null}
    })
    .state('editApartment', {
      url: '/editApartment/:id',
      templateUrl:'/html/editApartment.html',
      controller: 'editApartmentCtrl',
      params: {apartment: null}
    })
    .state('editTenant', {
      url: '/editTenant/:id',
      templateUrl: '/html/editTenant.html',
      controller: 'editTenantCtrl',
      params: {tenant: null}

    })


    $urlRouterProvider.otherwise('/');
})