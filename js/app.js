let postsData = [
  {id: 1, title:"my dog", author: 'Mark', photo_url: 'https://i.ytimg.com/vi/oGoPUw0YBAg/maxresdefault.jpg', body: 'my pup' },
  {id: 2, title:"my cat", author: 'Geo', photo_url: 'https://i.ytimg.com/vi/oGoPUw0YBAg/maxresdefault.jpg', body: 'my pup' }

]

  angular
  .module("wdinstagram", [
    "ui.router"
  ])
  .config(["$stateProvider",
    Router
  ])
  .controller("wdIndexController", [
    "$scope",
    wdIndexControllerFunction
  ])
  .controller("wdShowController", [
    "$scope",
    "$stateParams",
    "$state",
    wdShowControllerFunction
  ])
  .controller("wdNewController", [
    "$scope",
    wdNewControllerFunction
  ])
  .controller("wdEditController", [
    "$scope",
    "$stateParams",
    wdEditControllerFunction
  ])

  function wdIndexControllerFunction($scope){
    $scope.posts = postsData
    console.log($scope.author);
  }
  function wdShowControllerFunction($scope, $stateParams, $state){
    $scope.post = postsData.find(post => post.id == $stateParams.id)
    $scope.destroy = function(){
      // modfiy the postsData
      postsData.splice(($stateParams.id - 1), 1)
      $state.go("show", {id: parseInt($stateParams.id) + 1})
      // $scope.post.$delete({id: $stateParams.id})
    }
  }
  function wdNewControllerFunction($scope){
    $scope.create = function(){
      $scope.post.$save()
    }
  }
  function wdEditControllerFunction($scope, $stateParams){
    $scope.post = postsData.find(post => post.id == $stateParams.id)
    $scope.update = function(){
      $scope.post.$update({id: $stateParams.id})
    }
  }

  function Router($stateProvider){
    console.log("route!");
    $stateProvider
    .state("index", {
      url: "/" ,
      controller: "wdIndexController",
      templateUrl: "js/ng-views/index.html"
    })
    .state("new", {
      url: "/new",
      controller: "wdNewController",
      templateUrl: "js/ng-views/new.html"
    })
    .state("edit", {
      url:"/edit/:id",
      controller: "wdEditController",
      templateUrl: "js/ng-views/edit.html"
    })
    .state("show", {
      url: "/:id",
      controller: "wdShowController",
      templateUrl: "js/ng-views/show.html"
    })
  }
