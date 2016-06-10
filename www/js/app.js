// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('cartolapp', ['ionic'])

app.controller('cartolactrl', function($http, $scope){
// $scope.cartola = [];
$scope.items = [];

$http.get('https://api.cartolafc.globo.com/atletas/mercado')
    .success(function(response){
$scope.items = response.atletas;

  });


// ----------------------------------
$scope.destaques = [];
$http.get('https://api.cartolafc.globo.com/mercado/destaques')
    .success(function(dados){
      angular.forEach(dados, function(child){
            $scope.destaques.push(child);
            // console.log(dados);
        });
  });


$scope.news = [];

$http.get('https://api.cartolafc.globo.com/auth/noticias')
.success(function(dadosNoticias){
angular.forEach(dadosNoticias, function(dadosnew){
    $scope.news.push(dadosnew);
    console.log(dadosNoticias);
});
});
});

// --------------------------------------



app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// app.controller('cartolactrl', function($scope, $timeout, PersonService) {
//   $scope.items = [];

//   PersonService.GetFeed().then(function(items){
//     $scope.items = items;
//   });

//   $scope.doRefresh = function() {
//     PersonService.GetNewUser().then(function(items){
//       $scope.items = items.concat($scope.items);

//       //Stop the ion-refresher from spinning
//       $scope.$broadcast('scroll.refreshComplete');
//     });
//   };

// });



// app.factory('PersonService', function($http){
//   var BASE_URL = "http://www.marcelsantos.com.br/mercado.json";
//   var items = [];

//   return {
//     GetFeed: function(){
//       return $http.get(BASE_URL).then(function(response){
//         items = response.data.atletas;
//         return items;
//       });
//     },
//     GetNewUser: function(){
//       return $http.get(BASE_URL).then(function(response){
//         items = response.data.atletas;
//         return items;
//       });
//     }
//   }
// })
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'cartolactrl'
  })


    .state('app.noticias', {
      url: '/noticias',
      views: {
        'menuContent': {
          templateUrl: 'templates/noticias.html'
        }
      }
    })
       .state('app.pontuados', {
      url: '/pontuados',
      views: {
        'menuContent': {
          templateUrl: 'templates/pontuados.html'
        }
      }
    })

       .state('app.destaques', {
      url: '/destaques',
      views: {
        'menuContent': {
          templateUrl: 'templates/destaques.html'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/noticias');
});