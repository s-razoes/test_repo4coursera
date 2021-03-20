(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController );
LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
  $scope.message = "";
  $scope.list_of_items = "";
  $scope.color_style = "Black";
  $scope.checkIfTooMuch = function (){
    if ($scope.list_of_items == ""){
      $scope.message = "Please enter data first!";
      $scope.color_style = "Red";
      return;
    }
    var items = $scope.list_of_items.split(',')
      .filter(function (val){
        return val.trim().length > 0;
      });
    var countOfItems = items.length;
    if(countOfItems <= 3){
      $scope.message = "Enjoy";
    }else{
      $scope.message = "Too Much!";
    }
    $scope.color_style = "Green";
  };
}

})();
