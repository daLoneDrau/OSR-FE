/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
<!-- this menu will only be visible when screen is large. --> \
<div class="col-md-2 col-md-offset-1 visible-lg"> \
    <h2>Menu Item</h2> \
    <ul class="nav"> \
        <li class="nav-item"><a class="nav-link active" href="#crypt_attributes">Attributes</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#crypt_groups">IO Groups</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#crypt_elements">Equipment Elements</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#crypt_modifiers">Modifiers</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#crypt_object_types">Object Types</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#crypt_dice">Dice</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#crypt_die">Die</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#crypt_genders">Genders</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#crypt_weapons">Weapons</a></li> \
    </ul> \
</div> \
<!-- this menu will only be visible when screen is medium or small. extra small has no menu. --> \
<div class="col-xs-2 col-xs-offset-1 visible-md visible-sm"> \
    <h3>Short Menu</h3> \
    <ol> \
        <li><a href="#crypt_attributes">Attrs</a></li> \
        <li><a href="#crypt_groups">Groups</a></li> \
        <li><a href="#crypt_elements">Elems</a></li> \
        <li><a href="#crypt_modifiers">Mods</a></li> \
        <li><a href="#crypt_object_types">ObjTyps</a></li> \
        <li><a href="#crypt_dice">Dice</a></li> \
        <li><a href="#crypt_die">Die</a></li> \
        <li><a href="#crypt_genders">Genders</a></li> \
        <li><a href="#crypt_weapons">Weapons</a></li> \
    </ol> \
</div> \
    ';
    $templateCache.put('crypt_nav', multiStr);
});