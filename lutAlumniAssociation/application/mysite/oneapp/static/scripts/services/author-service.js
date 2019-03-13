define([
	'app'
], function (app) {
	'use strict';
	app.factory('authorService', [
		'pubSubService', '$http', 'logger', '$q',
		function (pubSubService, $http, logger, $q) {

			//获取学院列表
			var getCollageArray = function(){
				var deferred = $q.defer();
				$.ajax({
					type: "POST",
					url: "/get_collage",
					cache: false,  //禁用缓存
					data: {
						//要发送给服务器端的数据，请都按如下的格式书写
						"user": localStorage.getItem("user") || "",
						"token": localStorage.getItem("token") || ""
					},
					dataType: "json",
					success: function (result) {
						if (result.code == "0") {
							deferred.resolve(result.data);
						} else {
							logger.logError("后端学院信息表读取数据失败，错误代码：" + result.code, 5000);
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest);
						logger.logError("网络连接失败，错误代码：" + XMLHttpRequest, 5000);
					}
				});
				return deferred.promise;
			}

			/**
			 * 获取全部权限组列表
			 */
			var getAuthgroupArray = function(){
				var deferred = $q.defer();
				$.ajax({
					type: "POST",
					url: "/get_authgroup_all",
					cache: false,  //禁用缓存
					data: {
						//要发送给服务器端的数据，请都按如下的格式书写
						"user": localStorage.getItem("user") || "",
						"token": localStorage.getItem("token") || ""
					},
					dataType: "json",
					success: function (result) {
						if (result.code == "0") {
							deferred.resolve(result.data);
						} else {
							logger.logError("后端权限组列表读取数据失败，错误代码：" + result.code, 5000);
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest);
						logger.logError("网络连接失败，错误代码：" + XMLHttpRequest, 5000);
					}
				});
				return deferred.promise;
			}

			return {
				getAuthgroupArray:   getAuthgroupArray,
			}
		}
	]);
});