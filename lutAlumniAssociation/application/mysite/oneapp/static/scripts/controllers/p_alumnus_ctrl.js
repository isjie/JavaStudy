define([
	'app'
], function (app) {
	app.controller('alumnusCtrl',
		[
			'$scope',
			'$http',
			'$state',
			'$timeout',
			'logger',
			'alumnusConfig',
			'pubSubService',
			'alumnusService',
			'dictionaryService',
			'uiGridConstants',
			function (
				$scope,
				$http,
				$state,
				$timeout,
				logger,
				alumnusConfig,
				pubSubService,
				alumnusService,
				dictionaryService,
				uiGridConstants
			) {

				/*概要列表的配置文件*/
				//概要列表的anGrid配置对象
				$scope.general_table_options = {
					columnDefs://用一个对象数组定义每一列
							   [
												   //{field: "user_id", visible: false}, //保存user_id，但并不显示
												   {
													   displayName: "姓名",
													   field:       "user_name",
													   // width:       '10.5%'
													   width:       '70'
												   },
												   {
													   displayName:  "性别",
													   field:        "user_gender",
													   width:        '5%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "民族",
													   field:        "user_nation",
													   width:        '7%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "出生年月",
													   field:        "user_birthday",
													   width:        '11%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "毕业年",
													   field:        "grade_year",
													   width:        '7%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "学历",
													   field:        "user_edu",
													   width:        '9%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "专业",
													   field:        "specialty_name",
													   width:        '19%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "所在市",
													   field:        "user_city",
													   width:        '15%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "手机",
													   field:        "user_cellphone",
													   width:        '12%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "",
													   field:        "user_id",
													   width:        "10%",
													   cellTemplate: '<div>' +
																	 '<button class="btn btn-default btn-xs" ' +
																	 'ng-click="grid.appScope.showAlumnus(row)">详细</button>' +
																	 '</div>'
												   }
											   ],

					enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER, //不允许显示垂直滚动条
					enableVerticalScrollbar:   uiGridConstants.scrollbars.NEVER, //不允许显示水平滚动条

					multiSelect:            true, //允许多选，为false时一次只能选择一个
					//enableSelectAll: true, //允许selctall选择框全选所有对象，默认为true
					//enableRowHeaderSelection: true, //允许使用选择框，默认为true
					enableFullRowSelection: true, //允许点击选择框和双击两种方式选中行
					//modifierKeysToMultiSelect: true, //只允许使用ctrl和shift按键进行多选
					onRegisterApi:          function (gridApi) {
						//注册API，这样外部可以通过$scope.gridApi调用ui-grid的API函数
						$scope.gridApi = gridApi;
					}
				}

				/*学籍详情列表的配置文件*/
				//学籍详情列表的anGrid配置对象
				$scope.edu_table_options = {
					columnDefs://用一个对象数组定义每一列

											   [
												   {
													   displayName: "姓名",
													   field:       "user_name",
													   // width:       '10.5%'
													   width:       '70'
												   },
												   {
													   displayName:  "学历",
													   field:        "user_edu",
													   width:        '9%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "入学年",
													   field:        "entrance_year",
													   width:        '8%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "毕业年",
													   field:        "grade_year",
													   width:        '8%',
													   columnFilter: 'null'
												   },

												   {
													   displayName:  "学籍学院",
													   field:        "collage_edu_name",
													   width:        '19%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "专业",
													   field:        "specialty_name",
													   width:        '23%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "管理学院",
													   field:        "collage_admin_name",
													   width:        '18%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "",
													   field:        "user_id",
													   width:        "10%",
													   cellTemplate: '<div>' +
																	 '<button class="btn btn-default btn-xs" ' +
																	 'ng-click="grid.appScope.showAlumnus(row)">详细</button>' +
																	 '</div>'
												   }
											   ],

					enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER, //不允许显示垂直滚动条
					enableVerticalScrollbar:   uiGridConstants.scrollbars.NEVER, //不允许显示水平滚动条

					multiSelect:            true, //允许多选，为false时一次只能选择一个
					//enableSelectAll: true, //允许selctall选择框全选所有对象，默认为true
					//enableRowHeaderSelection: true, //允许使用选择框，默认为true
					enableFullRowSelection: true, //允许点击选择框和双击两种方式选中行
					//modifierKeysToMultiSelect: true, //只允许使用ctrl和shift按键进行多选
					onRegisterApi:          function (gridApi) {
						//注册API，这样外部可以通过$scope.gridApi调用ui-grid的API函数
						$scope.gridApi = gridApi;
					}
				}

				/*工作详情列表的配置文件*/
				//工作详情列表的anGrid配置对象
				$scope.workinfo_table_options = {
					columnDefs://用一个对象数组定义每一列
											   [
												   //{field: "user_id", visible: false}, //保存user_id，但并不显示
												   {
													   displayName: "姓名",
													   field:       "user_name",
													   // width:       '10.5%'
													   width:       '70'
												   },
												   {
													   displayName:  "工作单位",
													   field:        "user_workunit",
													   width:        '19%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "职务",
													   field:        "user_post",
													   width:        '18%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "行业",
													   field:        "industrial_name",
													   width:        '18%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "所在省",
													   field:        "user_province",
													   width:        '9%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "所在市",
													   field:        "user_city",
													   width:        '9%',
													   columnFilter: 'null'
												   },
												   {
													   displayName:  "办公电话",
													   field:        "user_officephone",
													   width:        '12%',
													   columnFilter: 'null'
												   },
												   // {
												   //    displayName:  "单位地址",
												   //    field:        "user_workplace",
												   //    width:        '12%',
												   //    columnFilter: 'null'
												   // },
												   {
													   displayName:  "",
													   field:        "user_id",
													   width:        "10%",
													   cellTemplate: '<div>' +
																	 '<button class="btn btn-default btn-xs" ' +
																	 'ng-click="grid.appScope.showAlumnus(row)">详细</button>' +
																	 '</div>'
												   }
											   ],
					enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER, //不允许显示垂直滚动条
					enableVerticalScrollbar:   uiGridConstants.scrollbars.NEVER, //不允许显示水平滚动条

					multiSelect:            true, //允许多选，为false时一次只能选择一个
					//enableSelectAll: true, //允许selctall选择框全选所有对象，默认为true
					//enableRowHeaderSelection: true, //允许使用选择框，默认为true
					enableFullRowSelection: true, //允许点击选择框和双击两种方式选中行
					//modifierKeysToMultiSelect: true, //只允许使用ctrl和shift按键进行多选
					onRegisterApi:          function (gridApi) {
						//注册API，这样外部可以通过$scope.gridApi调用ui-grid的API函数
						$scope.gridApi = gridApi;
					}
				}
				/**
				 * 默认的搜索数据
				 * @type {{user_info: {user_name: string, user_gender: string, user_age: string, user_nation: string, user_workunit: string, user_post: string, user_province: string, user_city: string, user_office_phone: string, user_qq: string}, user_education: {specialty_name_cn: string, entrance_year1: string, entrance_year2: string, collage_admin_name: string, user_edu_1: string, user_edu_2: string, user_edu_3: string, user_edu_4: string}}}
				 */
					// 直接用=赋值会有问题
				$scope.terms = angular.copy(alumnusConfig.search_terms);
				/**
				 * 默认的分页数据
				 * @type {{page: number, page_row_num: number, page_total_num: number, row_total_num: number}}
				 */
				$scope.pages = angular.copy(alumnusConfig.pages);
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
				//暂时存储选择的省、市、学院、专业信息
				$scope.adv_temp_Data = angular.copy(alumnusConfig.adv_temp_Data);
				//高级搜索条件展示列表
				$scope.terms_dis = [];

				//高级搜索的收放
				$("#show_advance_search").click(function () {
					if ($("#advance_search_dialog").is(":visible")) {
						$("#show_advance_search").find("span").text("显示高级搜索条件");
						$("#advance_search_dialog").slideUp("fast");
					} else {
						$("#show_advance_search").find("span").text("关闭高级搜索条件");
						$("#advance_search_dialog").slideDown("fast");
					}
					// return false;
				});

				$scope.showinfo = {
					general:  true,
					edu:      false,
					workinfo: false
				}
				/**
				 * 校友管理页面控制选项卡显示的函数
				 * @param i 标签序号
				 */
				$scope.showInfo = function (i) {
					if (i == 1) {
						$scope.showinfo = {
							general:  true,
							edu:      false,
							workinfo: false
						}
						//$scope.getAlumnus();
					}
					else if (i == 2) {
						$scope.showinfo = {
							general:  false,
							edu:      true,
							workinfo: false
						}
						//$scope.getAlumnus();
					}
					else {
						$scope.showinfo = {
							general:  false,
							edu:      false,
							workinfo: true
						}
						//$scope.getAlumnus();
					}
				}
				/**
				 * 通过后台读取数据
				 * @param page_init_flag 是否需要初始化分页参数    ===================为什么打开你就运行
				 */
				$scope.getAlumnus = function (page_init_flag) {
					if (!angular.isDefined(page_init_flag))
						page_init_flag = false;
					if (page_init_flag == true) {
						$scope.pages = angular.copy(alumnusConfig.pages);
					}
					alumnusService.getSomeByTerms($scope.terms, $scope.pages).then(function (alumnus) {
						console.log(alumnus);
						$scope.gridHeight();
						$scope.pages = alumnus.pages;
						$scope.general_table_options.data = alumnus.data;
						$scope.edu_table_options.data = alumnus.data;
						$scope.workinfo_table_options.data = alumnus.data;
					});
				}

				//消息订阅/发布模式的订阅者
				//当收到page change的消息后，根据传来的分页信息，自动ajax访问后端调用数据
				pubSubService.subscribe(function (event, data) {
					$scope.pages = data;
					// console.log("subscribe event:page_change", $scope.pages)
					//访问后端调用数据
					$scope.getAlumnus();
				}, $scope, 'page_change');

				//通过每页行数控制grid高度的函数
				$scope.gridHeight = function () {
					var h = $scope.pages.page_row_num * 30 + 32;
					$("#general_table").height(h);
					$("#edu_table").height(h);
					$("#workinfo_table").height(h);
					$scope.gridApi.grid.handleWindowResize();
				}

				/**
				 * 简单搜索
				 */
				$scope.easySearch = function () {
					// console.log("hahahahahahahhahahahahagw我是简单搜索");
					var buildEasyTerm = function () {
						if (!angular.isDefined($scope.easy_search_type)) return false;
						if (!angular.isDefined($scope.easy_search_param)) return false;
						//先清空查询条件
						$scope.terms = angular.copy(alumnusConfig.search_terms);
						// console.log("alumnusConfig.search_terms：", alumnusConfig.search_terms);
						//再设置搜索条件
						var type = $scope.easy_search_type.split(".");
						$scope.terms[type[0]][type[1]] = $scope.easy_search_param;
						// console.log("alumnusConfig.search_terms：", alumnusConfig.search_terms);
						// console.log("$scope.terms：", $scope.terms);
						return true;
					}

					if (buildEasyTerm()) {
						$scope.TermsList();
						$scope.getAlumnus(true);
					}
				}

				/**
				 * 简单搜索的敲击回车触发器
				 * @param e
				 */
				$scope.easySearchEnter = function (e) {
					if (e.keyCode == 13) {
						$scope.easySearch();
					}
				}
				/**
				 * 请求省列表
				 */
				dictionaryService.getProvinceArray().then(function (provinces) {
					$scope.provinces = provinces;
				})
				/**
				 * 根据省的国家id请求市列表
				 */
				$scope.showCity = function () {
					if ($scope.adv_temp_Data.province == null) {
						$scope.cities = [];
						$scope.adv_temp_Data.city = null;
					}
					else if ($scope.adv_temp_Data.province.n_province_id == "") {
						$scope.cities = [];
						$scope.adv_temp_Data.city = null;
					}
					else {
						dictionaryService.getCityArrayByPid($scope.adv_temp_Data.province.n_province_id).then(function (cities) {
							$scope.cities = cities;
						})
					}
				}
				/**
				 * 获取行业表信息
				 */
				dictionaryService.getIndustrialArray().then(function (industries) {
					$scope.industries = industries;
				});
				/**
				 * 获取学院表信息
				 */
				dictionaryService.getCollageArray().then(function (collages) {
					$scope.collages = collages;

				});
				/**
				 * 根据学院id获取专业列表信息
				 */
				$scope.showSpecialty = function () {
					if ($scope.adv_temp_Data.collage_edu == null) {
						$scope.specialties = [];
						$scope.adv_temp_Data.specialty = null;
					}
					else if ($scope.adv_temp_Data.collage_edu.collage_id == "") {
						$scope.specialties = [];
						$scope.adv_temp_Data.specialty = null;

					}
					else {
						dictionaryService.getSpecialtyArrayByCid($scope.adv_temp_Data.collage_edu.collage_id).then(function (specialties) {
							$scope.specialties = specialties;
						});
					}
				}
				/**
				 * 高级搜索
				 */
				$scope.advSearch = function () {

					var buildAdvTerm = function () {
						// console.log($scope.adv_temp_Data);
						if ($scope.adv_temp_Data.province != null)
							$scope.terms.user_info.user_province = $scope.adv_temp_Data.province.province_name;
						else
							$scope.terms.user_info.user_province = "";

						if ($scope.adv_temp_Data.city != null)
							$scope.terms.user_info.user_city = $scope.adv_temp_Data.city.city_name;
						else
							$scope.terms.user_info.user_city = "";

						if ($scope.adv_temp_Data.industry != null)
							$scope.terms.user_info.industry = $scope.adv_temp_Data.industry.industrial_name;
						else
							$scope.terms.user_info.industry = "";

						if ($scope.adv_temp_Data.collage_admin != null)
							$scope.terms.user_education.collage_admin_name = $scope.adv_temp_Data.collage_admin.collage_name_cn;
						else
							$scope.terms.user_education.collage_admin_name = "";

						if ($scope.adv_temp_Data.collage_edu != null)
							$scope.terms.user_education.collage_edu_name = $scope.adv_temp_Data.collage_edu.collage_name_cn;
						else
							$scope.terms.user_education.collage_edu_name = "";

						if ($scope.adv_temp_Data.specialty != null)
							$scope.terms.user_education.specialty_name_cn = $scope.adv_temp_Data.specialty.specialty_name_cn;
						else
							$scope.terms.user_education.specialty_name_cn = "";

						//把高级搜索条件传给通用搜索条件
						// $scope.terms = angular.copy($scope.terms);
						// console.log("高级搜索参数：", $scope.terms);
						return true;
					}
					if (buildAdvTerm()) {
						$scope.TermsList();
						$scope.getAlumnus(true);
						// console.log("hahahahahahahahahaha我是高级搜索");
					}
				}
				/**
				 * 生成搜索条件显示列表
				 */
				$scope.TermsList = function () {
					$scope.terms_dis = [];
					for (t in $scope.terms.user_info) {
						if ($scope.terms.user_info[t] != '' && $scope.terms.user_info[t] != null) {
							$scope.terms_dis.push({
								'k': t,
								'v': $scope.terms.user_info[t]
							});
						}
					}
					for (t in $scope.terms.user_education) {
						if ($scope.terms.user_education[t] != '' && $scope.terms.user_education[t] != null) {
							$scope.terms_dis.push({
								'k': t,
								'v': $scope.terms.user_education[t]
							});
						}
					}
				}

				/**
				 * 复位高级搜索条件
				 */
				$scope.resetAdvTerms = function () {
					//搜索数据清空
					$scope.adv_temp_Data = angular.copy(alumnusConfig.adv_temp_Data);
					$scope.terms = angular.copy(alumnusConfig.terms);

					//高级搜索条件展示列表清空
					$scope.terms_dis = [];
					$scope.easySearch();
				}
				/**
				 * removeSearchOption 删除某个搜索条件
				 * @param search_option 要删除的搜索条件，是$scope.terms_dis中的一个对象
				 */
				$scope.removeSearchOption = function (search_option) {
					//在搜索条件显示列表中删除对象
					_.remove($scope.terms_dis, function (s) {
						return s.k == search_option.k;
					})

					//在搜索数据中删除对象
					if (angular.isDefined($scope.terms.user_info[search_option.k]))
						$scope.terms.user_info[search_option.k] = "";
					if (angular.isDefined($scope.terms.user_education[search_option.k]))
						$scope.terms.user_education[search_option.k] = "";

					//重新搜索数据
					$scope.getAlumnus(true);
				}

				//是否显示高级搜索框
				$scope.show_adv_flag = false;
				$scope.toggleAdvSearch = function () {
					$scope.show_adv_flag = !$scope.show_adv_flag;
				}


				/**
				 * 删除用户
				 */
				$scope.deleteAlumnus = function () {
					var rows = $scope.gridApi.selection.getSelectedGridRows();
					//使用lodash类库过滤出选中行的User_id数组
					var e_array = _.map(rows, 'entity');
					var id_array = _.map(e_array, 'user_id');
					var name_array = _.map(e_array, 'user_name');
					var name_str = name_array.join(",");

					if (confirm("你确定要删除选中的校友信息吗？\n" + name_str)) {
						alumnusService.delSomeByIdArray(id_array).then(function (msg) {
							$scope.getAlumnus();
						});
					}
				}

				/**
				 * 重置密码byIds
				 */
				$scope.resetPasswordByIds = function () {
					var rows = $scope.gridApi.selection.getSelectedGridRows();
					//使用lodash类库过滤出选中行的User_id数组
					var e_array = _.map(rows, 'entity');
					var id_array = _.map(e_array, 'user_id');
					var name_array = _.map(e_array, 'user_name');
					var name_str = name_array.join(",");

					if (confirm("你确定要重置选中校友的的密码吗？\n" + name_str)) {
						console.log("修改密码ids"+id_array);
						alumnusService.resetPasswordByIdArray(id_array).then(function (msg) {
							$scope.getAlumnus();
						});
					}
				}

				/**
				 * 显示用户
				 * @param row
				 */
				$scope.showAlumnus = function (row) {
					console.log(row);
					$state.go('person_info_show', {user_id: row.entity.user_id});
				}

				/**
				 * 修改用户
				 */
				$scope.updateAlumnus = function (row) {
					// console.log(row);
					$state.go('person_info_show', {user_id: row.entity.user_id});
				}

                /**
				 * 按照当前的搜索条件导出校友数据
                 */
				$scope.downloadAlumByTerms = function () {
					console.log($scope.terms)
					$.ajax({
						type:     'POST',
						url:      '/export_file_by_terms',
						data:     {
							"user":  localStorage.getItem("user"),
							"token": localStorage.getItem("token"),
							"terms": JSON.stringify($scope.terms),
						},
						datatype: 'json',
						success:  function (result) {
							console.log(result)
							if (result.code == "0") {
								console.log("excel生成，url = ");
								// $state.go('/static/export/example.xls');
								window.location.href = '/static/'+ result.file_name;
							} else {
								logger.logError("后端download_file_by_terms接口读取数据失败，错误代码：" + result.code, 5000);
							}

						},
						error:    function (XHR) {
							var data = XHR.responseText;
							logger.logError("网络连接错误：" + data, 5000);
						}
					});
				}

			}

		]);

});
