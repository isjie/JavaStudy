define([], function () {
	return {
		defaultRoutePath: '/signin',
		routes:
		{
			//登陆页面
			'signin':      {
				url:          "/signin",
				noAuth:       true, //该页面不进行用户验证
				templateUrl:  'static/views/signin.html',
				dependencies: [
					'/static/scripts/controllers/signin_ctrl.js'
				]
			},

			//用户统计页面
			'statistics':      {
				url:          "/statistics",
				templateUrl:  'static/views/p_statistics.html',
				dependencies: [
					'/static/scripts/controllers/p_statistics_ctrl.js'
				]
			},

			//校友信息
			'alumnus':      {
				url:          "/alumnus",
				templateUrl:  'static/views/p_alumnus.html', //v
				dependencies: [
					'/static/scripts/controllers/p_alumnus_ctrl.js',  //C
					'/static/scripts/services/alumnus-service.js', //M
					'/static/scripts/services/dictionary-service.js', //M
					'/static/scripts/configs/alumnus-config.js' //M
				]
			},

			//校友信息上传导入页面，仅限管理员访问
			'upload_alumnus':      {
				url:          "/upload_alumnus",
				templateUrl:  'static/views/upload_alumnus.html',
				dependencies: [
					'/static/scripts/controllers/upload_alumnus_ctrl.js',
				]
			},

			//用户授权页面
			'audit':      {
				url:          "/audit",
				templateUrl:  'static/views/p_audit.html', //v
				dependencies: [
					'/static/scripts/controllers/p_audit_ctrl.js',  //C
					'/static/scripts/services/alumnus-service.js', //M
					'/static/scripts/services/dictionary-service.js', //M
					'/static/scripts/services/author-service.js', //M
					'/static/scripts/configs/alumnus-config.js' //M
				]
			},

			//学校信息页面
			'school':      {
				url:          "/school",
				templateUrl:  'static/views/p_school.html',
				dependencies: [
					'/static/scripts/controllers/p_school_ctrl.js',
					'/static/scripts/services/dictionary-service.js' //M
				]
			},

			//校友组织页面
			'organization':      {
				url:          "/organization",
				templateUrl:  'static/views/p_organization.html',
				dependencies: [
					'/static/scripts/controllers/p_organization_ctrl.js',
					'/static/scripts/services/alumnus-service.js', //M
					'/static/scripts/services/dictionary-service.js', //M
					'/static/scripts/configs/alumnus-config.js' //M

				]
			},
			//权限管理页面
			'authority':      {
				url:          "/authority",
				templateUrl:  'static/views/p_authority.html',
				dependencies: [
					'/static/scripts/controllers/p_authority_ctrl.js',
					'/static/scripts/services/alumnus-service.js', //M
					'/static/scripts/services/dictionary-service.js', //M
					'/static/scripts/configs/alumnus-config.js' //M
				]
			},

			//发送邮件页面
			'email':      {
				url:          "/email",
				templateUrl:  'static/views/p_email.html',
				dependencies: [
					'/static/scripts/controllers/p_email_ctrl.js'
				]
			},
			//注册流程页面及其子页面（注意，调用时从signup.step.one开始）
			'signup':      {
				url:          "/signup",
				noAuth:       true, //该页面不进行用户验证
				templateUrl:  'static/views/signup.html',
				dependencies: [
					'/static/scripts/controllers/signup_ctrl.js',
					'/static/scripts/configs/signup-config.js',
					'/static/scripts/services/signup-service.js',//M
					'/static/scripts/services/dictionary-service.js' //M
				]
			},
			'signup.step_one':      {
				url:          "/step_one",
				noAuth:       true, //该页面不进行用户验证
				templateUrl:  'static/views/wizard/step_one.html',
				dependencies: [
					'/static/scripts/controllers/signup_ctrl.js',
					'/static/scripts/configs/signup-config.js' ,
					'/static/scripts/services/signup-service.js',//M
				]
			},
			'signup.step_two':      {
				url:          "/step_two",
				noAuth:       true, //该页面不进行用户验证
				templateUrl:  'static/views/wizard/step_two.html',
				dependencies: [
					'/static/scripts/controllers/signup_ctrl.js',
					'/static/scripts/configs/signup-config.js',
					'/static/scripts/services/signup-service.js',//M
				]
			},
			'signup.step_three':      {
				url:          "/step_three",
				noAuth:       true, //该页面不进行用户验证
				templateUrl:  'static/views/wizard/step_three.html',
				dependencies: [
					'/static/scripts/controllers/signup_ctrl.js',
					'/static/scripts/configs/signup-config.js' ,
					'/static/scripts/services/signup-service.js',///M

				]
			},
			'signup.step_four':      {
				url:          "/step_four",
				noAuth:       true, //该页面不进行用户验证
				templateUrl:  'static/views/wizard/step_four.html',
				dependencies: [
					'/static/scripts/controllers/signup_ctrl.js',
					'/static/scripts/configs/signup-config.js',
					'/static/scripts/services/signup-service.js',//M
				]
			},
        	'signup.step_five':      {
				url:          "/step_five",
				noAuth:       true, //该页面不进行用户验证
				templateUrl:  'static/views/wizard/step_five.html',
				dependencies: [
					'/static/scripts/controllers/signup_ctrl.js',
					'/static/scripts/configs/signup-config.js' ,
					'/static/scripts/services/signup-service.js', //M
				]
			},

			//修改个人密码页面
			'person_pwd':      {
				url:          "/person_pwd",
				templateUrl:  'static/views/person/person_pwd.html',
				dependencies: [
					'/static/scripts/controllers/person/pwd_ctrl.js'
				]
			},
			//个人信息显示页面
			'person_info_show':      {
				url:          "/person_info_show:user_id",
				templateUrl:  'static/views/person/info_show.html', //v
				dependencies: [
					'/static/scripts/controllers/person/info_show_ctrl.js',  //C
					'/static/scripts/services/alumnus-service.js' //M
				]
			},

			//修改个人信息页面
			'info_modify':      {
				url:          "/info_modify:user_id",
				templateUrl:  'static/views/person/info_modify.html',
				dependencies: [
					'/static/scripts/controllers/person/info_modify_ctrl.js',
					'/static/scripts/services/alumnus-service.js',
					'/static/scripts/services/dictionary-service.js'

				]
			},

		}
	};
});