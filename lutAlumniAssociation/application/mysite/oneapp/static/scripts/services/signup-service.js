/**
 * Created by Administrator on 2017/11/1 0001.
 */
define([
	'app'
], function (app) {
	'use strict';
	app.factory('signupService', [
		'pubSubService', '$http', 'logger', '$q',
		function (pubSubService, $http, logger, $q) {

			var signUp = function (data) {
				//deferred是angularjs延时对象,当ajax异步处理完毕后返回
				var deferred = $q.defer();
				$.ajax({
					type:     "POST",
					url:      "/sign_up",
					cache:    false,  //禁用缓存
					data:     {
						//要发送给服务器端的数据，请都按如下的格式书
						"user":        localStorage.getItem("user") || "",
						"token":       localStorage.getItem("token") || "",
						"signup_data": JSON.stringify(data),
					},
					dataType: "json",
					success:  function (result) {
						console.log("update success", result);

						if (result.code == 0) {
							logger.logSuccess(result.message, 5000);
						}
					},
					error:    function (XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest);
						logger.logError("网络连接失败，错误代码：" + XMLHttpRequest, 5000);
					}
				});
				return deferred.promise;


			}
			return {
				signUp:        signUp
			}
		}
	]);
});