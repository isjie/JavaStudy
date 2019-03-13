define([
	'app'
], function (app) {
	//table配置文件
	app.factory('alumnusConfig', [ function () {
		return {
			//高级搜索的默认参数
			search_terms:
				{
					"user_info":
						{
							"user_name": "",
							"user_gender": "",
							"user_age": "",
							"user_nation": "",
							"user_workunit": "",
							"user_post": "",
							"user_province": "",
							"user_city": "",
							"user_office_phone": "",
							"user_cellphone": "",
							"user_qq": "",
							"author_id":""

						},
					"user_education":
						{
							"specialty_name_cn": "",
							"entrance_year1": "",
							"entrance_year2": "",
							"collage_admin_name": "",
							"collage_edu_name": "",
							"user_edu_1": "",
							"user_edu_2": "",
							"user_edu_3": "",
							"user_edu_4": ""
						}
				},
			pages:
				{
					page:           1,
					page_row_num:   10,
					page_total_num: 1,
					row_total_num:  0
				},
			adv_temp_Data :
				{
                    province:
						{
							province_name: "",
							n_province_id: ""
						},
                    city:
						{
							city_name: "",
							city_id: ""
						},
                    industry:
						{
							industrial_name: "",
							industrial_id: ""
						},
                    collage_admin:
						{
							collage_name_cn: "",
							collage_id: ""
						},
                    collage_edu:
						{
							collage_name_cn: "",
							collage_id: ""
						},
                    specialty:
						{
							specialty_name_cn: "",
							specialty_id: ""
						}
				}

		};

	}])
});

