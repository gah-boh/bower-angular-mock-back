(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["angularMockBack"] = factory();
	else
		root["angularMockBack"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	function angularMockBack(config) {
		var baseConfig = {method: 'GET', code: 200};
		var urlMappings = config.mappings;

		angular.module(config.moduleName)
			.config(['$provide', function($provide) {
				$provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
			}])
			.run(['$httpBackend', '$window', function($httpBackend, $window) {
				$httpBackend.whenGET(/\.html/).passThrough();

				var overrides = $window.location.search.slice(1).split('&');

				urlMappings.forEach(function(mapping) {
					var fullMapping = angular.extend({}, baseConfig, mapping);

					if(overrides.length && mapping.hasOwnProperty('overrides')) {
						overrides.filter(function(overrideName) {
								return mapping.overrides.hasOwnProperty(overrideName);
							})
							.forEach(function(overrideName) {
								angular.extend(fullMapping, mapping.overrides[overrideName]);
							});
					}

	                if(fullMapping.passThrough === true) {
	                    $httpBackend.when(fullMapping.method, fullMapping.url).passThrough();
	                    return;
	                }

					$httpBackend.when(fullMapping.method, fullMapping.url, fullMapping.data, fullMapping.headers)
								.respond(fullMapping.code, fullMapping.body);
				});

			}]);

	}

	module.exports = angularMockBack;



/***/ }
/******/ ])
});
;