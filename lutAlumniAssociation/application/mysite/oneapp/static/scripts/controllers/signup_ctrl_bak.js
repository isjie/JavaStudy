define([
	'app'
	//,'../../libs/steps/jquery.steps.min.js'
	//,'../../libs/validate/jquery.validate.min.js'
], function (app) {

	app.controller('signupCtrl', [
		'$scope','safeApply','$http', '$state','signupConfig', 'dictionaryService','signupService',
		function ($scope, safeApply, $http, $state,signupConfig, dictionaryService,signupService) {

			//预定义用户注册信息
			$scope.formData = angular.copy(signupConfig.formData );

			//行业列表
			$scope.industries = [];
			//省列表
			$scope.provinces = [];
			//城市列表
			$scope.cities = [];
			//学院列表
			$scope.collages = [];
			//专业列表
			$scope.specialties = [];
			//国家列表
			$scope.countries = [];


			$scope.educations = angular.copy(signupConfig.formData.educations);

			$scope.addEduInfo  = function () {
				var obj = {
					"edu_id": "",
					"user_edu": "",
					"user_id": "",
					"collage_admin_id": "",
					"collage_admin_name": "",
					"collage_edu_id": "",
					"collage_edu_name": "",
					"specialty_id": "",
					"specialty_name": "",
					"entrance_year": "",
					"grade_year" : "",
					"classes": ""
				};
					$scope.educations.push(obj);
					console.log($scope.educations)
			}


			//获取行业信息表
			dictionaryService.getIndustrialArray().then(function (industries) {
				$scope.industries = industries;
			})

			dictionaryService.getCountryArray().then(function (countries) {
				$scope.countries = countries;
			})

			dictionaryService.getProvinceArray().then(function (provinces) {
				$scope.provinces = provinces;
			})

			//显示城市表，城市表是选定省而后才显示
			$scope.showCity = function () {
					if ($scope.formData.user_province.n_province_id== null) {
						$scope.cities = [];
						$scope.formData.city = null;
					}
					else if ($scope.formData.user_province.n_province_id == "") {
						$scope.cities = [];
						$scope.formData.city = null;
					}
					else {
						dictionaryService.getCityArrayByPid($scope.formData.user_province.n_province_id).then(function (cities) {
							$scope.cities = cities;
						})
					}
				}
			//获取学院信息
      		  dictionaryService.getCollageArray().then(function (collages) {
				$scope.collages = collages;
			});
			//显示专业表，专业表是选定而后才显示
              $scope.showSpecialty = function () {
					if ($scope.formData.collage_edu.collage_id == null) {
						$scope.specialties = [];
						$scope.formData.specialty = null;
					}
					else if ($scope.formData.edu_1.collage_id == "") {
						$scope.specialties = [];
						$scope.formData.specialty = null;
					}
					else {
						dictionaryService.getSpecialtyArrayByCid($scope.formData.edu_1.collage.collage_id).then(function (specialties) {
							$scope.specialties = specialties;
						});
					}
				}
			//验证账号是否已经存在
              $scope.verifyUser=function(){
			  signupService.verifyAccount($scope.formData.user_account).then(function(result){
				  console.log(result);
				  $scope.verify_user_info = result.message;
			  });
		  }
			  //注册账号
			  $scope.registerAccount=function(){
			  //行业
				console.log($scope.formData.industry);
				$scope.formData.user_info.industrial_name =
					angular.isDefined($scope.formData.industry) ?
						$scope.formData.industry.industrial_name : "";

                   $scope.formData.user_info.industry_id =
					angular.isDefined($scope.formData.industry) ?
						$scope.formData.industry.industry_id : "";
				//省
				$scope.formData.user_info.user_province =
					angular.isDefined($scope.formData.user_province) ?
						$scope.formData.user_province.province_name : "";

				//省id
				$scope.formData.user_info.province_id =
					angular.isDefined($scope.formData.user_province) ?
						$scope.formData.user_province.n_province_id : "";

                 //市
				$scope.formData.user_info.user_city =
					angular.isDefined($scope.formData.user_city) ?
						$scope.formData.user_city.city_name : "";
				//市id
				$scope.formData.user_info.city_id =
					angular.isDefined($scope.formData.user_city) ?
						$scope.formData.user_city.city_id : "";

                //学籍信息
				  	$scope.formData.user_info.user_city =
					angular.isDefined($scope.formData.user_city) ?
						$scope.formData.user_city.city_name : "";
				  $scope.formData.user_info.user_account=$scope.formData.user_account;
				  $scope.formData.user_info.user_pwd=$scope.formData.user_pwd;
				  $scope.formData.user_info.user_email=$scope.formData.user_email;
				  $scope.formData.user_info.user_gender=$scope.formData.user_gender;
				  $scope.formData.user_info.user_name=$scope.formData.user_name;
				  $scope.formData.user_info.user_nation=$scope.formData.user_nation;
				  $scope.formData.user_info.user_officephone=$scope.formData.user_officephone;
                  $scope.formData.user_info.user_post=$scope.formData.user_post;
				  $scope.formData.user_info.user_qq=$scope.formData.user_qq;
				  $scope.formData.user_info.user_wechat=$scope.formData.user_wechat;
                  $scope.formData.user_info.user_workplace=$scope.formData.user_workplace;
				  $scope.formData.user_info.user_workunit=$scope.formData.user_workunit;
				  $scope.formData.user_info.user_birthday=$scope.formData.user_birthday;
                  $scope.formData.user_info.user_cellphone=$scope.formData.user_cellphone;

			var data = {
					"user_info" : $scope.formData.user_info,
					"user_education": $scope.educations
				};
				console.log(data);
               signupService.signUp(data).then(function (result) {
					$scope.formData = result.data;
				   console.log(formData+"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
				   $scope.educations = $scope.formData.user_education;
                })
		}
		 }
	]);

});
