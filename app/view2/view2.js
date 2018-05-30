'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$http', function ($http) {
        var self = this;
        var URL = "http://localhost:8080";
        this.Customerslist = [];

        this.customerDto = {
            // 'name': '',
            // 'adress': '',
            // 'nip': '',
            // 'phoneNumber': ''
        };

        this.dodajCustomera = function () {
            $http.post(URL + '/customer/add', self.customerDto)
                .then(
                    function (odpowiedz) {
                        console.log(odpowiedz);
                    },
                    function (odpowiedzKiedyBlad) {
                        console.log(odpowiedzKiedyBlad);
                    });
        };
    }]);