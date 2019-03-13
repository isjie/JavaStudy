define([
	'jquery_toastr',
	'jquery_ui'
], function (toastr) {
	angular.module('app.service', [])
	/**
	 * @name pubSubService
	 * @description 发布/订阅模式
	 */
		.factory('pubSubService', [
			'$rootScope', function ($rootScope) {
				// private notification messages
				var _DATA_UPDATED_ = '_DATA_UPDATED_';
				/**
				 * @name publish
				 * @description 消息发布者，只用$emit冒泡进行消息发布的低能耗无污染方法
				 * @param {string=}: msg, 要发布的消息关键字，默认为'_DATA_UPDATED_'指数据更新
				 * @param {object=}: data，随消息一起传送的数据，默认为空
				 * @example
				 *        pubSubService.publish('config_itemAdded', {'id': getID()});
				 *        更一般的形式是：
				 *      pubSubService.publish();
				 */
				var publish = function (msg, data) {
					msg = msg || _DATA_UPDATED_;
					data = data || {};
					$rootScope.$emit(msg, data);
				};
				/**
				 * @name subscribe
				 * @description 消息订阅者
				 * @param {function}: 回调函数，在订阅消息到来时执行
				 * @param {object=}: 控制器作用域，用以解绑定,默认为空
				 * @param {string=}: 消息关键字，默认为'_DATA_UPDATED_'指数据更新
				 * @example
				 *        pubSubService.subscribe(function(event, data) {
				 *	    $scope.power = data.power;
				 *		    $scope.mass = data.mass;
				 *		},  $scope, 'data_change');
				 *        更一般的形式是：
				 *        pubSubService.subscribe(function(){});
				 */
				var subscribe = function (func, scope, msg) {
					if (!angular.isFunction(func)) {
						console.log("pubSubService.subscribe need a callback function");
						return;
					}
					msg = msg || _DATA_UPDATED_;
					var unbind = $rootScope.$on(msg, func);
					//可控的事件反绑定机制
					if (scope) {
						scope.$on('$destroy', unbind);
					}
				};

				// return the publicly accessible methods
				return {
					publish:   publish,
					subscribe: subscribe
				};
			}
		])
	/**
	 * @name logger
	 * @description 使用jquery toastr 显示提示信息
	 *
	 * @param {function} type, 有log，logWarning，logSuccess，logError 四种可选
	 * @param {string} message, 需要显示的信息，必须填写的字段
	 * @param {string=} time, 显示的时间，单位是毫秒，默认2000（2秒）
	 * @param {string=} position，显示的位置，有toast-(top, bottom)-(right, center, left, full-width)可选，默认"toast-bottom-center"
	 *
	 * @example
	 * logger.logSuccess("成功读取数据", 5000); //显示一个列表，5秒结束
	 */
		.factory('logger', [
			function () {
				var logIt;
				//toastr.options = {
				//	"closeButton": true,
				//};
				logIt = function (message, type, time, position) {
					toastr.options = {
						"closeButton":   true,
						"timeOut":       time || "2000",
						"positionClass": position || "toast-top-center",
					};
					return toastr[type](message);
				};

				return {
					log:        function (message, time, position) {
						logIt(message, 'info', time, position);
					},
					logWarning: function (message, time, position) {
						logIt(message, 'warning', time, position);
					},
					logSuccess: function (message, time, position) {
						logIt(message, 'success', time, position);
					},
					logError:   function (message, time, position) {
						logIt(message, 'error', time, position);
					}
				};
			}
		])
	/**
	 * @name resizeService 注册当窗口变化时的响应事件
	 * @description
	 * 在window对象的事件中,有onresize事件,却没有onresizestart与onresizend事件,为前端开发带来些许不便.
	 * 这里重新封装window.resize函数，避免窗口变化发出多次resize事件
	 *
	 * @example
	 *    resizeService.onResizEnd(function(){
	 *	    document.body.innerHTML = document.body.innerHTML + 'resize ending... <br/>';
	 *  });
	 *  resizeService.onResizeStart(function(){
	 *   	document.body.innerHTML = document.body.innerHTML + 'resize starting... <br/>';
	 *  });
	 */
		.factory('resizeService', [
			function () {
				var Event = {

					/**
					 * 为元素绑定事件.
					 * @param {Object} elem        :    元素DOM对象.
					 * @param {String} type        :    事件类型,不加'on'.
					 * @param {Function} func    :    事件逻辑.
					 */
					addEvent: function (elem, type, func) {
						if (document.addEventListener) {
							elem.addEventListener(type, func, false);
						}
						else {
							elem.attachEvent('on' + type, func);
						}
					},

					/**
					 * 注册调整窗口结束后事件.
					 * @param {Function} onResizEnd    :    无参回调函数.
					 */
					onResizEnd: function (onResizEnd) {
						/**
						 * <<<算法说明>>>
						 * ---------------------------------------------------------------------------------
						 * 1. 默认窗口状态 normal.
						 * 2. 调整窗口大小时状态 resizing.
						 * 3. 调整窗口大小时设置动作状态为 resizing, 并设置延时任务. 若已存在延时任务,则重新设置.
						 * 4. 若500毫秒后没有断续调整大小,则认为调整结束,执行resizend事件.
						 */
						var actionState = 'normal',
							taskPtr = null,
							timeOutTask = function () {
								taskPtr && clearTimeout(taskPtr);
								taskPtr = setTimeout(function () {
									onResizEnd && onResizEnd();
									actionState = 'normal';
								}, 500)
							};

						this.addEvent(
							window,
							'resize',
							function () {
								actionState = 'resizing';
								timeOutTask();
							}
						);
					},

					/**
					 * 注册开始调整窗口时事件.
					 * @param {Function} onResizeStart    :    无参回调函数.
					 */
					onResizeStart: function (onResizeStart) {
						var isExecuted = false;
						this.onResizEnd(function () {
							isExecuted = false;
						});
						this.addEvent(
							window,
							'resize',
							function () {
								if (!isExecuted) {
									onResizeStart && onResizeStart();
									isExecuted = true;
								}
							}
						);
					}
				}
				return Event;
			}
		])
	/**
	 * dialogService, 提供基于jquery ui的对话框服务
	 */
		.service('dialogService',
		[
			'$rootScope', '$q', '$compile', '$templateCache',
			function ($rootScope, $q, $compile, $templateCache) {

				_this = this;
				this.dialogs = {};

				this.open = function (id, template, model, options) {

					// Check our required arguments
					if (!angular.isDefined(id)) {
						throw "dialogService requires id in call to open";
					}

					if (!angular.isDefined(template)) {
						throw "dialogService requires template in call to open";
					}

					// Set the defaults for model
					if (!angular.isDefined(model)) {
						model = null;
					}

					// Copy options so the change ot close isn't propogated back.
					// Extend is used instead of copy because window references are
					// often used in the options for positioning and they can't be deep
					// copied.
					var dialogOptions = {};
					if (angular.isDefined(options)) {
						angular.extend(dialogOptions, options);
					}

					// Initialize our dialog structure
					var dialog = {scope: null, ref: null, deferred: null};

					// Get the template and trim to make it valid
					var dialogTemplate = $templateCache.get(template);
					if (!angular.isDefined(dialogTemplate)) {
						throw "dialogService could not find template " + template;
					}
					dialogTemplate = dialogTemplate.trim();

					// Create a new scope, inherited from the parent.
					dialog.scope = $rootScope.$new();
					dialog.scope.model = model;
					var dialogLinker = $compile(dialogTemplate);
					dialog.ref = $(dialogLinker(dialog.scope));

					// Hande the case where the user provides a custom close and also
					// the case where the user clicks the X or ESC and doesn't call
					// close or cancel.
					var customCloseFn = dialogOptions.close;
					var cleanupFn = this.cleanup;
					dialogOptions.close = function (event, ui) {
						if (customCloseFn) {
							customCloseFn(event, ui);
						}
						cleanupFn(id);
					};

					// Initialize the dialog and open it
					dialog.ref.dialog(dialogOptions);
					dialog.ref.dialog("open");

					// Cache the dialog
					_this.dialogs[id] = dialog;

					// Create our promise, cache it to complete later, and return it
					dialog.deferred = $q.defer();
					return dialog.deferred.promise;
				};

				this.close = function (id, result) {
					// Get the dialog and throw exception if not found
					var dialog = _this.getExistingDialog(id);

					// Notify those waiting for the result
					// This occurs first because the close calls the close handler on the
					// dialog whose default action is to cancel.
					dialog.deferred.resolve(result);

					// Close the dialog (must be last)
					dialog.ref.dialog("close");
				};

				this.cancel = function (id) {
					// Get the dialog and throw exception if not found
					var dialog = _this.getExistingDialog(id);

					// Notify those waiting for the result
					// This occurs first because the cancel calls the close handler on the
					// dialog whose default action is to cancel.
					dialog.deferred.reject();

					// Cancel and close the dialog (must be last)
					dialog.ref.dialog("close");
				};

				/* private */
				this.cleanup = function (id) {
					// Get the dialog and throw exception if not found
					var dialog = _this.getExistingDialog(id);

					// This is only called from the close handler of the dialog
					// in case the x or escape are used to cancel the dialog. Don't
					// call this from close, cancel, or externally.
					dialog.deferred.reject();
					dialog.scope.$destroy();

					// Remove the object from the DOM
					dialog.ref.remove();

					// Delete the dialog from the cache
					delete _this.dialogs[id];
				};

				/* private */
				this.getExistingDialog = function (id) {
					// Get the dialog from the cache
					var dialog = _this.dialogs[id];
					// Throw an exception if the dialog is not found
					if (!angular.isDefined(dialog)) {
						throw "DialogService does not have a reference to dialog id " + id;
					}
					return dialog;
				};

			}
		])
		//A factory which creates a local storage of dtree data
		.factory('dtreeStorage',
		function ($window, $rootScope) {
			angular.element($window).on('storage', function (event) {
				if (event.key === 'my-storage') {
					$rootScope.$apply();
				}
			});

			var getItemFromLocalStorage = function (storage_id) {
				return JSON.parse($window.localStorage.getItem(storage_id));
			};

			var setItemToLocalStorage = function (storage_id, dtree) {
				console.log('localStorage store: ', storage_id, ' : ', dtree);
				$window.localStorage.setItem(storage_id + '_modified_time', Date.now());
				return $window.localStorage.setItem(storage_id, JSON.stringify(dtree))
			};

			return {
				get:  getItemFromLocalStorage,
				save: setItemToLocalStorage
			};
		}
	)
	/** factory function safeApply
	 *
	 * @description If you find yourself triggering the '$apply already in progress' error while developing with Angular.JS
	 * (for me I find I hit most often when integrating third party plugins that trigger a lot of DOM events),
	 * you can use a 'safeApply' method that checks the current phase before executing your function.
	 *
	 * @param scope, the action scope, mostly is the topmost controller
	 * @param fn, the function which you want to apply into scope
	 * @see  https://coderwall.com/p/ngisma
	 *
	 * @example
	 * .controller('MyCtrl', ['$scope,' 'safeApply', function($scope, safeApply) {
			safeApply($scope);                     // no function passed in
			safeApply($scope, function() {   // passing a function in
			});
		}])
	 */
	.factory('safeApply', function ($rootScope) {
		return function (scope, fn) {
			var phase = scope.$root.$$phase;
			if (phase == '$apply' || phase == '$digest') {
				if (fn && ( typeof (fn) === 'function')) {
					fn();
				}
			} else {
				scope.$apply(fn);
			}
		};
	});
});


