define([
	'app'
], function (app) {

	app.controller('person_info_show_ctrl', [
		'$scope', '$http', 'safeApply', '$stateParams', '$rootScope','$state',
		function ($scope, $http, safeApply, $stateParams, $rootScope,$state) {


			var user_id = localStorage.getItem("user");
			var search_id = $stateParams.user_id || user_id;
			// console.log(localStorage.getItem("user"));
			$scope.educations = [];

			$.ajax({
				type:     'POST',
				url:      '/get_alumnus_by_id',
				data:     {
					"user":  user_id,
					"token": localStorage.getItem("token"),
					"id": search_id
				},
				datatype: 'json',
				success:  function (result) {
					safeApply($scope, function () {
						$scope.user = result.data;
						$scope.educations = $scope.user.user_education;
						// console.log($scope.user);
					});
				},
				error:    function (XHR) {
					var data = XHR.responseText;
					// console.log(data);
				}
			});

			$scope.modify_info = function (id) {
					console.log("info_show_ctrl:"+id);
					$state.go('info_modify', {user_id: id});
				}


		}
	]);

});
