/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
    <basic-nav></basic-nav> \
    <div class="col-sm-9"> \
    <!-- --------------- --> \
    <!-- Add Entity Form --> \
    <!-- --------------- --> \
    <div class="col-sm-10 col-sm-offset-1"> \
        <!-- this form should send a POST request to rest service. --> \
        <form name="createForm" class="form-horizontal" ng-submit="create()" novalidate> \
            <!-- Weapon Name --> \
            <div class="form-group"> \
                <label for="txtName" class="control-label col-sm-4">Name</label> \
                <div class="col-sm-8"> \
                    <input class="form-control" id="txtName" name="txtName" type="text" placeholder="e. g. Staff" \
                            ng-model="newEntity.item_name"  \
                            required /> \
                </div> \
            </div> \
            <!-- Weapon Description --> \
            <div class="form-group"> \
                <label for="txtDesc" class="control-label col-sm-4">Description</label> \
                <div class="col-sm-8"> \
                    <textarea ng-model="newEntity.description" cols="40" rows="5" class="form-control" id="txtDesc" name="txtDesc" required ></textarea> \
                </div> \
            </div> \
            <!-- Weapon Price -->  \
            <div class="form-group" name="divPrice" \
                    ng-class="{ \'has-success\': createForm.txtPrice.$valid && !createForm.txtPrice.$pristine, \'has-error\': createForm.txtPrice.$invalid && !createForm.txtPrice.$pristine }" > \
                <label for="txtPrice" class="control-label col-sm-4">Price</label> \
                <div class="col-sm-8"> \
                    <input class="form-control" id="txtPrice" name="txtPrice" type="number" step="0.1"\
                        ng-model="newEntity.price" \
                        ng-minlength="1"\
                        ng-maxlength="5" \
                        min="0" /> \
                </div> \
            </div> \
            <!-- Weapon Weight -->  \
            <div class="form-group" name="divWeight" \
                    ng-class="{ \'has-success\': createForm.txtWeight.$valid && !createForm.txtWeight.$pristine, \'has-error\': createForm.txtWeight.$invalid && !createForm.txtWeight.$pristine }" > \
                <label for="txtWeight" class="control-label col-sm-4">Weight</label> \
                <div class="col-sm-8"> \
                    <input class="form-control" id="txtWeight" name="txtWeight" type="number" step="0.5"\
                        ng-model="newEntity.weight" \
                        ng-minlength="1"\
                        ng-maxlength="5" \
                        min="0" /> \
                </div> \
            </div> \
	        <!-- Weapon Type --> \
	        <div class="form-group"> \
	            <label for="selType" class="control-label col-sm-4">Weapon Type</label> \
	            <div class="col-sm-8"> \
	                <select class="form-control" name="selType" id="selType" \
	                        ng-model="newEntity.types" \
	                        ng-options="entity as entity.code | uppercase for entity in object_type_entities | orderBy:\'flag\' track by entity.id" \
	                        required> \
	                    <option value="">---Please select---</option> <!-- not selected / blank option --> \
	                </select> \
	            </div> \
	        </div> \
	        <!-- Weapon Damage --> \
	        <div class="form-group"> \
	            <label for="selType" class="control-label col-sm-4">Damage</label> \
	            <div class="col-sm-8"> \
	                <select class="form-control" name="selDmg" id="selDmg" \
	                        ng-model="newEntity.damages" \
	                        ng-options="entity as entity.code | uppercase for entity in dice_entities | orderBy:[ \'die.code\', \'number\' ] track by entity.id" \
	                        required> \
	                    <option value="">---Please select---</option> <!-- not selected / blank option --> \
	                </select> \
	            </div> \
	        </div> \
            <!-- Weapon Groups --> \
            <div class="form-group"> \
                <label for="selGroups" class="control-label col-sm-4">Weapon Groups</label> \
                <div class="col-sm-8"> \
                    <select class="form-control" name="selGroups" id="selGroups" \
                            ng-model="newEntity.groups" \
                            ng-options="entity as entity.name | uppercase for entity in group_entities | orderBy:\'name\' track by entity.id" \
                            multiple \
                            required> \
                        <option value="">---Please select---</option> <!-- not selected / blank option --> \
                    </select> \
                </div> \
            </div> \
            <!-- Submit Button --> \
            <div class="form-group"> \
                <div class="col-sm-8 col-sm-offset-4"> \
                    <button type="submit" class="btn btn-primary" ng-disabled="!createForm.$valid">Add Weapon</button> \
                </div> \
            </div> \
        </form> \
    </div> \
    <!-- ------------------------ --> \
    <!-- List of Current Entities --> \
    <!-- ------------------------ --> \
    <div class="col-sm-12"> \
        <hr> \
    </div> \
    <div class="col-sm-12"> \
        <span class="text-muted">Current Elements: </span><span ng-repeat="entity in entities | orderBy:\'value\'"><span ng-show="!$first">, </span>{{entity.code | uppercase}}</span> \
    </div> \
    <!-- -------------------- --> \
    <!-- Update Entities Form --> \
    <!-- -------------------- --> \
    <div class="col-sm-12"> \
        <hr> \
    </div> \
    <div class="col-sm-12"> \
        <p class="text-muted">Update Element</p> \
        <form name="updateForm" class="form-inline" ng-submit="update()" novalidate> \
            <div class="form-group"> <!-- Select Entity --> \
                <label for="selEntity" class="control-label">Choose:</label> \
                <select class="form-control" name="selEntity" id="selEntity" ng-model="entitySelect" ng-options="entity as entity.code | uppercase for entity in entities | orderBy:\'value\' track by entity.id"> \
                    <option value="">---Please select---</option> <!-- not selected / blank option --> \
                </select> \
            </div> \
            <!-- Update Code -->  \
            <div class="form-group"> <!-- Update Code --> \
                <label for="updCode" class="control-label">Code</label> \
                <input ng-model="entitySelect.code" type="text" class="form-control" id="updCode" name="updCode"> \
            </div> \
            <!-- Update Value -->  \
            <div \
                class="form-group" \
                name="divValue" \
                ng-class="{ \'has-success\': updateForm.updValue.$valid && !updateForm.updValue.$pristine, \'has-error\': updateForm.updValue.$invalid && !updateForm.updValue.$pristine }" > \
                <label for="updValue" class="control-label">Value</label> \
                <input \
                    ng-model="entitySelect.value" \
                    ng-minlength="1"\
                    ng-maxlength="3" \
                    min="0" \
                    ng-pattern="/^[0-9]{1,3}$/" \
                    type="number" class="form-control" id="updValue" name="updValue" /> \
            </div> \
            <!-- Submit Button --> \
            <div class="form-group"> \
                <button type="submit" class="btn btn-primary" ng-disabled="!updateForm.$valid">Update</button> \
            </div> \
        </form> \
    </div> \
    </div> \
    ';
    $templateCache.put('basic_weapons', multiStr);
});