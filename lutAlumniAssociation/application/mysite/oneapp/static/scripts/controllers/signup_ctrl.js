define([
	'app'
], function (app) {

	app.controller('signupCtrl', [
		'$scope',
		'safeApply',
		'$http',
		'$state',
		'signupConfig',
		'dictionaryService',
		'logger',
		'signupService',
		function (
			$scope,
			safeApply,
			$http,
			$state,
			signupConfig,
			dictionaryService,
			logger,
			signupService
		) {

			//读取用户注册信息
			//如果已经输入过，将会利用localStorage记住内容
			var userdata = localStorage.getItem("signinData");
			console.log(userdata);
			if(userdata == null || userdata == undefined){
				$scope.userdata = angular.copy(signupConfig.userdata);
			}else{
				$scope.userdata = JSON.parse(userdata);
			}




			//国家列表
			$scope.countries = [];
			//行业列表
			$scope.industries = [];
			//省列表
			$scope.provinces = [];
			//城市列表
			$scope.cities = [];
			//学院列表
			$scope.collages = [];

			/*数据获取*/
			//获取国家表，有默认值
			dictionaryService.getCountryArray().then(function (countries) {
				$scope.countries = countries;
				//选中默认值中国
				_.forEach($scope.countries, function (c) {
					if (c.country_name_cn == "中国")
						$scope.userdata.user_info.country_temp = c;
				})
			})
			//获取行业信息表
			dictionaryService.getIndustrialArray().then(function (industries) {
				$scope.industries = industries;
			})
			//获取省表
			dictionaryService.getProvinceArray().then(function (provinces) {
				$scope.provinces = provinces;
			})
			//获取市表，单独用函数方法
			//获取学院表
			dictionaryService.getCollageArray().then(function (collages) {
				$scope.collages = collages;
			});
			//获取专业表，单独用函数方法
			/**
			 * 将选中的国家信息赋值给用户注册信息
			 * @param country_temp 暂存国家信息的字段
			 */
			$scope.countrySet = function (country_temp) {
				if (angular.isDefined(country_temp)) {
					$scope.userdata.user_info.country_name_cn = country_temp.country_name_cn;
					$scope.userdata.user_info.country_id = country_temp.country_id;
				} else {
					$scope.userdata.user_info.country_name_cn = "";
					$scope.userdata.user_info.country_id = null;
				}
			}

			/**
			 * 将选中的行业信息赋值给用户注册信息
			 * @param industrial_temp 暂存行业信息的字段
			 */
			$scope.industrySet = function (industrial_temp) {
				if (angular.isDefined(industrial_temp)) {
					$scope.userdata.user_info.industrial_name = industrial_temp.industrial_name;
					$scope.userdata.user_info.industrial_id = industrial_temp.industrial_id;
				} else {
					$scope.userdata.user_info.industrial_name = "";
					$scope.userdata.user_info.industrial_id = null;
				}
			}


			/**
			 * 将选中的省信息赋值给用户注册信息
			 * @param province_temp 暂存省信息的字段
			 */
			$scope.provinceSet = function (province_temp) {
				if (province_temp != null && province_temp != "") {
					$scope.userdata.user_info.user_province = province_temp.province_name;
					$scope.userdata.user_info.province_id = province_temp.n_province_id;
					$scope.showCity($scope.userdata.user_info.province_id);
				} else {
					$scope.cities = [];
					$scope.userdata.user_info.user_province = "";
					$scope.userdata.user_info.province_id = null;
				}
			}
			/**
			 * 显示城市表，城市表是选定省而后才显示
			 * @param id 省id
			 */
			$scope.showCity = function (id) {
				dictionaryService.getCityArrayByPid(id).then(function (cities) {
					$scope.cities = cities;
				})
			}
			/**
			 * 将选中的城市信息赋值给用户注册信息
			 * @name citySet
			 * @param city_temp 暂存city信息的字段
			 */
			$scope.citySet = function (city_temp) {
				if (angular.isDefined(city_temp)) {
					$scope.userdata.user_info.user_city = city_temp.city_name;
					$scope.userdata.user_info.city_id = city_temp.city_id;
				} else {
					$scope.userdata.user_info.user_city = "";
					$scope.userdata.user_info.city_id = null;
				}
				console.log($scope.userdata.user_info)
			}


			/**
			 * 将选中的学院信息赋值给用户注册信息
			 * @name collageSet
			 * @param i 表示第几学历
			 */
			$scope.collageSet = function (i) {
				var temp = $scope.userdata.user_education[i].collage_edu_temp;
				if (temp != null && temp != "") {
					$scope.userdata.user_education[i].collage_edu_id = temp.collage_id;
					$scope.userdata.user_education[i].collage_edu_name = temp.collage_name_cn;
					/**
					 * 放弃管理学院的概念，强制学籍学院和管理学院一致
					 */
					$scope.userdata.user_education[i].collage_admin_id = temp.collage_id;
					$scope.userdata.user_education[i].collage_admin_name = temp.collage_name_cn;
					$scope.showSpecialty(temp.collage_id, i);
				} else {
					$scope.userdata.user_education[i].specialty_list = [];
					$scope.userdata.user_education[i].collage_edu_temp.collage_id = null;
					$scope.userdata.user_education[i].collage_edu_temp.collage_name_cn = "";
					/**
					 * 放弃管理学院的概念，强制学籍学院和管理学院一致
					 */
					$scope.userdata.user_education[i].collage_admin_id = null;
					$scope.userdata.user_education[i].collage_admin_name = "";
				}
			}

			/**
			 * 显示专业表，专业表是选定学院而后才显示
			 * @name showSpecialty
			 * @param c_id 学院id
			 * @param i 表示第几学历
			 */
			$scope.showSpecialty = function (c_id, i) {
				dictionaryService.getSpecialtyArrayByCid(c_id).then(function (specialties) {
					$scope.userdata.user_education[i].specialty_list = specialties;
				})
			}

			/**
			 * 将选中的专业信息赋值给用户注册信息
			 * @name specialtySet
			 * @param i 表示第几学历
			 */
			$scope.specialtySet = function (i) {
				var temp = $scope.userdata.user_education[i].specialty_temp;
				if (temp != null && temp != "") {
					$scope.userdata.user_education[i].specialty_id = temp.specialty_id;
					$scope.userdata.user_education[i].specialty_name_cn = temp.specialty_name_cn;
				} else {
					$scope.userdata.user_education[i].specialty_temp.specialty_id = null;
					$scope.userdata.user_education[i].specialty_temp.specialty_name_cn = "";
				}
			}

			/**
			 * 添加教育信息，最多4个
			 * @name addEduInfo
			 */
			$scope.addEduInfo = function () {
				if ($scope.userdata.user_education.length < 4) {
					var obj = angular.copy(signupConfig.userdata.user_education[0]);
					$scope.userdata.user_education.push(obj);
				}
			}
			/**
			 * 判断学籍信息的重要字段是否输入为空
			 * @name $scope.eduVerification
			 * @returns {boolean}
			 */
			$scope.eduVerification = function () {
				var edus = $scope.userdata.user_education;
				//要验证的非空字段
				var verify_array = [
					'user_edu',
					'collage_admin_id',
					'collage_admin_name',
					'collage_edu_id',
					'collage_edu_name',
					'specialty_id',
					'specialty_name_cn',
					'entrance_year',
					'grade_year'
				]
				//遍历学籍信息数组
				for(var i=0; i<=edus.length; i++){
					//如果某字段为空
					var key = _.findKey(edus[i], function(e) {
						return e == "" || e == null;
					});
					//该字段又属于非空字段
					var flag = _.findIndex(verify_array, function(str) {
						return str == key;
					});
					//那么就返回false
					if(flag != -1){
						return false;
					}
				}
				return true;
			}

			$scope.localStorageSet = function(){
				localStorage.setItem("signinData", JSON.stringify($scope.userdata));
			}

			/**
			 * 注册函数
			 * 由于各种字段验证已使用angularjs在页面上完成，因此这里的函数只管调用接口
			 */
			$scope.registerAccount = function () {

				console.log('hahahahahaha'+$scope.userdata)

				$scope.localStorageSet();

				//删除测试项目
				var data = angular.copy($scope.userdata);
				delete data["user_info"]["country_temp"];
				delete data["user_info"]["province_temp"];
				delete data["user_info"]["city_temp"];
				delete data["user_info"]["industrial_temp"];
				for(var i=0; i<data.user_education.length; i++){
					delete data.user_education[i].collage_edu_temp;
					delete data.user_education[i].specialty_list;
					delete data.user_education[i].specialty_temp;
				}
				console.log(data);

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
							setTimeout(function(){
								logger.logSuccess("注册成功，将跳转到登陆页面", 5000);
								$state.go('/signin');
							},5000)
						}
					},
					error:    function (XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest);
						logger.logError("网络连接失败，错误代码：" + XMLHttpRequest, 5000);
					}
				});
			}
		}
	]);

});
