define([
	'app'
], function (app) {

	app.controller('organizationCtrl', [

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


			//预先把ajax数据放在这，好作为参考
			//{
			//	"code":0,
			//	"data":
			//	[{"org_id":             1,
			//		"org_name":         "\u5170\u5dde\u7406\u5de5\u5927\u5b66\u5170\u5dde\u6821\u53cb\u4f1a",
			//		"org_province":     "\u7518\u8083\u7701",
			//		"org_city":         "\u5170\u5dde\u5e02",
			//		"org_found_time":   "2012-07-01",
			//		"org_member_num":   3,
			//		"org_contact_info": null,
			//		"user_name":  null
			//	}, {"org_id":           2,
			//		"org_name":         "\u5170\u5dde\u7406\u5de5\u5927\u5b66\u5317\u4eac\u6821\u53cb\u4f1a",
			//		"org_province":     "\u5317\u4eac\u5e02",
			//		"org_city":         null,
			//		"org_found_time":   null,
			//		"org_member_num":   6,
			//		"org_contact_info": null,
			//		"user_name":  "\u738b\u5fd7\u4f1f"
			//	}]
			//}

			/*工作详情列表的配置文件*/
			//工作详情列表的anGrid配置对象
			$scope.org_table_options = {
				columnDefs://用一个对象数组定义每一列
				   [
					   {
						   displayName: "组织名称",
						   field:       "org_name",
						   width:       '150'
					   },
					   {
						   displayName:  "所在省",
						   field:        "org_province",
						   width:        '10%',
						   columnFilter: 'null'
					   },
					   {
						   displayName:  "所在市",
						   field:        "org_city",
						   width:        '10%',
						   columnFilter: 'null'
					   },
					   {
						   displayName:  "成立时间",
						   field:        "org_found_time",
						   width:        '10%',
						   columnFilter: 'null'
					   },
					   {
						   displayName:  "组织人数",
						   field:        "org_member_num",
						   width:        '10%',
						   columnFilter: 'null'
					   },
					   {
						   displayName:  "联系人",
						   field:        "user_name",
						   width:        '10%',
						   columnFilter: 'null'
					   },
					   {
						   displayName:  "联系方式",
						   field:        "org_contact_info",
						   width:        '20%',
						   columnFilter: 'null'
					   },
					   {
						   displayName:  "",
						   field:        "org_id",
						   width:        "72",
						   cellTemplate: '<div>' +
										 '<button class="btn btn-default btn-xs" ' +
										 'ng-click="grid.appScope.showAlumnus(row)">详细</button>'

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
			$scope.terms = angular.copy(alumnusConfig.search_terms);

			/**
			 * 默认的分页数据
			 * @type {{page: number, page_row_num: number, page_total_num: number, row_total_num: number}}
			 */
			$scope.pages = angular.copy(alumnusConfig.pages);

		}
	]);


});
