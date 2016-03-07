angular.module('starter.service-categories', [])
.factory('Categories', function() {
  /**
  * List of pre-defined categories (example only!)
  *
  * If you expect that the categories might change frequently over time,
  * then it is recommended to store them on the server-side (Firebase)
  * and retrieve the list from here.
  *
  */
  return {
  'accessories': {
      title: "accessories"
    },
    'bottoms': {
        title: "bottoms"
    },
    'dresses': {
        title: "dresses"
    },
    'jackets': {
        title: "jackets"
    },
    'shoes': {
        title: "shoes"
    },
    'tops': {
        title: "tops"
    }
  }
})
