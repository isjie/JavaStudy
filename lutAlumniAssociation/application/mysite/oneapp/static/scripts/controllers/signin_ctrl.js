define([
	'app'
], function (app) {

	app.controller('signinCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
		$scope.signin = function () {
			console.log($scope.signinData);

			$.ajax({
            type: 'POST',
            url: '/token/new.json',
            data: {'username': $scope.signinData.username, 'password': $scope.signinData.password},
            datatype: 'json',
            success: function (data) {
                if (data.success) {
                //成功的数据中有可能是用户is_active为FALSE
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user",data.user);
                    localStorage.setItem("success",data.success);
                    $state.go('alumnus');
                }
                else {//User account is disabled.没有返回token
                    controls.log(data.errors);
                }
            },
            error:(function (data, status, headers, config) {
                $scope.loginForm.serverError = {
                    message: '密码或账号错误'
                };
                if (data.message) {
                    $scope.loginForm.serverError.message = data.message;
                }
            })
             });
		 };

		function init() {
			$scope.signinData = {};
		}

		init();

	}]);

});
