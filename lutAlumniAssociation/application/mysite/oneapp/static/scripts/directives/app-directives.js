define([
	'jquery',
	'jquery_ui'
], function () {
	angular.module('app.directives', ['app.service'])
		.directive('imgHolder', [
			function () {
				return {
					restrict: 'A',
					link:     function (scope, ele, attrs) {
						return Holder.run({
							images: ele[0]
						});
					}
				};
			}
		])
		//背景变换，根据不同的连接更改背景
		.directive('customBackground', function () {
			return {
				restrict:   "A",
				controller: [
					'$scope', '$element', '$location', function ($scope, $element, $location) {
						var addBg, path;
						path = function () {
							return $location.path();
						};
						addBg = function (path) {
							$element.removeClass('body-home body-special body-tasks body-lock body-select');
							switch (path) {
								case '/404':
								case '/500':
								case '/signin':
								case '/signup':
									return $element.addClass('body-special');
								case '/select':
									return $element.addClass('body-select');
								case '/lock-screen':
									return $element.addClass('body-special body-lock');
								case '/tasks':
									return $element.addClass('body-tasks');
								default:
									return $element.addClass('body-home');
							}
						};
						addBg($location.path());
						return $scope.$watch(path, function (newVal, oldVal) {
							if (newVal === oldVal) {
								return;
							}
							return addBg($location.path());
						});
					}
				]
			};
		})
		//修改UI主题样式，即更换全局CSS，实际上没有使用
		.directive('uiColorSwitch', [
			function () {
				return {
					restrict: 'A',
					link:     function (scope, ele, attrs) {
						return ele.find('.color-option').on('click', function (event) {
							var $this, hrefUrl, style;
							$this = $(this);
							hrefUrl = void 0;
							style = $this.data('style');
							if (style === 'loulou') {
								hrefUrl = 'styles/main.css';
								$('link[href^="styles/main"]').attr('href', hrefUrl);
							} else if (style) {
								style = '-' + style;
								hrefUrl = 'styles/main' + style + '.css';
								$('link[href^="styles/main"]').attr('href', hrefUrl);
							} else {
								return false;
							}
							return event.preventDefault();
						});
					}
				};
			}
		])
		//收放导航栏
		.directive('toggleMinNav', [
			'$rootScope', function ($rootScope) {
				return {
					restrict: 'A',
					link:     function (scope, ele, attrs) {
						var $window, Timer, app, updateClass, icon;
						app = $('#app');
						icon = $(ele).find("i:first");
						$window = $(window);
						ele.on('click', function (e) {
							if (app.hasClass('nav-min')) {
								app.removeClass('nav-min');
								icon.removeClass('fa-toggle-right').addClass("fa-toggle-left");
							} else {
								app.addClass('nav-min');
								icon.removeClass('fa-toggle-left').addClass("fa-toggle-right");
								$rootScope.$broadcast('minNav:enabled');
							}
							return e.preventDefault();
						});
						Timer = void 0;
						updateClass = function () {
							var width;
							width = $window.width();
							if (width < 768) {
								return app.removeClass('nav-min');
							}
						};
						return $window.resize(function () {
							var t;
							clearTimeout(t);
							return t = setTimeout(updateClass, 300);
						});
					}
				};
			}
		])
		//收放NAV栏内子项
		.directive('collapseNav', [
			function () {
				return {
					restrict: 'A',
					link:     function (scope, ele, attrs) {
						var $a, $aRest, $lists, $listsRest, app;
						$lists = ele.find('ul').parent('li');
						$lists.append('<i class="fa fa-caret-right icon-has-ul"></i>');
						$a = $lists.children('a');
						$listsRest = ele.children('li').not($lists);
						$aRest = $listsRest.children('a');
						app = $('#app');
						$a.on('click', function (event) {
							var $parent, $this;
							if (app.hasClass('nav-min')) {
								return false;
							}
							$this = $(this);
							$parent = $this.parent('li');
							$lists.not($parent).removeClass('open').find('ul').slideUp();
							$parent.toggleClass('open').find('ul').slideToggle();
							return event.preventDefault();
						});
						$aRest.on('click', function (event) {
							return $lists.removeClass('open').find('ul').slideUp();
						});
						return scope.$on('minNav:enabled', function (event) {
							return $lists.removeClass('open').find('ul').slideUp();
						});
					}
				};
			}
		])
		//根据当前链接，高亮导航栏内子项
		.directive('highlightActive', [
			function () {
				return {
					restrict:   "A",
					controller: [
						'$scope', '$element', '$attrs', '$location', function ($scope, $element, $attrs, $location) {
							var highlightActive, links, path;
							links = $element.find('a');
							path = function () {
								return $location.path();
							};
							highlightActive = function (links, path) {
								//path = '#' + path;
								return angular.forEach(links, function (link) {
									var $li, $link, href;
									$link = angular.element(link);
									$li = $link.parent('li');
									href = $link.attr('href');
									if ($li.hasClass('active')) {
										$li.removeClass('active');
									}
									if (path.indexOf(href) === 0) {
										return $li.addClass('active');
									}
								});
							};
							highlightActive(links, $location.path());
							return $scope.$watch(path, function (newVal, oldVal) {
								if (newVal === oldVal) {
									return;
								}
								return highlightActive(links, $location.path());
							});
						}
					]
				};
			}
		])
		//?
		.directive('toggleOffCanvas', [
			function () {
				return {
					restrict: 'A',
					link:     function (scope, ele, attrs) {
						return ele.on('click', function () {
							return $('#app').toggleClass('on-canvas');
						});
					}
				};
			}
		])
		//回退到上一个浏览页面
		.directive('meGoBack', [
			function () {
				return {
					restrict:   "A",
					controller: [
						'$scope', '$element', '$window', function ($scope, $element, $window) {
							return $element.on('click', function () {
								return $window.history.back();
							});
						}
					]
				};
			}
		])
		//全屏模式，依赖jquery
		.directive('meLaunchFullScreen', [
			function () {
				return {
					restrict: 'A',
					scope:    {element: '@meLaunchFullScreen'},
					link:     function (scope, ele) {
						return ele.on('click', function (event) {
							var body = $(body);
							//这里其实做了一个测试，看看有属性requestFullscreen的对象都有谁
							var element = eval(scope.element);
							if (!body.hasClass("full-screen")) {
								body.addClass("full-screen");

								if (element.requestFullscreen) {
									element.requestFullscreen();
								} else if (element.mozRequestFullScreen) {
									element.mozRequestFullScreen();
								} else if (element.webkitRequestFullscreen) {
									element.webkitRequestFullscreen();
								} else if (element.msRequestFullscreen) {
									element.msRequestFullscreen();
								}
							} else {
								body.removeClass("full-screen");

								if (document.exitFullscreen) {
									document.exitFullscreen();
								} else if (document.mozCancelFullScreen) {
									document.mozCancelFullScreen();
								} else if (document.webkitExitFullscreen) {
									document.webkitExitFullscreen();
								}
							}
						});
					}
				};
			}
		])
		//保存当前数据
		.directive('meSave', [
			'$rootScope', 'pubSubService', function () {
				return {
					restrict:   "A",
					controller: [
						'$scope', '$element', 'pubSubService', function ($scope, $element, pubSubService) {
							return $element.on('click', function () {
								pubSubService.publish('header_global_save');
								console.log("save");
							});
						}
					]
				};
			}
		])

		//自定义select单项选择器
		.directive('selectList', [
			'$compile',
			function ($compile) {
				return {
					restrict:   'E',
					scope:      {
						array:    "=",
						select:   "=",
						templete: "="
					},
					replace:    true,
					transclude: true,
					link:       function ($scope, $element, $attrs) {
						//一开始默认选中第一个
						$scope.select = $scope.select || $scope.array[0];

						$scope.returnData = function (a) {
							$scope.select = a;
						}

						//默认模版
						var defaultTemplete =
							'<div class="well well-lg">'
							+ '<div ng-repeat="a in array" ng-click="returnData(a)">{{a.name}}</div>'
							+ '</div>';
						var T = $scope.templete ? $scope.templete : defaultTemplete;
						$element.append($compile(T)($scope));
					}
				};
			}
		])
		//更换create页面中的工作区背景
		.directive('canvasUiSwitch', [
			'$rootScope', function ($rootScope) {
				return {
					restrict: 'EA',
					scope:    {
						canvasUiSwitch: "@canvasUiSwitch"
					},
					link:     function (scope, ele) {
						return ele.on('click', function (event) {
							//把值冒泡传给父作用域
							scope.$emit("canvasUiSwitch", scope.canvasUiSwitch);
						});
					}
				};
			}
		])
		//使用jquery-ui-datepicker日期选择器
		.directive('jqueryUiDatepicker', function () {
			return {
				require: 'ngModel',
				link:    function (scope, elem, attrs, ctrl) {
					$.datepicker.regional['zh-CN'] = {
						closeText:          '关闭',
						prevText:           '<上月',
						nextText:           '下月>',
						currentText:        '今天',
						monthNames:         [
							'一月', '二月', '三月', '四月', '五月', '六月',
							'七月', '八月', '九月', '十月', '十一月', '十二月'
						],
						monthNamesShort:    [
							'一', '二', '三', '四', '五', '六',
							'七', '八', '九', '十', '十一', '十二'
						],
						dayNames:           ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
						dayNamesShort:      ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
						dayNamesMin:        ['日', '一', '二', '三', '四', '五', '六'],
						weekHeader:         '周',
						dateFormat:         'yy-mm-dd',
						firstDay:           1,
						isRTL:              false,
						showMonthAfterYear: true,
						yearSuffix:         ''
					};
					$.datepicker.setDefaults($.datepicker.regional['zh-CN']);

					$(elem).datepicker({
						dateFormat: "yy-mm-dd",
						changeMonth: true,
						changeYear: true,
						yearRange: "1950:nnnn",
						showButtonPanel: true,
						showAnim: "drop"
					});
				}
			};
		})
	/** directive 避免sql注入的验证
	 *
	 * @example
	 * 必须绑定到一个ngModel上。
	 * <input type="text" name="user_name" keyword-match>
	 * 最后，将错误标志，以keywordmatch的名称，放到了表单验证对象中
	 * <span ng-show="signupForm.user_name.$error.keywordmatch">请不要输入编程关键字;</span>
	 **/
		.directive('keywordMatch', function () {
			return {
				require: 'ngModel',
				link:    function (scope, elem, attrs, ctrl) {
					re = /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
					scope.$watch(attrs.ngModel, function (n) {
						//console.log("re.test(elem.val())", re.test(elem.val()));
						if (re.test(elem.val())) {
							ctrl.$setValidity('keywordmatch', false);
						} else {
							ctrl.$setValidity('keywordmatch', true);
						}
					})
				}
			};
		})
	/** directive 校验密码字段一致性
	 *
	 @example
	 必须绑定到一个ngModel上。其中的参数是另一个需要对比的input的id.
	 <input
	 id="confirm"
	 name="confirm_pwd"
	 ng-model="formData.confirm_pwd"
	 type="password"
	 required
	 pw-match="user_pwd"
	 >
	 最后，将错误标志，以pwmatch的名称，放到了表单验证对象中
	 <span ng-show="signupForm.confirm_pwd.$error.pwmatch">两次密码输入不一致;</span>
	 **/
		.directive('pwMatch', function () {
			return {
				require: 'ngModel',
				link:    function (scope, elem, attrs, ctrl) {
					//本指令通过前一个密码输入框的id来实现两者的绑定
					var firstPassword = '#' + attrs.pwMatch;
					// 网上好多例子都掉了$(elem) 美元符号和括号
					$(elem).add(firstPassword).on('keyup', function () {
						scope.$apply(function () {
							var v = elem.val() === $(firstPassword).val();
							ctrl.$setValidity('pwmatch', v);
						});
					});
				}
			};
		})
	/** directive 校验用户账号邮箱是否已经存在
	 *
	 @example
	 必须绑定到一个ngModel上。同时要调用后端API进行查询
	 <input
	 name="user_account"
	 type="email"
	 check-account
	 >
	 最后，将错误标志，以checkaccount的名称，放到了表单验证对象中
	 <span ng-show="signupForm.user_account.$error.checkaccount">邮箱已被占用;</span>
	 **/
		.directive('checkAccount', function ($http) {
			return {
				require: 'ngModel',
				link:    function (scope, elem, attrs, ctrl) {
					scope.$watch(attrs.ngModel, function (n) {
						if (!n) return;
						$.ajax({
							type:     "POST",
							url:      "/verify_account",
							cache:    false,  //禁用缓存
							data:     {
								"account": elem.val()
							},
							dataType: "json",
							success:  function (result) {
								scope.$apply(function () {
									if (result.code == 1) {
										ctrl.$setValidity('checkaccount', false);
									} else {
										ctrl.$setValidity('checkaccount', true);
									}
								});
								//console.log(ctrl.$error)
							}
						});
					});
				}
			}
		})
	/** directive 页面分页器
	 *
	 @example
	 <page-navgation pages="pages" message="message"></page-navgation>
	 其中，参数pages是一个对象，保存分页数据，其定义如下：
	 $scope.pages = {
				page:1,  //当前页数
				page_row_num:10,  //一页有行数据
				page_total_num: 1  //一共有几页
				row_total_num: 0 //一共有多少行数据
			}
	 @important
	 点击分页按钮将会有页码改变事件触发，
	 事件将通过消息订阅发布器（pubSubService）发布
	 请在相关控制器中捕获该事件并更新页码，例如：
	 pubSubService.subscribe(function (event, data) {
				$scope.pages  = data;
				console.log("subscribe", $scope.pages)
				$scope.getAlumnusAll();
			}, $scope, 'page_change');
	 **/
		.
		directive('pageNavgation', [
			'$compile', 'pubSubService',
			function ($compile) {
				return {
					restrict:   'E',
					scope:      {
						pages: "=pages"
					},
					replace:    true,
					transclude: true,
					controller: [
						'$scope', '$element', 'pubSubService', function ($scope, $element, pubSubService) {
							//页码数组
							$scope.page_index_list = [];
							//根据页码信息改变页码数组内容 函数
							$scope.setPageIndexList = function (page, page_total_num) {
								var list = [];
								if (page < 1) {
									logger.logError("当前页数小于了最小值", 5000);
									list.push(1);
								} else if (page == 1 || page == 2) {
									for (var i = 1; i <= (page_total_num > 5 ? 5 : page_total_num); i++) {
										list.push(i);
									}
								} else if (page > 2) { //因为分页只显示5个页数，所以大于2页开始分页转换
									for (var i = (page - 2); i <= ((page + 2) > page_total_num ? page_total_num : (page + 2)); i++) {
										list.push(i);
									}
								} else if (page > page_total_num) {
									logger.logError("当前页数超过了最大值", 5000);
									list.push(1);
								}
								return list;
							}
							//观测$scope.pages变量，一旦有变化立即更新页码
							$scope.$watch("pages", function (newvalue) {
								$scope.page_index_list = $scope.setPageIndexList($scope.pages.page, $scope.pages.page_total_num);
							})

							//选择页数 函数
							$scope.selectPage = function (page) {
								$scope.pages.page = page;
								pubSubService.publish('page_change', $scope.pages);
							}
							//下一页函数
							$scope.nextPage = function () {
								$scope.pages.page =
									($scope.pages.page + 1) > $scope.pages.page_total_num ?
										$scope.pages.page_total_num :
										($scope.pages.page + 1);
								pubSubService.publish('page_change', $scope.pages);
							}
							//上一页 函数
							$scope.previousPage = function () {
								$scope.pages.page = ($scope.pages.page - 1) < 1 ? 1 : ($scope.pages.page - 1);
								pubSubService.publish('page_change', $scope.pages);
							}
							//最后一页 函数
							$scope.lastPage = function () {
								$scope.pages.page = $scope.pages.page_total_num;
								pubSubService.publish('page_change', $scope.pages);
							}
							//第一页 函数
							$scope.firstPage = function () {
								$scope.pages.page = 1;
								pubSubService.publish('page_change', $scope.pages);
							}
							//改变每页的行数 函数
							$scope.changePageRowNum = function () {
								$scope.pages.page_row_num = Number($scope.pages.page_row_num);
								pubSubService.publish('page_change', $scope.pages);
							}

							//分页第一次创建的时候，就发动一次页面更换请求，帮助主页面刷新，显示列表
							pubSubService.publish('page_change', $scope.pages);
						}
					],

					template: //TODO: to complie templete
					'<nav aria-label="Page navigation" class="page_nav">' +
					'<div class="row-select">' +
					'<label>共有{{pages.row_total_num}}项数据，一页显示：</label>' +
					'<select ng-model="pages.page_row_num" ' +
					'ng-change="changePageRowNum()" ' +
					'class="form-control">' +
					'<option value="10">10</option>' +
					'<option value="20">20</option>' +
					'<option value="30">30</option>' +
					'<option value="50">50</option>' +
					'<select>' +
					'<label>&nbsp;个数据</label>' +
					'</div>' +
					'<ul class="pagination">' +
					'<li>' +
					'<a href="" ng-click="firstPage()" aria-label="Previous">' +
					'<i class="fa fa-step-backward" aria-hidden="true"></i>' +
					'</a>' +
					'</li>' +
					'<li ng-class="{\'disabled\': pages.page == 1 }">' +
					'<a href="" ng-click="previousPage()" aria-label="Previous">' +
					'<i class="fa fa-caret-left" aria-hidden="true"></i>' +
					'</a>' +
					'</li>' +
					'<li class="animate-repeat"' +
					'ng-repeat="page in page_index_list"' +
					'ng-class="{active: page == pages.page}" >' +
					'<a href="" ng-click="selectPage(page)" >{{ page }}</a> ' +
					'</li>' +
					'<li ng-class="{\'disabled\': pages.page == pages.page_total_num }">' +
					'<a href="" ng-click="nextPage()" aria-label="Next">' +
					'<i class="fa fa-caret-right" aria-hidden="true"></i>' +
					'</a>' +
					'</li>' +
					'<li>' +
					'<a href="" ng-click="lastPage()" aria-label="Previous">' +
					'<i class="fa fa-step-forward" aria-hidden="true"></i>' +
					'</a>' +
					'</li>' +
					'</ul>' +
					'<div class="clearfix"></div>' +
					'</nav>'
				};
			}
		])
});

