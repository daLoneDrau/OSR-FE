/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
    <!-- Add Entity Form --> \
    <crypt-nav></crypt-nav> \
    <div class="col-sm-9"> \
        CRYPT MAIN \
    </div> \
    ';
    $templateCache.put('crypt_main', multiStr);
});