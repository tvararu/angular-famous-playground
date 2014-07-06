'use strict';

angular.module('angularFamousPlayground', ['famous.angular', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/simple', {
        templateUrl: 'partials/simple.html',
        controller: 'SimpleCtrl'
      })
      .when('/snap-spring', {
        templateUrl: 'partials/snap-spring.html',
        controller: 'SnapSpringCtrl'
      })
      .when('/color', {
        templateUrl: 'partials/color.html',
        controller: 'ColorCtrl'
      })
      .when('/deck', {
        templateUrl: 'partials/deck.html',
        controller: 'DeckCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
