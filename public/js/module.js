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
    .state('addApartment', {
      url: '/addApartment',
      templateUrl: '/html/addApartment.html',
      controller: 'addApartmentCtrl'
    })
    .state('addTenant', {
      url: '/addApartment',
      templateUrl: '/html/addTenant.html',
      controller: 'addTenantCtrl'
    })


    $urlRouterProvider.otherwise('/');
})