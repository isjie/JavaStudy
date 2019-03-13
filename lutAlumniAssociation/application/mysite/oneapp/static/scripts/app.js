define([
	//通过require.js载入的app必要组件
	'routes'
	, 'static/scripts/directives/app-directives.js'
	, 'static/scripts/services/app-service.js'
], function (config) {

	var app = angular.module('app', [
		//app相关的模块文件，没有顺序
		'ngRoute',
		'ngAnimate',
		'ngSanitize',
		'ngResource',
		'ui.router',
		'ui.grid',
		'ui.grid.selection',
		'angular-locker',
		'app.service',
		'app.directives',
	]).config([
		//app要调用的方法，与function中的参数有对应关系
		'$routeProvider',
		'$locationProvider',
		'$controllerProvider',
		'$compileProvider',
		'$filterProvider',
		'$provide',
		'$stateProvider',
		'$urlRouterProvider',
		'$httpProvider',//plus
		'lockerProvider',
		function (
			$routeProvider,
			$locationProvider,
			$controllerProvider,
			$compileProvider,
			$filterProvider,
			$provide,
			$stateProvider,
			$urlRouterProvider,
			$httpProvider,
			lockerProvider
		) {


			//依赖延迟加载机制
			var dependenciesResolver = function (dependencies) {
				var definition =
				{
					resolver: function ($q, $rootScope) {
						if (dependencies != undefined && dependencies != null) {
							var deferred = $q.defer();
							require(dependencies, function () {
								$rootScope.$apply(function () {
									deferred.resolve();
								});
							});
							return deferred.promise;
						}
					}
				}
				return definition;
			}

			//延迟依赖加载同时用户验证
			var dependenciesResolverWithAuth = function (dependencies) {
				var definition = dependenciesResolver(dependencies);
				//================================================
				// Check if the user is connected
				//===============================================
				definition.requiresSignin = function ($q, $timeout, $http, $state, $rootScope, $stateParams) {
					// Initialize a new promise
					var deferred = $q.defer();

					var user = localStorage.getItem("user");
					var token = localStorage.getItem("token");
					var data = {};
					if (user && token) {
						data = {"user": user, "token": token};
					}
					console.log("signedin", user);
					$.ajax({
						type:     'POST',
						url:      '/signedin',
						data:     data,
						datatype: 'json',
						success:  function (user) {
							$rootScope.user = user;
							//localStorage.setItem("user",user);
							$timeout(deferred.resolve, 0);
							console.log(user);
						},
						error:    function (XHR) {
							var data = XHR.responseText;
							console.log(data);
							$timeout(function () {
								deferred.reject();
							}, 0);
							$state.go('signin');
						}
					});
					return deferred.promise;
				}
				return definition;
			}


			//================================================
			// An interceptor for AJAX errors
			//================================================
			$httpProvider.interceptors.push([
				'$q', '$injector', function ($q, $injector) {
					return function (promise) {
						return promise.then(
							// Successs
							function (response) {
								return response;
							},
							// Error
							function (response) {
								if (response.status === 401) {
									var $state = $injector.get('$state');
									$state.go('/signin');
									return $q.reject(response);
								}
							}
						);
					};
				}
			]);

			/////////////////////////////
			//   路由和延迟加载机制     //
			/////////////////////////////

			// Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
			if (config.defaultRoutePath !== undefined) {
				$urlRouterProvider.otherwise(config.defaultRoutePath);
			}

			app.controller = $controllerProvider.register;
			app.directive = $compileProvider.directive;
			app.filter = $filterProvider.register;
			app.factory = $provide.factory;
			app.service = $provide.service;

			//$locationProvider.html5Mode(true);

			if (config.routes !== undefined) {
				angular.forEach(config.routes, function (route, statename) {
					$stateProvider.state(statename, {
						url:         route.url,
						templateUrl: route.templateUrl,
						resolve:     route.noAuth == true ?
										 dependenciesResolver(route.dependencies)
										 :
										 dependenciesResolverWithAuth(route.dependencies)
					});
				});
			}

		}
	])

		//全局控制器
		.controller('AppCtrl', [
			'$scope', '$location', '$state', '$rootScope',
			function ($scope, $location, $state, $rootScope) {
				//$rootscope和$scope一样都可以在页面上调用
				//$rootScope.$state = $state;
				//根据URL自动地获取页面名称
				$scope.$on("$locationChangeStart", function (event, next, current) {
					$scope.page_name = $location.url().split("/")[1];
					console.log($scope.page_name);
				});


				//退出登录
				$scope.signout = function () {
					console.log("shit");
					localStorage.removeItem("success");
					localStorage.removeItem("user");
					localStorage.removeItem("token");
					$state.go('signin');
				}

			}
		]);

	return app;
});