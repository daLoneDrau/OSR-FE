/*jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp', ["ngRoute"]);

angular.module('restApp').config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: 'main'
    }).when("/crypt", {
        templateUrl: 'crypt_main'
    }).when("/crypt_groups", {
        controller: "CryptGroupController",
        templateUrl: 'crypt_groups'
    }).when("/crypt_attributes", {
        controller: "CryptAttributeController",
        templateUrl: 'crypt_attributes'
    }).when("/crypt_elements", {
        controller: "CryptElementController",
        templateUrl: 'crypt_elements'
    }).when("/crypt_object_types", {
        controller: "CryptObjectTypeController",
        templateUrl: 'crypt_object_types'
    }).when("/crypt_die", {
        controller: "CryptDieController",
        templateUrl: 'crypt_die'
    }).when("/crypt_dice", {
        controller: "CryptDiceController",
        templateUrl: 'crypt_dice'
    }).when("/crypt_genders", {
        controller: "CryptGenderController",
        templateUrl: 'crypt_genders'
    }).when("/crypt_weapons", {
        controller: "CryptWeaponController",
        templateUrl: 'crypt_weapons'
    }).when("/crypt_modifiers", {
        controller: "CryptModifierController",
        templateUrl: 'crypt_modifiers'
    }).when("/basic", {
        templateUrl: 'basic_main'
    }).when("/basic_groups", {
        controller: "BasicGroupController",
        templateUrl: 'basic_groups'
    }).when("/basic_attributes", {
        controller: "BasicAttributeController",
        templateUrl: 'basic_attributes'
    }).when("/basic_elements", {
        controller: "BasicElementController",
        templateUrl: 'basic_elements'
    }).when("/basic_object_types", {
        controller: "BasicObjectTypeController",
        templateUrl: 'basic_object_types'
    }).when("/basic_die", {
        controller: "BasicDieController",
        templateUrl: 'basic_die'
    }).when("/basic_dice", {
        controller: "BasicDiceController",
        templateUrl: 'basic_dice'
    }).when("/basic_genders", {
        controller: "BasicGenderController",
        templateUrl: 'basic_genders'
    }).when("/basic_weapons", {
        controller: "BasicWeaponController",
        templateUrl: 'basic_weapons'
    }).when("/basic_modifiers", {
        controller: "BasicModifierController",
        templateUrl: 'basic_modifiers'
    });                                 
});

angular.module('restApp').directive('powerOfTwo', function() {
    return {
        // limit usage to argument only
        restrict: 'A',

        // require NgModelController, i.e. require a controller of ngModel directive
        require: 'ngModel',

        // create linking function and pass in our NgModelController as a 4th argument
        link: function(scope, element, attr, ctrl) {
            // please note you can name your function & argument anything you like
            ctrl.$validators.power_of_2 = function(ngModelValue) {
                if (typeof ngModelValue !== 'number') {
                    return 'Not a number';   
                }  
                return ngModelValue && (ngModelValue & (ngModelValue - 1)) === 0;
            };
        }
    };
});
angular.module('restApp').directive('basicNav', function() {
    return {
        // limit usage to element only
        restrict: 'E',
        templateUrl: 'basic_nav',
        controller: function($scope) {
        }
    };
});
angular.module('restApp').directive('cryptNav', function() {
    return {
        // limit usage to element only
        restrict: 'E',
        templateUrl: 'crypt_nav',
        controller: function($scope) {
        }
    };
});
