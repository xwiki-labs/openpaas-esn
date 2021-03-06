(function() {
  'use strict';

  angular.module('esn.calendar', [
    'uuid4',
    'ng.deviceDetector',
    'naturalSort',
    'ngTouch',
    'restangular',
    'mgcrea.ngStrap.datepicker',
    'mgcrea.ngStrap.aside',
    'mgcrea.ngStrap.modal',
    'materialAdmin',
    'AngularJstz',
    'angularMoment',
    'esn.media.query',
    'linagora.esn.graceperiod',
    'op.dynamicDirective',
    'esn.router',
    'esn.core',
    'esn.header',
    'esn.authentication',
    'esn.form.helper',
    'esn.ical',
    'esn.calMoment',
    'esn.community',
    'esn.notification',
    'esn.widget.helper',
    'esn.lodash-wrapper',
    'esn.aggregator',
    'esn.provider',
    'esn.search',
    'esn.highlight'
  ])
    .config(function($stateProvider, routeResolver, dynamicDirectiveServiceProvider) {
      $stateProvider

      .state('calendarForCommunities', {
        url: '/calendar/communities/:community_id',
        templateUrl: '/calendar/app/calendar/community-calendar',
        abstract: true,
        resolve: {
          community: routeResolver.api('communityAPI', 'get', 'community_id', '/communities')
        },
        reloadOnSearch: false
      })
      .state('calendarForCommunities.main', {
        url: '',
        views: {
          content: {
            template: '<calendar-view calendar-home-id="calendarHomeId" ui-config="uiConfig"/>',
            controller: function($scope, community, UI_CONFIG) {
              $scope.calendarHomeId = community._id;
              $scope.uiConfig = angular.copy(UI_CONFIG);
              $scope.uiConfig.calendar.editable = false;
              $scope.uiConfig.calendar.selectable = false;
            }
          }
        }
      })

      .state('calendar', {
        url: '/calendar',
        templateUrl: '/calendar/app/calendar/user-calendar',
        abstract: true,
        resolve: {
          calendarHomeId: function(calendarHomeService) {
            return calendarHomeService.getUserCalendarHomeId();
          }
        },
        controller: function($scope, calendarHomeId) {
          $scope.calendarHomeId = calendarHomeId;
        },
        reloadOnSearch: false
      })
      .state('calendar.main', {
        url: '',
        views: {
          content: {
            templateUrl: '/calendar/app/calendar/calendar-main',
            controller: function($scope, calendarHomeId, UI_CONFIG) {
              $scope.calendarHomeId = calendarHomeId;
              $scope.uiConfig = angular.copy(UI_CONFIG);
            }
          }
        }
      })
      .state('calendar.edit', {
        url: '/edit/:calendarId',
        views: {
          content: {
            template: '<calendar-configuration calendar-home-id="calendarHomeId" calendar="calendar"/>',
            resolve: {
              calendar: function($stateParams, calendarService, calendarHomeId) {
                return calendarService.getCalendar(calendarHomeId, $stateParams.calendarId);
              }
            },
            controller: function($scope, calendarHomeId, calendar) {
              $scope.calendarHomeId = calendarHomeId;
              $scope.calendar = calendar;
            }
          }
        }
      })
      .state('calendar.add', {
        url: '/add',
        views: {
          content: {
            template: '<calendar-configuration calendar-home-id="calendarHomeId"/>',
            controller: function($scope, calendarHomeId) {
              $scope.calendarHomeId = calendarHomeId;
            }
          }
        }
      })
      .state('calendar.list', {
        url: '/list',
        views: {
          content: {
            template: '<calendars-configuration calendars="calendars"/>',
            resolve: {
              calendars: function(calendarService, calendarHomeId) {
                return calendarService.listCalendars(calendarHomeId);
              }
            },
            controller: function($scope, calendars) {
              $scope.calendars = calendars;
            }
          }
        }
      })
      .state('calendar.event', {
        url: '/:calendarHomeId/event/:eventId',
        abstract: true,
        views: {
          content: {
            template: '<div ui-view="content"/>'
          }
        },
        resolve: {
          event: function($stateParams, $state, calPathBuilder, calEventService, calEventUtils, notificationFactory) {
            var eventPath = calPathBuilder.forEventId($stateParams.calendarHomeId, $stateParams.eventId);

            return calEventUtils.getEditedEvent() || calEventService.getEvent(eventPath).catch(function(error) {
              if (error.status !== 404) {
                notificationFactory.weakError('Cannot display the requested event, an error occured: ', error.statusText);
              }
              $state.go('calendar.main');
            });
          }
        }
      })
      .state('calendar.event.form', {
        url: '/form',
        views: {
          content: {
            template: '<cal-event-full-form event="event"/>',
            controller: function($scope, event) {
              $scope.event = event;
            }
          }
        }
      })
      .state('calendar.event.consult', {
        url: '/consult',
        views: {
          content: {
            template: '<cal-event-consult-form event="event"/>',
            controller: function($scope, event) {
              $scope.event = event;
            }
          }
        }
      });

      var calendar = new dynamicDirectiveServiceProvider.DynamicDirective(true, 'application-menu-calendar', {priority: 40});

      dynamicDirectiveServiceProvider.addInjection('esn-application-menu', calendar);
    })
    .run(function(calEventsProviders, calRegisterTimezones) {
      calRegisterTimezones();
      calEventsProviders.setUpSearchProviders();
    });
})();
