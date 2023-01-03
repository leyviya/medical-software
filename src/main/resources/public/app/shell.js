
//import {getLoginContextValues, setLoginGlobalProps} from './controllers/login.js';
import { LoginController } from './controllers/loginController.js';
import { DepartmentController } from './controllers/departmentController.js';
import { PatientController } from './controllers/patientsController.js';
import { StaffController } from './controllers/staffController.js';
import { PatientActivityController } from './controllers/patientsActivityController.js';
import { TransactionsController } from './controllers/transactionsController.js';
import { LogoutController } from './controllers/logoutController.js';
import { SessionService } from './services/session.js';

var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./login.html",
            controller: "loginCtrl",
            requireGuest: true
        })
        .when("/logout", {
            templateUrl: "./logout.html",
            controller: "logoutCtrl",
            requireGuest: true
        })
        .when("/department", {
            templateUrl: "./department.html",
            controller: "departmentCtrl",
            requireLogin: true
        })
        .when("/staff", {
            templateUrl: "./staff.html",
            controller: "staffCtrl",
            requireLogin: true
        })
        .when("/patients", {
            templateUrl: "./patients.html",
            controller: "patientCtrl",
            requireLogin: true
        })
        .when("/patients-activity", {
            templateUrl: "./patients-activity.html",
            controller: "patientActivityCtrl",
            requireLogin: true
        })
        .when("/profile", {
            templateUrl: "./profile.html",
            controller: "profileCtrl",
            requireLogin: true
        })
        .when("/transactions", {
            templateUrl: "./transactions.html",
            controller: "transactionsCtrl",
            requireLogin: true
        })
        .otherwise({
            templateUrl: "./404.html"
        });
});

const sessionService = new SessionService();

app.factory('$sessionService', function () {
    return sessionService;
});


app.controller("loginCtrl", ['$scope', '$routeParams', '$location', '$sessionService', '$window', LoginController]);

app.controller("logoutCtrl", ['$scope', '$routeParams', '$location', '$sessionService', '$window', LogoutController]);

app.controller("departmentCtrl", ['$scope', '$routeParams', '$location', '$sessionService', '$window', DepartmentController]);

app.controller("patientCtrl", ['$scope', '$routeParams', '$location', '$sessionService', '$window', PatientController]);

app.controller("staffCtrl", ['$scope', '$routeParams', '$location', '$sessionService', '$window', StaffController]);

app.controller("patientActivityCtrl", ['$scope', '$routeParams', '$location', '$sessionService', '$window', PatientActivityController]);

app.controller("transactionsCtrl", ['$scope', '$routeParams', '$location', '$sessionService', '$window', TransactionsController])
    .directive('myCustomer', function () {
        return {
            template: 'Name: {{customer.name}} Address: {{customer.address}}'
        };
    });;


app.run(function ($location, $rootScope) {
    let postLogInRoute;

    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {

        //if login required and you're logged out, capture the current path
        if (nextRoute.requireGuest && sessionService.isLoggedIn) {
            $location.path('/transactions').replace();
        } else if (nextRoute.requireLogin && !sessionService.isLoggedIn) {
            sessionService.loginErrorStr = "Your session has been logged out";
            postLogInRoute = $location.path();
            $location.path('/').replace();
        } else if (postLogInRoute && sessionService.isLoggedIn) {
            //once logged in, redirect to the last route and reset it
            $location.path(postLogInRoute).replace();
            postLogInRoute = null;
            sessionService.loginErrorStr = "";
        }
    });
});

/*
app.component('dtd', {
    template:
        'Month: <input ng-model="$ctrl.month" ng-change="$ctrl.updateDate()">' +
        'Date: {{ $ctrl.date }}' +
        '<test date="$ctrl.date"></test>',
    controller: function () {
        this.date = new Date();
        this.month = this.date.getMonth();
        this.updateDate = function () {
            this.date.setMonth(this.month);
        };
    }
});
*/