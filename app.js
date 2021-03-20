(function () {
'use strict';

angular.module('myFirstApp', [])
.controller('myFirstController', function ($scope){
  $scope.name = 'Sérgio';
  $scope.sayHello = function (){
    return "hey from function";
  };
});

})();
