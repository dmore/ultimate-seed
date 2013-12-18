/*
 * client/js/admin/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.admin', []);

// Controllers
require('./controllers/_layout')(ngModule);
require('./controllers/dashboard')(ngModule);
require('./controllers/users')(ngModule);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app.admin', {
      abstract: true,
      url: '/admin',
      views: {
        '@': {
          controller: '_LayoutCtrl',
          template: rhtml('./templates/_layout.html')
        }
      },
      data: {
        menuTitle: 'Admin'
      }
    })
    .state('app.admin.dashboard', {
      url: '/dashboard',
      views: {
        '@app.admin': {
          controller: 'DashboardCtrl',
          template: rhtml('./templates/dashboard.html')
        }
      },
      data: {
        title: 'Dashboard'
      }
    })
    .state('app.admin.users', {
      url: '/users',
      views: {
        '@app.admin': {
          controller: 'UsersCtrl',
          template: rhtml('./templates/users.html')
        }
      },
      data: {
        title: 'Users'
      }
    });
});

// Redirections
ngModule.run(function (route) {
  route.redirect({
    '/admin': 'app.admin.dashboard'
  });
});

// Authorizations
ngModule.run(function (auth) {
  auth.authorize({
    'app.admin': {
      allow: ['admin']
    }
  });
});
