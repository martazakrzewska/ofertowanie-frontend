'use strict';

angular.module('myApp.authService', ['ngRoute'])
    .service('AuthService', ['$http', '$rootScope', function ($http, $rootScope) {
        this.loggedInUser = '';

    }]);