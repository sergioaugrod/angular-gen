/**
 * Controller of the <%= moduleName %>
 * @name <%= name %>
 * @description
 * @author
 */

(function() {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .controller('<%= name %>Controller', <%= name %>Controller);

  <%= name %>Controller.$inject = ['$scope'];

  /* @ngInject */
  function <%= name %>Controller($scope) {

  }
})();
