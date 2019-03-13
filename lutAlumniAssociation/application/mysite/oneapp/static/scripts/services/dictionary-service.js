define([
	'app'
], function (app) {
	'use strict';
	app.factory('dictionaryService', [
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
			//获取专业列表，需要学院id
			var getSpecialtyArrayByCid = function(c_id){
				var deferred = $q.defer();
				$.ajax({
					type: "POST",
					url: "/get_specialty",
					cache: false,  //禁用缓存
					data: {
						//要发送给服务器端的数据，请都按如下的格式书写
						"user": localStorage.getItem("user") || "",
						"token": localStorage.getItem("token") || "",
						"collage_id": c_id
					},
					dataType: "json",
					success: function (result) {
						if (result.code == "0") {
							deferred.resolve(result.data);
						} else {
							logger.logError("后端行业信息表读取数据失败，错误代码：" + result.code, 5000);
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest);
						logger.logError("网络连接失败，错误代码：" + XMLHttpRequest, 5000);
					}
				});
				return deferred.promise;
			}

			//获取行业信息表
			var getIndustrialArray = function(){
				var deferred = $q.defer();
				$.ajax({
					type: "POST",
					url: "/get_industrial",
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
							logger.logError("后端行业信息表读取数据失败，错误代码：" + result.code, 5000);
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest);
						logger.logError("网络连接失败，错误代码：" + XMLHttpRequest, 5000);
					}
				});
				return deferred.promise;
			}

			//获取省列表
			var getProvinceArray = function(){
				var deferred = $q.defer();
				$.ajax({
					type: "POST",
					url: "/get_province",
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
							logger.logError("后端行业信息表读取数据失败，错误代码：" + result.code, 5000);
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest);
						logger.logError("网络连接失败，错误代码：" + XMLHttpRequest, 5000);
					}
				});
				return deferred.promise;
			}
			//获取市列表，需要省id
			var getCityArrayByPid = function(p_id){
				var deferred = $q.defer();
				$.ajax({
					type: "POST",
					url: "/get_city",
					cache: false,  //禁用缓存
					data: {
						//要发送给服务器端的数据，请都按如下的格式书写
						"user": localStorage.getItem("user") || "",
						"token": localStorage.getItem("token") || "",
						"n_province_id": p_id
					},
					dataType: "json",
					success: function (result) {
						if (result.code == "0") {
							deferred.resolve(result.data);
						} else {
							logger.logError("后端行业信息表读取数据失败，错误代码：" + result.code, 5000);
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest);
						logger.logError("网络连接失败，错误代码：" + XMLHttpRequest, 5000);
					}
				});
				return deferred.promise;
			}

			//国家列表
			var getCountryArray = function(){
				var deferred = $q.defer();
				$.ajax({
					type: "POST",
					url: "/get_country",
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
							logger.logError("后端行业信息表读取数据失败，错误代码：" + result.code, 5000);
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
				getCollageArray:   getCollageArray,
				getSpecialtyArrayByCid: getSpecialtyArrayByCid,
				getIndustrialArray: getIndustrialArray,
				getProvinceArray: getProvinceArray,
				getCityArrayByPid: getCityArrayByPid,
				getCountryArray:getCountryArray
			}
		}
	]);
});