/**
 * @name angular.screenfull.js
 * @author Anis ABID
 * @description Angular Fullscreen Module
 * @version 1.0.0
 */

'use strict';


angular
  .module('screenfull', [])

  .directive('ngScreenfull', function () {
    return {
      scope: true,
      restrict: 'EA',
      controller: function ($scope) {

        $scope.screenfull = {
          element: null,
          toggle: false
        };

        this.setScreenfullToggle = function () {
          return !$scope.screenfull.toggle;
        };

      },
      link: function (scope, element, attributes, controller) {
        scope.screenfull.element = element;
      }

    };
  })

  .directive('ngScreenfullBtnToggle', function () {
    return {
      scope: false,
      restrict: 'EA',
      require: '^ngScreenfull',
      replace: true,
      template: '<a href="" class="icon screenfull"><i class="t"></i><i class="b"></i></a>',
      link: function (scope, element, attributes, controller) {

        element.bind('click', function () {
          scope.screenfull.toggle = controller.setScreenfullToggle();
          scope.$$phase || scope.$apply();
        });

        scope.$watch('screenfull.toggle', function () {
          element.toggleClass('on', scope.screenfull.toggle);
          var elem = scope.screenfull.element.context;
          if (screenfull.enabled) {
            screenfull.toggle(elem);
          }
        });
      }
    };
  })

  .directive('ngScreenfullToggle', function () {
    return {
      scope: true,
      restrict: 'EA',
      link: function (scope, element) {

        scope.screenfull = {
          toggle: false
        };

        element.bind('click', function () {
          scope.screenfull.toggle = !scope.screenfull.toggle;
          scope.$$phase || scope.$apply();
        });

        scope.$watch('screenfull.toggle', function () {
          element.toggleClass('full', scope.screenfull.toggle);
          var elem = element.context;
          if (screenfull.enabled) {
            screenfull.toggle(elem);
          }
        });
      }
    };
  });