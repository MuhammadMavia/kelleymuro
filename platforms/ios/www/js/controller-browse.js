angular.module('starter.controller-browse', [])


.controller('BrowseCtrl', function($scope, $state, $stateParams, Items, Categories, Utils) {

  $scope.ProductsMeta = {};
  $scope.ProductsIcons = {};
  $scope.ProductsRatings = {}; // **
  $scope.status     = Categories;
  $scope.Categories = Categories;
  $scope.CategoryNonEmpty = {};

  $scope.doRefresh = function() {
    $state.go($state.current, {}, {reload: true});
    $scope.$broadcast('scroll.refreshComplete');
    // this might need to be updated to reload the data
  };

  $scope.$on('$ionicView.enter', function(e) {
    $scope.categoryId = $stateParams.categoryId;
    if($scope.categoryId != undefined && $scope.Categories.hasOwnProperty($scope.categoryId)) {
      $scope.status['categoryName'] = $scope.Categories[$scope.categoryId].title
    }
    if($state.current.name == 'app.browse-category' && $scope.categoryId != undefined) {
      $scope.loadLatest($scope.categoryId, 1000)
    }
  });


  // default sorting options
  $scope.status['sort'] = {
    property: 'Date',
    method: 'desc',
    selectMode: false,
  };

  // method to change sorting options
  $scope.sortBy = function(property, method) {
    $scope.status['sort'] = {
      property: property,
      method: method,
    }
    $scope.status.sort["selectMode"] = false;
    $scope.loadLatest($scope.categoryId, 1000);
  };

  // collapse or trigger the selections
  $scope.selectSort = function() {
    if(!$scope.status.sort.selectMode) {
      $scope.status.sort["selectMode"] = true;
    } else {
      $scope.status.sort["selectMode"] = false;
    }
  };

  $scope.loadLatest = function(categoryId, limitValue) {
    if(categoryId != null && categoryId != undefined && categoryId != "") {

      $scope.status[categoryId]['loading'] = true;
      var optFormData = {categoryId: categoryId};

      // retrieve the latest data
      Items.getViewProductMeta('view-categoryId', 'timestamp_creation', limitValue, optFormData).then(
        function(ProductsMeta){
          if(ProductsMeta != null) {
              $scope.ProductsMeta[categoryId]     =
              Utils.sortArray(Utils.arrayValuesAndKeys(ProductsMeta), $scope.status.sort);

              // --> @dependencies
              getProductsIcons(ProductsMeta, categoryId); //getProductsRatings(ProductsMeta);
          };
          $scope.CategoryNonEmpty[categoryId]   = ProductsMeta != null; // hide empty categories
        }, function(error){
          $scope.status[categoryId]['loading']  = false;
          console.log(error)
        }
      )
    }
  };

  // retrieve the dependencies (of ProductsMeta)
  function getProductsIcons(ProductsMeta, categoryId) {
    angular.forEach(ProductsMeta, function(value, productId){
      Items.getProductIcon(productId).then(
        function(productIcon){
            $scope.ProductsIcons[productId] = productIcon;
            $scope.status[categoryId]['loading'] = false;
        },
        function(error){
          console.log(error)
        }
      )
    });
  };

  function getProductsRatings(ProductsMeta) {
    angular.forEach(ProductsMeta, function(value, productId){
      ProductRatings.loadCache(productId).then(
        function(productRatingCache){
          $scope.ProductsRatings[productId] = productRatingCache;
        },
        function(error){
          //console.log(error)
        }
      )
    });
  };

  // custom functions to avoid Lexer error
  // https://docs.angularjs.org/error/$parse/lexerr?p0=Unterminated
  $scope.getLoadingMode = function(categoryId) {
    return $scope.status[categoryId]['loading'];
  };
  $scope.getProductsMeta = function(categoryId) {
    return $scope.ProductsMeta[categoryId];
  };
  $scope.getProductIcon = function(productId) {
    return $scope.ProductsIcons[productId];
  };

  // functions to handle next states
  $scope.goToCategory = function(categoryId) {
    $state.go("app.browse-category", {categoryId: categoryId})
  };
  $scope.goToItem = function(productId) {
    $state.go("app.item", {productId: productId})
  };
  $scope.goTo = function(nextState) {
    $state.go(nextState)
  };

  /**
  * todo: add lazy loading
  */


})
