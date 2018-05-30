'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$http', 'CustomerService', function($http, CustomerService) {
  var URL = "http://localhost:8080";
  var self = this;
  this.zmienna = {};
  this.szukanyCustomer = 1;

  CustomerService.getAll();

  this.pobierzDane = function () {
      $http.get(URL + "/customer/get/" + self.szukanyCustomer)
          .then(
              function (odpowiedz) {
                  console.log(odpowiedz);
                  self.zmienna = odpowiedz.data;
              },
              function (odpowiedzGdyBlad) {

              });
  };
}]);