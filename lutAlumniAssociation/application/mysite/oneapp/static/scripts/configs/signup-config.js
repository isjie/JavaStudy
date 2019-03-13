define([
	'app'
], function (app) {
	//table配置文件
	app.factory('signupConfig', [
		function () {
			return {
				userdata: {
					"user_info":      {
						//"user_id":          null,
						"user_account":     "",
						"user_pwd":         "",
						"user_name":        "",
						"user_gender":      "男",
						"user_nation":      "",
						"user_birthday":    "",
						"user_province":    "",
						"country_name_cn":  "",
						"country_id":       null,
						"province_id":      null,
						"user_city":        "",
						"city_id":          null,
						"user_cellphone":   "",
						"user_workunit":    "",
						"user_officephone": "",
						"user_qq":          "",
						"user_wechat":      "",
						"user_email":       "",
						"industrial_name":  "",
						"industrial_id":    null,
						"user_post":        "",
						"user_workplace":   "",
						country_temp: {
							country_name_cn: "",
							country_id: ""
						},
						province_temp:      {
							province_name: "",
							n_province_id: ""
						},
						city_temp:          {
							city_name: "",
							city_id:   ""
						},
						industrial_temp:      {
							industrial_name: "",
							industrial_id:   ""
						},
					},
					"user_education": [
						{
							//"edu_id":             null,
							"user_edu":           "",
							//"user_id":            null,
							"collage_admin_id":   null,
							"collage_admin_name": "",
							"collage_edu_id":     null,
							"collage_edu_name":   "",
							"specialty_id":       null,
							"specialty_name_cn":     "",
							"entrance_year":      "",
							"grade_year":         "",
							"classes":            "",
							collage_edu_temp:   {
								collage_name_cn: "",
								collage_id:      null
							},
							specialty_list: [],
							specialty_temp:     {
								specialty_name_cn: "",
								specialty_id:      null
							}
						}
					]
				},

				formData: {
					"user_info":   {
						user_account:       ""
						, user_pwd:         ""
						, user_name:        ""
						, user_gender:      "男"
						, user_birthday:    ""
						, user_nation:      "汉族"
						, user_cellphone:   ""
						, user_email:       ""
						, user_qq:          ""
						, user_wechat:      ""
						, user_workunit:    ""
						, user_post:        ""
						, user_officephone: ""
						, user_workplace:   ""

					},
					"educations":  [
						{
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
						}
					],
					province:      {
						province_name: "",
						n_province_id: ""
					},
					city:          {
						city_name: "",
						city_id:   ""
					},
					industry:      {
						industrial_name: "",
						industrial_id:   ""
					},
					collage_admin: {
						collage_name_cn: "",
						collage_id:      ""
					},
					collage_edu:   {
						collage_name_cn: "",
						collage_id:      ""
					},
					specialty:     {
						specialty_name_cn: "",
						specialty_id:      ""
					}
				}
			};

		}
	])
})


/**
 * Created by Administrator on 2017/10/30 0030.
 */
