angular.module('MyApp', ['ui.router', 'satellizer'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html'
      });

    $authProvider.twitter({
      url: '/auth/twitter'
    });
  }).run(function($rootScope, $auth){
      $rootScope.logout = function(){
          $auth.logout();
      };
      $rootScope.isAuthenticated = function(){
          return $auth.isAuthenticated();
      };
  }).controller('AppController', ['$scope', '$auth', '$http', function($scope, $auth, $http){
        $scope.authenticate = function(provider){
            $auth.authenticate(provider)
            .then(function(data) {
                $scope.username = data.data.username;
                console.log(data);
            }).catch(function(err){
                console.log(err);
            });
        };
  }]);
