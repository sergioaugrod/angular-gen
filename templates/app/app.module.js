(function() {
  'use strict';

  angular.module('app', [
      'app.core'
  ]);

  angular.module('app.core', [
      'ngRoute',
      'ui.bootstrap'
  ]);

  angular.module('app').run(Run);

  Run.$inject = ['$rootScope'];

  function Run($rootScope) {

  }
})();
