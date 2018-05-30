'use strict';

angular.module('myApp.viewLogin', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/viewLogin', {
            templateUrl: 'viewLogin/viewLogin.html',
            controller: 'ViewLoginCtrl'
        });
    }])

    .controller('ViewLoginCtrl', ['$http', '$window', 'AuthService', function ($http, $window, AuthService) {
        var self = this;
        var URL = "http://localhost:8080";

        this.loginUser = {
            'login': '',
            'password': ''
        };
        this.sendLoginForm = function () {
            $http.post(URL + '/auth/authenticate', self.loginUser)
                .then(
                    function (odpowiedz) {
                        //jesli sie uda
                        console.log(odpowiedz);

                        var token = odpowiedz.data.token;
                        var user_id = odpowiedz.data.id;

                        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                        $window.sessionStorage.setItem('token', token);
                        $window.sessionStorage.setItem('user_id', user_id);

                        AuthService.loggedInUser = user_id;

                    },
                    function (odpowiedzKiedyBlad) {
                        //nie udało sie
                        console.log(odpowiedzKiedyBlad);
                    });
        };
    }]);