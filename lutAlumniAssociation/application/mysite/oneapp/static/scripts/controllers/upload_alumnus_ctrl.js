/**
 * Created by jlwang on 17/8/28.
 */
define([
	'app'
], function (app) {
	app.controller('upload_alumnus_ctrl',
		[
			'$scope',
			'$http',
			'$state',
			// '$timeout',
			// 'logger',
			// // 'alumnusConfig',
			// 'pubSubService',
			// 'alumnusService',
			function (
				$scope
				// $http,
				// $state,
				// $timeout,
				// logger,
				// // alumnusConfig,
				// pubSubService,
				// alumnusService
			) {


				$scope.upload_alumnus = function () {
                    var user_pk = localStorage.getItem("user");
                    var token = localStorage.getItem("token");
	                $scope.user = user_pk;
	                $scope.token = token;
                    console.log(token+'   '+user_pk);
				};


            }

		]);

});
