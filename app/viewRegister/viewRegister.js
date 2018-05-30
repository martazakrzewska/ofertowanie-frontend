'use strict';

angular.module('myApp.viewRegister', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/viewRegister', {
            templateUrl: 'viewRegister/viewRegister.html',
            controller: 'ViewRegisterCtrl'
        });
    }])

    .controller('ViewRegisterCtrl', ['$http', '$routeParams', '$window', 'AuthService', function ($http, $routeParams, $window, AuthService) {
        var self = this;
        var URL = "http://localhost:8080";

        this.registerUser = {
            'login': '',
            'name': '',
            'password': ''
        };

        this.sendRegisterForm = function () {
            $http.post(URL + '/auth/register', self.registerUser)
                .then(
                    function (odpowiedz) {
                        console.log(odpowiedz);
                    },
                    function (odpowiedzKiedyBlad) {
                        console.log(odpowiedzKiedyBlad);
                    }
                );
        };
    }]);