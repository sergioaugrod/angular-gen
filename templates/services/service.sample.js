/**
 * Services of the <%= moduleName %>
 * @name <%= name %>
 * @description
 * @author
 */

(function() {
  'use strict';

  angular
    .module('app.Service')
    .service('<%= name %>Service', <%= name %>Service);

  <%= name %>Service.$inject = ['$scope','$http'];

  /* @ngInject */
  function <%= name %>Service($scope, $http) {

  }
})();
