'use strict';

angular.module('myApp.customerService', ['ngRoute'])
    .service('CustomerService', ['$http', '$rootScope', function ($http, $rootScope) {
        var URL = "http://localhost:8080"
        this.getAll = getAll;

        function getAll() {
            $http.get(URL + '/customer/getAll')
                .then(function (odpowiedz) {
                    $rootScope.customers = [];
                    for (var index in odpowiedz.data) {
                        $rootScope.customers.push(odpowiedz.data[index]);
                    }
                    console.log(odpowiedz.data);
                }, function (odpowiedzKiedyBlad) {
                    console.log(odpowiedzKiedyBlad);
                });
        }
    }]);

