angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, MyService) {

    MyService.initSvg('http://cdn.shopify.com/s/files/1/0496/1029/files/Freesample.svg'); 
        //  $("#svgContainer").html("");
        // document.getElementById("svgContainer")
        //   .appendChild(responce);

        // $("path").click(function (e) {
        //   console.log("path: ", this.id);
        //   Chats.initSvg('img/mozilla.svg', function (responce) {
        //       $("#svgContainer").html("");
        //       document.getElementById("svgContainer").appendChild(responce);
        //    });
        // })
    
    
})//controller

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
