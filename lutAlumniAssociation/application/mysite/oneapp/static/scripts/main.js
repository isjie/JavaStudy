require.config({
	baseUrl: '/static/scripts',
	//路径
	paths:   {
		//angularjs世家
		//'angular':                '../libs/angular-1.6.4/angular'
		//,'angular_route':         '../libs/angular-1.6.4/angular-route.min'
		//,'angular_animate':       '../libs/angular-1.6.4/angular-animate.min'
		//,'angular_sanitize':      '../libs/angular-1.6.4/angular-sanitize.min'
		//,'angular-resource':      '../libs/angular-1.6.4/angular-resource.min'

		'angular':            '../libs/angular-1.3.7/angular'
		, 'angular_route':    '../libs/angular-1.3.7/angular-route.min'
		, 'angular_animate':  '../libs/angular-1.3.7/angular-animate.min'
		, 'angular_sanitize': '../libs/angular-1.3.7/angular-sanitize.min'
		, 'angular_resource': '../libs/angular-1.3.7/angular-resource.min'

		//angularjs第三方库
		, 'angular_ui_router':           '../libs/angular-ui-router-0.2.11/angular-ui-router' // State-based routing for AngularJS
		, 'angular_locker':              '../libs/angular-locker/angular-locker' // * A simple & configurable abstraction for local/session storage
		//jquery家族
		, 'jquery':                      '../libs/jquery.1.12.4/jquery.1.12.4.min'
		, 'jquery_ui':                   '../libs/jquery.ui.1.10.3/jquery-ui-1.10.3.min'
		, 'bootstrap':                   '../libs/bootstrap_3rd_party/bootstrap.min'
		, 'jquery_toastr':               '../libs/toastr.2.2.1/toastr'
		, 'icheck':                      '../libs/bootstrap_3rd_party/icheck.min'
		//lodash加强类库
		, 'lodash':                      '../libs/lodash.3.6.0/lodash.min'

		//echarts3.0
		, 'echart': '../libs/echarts3.0/echarts.min'

		//ui-grid
		, 'ui-grid': '../libs/ui-grid.4.0.6/ui-grid.min'
		//app
		, 'app': 'app'
	},
	//依赖关系
	shim:    {
		'angular_route':       ['angular']
		, 'angular_animate':   ['angular']
		, 'angular_sanitize':  ['angular']
		, 'angular_resource':  ['angular']
		, 'angular_ui_router': ['angular']
		, 'angular_locker':    ['angular']

		, 'ui-grid':            ['angular', 'angular_sanitize']
		, 'bootstrap':         ['jquery']
		, 'jquery_ui':         ['jquery']
		, 'jquery_toastr':     ['jquery']

		// app的依赖最为重要，直接决定运行时依赖关系
		, 'app': [
			'angular',
			'angular_route',
			'angular_animate',
			'angular_sanitize',
			'angular_resource',
			'angular_ui_router',
			'angular_locker',
			'ui-grid',
			'lodash'
		]
	}
});

require([
		'app'
		//注意，与jquery相关的依赖不要写在shim里，而应该像下面这样单独require，这样可以避免加载不到
		, 'jquery'
		, 'jquery_ui'
		, 'bootstrap'
	],
	function (app) {
		angular.bootstrap(document, ['app']);
}
);