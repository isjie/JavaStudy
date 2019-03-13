define([
	'app'
], function (app) {
	'use strict';
	app.factory('authorService', [
		'pubSubService', '$http', 'logger', '$q',
		function (pubSubService, $http, logger, $q) {

			//��ȡѧԺ�б�
			var getCollageArray = function(){
				var deferred = $q.defer();
				$.ajax({
					type: "POST",
					url: "/get_collage",
					cache: false,  //���û���
					data: {
						//Ҫ���͸��������˵����ݣ��붼�����µĸ�ʽ��д
						"user": localStorage.getItem("user") || "",
						"token": localStorage.getItem("token") || ""
					},
					dataType: "json",
					success: function (result) {
						if (result.code == "0") {
							deferred.resolve(result.data);
						} else {
							logger.logError("���ѧԺ��Ϣ���ȡ����ʧ�ܣ�������룺" + result.code, 5000);
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest);
						logger.logError("��������ʧ�ܣ�������룺" + XMLHttpRequest, 5000);
					}
				});
				return deferred.promise;
			}

			/**
			 * ��ȡȫ��Ȩ�����б�
			 */
			var getAuthgroupArray = function(){
				var deferred = $q.defer();
				$.ajax({
					type: "POST",
					url: "/get_authgroup_all",
					cache: false,  //���û���
					data: {
						//Ҫ���͸��������˵����ݣ��붼�����µĸ�ʽ��д
						"user": localStorage.getItem("user") || "",
						"token": localStorage.getItem("token") || ""
					},
					dataType: "json",
					success: function (result) {
						if (result.code == "0") {
							deferred.resolve(result.data);
						} else {
							logger.logError("���Ȩ�����б��ȡ����ʧ�ܣ�������룺" + result.code, 5000);
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest);
						logger.logError("��������ʧ�ܣ�������룺" + XMLHttpRequest, 5000);
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