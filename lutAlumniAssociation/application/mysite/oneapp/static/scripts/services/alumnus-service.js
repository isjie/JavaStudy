define([
	'app'
], function (app) {
	'use strict';
	app.factory('alumnusService', [
		'pubSubService', '$http', 'logger', '$q',
		function (pubSubService, $http, logger, $q) {

			/**
			 * @name getAll
			 * 根据分页信息获取所有校友信息
			 * @param pages
			 * pages = {
					page:           number,
					page_row_num:   number,
					page_total_num: number,
					row_total_num:  number
				}
			 * @returns {*}
			 * {
			 *     pages: {*}, //返回的分页信息，格式与发送的相同
			 *     data: {*} //校友数据信息，对象数组
			 * }
			 */
			var getAll = function (pages) {
				//deferred是angularjs延时对象,当ajax异步处理完毕后返回
				var deferred = $q.defer();
				$.ajax({
					type:     "POST",
					url:      "/get_alumnus_all",
					cache:    false,  //禁用缓存
					data:     {
						//要发送给服务器端的数据，请都按如下的格式书写
						"user":  localStorage.getItem("user") || "",
						"token": localStorage.getItem("token") || "",
						"pages": JSON.stringify(pages)
					},
					dataType: "json",
					success:  function (result) {
						if (result.code == "1") {
							logger.logError("page输出数据有误，超过了指定范围,默认显示第一页", 5000);
						}else if(result.code == "0"){
							deferred.resolve(result);
						}
					},
					error:    function (XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest);
						logger.logError("网络连接失败，错误代码：" + XMLHttpRequest, 5000);
					}
				});
				return deferred.promise;
			}


			/**
			 * @name getOneById
			 * 根据用户ID获取一个用户的详细信息
			 * @param id
			 * @return {*}
			 * {
					"user_info": list(user_info)[0],
					"user_education": list(user_education)
			   }
			 */
			var getOneById = function(id){
				var deferred = $q.defer();
				$.ajax({
					type:     'POST',
					url:      '/get_alumnus_by_id',
					data:     {
						"user":  localStorage.getItem("user"),
						"token": localStorage.getItem("token"),
						"id": id
					},
					datatype: 'json',
					success:  function (result) {
						deferred.resolve(result);
					},
					error:    function (XHR) {
						var data = XHR.responseText;
						logger.logError("网络连接错误：" + data, 5000);
					}
				});
				return deferred.promise;
			}
			/**
			 * @name getSomeByTerms
			 * 根据参数进行高级搜索
			 * @param terms
			 * @param pages
			 * @returns {*}
			 * {
			 *     pages: {*}, //返回的分页信息，格式与发送的相同
			 *     data: {*} //校友数据信息，对象数组
			 * }
			 */
			var getSomeByTerms = function(terms, pages){
				var deferred = $q.defer();
				$.ajax({
					type:     'POST',
					url:      '/get_alumnus_by_terms',
					data:     {
						"user":  localStorage.getItem("user"),
						"token": localStorage.getItem("token"),
						"terms": JSON.stringify(terms),
						"pages": JSON.stringify(pages)
					},
					datatype: 'json',
					success:  function (result) {
						if (result.code == "0") {
							deferred.resolve(result);
						} else {
							logger.logError("后端get_alumnus_by_terms接口读取数据失败，错误代码：" + result.code, 5000);
						}

					},
					error:    function (XHR) {
						var data = XHR.responseText;
						logger.logError("网络连接错误：" + data, 5000);
					}
				});
				return deferred.promise;
			}

			var delSomeByIdArray = function(id_array){
				var deferred = $q.defer();
				console.log(id_array);

				$.ajax({
					type:     'POST',
					url:      '/delete_alumnus_by_id',
					data:     {
						"user":  localStorage.getItem("user"),
						"token": localStorage.getItem("token"),
						"alumnus_ids": JSON.stringify(id_array),
					},
					datatype: 'json',
					success:  function (result) {
						if (result.code == "0") {
							deferred.resolve(result);
						} else {
							logger.logError("后端delete_alumnus_by_id接口删除呢数据失败，错误代码：" + result.code, 5000);
						}

					},
					error:    function (XHR) {
						var data = XHR.responseText;
						logger.logError("网络连接错误：" + data, 5000);
					}
				});
				return deferred.promise;
			}
			var resetPasswordByIdArray = function(id_array){
				var deferred = $q.defer();
				console.log(id_array);
				$.ajax({
					type:     'POST',
					url:      '/reset_pwd_by_ids',
					data:     {
						"user":  localStorage.getItem("user"),
						"token": localStorage.getItem("token"),
						"alumnus_ids": JSON.stringify(id_array),
					},
					datatype: 'json',
					success:  function (result) {
						if (result.code == "0") {
							deferred.resolve(result);
						} else {
							logger.logError("后端/reset_password_by_ids接口删除呢数据失败，错误代码：" + result.code, 5000);
						}

					},
					error:    function (XHR) {
						var data = XHR.responseText;
						logger.logError("网络连接错误：" + data, 5000);
					}
				});
				return deferred.promise;
			}
			var updateAlumnusById = function(data){
				var deferred = $q.defer();
				$.ajax({
					type:     "POST",
					url:      "/update_alumnus_by_id",
					cache:    false,  //禁用缓存
					data:     {
						//要发送给服务器端的数据，请都按如下的格式书写
						"user":  localStorage.getItem("user") || "",
						"token": localStorage.getItem("token") || "",
						"alumnus_id": localStorage.getItem("user"),   //要更新的校友ID。如果校友ID==user_pk，说明是用户自己更新自己。如果校友ID != user_pk，说明是管理员更新其他用户信息，需要进行权限控制
						"alumnus_data": JSON.stringify(data) //data是要更新的校友数据，在ajax请求前进行赋值和组装
					},
					dataType: "json",
					success:  function (result) {
						console.log("update success",result);
						if(result.code == 0){
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
			//var alumnus_array = [];
			//若要在服务器上创建资源，应该使用 POST 方法。
			//若要检索某个资源，应该使用 GET 方法。
			//若要更改资源状态或对其进行更新，应该使用 PUT 方法。
			//若要删除某个资源，应该使用 DELETE 方法。

			//save (create all)
			//var saveAlumnusArray = function (data) {
			//	if (!angular.isArray(data))
			//		return;
			//	alumnus_array = data;
			//	pubSubService.publish("alumnus_array_updated");
			//}
			////add (create one)
			//var postAlumnusArray = function (addItem) {
			//	alumnus_array.push(addItem);
			//	pubSubService.publish("alumnus_array_updated");
			//}
			//
			////update
			//var updateAlumnusArray = function (obj) {
			//	angular.forEach(alumnus_array, function (p, i) {
			//		if (p.id == obj.id)
			//			alumnus_array[i] = obj;
			//	});
			//	pubSubService.publish("alumnus_array_updated");
			//}
			//
			////delete
			//var deleteAlumnusArray = function (delete_array) {
			//	angular.forEach(delete_array, function (del) {
			//		angular.forEach(alumnus_array, function (distr, index) {
			//			if (distr.id == del.id)
			//				alumnus_array.splice(index, 1);
			//		});
			//	});
			//	pubSubService.publish("alumnus_array_updated");
			//	console.info('now distrService deleteDistr Array');
			//}
			//
			//return {
			//	save:   saveAlumnusArray,
			//	get:    getAlumnusArray,
			//	post:   postAlumnusArray,
			//	update: updateAlumnusArray,
			//	delete: deleteAlumnusArray
			//}

			return {
				getAll: getAll,
				getOneById: getOneById,
				getSomeByTerms: getSomeByTerms,
				delSomeByIdArray:delSomeByIdArray,
				updateAlumnusById: updateAlumnusById,
				resetPasswordByIdArray:resetPasswordByIdArray,

			}
		}
	]);
});