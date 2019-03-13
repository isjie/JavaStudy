define([
	'app'
], function (app) {

	app.controller('info_modify_ctrl',
		[
			'$scope', '$http', 'safeApply', '$state', '$stateParams', 'dictionaryService', 'alumnusService', 'logger',
			function ($scope, $http, safeApply, $state, $stateParams, dictionaryService, alumnusService, logger) {

				//学院列表
				$scope.collages = [];
				//省列表
				$scope.provinces = [];
				//城市列表
				$scope.cities = [];
				//获取学籍信息
				$scope.educations = [];
				//行业列表
				$scope.industries = [];
				//国家列表
				$scope.countries = [];

				//全局校友id
				var user_id = localStorage.getItem("user");
				var id = $stateParams.user_id;
				console.log("info_modify:" + id)
				//读取用户信息
				alumnusService.getOneById(id).then(function (result) {
					$scope.user = result.data;
					console.log("重要的校友信息", $scope.user);
					$scope.educations = $scope.user.user_education;
					// console.log("重要的学籍信息", $scope.educations);
					//读取学籍学院列表
					dictionaryService.getCollageArray().then(function (collages) {
						$scope.collages = collages;
						//根据个人教育信息，从学院列表中选中对应的学院
						angular.forEach($scope.educations, function (education) {
							angular.extend(education, {'specialties': []});


							angular.forEach(collages, function (c) {
								if (education.collage_admin_id == c.collage_id) {
									education.collage = c;
								}
								//根据个人教育信息，从学院列表中选中对应的学籍学院（以满足select对话框的显示）
								if (education.collage_edu_id == c.collage_id) {
									education.collage_edu = c;

									//读取专业
									dictionaryService.getSpecialtyArrayByCid(education.collage_edu_id).then(function (specialties) {
										// console.log("education", education);
										education.specialties = specialties;
										angular.forEach(education.specialties, function (s) {
											if (education.specialty_id == s.specialty_id) {
												education.specialty = s;
												//console.log(s);
											}
										})
									})
								}
							});
						})


					})

					//读取行业列表
					dictionaryService.getIndustrialArray().then(function (industries) {
						$scope.industries = industries;
						angular.forEach(industries, function (i) {
							if ($scope.user.user_info.industrial_id == i.industrial_id) {
								$scope.user_industry = i;
							}
						});
					})

					//读取省列表
					dictionaryService.getProvinceArray().then(function (provinces) {
						$scope.provinces = provinces;
						angular.forEach(provinces, function (c) {
							if ($scope.user.user_info.province_id == c.n_province_id) {
								$scope.user_province = c;
								//读取市
								dictionaryService.getCityArrayByPid($scope.user.user_info.province_id).then(function (cities) {
									$scope.cities = cities;
									angular.forEach(cities, function (a) {
										if ($scope.user.user_info.city_id == a.city_id) {
											$scope.user_city = a;
											console.log(a);
										}
									})
								})
							}
						});
					})

					//读取国家列表
					dictionaryService.getCountryArray().then(function (countries) {
						$scope.countries = countries;
						console.log(countries);
						angular.forEach(countries, function (c) {
							if ($scope.user.user_info.country_id == c.country_id) {
								console.log($scope.user.user_info.country_id);
								$scope.country_name_cn = c;

							}
						});
					})

				})

				//读取专业列表
				$scope.showSpecialty = function (i) {
					$scope.educations[i].collage_edu_id = $scope.educations[i].collage_edu.collage_id;
					console.log("$scope.educations[i].collage_edu_id", $scope.educations[i].collage_edu_id);
					if (angular.isDefined($scope.educations[i].collage_edu_id)) {
						var c_id = $scope.educations[i].collage_edu_id;
						dictionaryService.getSpecialtyArrayByCid(c_id).then(function (specialties) {
							$scope.educations[i].specialties = specialties;
						})
					}
				}

				//读取城市列表
				$scope.showCity = function () {
					if (angular.isDefined($scope.user_province.n_province_id)) {
						var p_id = $scope.user_province.n_province_id;
						dictionaryService.getCityArrayByPid(p_id).then(function (cities) {
							$scope.cities = cities;
						})
					}
				}

				$scope.addMoreEdu = function () {
					var obj = {
						"edu_id":             "",
						"user_edu":           "",
						"user_id":            "",
						"collage_admin_id":   "",
						"collage_admin_name": "",
						"collage_edu_id":     "",
						"collage_edu_name":   "",
						"specialty_id":       "",
						"specialty_name":     "",
						"entrance_year":      "",
						"grade_year":         "",
						"classes":            ""
					};
					$scope.educations.push(obj);
					console.log($scope.educations)
				}

				$scope.delMoreEdu = function () {
					$scope.educations.splice(1, 1);
				}

				$scope.personDataSubmit = function () {
					//行业
					$scope.user.user_info.industrial_name =
						angular.isDefined($scope.user_industry) ?
							$scope.user_industry.industrial_name : "";
					console.log("industrial_name", $scope.user.user_info.industrial_name);
					//行业id
					$scope.user.user_info.industry_id =
						angular.isDefined($scope.user_industry) ?
							$scope.user_industry.industrial_id : "";
					console.log("industrial_id", $scope.user.user_info.industrial_id);
					//省
					$scope.user.user_info.user_province =
						angular.isDefined($scope.user_province) ?
							$scope.user_province.province_name : "";
					console.log("user_province", $scope.user.user_info.user_province);
					//省id
					$scope.user.user_info.province_id =
						angular.isDefined($scope.user_province) ?
							$scope.user_province.n_province_id : "";
					console.log("province_id", $scope.user.user_info.province_id);

					//市
					$scope.user.user_info.user_city =
						angular.isDefined($scope.user_city) ?
							$scope.user_city.city_name : "";
					console.log("user_city", $scope.user.user_info.user_city);
					//市id
					$scope.user.user_info.city_id =
						angular.isDefined($scope.user_city) ?
							$scope.user_city.city_id : "";
					console.log("city_id", $scope.user.user_info.city_id);

					//学籍信息
					//angular.forEach
					for (var i = 0; i < $scope.educations[i].length; i++) {
						//学籍学院
						$scope.educations[i].collage_edu_name = $scope.educations[i].collage_edu.collage_name_cn || "";
						console.log("collage_edu_name", $scope.educations[i].collage_edu_name);
						//学院
						$scope.educations[i].collage_admin_name = $scope.educations[i].collage.collage_name_cn || "";
						console.log("collage_admin_name", $scope.educations[i].collage_admin_name);
						//专业
						$scope.educations[i].specialty_name_cn = $scope.educations[i].specialty.specialty_name_cn;
						console.log("specialty_name", $scope.educations[i].specialty_name_cn);
					}
					console.log($scope.user);

					var data = {
						"user_info":      $scope.user.user_info,
						"user_education": $scope.educations
					};
					alumnusService.updateAlumnusById(data).then(function (result) {
						$scope.user = result.data;
						$scope.educations = $scope.user.user_education;
					})


				}


			}
		]);

});
