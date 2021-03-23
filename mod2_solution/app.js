(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService)
;

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var controller = this;

  controller.boughtItem = function(itemIndex){
    ShoppingListCheckOffService.boughtItem(itemIndex);
  };

  controller.getList = function (){
    return ShoppingListCheckOffService.getToBuyList();
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var controller = this;

  controller.getList = function (){
    return ShoppingListCheckOffService.getBoughtList();
  };
}


function ShoppingListCheckOffService(){
  var service = this;

  service.ItemsListToBuy = [
      { name: "cookie", quantity: 10 },
      { name: "chips", quantity: 20 },
      { name: "chocolate milk", quantity: 2 }
    ];
  service.ItemsListBought = [];

  service.getToBuyList = function (){
    return service.ItemsListToBuy;
  };

  service.getBoughtList = function (){
    return service.ItemsListBought;
  };

  service.boughtItem = function (itemIndex){
    var item = service.ItemsListToBuy[itemIndex];
    service.ItemsListBought.push(item);
    service.ItemsListToBuy.splice(itemIndex,1);
  };
}

})();
