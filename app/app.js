'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.viewLogin',
  'myApp.viewRegister',
  'myApp.customerService',
  'myApp.authService',
  'ui.router',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider','$stateProvider', function($locationProvider, $routeProvider, $stateProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});

  $stateProvider
      .state('view1', {
          url: '/view1',
          templateUrl: 'view1/view1.html',
          controller: 'View1Ctrl'
      })
      .state('view2', {
          url: '/view2',
          templateUrl: 'view2/view2.html',
          controller: 'View2Ctrl'
      })
      .state('viewLogin', {
      url: '/viewLogin',
      templateUrl: 'viewLogin/viewLogin.html',
      controller: 'ViewLoginCtrl'
      })
      .state('viewRegister', {
      url: '/viewRegister',
      templateUrl: 'viewRegister/viewRegister.html',
      controller: 'ViewRegisterCtrl'
      })

}]).run(function (AuthService, $http, $window, $rootScope) {
    $rootScope.logout = function () {
        $window.sessionStorage.removeItem('token');
        $window.sessionStorage.removeItem('user_id');
        AuthService.loggedInUser = '';
    };
  if (AuthService.loggedInUser === ''){
      console.log('redirect');
    //jestesmy niezalogowani
      var token = $window.sessionStorage.getItem('token');
      var user_id = $window.sessionStorage.getItem('user_id');

      if (token === null || token === undefined || user_id === null || user_id === undefined){
        // tzn - nie mamy danych logowania w sesji
          $window.location = "#!/viewLogin";
      } else {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        AuthService.loggedInUser = user_id;
      }
  }
})
    .run(function ($rootScope, $window, AuthService, $location) {
        $rootScope.$on('$routeChangeStart', function ($event, next, current) {
            if (next.originalPath !== '/viewLogin' && next.originalPath !== '/viewRegister') {
                console.log(AuthService.loggedInUser);
                if (AuthService.loggedInUser === '') {
                    $location.path('/viewLogin');
                }
            }
        });
    });
