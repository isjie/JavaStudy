define([
	'app'
], function (app) {

	app.controller('person_pwd_ctrl', ['$scope', '$http', '$state', '$rootScope', 'logger',
								  function ($scope, $http, $state, $rootScope,logger) {
		//这个变量用于控制 显示 修改密码表单
		// $scope.show_newpwd_form = false;
		//confirmPwd 这个函数用于验证旧密码
		$scope.resetPwd = function(){
			//ajax
			console.log($scope.confirmPwd.old_pwd);
			console.log($scope.confirmPwd.user_pwd);

			$.ajax({
            type: 'POST',
            url: '/reset_password',
            data: {
            	"user":  localStorage.getItem("user") || "",
				"token": localStorage.getItem("token") || "",
            	'password': $scope.confirmPwd.old_pwd,
				'newpassword': $scope.confirmPwd.user_pwd
			},
            datatype: 'json',
            success: function (data) {
                console.log(data);
                if(data.code == 0){
                	console.log(data.message);
					alert(data.message);
					$state.go('alumnus')
				}
				else if (data.code == 1 ){
                	logger.logError("密码错误", 5000);
				}

            },
            error:(function (data, status, headers, config) {
                $scope.password_form.serverError = {
                    message: '密码或账号错误'
                };
                if (data.message) {
                    $scope.password_form.serverError.message = data.message;
                }
            })
             });
		}




	}]);

});
