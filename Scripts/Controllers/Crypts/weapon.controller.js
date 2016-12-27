/*jshint multistr: true */
/* jshint node: true */
"use strict";

// scope syntax, not controller-as
angular.module('restApp').controller('CryptWeaponController', function($scope, $window, cryptGroupService, cryptItemService, cryptObjectTypeService, $q, $http) {
    $scope.newEntity = {
        count: 0,
        description: "",
        food_value: 0,
        groups: [],
        internal_script: "",
        item_name: "",
        left_ring: false,
        light_value: 0,
        max_owned: 0,
        modifiers: {},
        number: 0,
        price: 0.0,
        ring_type: 0,
        stack_size: 0,
        steal_value: 0,
        types: [],
        weight: 0.0
    };
    var findEntity = function(entity, entities) {
        var found = '';
        for (var i = entities.length - 1; i >= 0; i--) {
            if (entities[i].code === entity.code) {
                found = "A dice roll with that code already exists";
                break;
            }
            if (entities[i].number === entity.number
                    && entities[i].die.code === entity.die.code) {
                found = "A dice roll with that number already exists";
                break;
            }
        }
        return found;
    };
    var getAllGroupEntities = function() {        
        var promise = cryptGroupService.getEntities();
        promise.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                $scope.group_entities = response.data;
                for (var i = $scope.group_entities.length - 1; i >= 0; i--) {
                    if (angular.isUndefined($scope.group_entities[i].id)) {
                        $scope.group_entities[i].id = 0;
                    }
                    if ($scope.group_entities[i].name === "BARBARIAN"
                            || $scope.group_entities[i].name === "SOLDIER"
                            || $scope.group_entities[i].name === "THIEF"
                            || $scope.group_entities[i].name === "WIZARD") {
                        $scope.group_entities.splice(i, 1);
                    }
                }
            }
        });
    };
    var getAllObjectTypeEntities = function() {        
        var promise = cryptObjectTypeService.getEntities();
        promise.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                $scope.oject_type_entities = response.data;
                for (var i = $scope.oject_type_entities.length - 1; i >= 0; i--) {
                    if (angular.isUndefined($scope.oject_type_entities[i].id)) {
                        $scope.oject_type_entities[i].id = 0;
                    }
                    if ($scope.oject_type_entities[i].code === "OBJECT_TYPE_WEAPON"
                            || $scope.oject_type_entities[i].code === "OBJECT_TYPE_SHIELD"
                            || $scope.oject_type_entities[i].code === "OBJECT_TYPE_FOOD"
                            || $scope.oject_type_entities[i].code === "OBJECT_TYPE_GOLD"
                            || $scope.oject_type_entities[i].code === "OBJECT_TYPE_ARMOR"
                            || $scope.oject_type_entities[i].code === "OBJECT_TYPE_HELMET"
                            || $scope.oject_type_entities[i].code === "OBJECT_TYPE_RING"
                            || $scope.oject_type_entities[i].code === "OBJECT_TYPE_LEGGINGS") {
                        $scope.oject_type_entities.splice(i, 1);
                    }
                }
            }
        });
    };
    var getAllEntities = function() {        
        var promise = cryptItemService.getEntities();
        promise.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                $scope.entities = response.data;
                for (var i = $scope.entities.length - 1; i >= 0; i--) {
                    if (angular.isUndefined($scope.entities[i].id)) {
                        $scope.entities[i].id = 0;
                    }
                }
            }
        });
    };
    var postEntity = function() {
        console.log("POST::");
        console.log($scope.newEntity);
        var promise = cryptItemService.insertEntity($scope.newEntity);
        promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.code = "";
                $scope.newEntity.die = {};
                $scope.newEntity.number = 0;
                getAllEntities();
            } else {
                console.error(response);
            }
        });
    };
    var putEntity = function() {
        var promise = cryptItemService.updateEntity($scope.entitySelect);
            promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.code = "";
                $scope.newEntity.value = 0;
                getAllEntities();
            }
        });
    };
    var validateGroups = function(groups) {
        var isBlunt = false;
        var isEdged = false;
        var isHeavy = false;
        var isLight = false;
        var isPiercing = false;
        var msg = "";
        for (var i = groups.length - 1; i >= 0; i--) {
            if (groups[i].name === "BLUNT_WEAPON") {
                isBlunt = true;
            }
            if (groups[i].name === "EDGED_WEAPON") {
                isEdged = true;
            }
            if (groups[i].name === "HEAVY_WEAPON") {
                isHeavy = true;
            }
            if (groups[i].name === "LIGHT_WEAPON") {
                isLight = true;
            }
            if (groups[i].name === "PIERCING_WEAPON") {
                isPiercing = true;
            }
        }
        if (isBlunt
                && isEdged) {
            msg = "A weapon can't be Blunt AND Edged.";
        }
        if (isBlunt
                && isPiercing) {
            msg = "A weapon can't be Blunt AND Piercing.";
        }
        if (isHeavy
                && isLight) {
            msg = "A weapon can't be Light AND Heavy.";
        }
        return msg;
    };
    $scope.create = function() {
        $scope.newEntity.types = [ $scope.newEntity.types ];
        console.log($scope.newEntity);
        var msg = validateGroups($scope.newEntity.groups);
        if (msg.length > 0) {
            $window.alert(msg);
        } else {
            console.log($scope.newEntity);
            if ($scope.entities.length > 0) {
                msg = findEntity($scope.newEntity, $scope.entities);
                if (msg.length > 0) {
                    $window.alert(msg);
                } else {
                    // postEntity();
                }
            } else {
                // postEntity();
            }            
        }
    };
    $scope.update = function() {
        var msg = '';
        for (var i = $scope.entities.length - 1; i >= 0; i--) {
            if ($scope.entities[i].id === $scope.entitySelect.id) {
                continue;
            }
            if ($scope.entities[i].code === $scope.entitySelect.code) {
                msg = "A dice roll with that code already exists";
                break;
            }
            if ($scope.entities[i].number === $scope.entitySelect.number
                    && $scope.entities[i].die.code === $scope.entitySelect.die.code) {
                msg = "A dice roll with that number already exists";
                break;
            }
        }
        if (msg.length > 0) {
            $window.alert(msg);
        } else {
            putEntity();
        }
    };
    getAllEntities();
    getAllGroupEntities();
    getAllObjectTypeEntities();
});