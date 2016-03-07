// Ionic Starter App

var FBURL                       = "https://shop-strand.firebaseio.com/";
var SERVER_SIDE_URL             = "https://shopstrand-server-kelleymuro.c9users.io";
var STRIPE_API_PUBLISHABLE_KEY  = "pk_test_z7J5yrs7JR8C7EcwDC4AeEyJ";

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'firebase',
  'stripe.checkout',
  'starter.controller-account',
  'starter.controller-app',
  'starter.controller-browse',
  'starter.controller-checkout',
  'starter.controller-item',
  'starter.controller-orders',
  'starter.controller-overview',
  'starter.service-auth',
  'starter.service-cart',
  'starter.service-categories',
  'starter.service-codes',
  'starter.service-items',
  'starter.service-orders',
  'starter.service-payment',
  'starter.service-profile',
  'starter.service-utils',
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, StripeCheckoutProvider) {

  // Define your STRIPE_API_PUBLISHABLE_KEY
  StripeCheckoutProvider.defaults({key: STRIPE_API_PUBLISHABLE_KEY});

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'BrowseCtrl'
        }
      }
  })

  .state('app.browse-category', {
      url: '/browse/:categoryId',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse-category.html',
          controller: 'BrowseCtrl'
        }
      }
  })

  .state('app.item', {
      url: '/item/:productId',
      views: {
        'menuContent': {
          templateUrl: 'templates/item.html',
          controller: 'ItemDetailCtrl'
        }
      }
  })

  .state('app.overview', {
      url: '/overview',
      views: {
        'menuContent': {
          templateUrl: 'templates/overview.html',
          controller: 'OverviewCtrl'
        }
      }
  })
  .state('app.checkout', {
      url: '/checkout',
      views: {
        'menuContent': {
          templateUrl: 'templates/checkout.html',
          controller: 'CheckOutCtrl'
        }
      },
      resolve: {
        // checkout.js isn't fetched until this is resolved.
        stripe: StripeCheckoutProvider.load
      }
  })

  .state('app.account', {
    url: '/account/:nextState',
    views: {
      'menuContent': {
        templateUrl: 'templates/account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('app.orders', {
    url: '/orders',
    views: {
      'menuContent': {
        templateUrl: 'templates/orders.html',
        controller: 'OrdersCtrl'
      }
    }
  })

  .state('app.order-detail', {
    url: '/orders/:orderId',
    views: {
      'menuContent': {
        templateUrl: 'templates/order-detail.html',
        controller: 'OrderDetailCtrl'
      }
    }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/browse');
});
