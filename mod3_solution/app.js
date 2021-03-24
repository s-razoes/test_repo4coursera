(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',FoundItemsDirective)
.constant('MenuItemsRESTEndPoint','https://davids-restaurant.herokuapp.com/menu_items.json')
;

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'FoundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  //var list = this;

}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  const controller = this;

  controller.items = [];
  controller.searchTerm = "";
  controller.displayError = false;

  controller.onRemove = function (itemIndex){
    controller.items.splice(itemIndex,1);
  };

  controller.searchItems = function(){
    if(controller.searchTerm == ""){
      controller.displayError = true;
      return;
    }
    controller.displayError = false;
    var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);

    promise.then(function (response) {
      controller.items = response;
      if(response.length == 0)
        controller.displayError = true;
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  function DisplayErrorMessage(){
    controller.items = [];
  }

  function HideErrorMessage(){
    controller.items = [];
  }
}

MenuSearchService.$inject = ['$http','MenuItemsRESTEndPoint'];
function MenuSearchService($http,MenuItemsRESTEndPoint){
  const service = this;

  service.getMatchedMenuItems = function(searchTerm) {
        return $http({
          method: "GET",
          url: MenuItemsRESTEndPoint
        }).
        then(function (result) {
          var foundItems = result.data.menu_items.filter(function(value){
            return value.description.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1;
          });

          return foundItems;
        });
  };
}

})();
