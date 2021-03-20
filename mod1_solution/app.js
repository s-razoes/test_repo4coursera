(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController );
LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
  $scope.message = "Please enter data first.";
  $scope.list_of_items = "";
  $scope.message_style = "Red";
  $scope.lunchCheck = function (){
    var items = $scope.list_of_items.split(',')
      .filter(function (val){
        return val.trim().length > 0;
      });
    var countOfItems = items.length;
    if(countOfItems == 3){
      $scope.message = "Enjoy";
      $scope.message_style = "Green";
    }else
      if(countOfItems == 4){
        $scope.message = "Too Much!";
        $scope.message_style = "Green";
      }else{
        $scope.message = "Sounds like an incorrect list or items!";
        $scope.message_style = "Red";
      }
  };
}

})();
