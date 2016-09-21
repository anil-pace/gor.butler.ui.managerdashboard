webpackJsonp([1,6],{

/***/ 448:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(415);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(419);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(420);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(421);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(440);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _healthTabs = __webpack_require__(449);

	var _healthTabs2 = _interopRequireDefault(_healthTabs);

	var _health = __webpack_require__(450);

	var _health2 = _interopRequireDefault(_health);

	var _tabs = __webpack_require__(451);

	var _tabs2 = _interopRequireDefault(_tabs);

	var _header = __webpack_require__(453);

	var _header2 = _interopRequireDefault(_header);

	var _socketActions = __webpack_require__(370);

	var _appConstants = __webpack_require__(371);

	var _initData = __webpack_require__(454);

	var _dropdown = __webpack_require__(455);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _orderStatsWidget = __webpack_require__(458);

	var _orderStatsWidget2 = _interopRequireDefault(_orderStatsWidget);

	var _performanceWidget = __webpack_require__(464);

	var _performanceWidget2 = _interopRequireDefault(_performanceWidget);

	var _headerAction = __webpack_require__(392);

	var _reactRedux = __webpack_require__(191);

	var _graphd = __webpack_require__(459);

	var _graphd2 = _interopRequireDefault(_graphd);

	var _graph_horizontal = __webpack_require__(463);

	var _graph_horizontal2 = _interopRequireDefault(_graph_horizontal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = function (_React$Component) {
	  (0, _inherits3.default)(App, _React$Component);

	  /**
	   * Called once before rendering of component,used to displatch fetch action
	   * @return {[type]}
	   */
	  function App(props) {
	    (0, _classCallCheck3.default)(this, App);
	    return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));
	  }

	  (0, _createClass3.default)(App, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var userName = this.props.userName,
	          authToken = this.props.authToken;
	      if (false) {
	        /*Creating Web Socket Connection*/
	        if (!authToken && !userName) {
	          this.context.router.push("/login");
	        } else {
	          this.props.initWebSocket();
	        }
	      } else {
	        this.props.initMockData(_initData.wsInitData);
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      /**
	       * Checking if the user is loggedin 
	       * and redirecting to main page
	       */
	      if (false) {
	        if (nextProps.socketStatus && !nextProps.socketAuthorized) {
	          var webSocketData = {
	            'type': 'auth',
	            'data': {
	              "auth_token": this.props.authToken
	            }
	          };
	          this.props.sendAuthToSocket(webSocketData);
	        }
	        if (nextProps.socketStatus && nextProps.socketAuthorized && !nextProps.initDataSent) {
	          this.props.initDataSentCall(_initData.wsInitData);
	        }
	      } else {
	        this.props.initMockData(_initData.wsInitData);
	      }
	    }
	    /**Render method called when component react renders
	     * @return {[type]}
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      var item1 = { heading: 'Items to Stock', value: '4,74,579', low: '4 PPS stocking 3,546 items/hr', logo: 'iStock' };
	      var item2 = { heading1: 'Orders to fulfill', value1: '120', low1: '8 PPS fulfilling per/hr', status1: 'On schedule', heading2: 'Remaining time', value2: '68mins', low2: 'Completing in 8mins', status2: '23:59' };
	      var items3 = { start: "09:10:25", name: "Krish verma gandhi sharma", post: "Manager" };

	      return _react2.default.createElement(
	        'div',
	        { className: 'mainContainer' },
	        _react2.default.createElement(_header2.default, { user: items3 }),
	        _react2.default.createElement(_tabs2.default, null),
	        this.props.children
	      );
	    }
	  }]);
	  return App;
	}(_react2.default.Component);

	;
	/**
	 * [Passing Router to component through context]
	 * @type {Object}
	 */
	App.contextTypes = {
	  router: _react2.default.PropTypes.object.isRequired
	};
	/**
	 * Function to pass state values as props
	 */

	function mapStateToProps(state, ownProps) {

	  return {
	    authToken: state.authLogin.auth_token,
	    userName: state.authLogin.username,
	    socketStatus: state.recieveSocketActions.socketConnected,
	    socketAuthorized: state.recieveSocketActions.socketAuthorized,
	    initDataSent: state.recieveSocketActions.initDataSent,
	    intl: state.intl
	  };
	}
	/**
	 * Function to dispatch action values as props
	 */
	function mapDispatchToProps(dispatch) {
	  return {
	    initWebSocket: function initWebSocket() {
	      dispatch((0, _socketActions.setWsAction)({ type: _appConstants.WS_CONNECT }));
	    },
	    sendAuthToSocket: function sendAuthToSocket(data) {
	      dispatch((0, _socketActions.setWsAction)({ type: _appConstants.WS_ONSEND, data: data }));
	    },
	    initDataSentCall: function initDataSentCall(data) {
	      dispatch((0, _socketActions.setWsAction)({ type: _appConstants.WS_ONSEND, data: data }));
	    },
	    initMockData: function initMockData(data) {
	      dispatch((0, _socketActions.setMockAction)({ type: _appConstants.WS_MOCK, data: data }));
	    }
	  };
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

/***/ },

/***/ 449:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(415);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(419);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(420);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(421);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(440);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _health = __webpack_require__(450);

	var _health2 = _interopRequireDefault(_health);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var HealthTabs = function (_React$Component) {
		(0, _inherits3.default)(HealthTabs, _React$Component);

		function HealthTabs(props) {
			(0, _classCallCheck3.default)(this, HealthTabs);
			return (0, _possibleConstructorReturn3.default)(this, (HealthTabs.__proto__ || (0, _getPrototypeOf2.default)(HealthTabs)).call(this, props));
		}

		(0, _createClass3.default)(HealthTabs, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_health2.default, { items: this.props.ppsData }),
					_react2.default.createElement(_health2.default, { items: this.props.butlerData }),
					_react2.default.createElement(_health2.default, { items: this.props.chargingData })
				);
			}
		}]);
		return HealthTabs;
	}(_react2.default.Component);

	;
	exports.default = HealthTabs;

/***/ },

/***/ 450:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(415);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(419);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(420);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(421);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(440);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Health = function (_React$Component) {
		(0, _inherits3.default)(Health, _React$Component);

		function Health(props) {
			(0, _classCallCheck3.default)(this, Health);
			return (0, _possibleConstructorReturn3.default)(this, (Health.__proto__ || (0, _getPrototypeOf2.default)(Health)).call(this, props));
		}

		(0, _createClass3.default)(Health, [{
			key: 'render',
			value: function render() {

				return _react2.default.createElement(
					'div',
					{ className: 'health mainBlock' },
					_react2.default.createElement(
						'div',
						{ className: 'block attributes' },
						_react2.default.createElement(
							'div',
							{ className: 'upperText' },
							this.props.items[0].component.componentNumber
						),
						_react2.default.createElement(
							'div',
							{ className: 'subtext' },
							this.props.items[0].component.componentType
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'horizontal-line' },
						' '
					),
					_react2.default.createElement(
						'div',
						{ className: 'block' },
						_react2.default.createElement(
							'div',
							{ className: 'block parameters' },
							_react2.default.createElement(
								'div',
								{ className: 'block paramPositionFront ' },
								_react2.default.createElement(
									'div',
									{ className: 'block stoppedState' },
									_react2.default.createElement(
										'span',
										null,
										this.props.items[0].states.stoppedState
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'status' },
									'Stopped'
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'block paramPositionMiddle ' },
								_react2.default.createElement(
									'div',
									{ className: 'block onState' },
									_react2.default.createElement(
										'span',
										null,
										this.props.items[0].states.onState
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'status' },
									'On'
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'block paramPositionBack ' },
								_react2.default.createElement(
									'div',
									{ className: 'block errorState' },
									_react2.default.createElement(
										'span',
										null,
										this.props.items[0].states.errorState
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'status' },
									'Error'
								)
							)
						)
					)
				);
			}
		}]);
		return Health;
	}(_react2.default.Component);

	;

	exports.default = Health;

/***/ },

/***/ 451:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(415);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(419);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(420);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(421);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(440);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _tab = __webpack_require__(452);

	var _tab2 = _interopRequireDefault(_tab);

	var _reactRouter = __webpack_require__(306);

	var _reactRedux = __webpack_require__(191);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Tabs = function (_React$Component) {
		(0, _inherits3.default)(Tabs, _React$Component);

		function Tabs(props) {
			(0, _classCallCheck3.default)(this, Tabs);
			return (0, _possibleConstructorReturn3.default)(this, (Tabs.__proto__ || (0, _getPrototypeOf2.default)(Tabs)).call(this, props));
		}

		(0, _createClass3.default)(Tabs, [{
			key: 'render',
			value: function render() {

				var item1 = [{ tab: 'OVERVIEW', Status: 'Fulfiling orders', currentState: 'gorOffline' }];
				var item2 = [{ tab: 'SYSTEM', Status: '2 alerts', currentState: 'gorOnline' }];
				var item3 = [{ tab: 'ORDERS', Status: '70% fulfilled', currentState: 'gorError' }];
				var item4 = [{ tab: 'INVENTORY', Status: '78% space utilised', currentState: 'gorOffline' }];
				var item5 = [{ tab: 'USERS', Status: '35 users logged in', currentState: 'gorOffline' }];
				return _react2.default.createElement(
					'div',
					{ className: 'gorTabs gorMainBlock' },
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: '/overview' },
						_react2.default.createElement(_tab2.default, { items: item1 })
					),
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: '/system' },
						_react2.default.createElement(_tab2.default, { items: item2 })
					),
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: '/orders' },
						_react2.default.createElement(_tab2.default, { items: item3 })
					),
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: '/inventory' },
						_react2.default.createElement(_tab2.default, { items: item4 })
					),
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: '/users' },
						_react2.default.createElement(_tab2.default, { items: item5 })
					)
				);
			}
		}]);
		return Tabs;
	}(_react2.default.Component);

	function mapStateToProps(state, ownProps) {

		return {
			"ppsData": state.recieveSocketActions.ppsData || {}
		};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Tabs);

/***/ },

/***/ 452:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(415);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(419);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(420);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(421);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(440);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(306);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Tab = function (_React$Component) {
		(0, _inherits3.default)(Tab, _React$Component);

		function Tab(props) {
			(0, _classCallCheck3.default)(this, Tab);
			return (0, _possibleConstructorReturn3.default)(this, (Tab.__proto__ || (0, _getPrototypeOf2.default)(Tab)).call(this, props));
		}

		(0, _createClass3.default)(Tab, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'gorTab gorContainer' },
					_react2.default.createElement(
						'div',
						{ className: 'gorMainBlock' },
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'div',
								{ className: 'gor-upperText' },
								this.props.items[0].tab
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'gorOffline' },
							_react2.default.createElement(
								'div',
								{ className: this.props.items[0].currentState },
								this.props.items[0].Status
							)
						)
					)
				);
			}
		}]);
		return Tab;
	}(_react2.default.Component);

	;

	exports.default = Tab;

/***/ },

/***/ 453:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(415);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(419);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(420);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(421);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(440);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(191);

	var _headerAction = __webpack_require__(392);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dropdownFlag = 0;
	var temp;

	var Header = function (_React$Component) {
		(0, _inherits3.default)(Header, _React$Component);

		function Header(props) {
			(0, _classCallCheck3.default)(this, Header);

			var _this = (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).call(this, props));

			if (dropdownFlag === 0) {
				temp = "dropdown-content";
			}

			return _this;
		}

		(0, _createClass3.default)(Header, [{
			key: 'componentDidMount',
			value: function componentDidMount() {}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {
				// this.setState({"asdf":"asdf"});
				//console.log(this.props)
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				//console.log(nextProps);
			}
		}, {
			key: 'openDropdown',
			value: function openDropdown() {
				console.log("worked");
				dropdownFlag = 1;
				temp = "dropdown-content-afterClick";
			}
		}, {
			key: 'appLogout',
			value: function appLogout() {
				console.log("worked again");
			}
		}, {
			key: 'render',
			value: function render() {
				var headData = this.props.headData;


				var item = [{ value: 'Placeholder_option_1', label: 'Placeholder option 1' }, { value: 'Placeholder_option_2', label: 'Placeholder option 2' }, { value: 'logout', label: 'Logout' }];
				//console.log(this.props.headData);
				return _react2.default.createElement(
					'header',
					{ className: 'gorHeader head' },
					_react2.default.createElement(
						'div',
						{ className: 'mainBlock' },
						_react2.default.createElement('div', { className: 'gor-logo logo' }),
						_react2.default.createElement(
							'div',
							{ className: 'blockSystem' },
							_react2.default.createElement(
								'div',
								{ className: 'upperText' },
								'Butler Management System'
							),
							_react2.default.createElement(
								'div',
								{ className: 'subText' },
								'Start time:',
								this.props.user.start
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'blockLeft' },
						_react2.default.createElement('div', { className: 'logo fk-logo' }),
						_react2.default.createElement(
							'div',
							{ className: 'dropdown', id: 'profile' },
							_react2.default.createElement(
								'div',
								{ className: 'dropbtn', onClick: this.openDropdown },
								_react2.default.createElement(
									'div',
									{ className: 'block' },
									_react2.default.createElement(
										'div',
										{ className: 'upperTextClient truncate' },
										this.props.user.name
									),
									_react2.default.createElement(
										'div',
										{ className: 'subTextClient' },
										this.props.user.post
									)
								),
								_react2.default.createElement('div', { className: 'block user-icon' }),
								_react2.default.createElement(
									'div',
									{ id: 'myDropdown', className: 'dropdown-content' },
									_react2.default.createElement(
										'div',
										{ className: 'horizontalDiv' },
										_react2.default.createElement(
											'a',
											{ href: '#' },
											'Placeholder option 1'
										),
										_react2.default.createElement(
											'a',
											{ href: '#' },
											'Placeholder option 2'
										)
									),
									_react2.default.createElement(
										'div',
										null,
										_react2.default.createElement(
											'a',
											{ onClick: this.appLogout },
											'Logout'
										)
									)
								)
							)
						)
					)
				);
			}
		}]);
		return Header;
	}(_react2.default.Component);

	;

	function mapStateToProps(state, ownProps) {
		return {
			//	"ordersData":state.recieveSocketActions.ordersData || {}
		};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Header);

/***/ },

/***/ 454:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var wsInitData = exports.wsInitData = {
		"type": "subscribe",
		"data": [{
			"resource_id": "pps",
			"details": {
				"data": "aggregate",
				"callback": []
			}
		}, {
			"resource_id": "pps",
			"details": {
				"data": "complete",
				"callback": []
			}
		}, {
			"resource_id": "orders",
			"details": {
				"data": "aggregate",
				"callback": []
			}
		}, {
			"resource_id": "butlers",
			"details": {
				"data": "aggregate",
				"callback": []
			}
		}, {
			"resource_id": "users",
			"details": {
				"data": "aggregate",
				"callback": []
			}
		}, {
			"resource_id": "put",
			"details": {
				"data": "aggregate",
				"callback": []
			}
		}, {
			"resource_id": "pick",
			"details": {
				"data": "aggregate",
				"callback": []
			}
		}, {
			"resource_id": "inventory",
			"details": {
				"data": "aggregate",
				"callback": []
			}
		}, {
			"resource_id": "chargers",
			"details": {
				"data": "complete",
				"callback": []
			}
		}, {
			"resource_id": "butlers",
			"details": {
				"data": "complete",
				"callback": []
			}
		}]
	};

/***/ },

/***/ 455:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(415);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(419);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(420);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(421);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(440);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDropdown = __webpack_require__(456);

	var _reactDropdown2 = _interopRequireDefault(_reactDropdown);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//styleClass is the name of the css class to be used for styling, defsel is the index of the selected dropdown option.

	var Dropdown = function (_Component) {
	  (0, _inherits3.default)(Dropdown, _Component);

	  function Dropdown(props) {
	    (0, _classCallCheck3.default)(this, Dropdown);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (Dropdown.__proto__ || (0, _getPrototypeOf2.default)(Dropdown)).call(this, props));

	    _this.state = { selected: { value: props.currentState.value, label: props.currentState.label }
	    };
	    _this._onSelect = _this._onSelect.bind(_this);
	    return _this;
	  }

	  (0, _createClass3.default)(Dropdown, [{
	    key: '_onSelect',
	    value: function _onSelect(option) {
	      this.setState({ selected: option });
	      this.props.optionDispatch(option.value);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var defaultOption = this.state.selected;

	      return _react2.default.createElement(
	        'div',
	        { className: this.props.styleClass },
	        _react2.default.createElement(_reactDropdown2.default, { options: this.props.items, onChange: this._onSelect, value: defaultOption, placeholder: 'Select an option' })
	      );
	    }
	  }]);
	  return Dropdown;
	}(_react.Component);

	exports.default = Dropdown;

/***/ },

/***/ 456:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames = __webpack_require__(457);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dropdown = function (_Component) {
	  _inherits(Dropdown, _Component);

	  function Dropdown(props) {
	    _classCallCheck(this, Dropdown);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dropdown).call(this, props));

	    _this.state = {
	      selected: props.value || {
	        label: props.placeholder || 'Select...',
	        value: ''
	      },
	      isOpen: false
	    };
	    _this.mounted = true;
	    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
	    _this.fireChangeEvent = _this.fireChangeEvent.bind(_this);
	    return _this;
	  }

	  _createClass(Dropdown, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      if (newProps.value && newProps.value !== this.state.selected) {
	        this.setState({ selected: newProps.value });
	      } else if (!newProps.value && newProps.placeholder) {
	        this.setState({ selected: { label: newProps.placeholder, value: '' } });
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      document.addEventListener('click', this.handleDocumentClick, false);
	      document.addEventListener('touchend', this.handleDocumentClick, false);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.mounted = false;
	      document.removeEventListener('click', this.handleDocumentClick, false);
	      document.removeEventListener('touchend', this.handleDocumentClick, false);
	    }
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(event) {
	      if (event.type === 'mousedown' && event.button !== 0) return;
	      event.stopPropagation();
	      event.preventDefault();

	      this.setState({
	        isOpen: !this.state.isOpen
	      });
	    }
	  }, {
	    key: 'setValue',
	    value: function setValue(value, label) {
	      var newState = {
	        selected: {
	          value: value,
	          label: label
	        },
	        isOpen: false
	      };
	      this.fireChangeEvent(newState);
	      this.setState(newState);
	    }
	  }, {
	    key: 'fireChangeEvent',
	    value: function fireChangeEvent(newState) {
	      if (newState.selected !== this.state.selected && this.props.onChange) {
	        this.props.onChange(newState.selected);
	      }
	    }
	  }, {
	    key: 'renderOption',
	    value: function renderOption(option) {
	      var _classNames;

	      var optionClass = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, this.props.baseClassName + '-option', true), _defineProperty(_classNames, 'is-selected', option === this.state.selected), _classNames));

	      var value = option.value || option.label || option;
	      var label = option.label || option.value || option;

	      return _react2.default.createElement(
	        'div',
	        {
	          key: value,
	          className: optionClass,
	          onMouseDown: this.setValue.bind(this, value, label),
	          onClick: this.setValue.bind(this, value, label) },
	        label
	      );
	    }
	  }, {
	    key: 'buildMenu',
	    value: function buildMenu() {
	      var _this2 = this;

	      var _props = this.props;
	      var options = _props.options;
	      var baseClassName = _props.baseClassName;

	      var ops = options.map(function (option) {
	        if (option.type === 'group') {
	          var groupTitle = _react2.default.createElement(
	            'div',
	            { className: baseClassName + '-title' },
	            option.name
	          );
	          var _options = option.items.map(function (item) {
	            return _this2.renderOption(item);
	          });

	          return _react2.default.createElement(
	            'div',
	            { className: baseClassName + '-group', key: option.name },
	            groupTitle,
	            _options
	          );
	        } else {
	          return _this2.renderOption(option);
	        }
	      });

	      return ops.length ? ops : _react2.default.createElement(
	        'div',
	        { className: baseClassName + '-noresults' },
	        'No options found'
	      );
	    }
	  }, {
	    key: 'handleDocumentClick',
	    value: function handleDocumentClick(event) {
	      if (this.mounted) {
	        if (!_reactDom2.default.findDOMNode(this).contains(event.target)) {
	          this.setState({ isOpen: false });
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _classNames2;

	      var baseClassName = this.props.baseClassName;

	      var placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;
	      var value = _react2.default.createElement(
	        'div',
	        { className: baseClassName + '-placeholder' },
	        placeHolderValue
	      );
	      var menu = this.state.isOpen ? _react2.default.createElement(
	        'div',
	        { className: baseClassName + '-menu' },
	        this.buildMenu()
	      ) : null;

	      var dropdownClass = (0, _classnames2.default)((_classNames2 = {}, _defineProperty(_classNames2, baseClassName + '-root', true), _defineProperty(_classNames2, 'is-open', this.state.isOpen), _classNames2));

	      return _react2.default.createElement(
	        'div',
	        { className: dropdownClass },
	        _react2.default.createElement(
	          'div',
	          { className: baseClassName + '-control', onMouseDown: this.handleMouseDown.bind(this), onTouchEnd: this.handleMouseDown.bind(this) },
	          value,
	          _react2.default.createElement('span', { className: baseClassName + '-arrow' })
	        ),
	        menu
	      );
	    }
	  }]);

	  return Dropdown;
	}(_react.Component);

	Dropdown.defaultProps = { baseClassName: 'Dropdown' };
	exports.default = Dropdown;

/***/ },

/***/ 457:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },

/***/ 458:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(415);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(419);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(420);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(421);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(440);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _dropdown = __webpack_require__(455);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _reactRedux = __webpack_require__(191);

	var _graphd = __webpack_require__(459);

	var _graphd2 = _interopRequireDefault(_graphd);

	var _graph_horizontal = __webpack_require__(463);

	var _graph_horizontal2 = _interopRequireDefault(_graph_horizontal);

	var _statsWidgetActions = __webpack_require__(413);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var OrderStatsWidget = function (_React$Component) {
		(0, _inherits3.default)(OrderStatsWidget, _React$Component);

		function OrderStatsWidget() {
			(0, _classCallCheck3.default)(this, OrderStatsWidget);
			return (0, _possibleConstructorReturn3.default)(this, (OrderStatsWidget.__proto__ || (0, _getPrototypeOf2.default)(OrderStatsWidget)).apply(this, arguments));
		}

		(0, _createClass3.default)(OrderStatsWidget, [{
			key: 'render',
			value: function render() {
				console.log("order stats widget");
				console.log(this.props);
				var item = [{ value: 'one', label: 'PPS - pick performance' }, { value: 'three', label: 'PPS - pick performance' }, { value: 'four', label: 'PPS - audit performance' }];
				return _react2.default.createElement(
					'div',
					{ className: 'gorOrderStatsWidget' },
					_react2.default.createElement(
						'div',
						{ className: 'gorDrop' },
						_react2.default.createElement(_dropdown2.default, { optionDispatch: this.props.renderStatsWidget, items: item, styleClass: 'ddown', currentState: item[0] }),
						_react2.default.createElement(
							'div',
							{ id: 'chart_att' },
							_react2.default.createElement(_graphd2.default, null)
						)
					)
				);
			}
		}]);
		return OrderStatsWidget;
	}(_react2.default.Component);

	;

	function mapStateToProps(state, ownProps) {
		console.log(state);
		return {
			widget: state.statsWidget.widget || {}
		};
	}

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return {
			renderStatsWidget: function renderStatsWidget(data) {
				dispatch((0, _statsWidgetActions.renderStatsWidget)(data));
			}
		};
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(OrderStatsWidget);

/***/ },

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(415);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(419);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(420);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(421);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(440);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactD3Library = __webpack_require__(460);

	var _reactD3Library2 = _interopRequireDefault(_reactD3Library);

	var _d = __webpack_require__(461);

	var d3 = _interopRequireWildcard(_d);

	var _d3Tip = __webpack_require__(462);

	var _d3Tip2 = _interopRequireDefault(_d3Tip);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var RD3Component = _reactD3Library2.default.Component;

	var Chart = function (_React$Component) {
	  (0, _inherits3.default)(Chart, _React$Component);

	  function Chart(props) {
	    (0, _classCallCheck3.default)(this, Chart);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (Chart.__proto__ || (0, _getPrototypeOf2.default)(Chart)).call(this, props));

	    _this.state = { d3: '' };
	    return _this;
	  }

	  (0, _createClass3.default)(Chart, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var component = this;
	      var widther = document.getElementById("chart_att").offsetWidth;
	      //var heighter = document.getElementById("chart_att").offsetHeight;

	      var margin = { top: 20, right: 20, bottom: 20, left: 40 },
	          width = widther - margin.left - margin.right,
	          height = 400 - margin.top - margin.bottom;
	      var count = -1;
	      var temp = -1;
	      var y = d3.scale.linear().range([height, 0]);
	      var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
	      var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(function (d) {
	        count++;
	        temp++;
	        if (count === 3 || temp === 0 || temp === 23) {
	          count = 0;
	          d = d.substr(0, d.indexOf(' '));
	          return d;
	        }
	        return "";
	      });

	      var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

	      var node = document.createElement('div');

	      var svg = d3.select(node).append('svg').attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	      //console.log(d3tip);
	      var tip = (0, _d3Tip2.default)().attr('class', 'd3-tip').offset([100, 90]).html(function (d) {
	        var time = d.letter.split(" ");
	        return "<div> Time:" + " " + time[0] + " - " + time[1] + "<div/><div> 27 Jul,2016</div> <div style='color:#ffffff'> Fulfilled:  " + " " + d.frequency + "</div>";
	      });

	      svg.call(tip);

	      d3.json("http://www.mocky.io/v2/57d27c9a100000c01432817f", function (error, data) {

	        var json = data;
	        update(json);
	      });

	      function update(data) {

	        data.forEach(function (d) {
	          d.frequency = +d.frequency;
	        });
	        x.domain(data.map(function (d) {
	          return d.letter;
	        }));
	        y.domain([0, d3.max(data, function (d) {
	          return d.frequency;
	        })]);

	        svg.append("g").attr("class", "grid").call(make_y_axis().tickSize(-width, 0, 0).tickFormat(""));

	        svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).style("font-size", "12px").style("font-family", "sans-serif").style("fill", "#666666");

	        //svg.append("g").text("sample!!!");


	        svg.append("g").attr("class", "y axis").call(yAxis).style("font-size", "12px").style("font-family", "sans-serif").style("fill", "#666666").append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "4em").style("text-anchor", "end");

	        svg.selectAll(".bar").data(data).enter().append("rect").attr("rx", 2).attr("ry", 2).attr("class", "bar").attr("x", function (d) {
	          return x(d.letter);
	        }).attr("width", x.rangeBand()).attr("y", function (d) {
	          return y(d.frequency);
	        }).attr("height", 0).attr("height", function (d) {
	          return height - y(d.frequency);
	        });
	        // .on('mouseover', tip.show)
	        // .on('mouseout', tip.hide)

	        var txt = svg.selectAll(".bar");

	        txt.append("g").attr("class", "below").attr("x", function (d) {
	          return x(d.letter);
	        }).attr("y", function (d) {
	          return height - y(d.frequency);
	        }).attr("dy", "1.2em").attr("text-anchor", "right").text("krish").style("fill", "#000000");

	        //   txt.append("text")
	        //   .attr("y", function(d) { return y(d.frequency); })
	        // .attr("class", "below")
	        // .attr("x", 12)
	        // .attr("dy", "1.2em")
	        // .attr("text-anchor", "right")
	        // .text("krish")
	        // .style("fill", "#000000");
	        component.setState({ d3: node });
	      }

	      function type(d) {
	        return d;
	      }

	      function make_x_axis() {
	        return d3.svg.axis().scale(x).orient("bottom").ticks(5);
	      }

	      function make_y_axis() {
	        return d3.svg.axis().scale(y).orient("left").ticks(5);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(RD3Component, { data: this.state.d3 })
	      );
	    }
	  }]);
	  return Chart;
	}(_react2.default.Component);

	;
	exports.default = Chart;
	//ReactDOM.render(React.createElement(Chart), document.getElementById('chart_dis'))

/***/ },

/***/ 463:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(415);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(419);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(420);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(421);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(440);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactD3Library = __webpack_require__(460);

	var _reactD3Library2 = _interopRequireDefault(_reactD3Library);

	var _d = __webpack_require__(461);

	var d3 = _interopRequireWildcard(_d);

	var _d3Tip = __webpack_require__(462);

	var _d3Tip2 = _interopRequireDefault(_d3Tip);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var RD3Component = _reactD3Library2.default.Component;

	var ChartHorizontal = function (_React$Component) {
	  (0, _inherits3.default)(ChartHorizontal, _React$Component);

	  function ChartHorizontal(props) {
	    (0, _classCallCheck3.default)(this, ChartHorizontal);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (ChartHorizontal.__proto__ || (0, _getPrototypeOf2.default)(ChartHorizontal)).call(this, props));

	    _this.state = { d3: '' };
	    return _this;
	  }

	  (0, _createClass3.default)(ChartHorizontal, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var component = this;
	      var widther = document.getElementById("performanceGraph").offsetWidth;
	      var parentHeight = 370;
	      d3.json("http://www.mocky.io/v2/57cc5b881200001b0cbb77ba", function (error, data) {
	        var json = data;
	        update(json);
	      });

	      function update(data) {

	        var width = widther - 100;
	        var barHeight = parentHeight / data.length;
	        var left = 20;
	        var top = 20;

	        //var margin = {top: 20, right: 20, bottom: 50, left: 100};

	        var x = d3.scale.linear().range([0, width]);

	        var y = d3.scale.ordinal().rangeRoundBands([0, barHeight], .1);
	        var yAxis = d3.svg.axis().scale(y).orient("right");

	        var node = document.createElement('div');
	        var chart = d3.select(node).append('svg').attr("width", widther).attr("height", 400).append("g").attr("transform", "translate(" + left + "," + top + ")");

	        x.domain([0, d3.max(data, function (d) {
	          return d.value;
	        })]);

	        //chart.attr("height", barHeight * data.length);

	        var bar = chart.selectAll("g").data(data).enter().append("g").attr("rx", 20).attr("ry", 20).attr("class", "g").attr("y", function (d) {
	          return y(d.name);
	        }).attr("width", y.rangeBand()).attr("transform", function (d, i) {
	          return "translate(0," + i * barHeight + ")";
	        });

	        bar.append("g").attr("class", "axis").call(yAxis).style("font-size", "30px").style("font-family", "sans-serif").style("fill", "red").append("text").attr("y", 6).attr("dy", "4em").style("text-anchor", "end");

	        bar.append("rect").attr("x", 50).attr("width", function (d) {
	          return x(d.value);
	        }).attr("height", barHeight - 5).style("fill", "#D3D3D3").style("opacity", "0.5");

	        bar.append("text").attr("x", function (d) {
	          return x(d.value) + 25;
	        }).attr("y", barHeight / 2).attr("dy", ".35em").text(function (d) {
	          if (d.value === 0) {
	            return "ERROR";
	          } else {
	            return d.value;
	          }
	        }).style("font-size", "12px").style("font-weight", "bold").style("font-family", "sans-serif").style("fill", "#666666");

	        bar.append("text").attr("x", -10).attr("y", barHeight / 2).attr("dy", ".35em").text(function (d) {
	          if (d.value === 4) {
	            return d.name;
	          } else {
	            return d.name;
	          }
	        }).style("font-size", "12px").style("font-family", "sans-serif").style("fill", "#666666");

	        component.setState({ d3: node });
	      }

	      function type(d) {
	        d.value = +d.value; // coerce to number
	        return d;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(RD3Component, { data: this.state.d3 })
	      );
	    }
	  }]);
	  return ChartHorizontal;
	}(_react2.default.Component);

	;
	exports.default = ChartHorizontal;
	//ReactDOM.render(React.createElement(Chart), document.getElementById('chart_dis'))

/***/ },

/***/ 464:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(415);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(419);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(420);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(421);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(440);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _healthTabs = __webpack_require__(449);

	var _healthTabs2 = _interopRequireDefault(_healthTabs);

	var _dropdown = __webpack_require__(455);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _graph_horizontal = __webpack_require__(463);

	var _graph_horizontal2 = _interopRequireDefault(_graph_horizontal);

	var _reactRedux = __webpack_require__(191);

	var _performanceWidgetActions = __webpack_require__(403);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _getPPSdata(link) {
		var ppsPickState = link.props.ppsData.pick;
		if (ppsPickState === undefined || ppsPickState === null) {
			ppsPickState = 0;
		}
		var ppsPutState = link.props.ppsData.put;
		if (ppsPutState === undefined || ppsPutState === null) {
			ppsPutState = 0;
		}
		var ppsAuditState = link.props.ppsData.audit;
		if (ppsAuditState === undefined || ppsAuditState === null) {
			ppsAuditState = 0;
		}
		var ppsInactiveState = link.props.ppsData.inactive;
		if (ppsInactiveState === undefined || ppsInactiveState === null) {
			ppsInactiveState = 0;
		}
		var ppsTotal = ppsPickState + ppsPutState + ppsAuditState + ppsInactiveState;
		var ppsOn = ppsPickState + ppsPutState + ppsAuditState;
		var ppsStopped = ppsInactiveState;
		var ppsError = 0;
		var pps_data = [{ component: { componentNumber: ppsTotal, componentType: 'PPS' }, states: { stoppedState: ppsError, onState: ppsOn, errorState: ppsError } }];
		return pps_data;
	}

	function _getButlerdata(link) {
		var butlerAuditState = link.props.butlersData.Audit;
		if (butlerAuditState === undefined || butlerAuditState === null) {
			butlerAuditState = 0;
		}
		var butlerChargingState = link.props.butlersData.Charging;
		if (butlerChargingState === undefined || butlerChargingState === null) {
			butlerChargingState = 0;
		}
		var butlerIdleState = link.props.butlersData.Idle;
		if (butlerIdleState === undefined || butlerIdleState === null) {
			butlerIdleState = 0;
		}
		var butlerInactiveState = link.props.butlersData.Inactive;
		if (butlerInactiveState === undefined || butlerInactiveState === null) {
			butlerInactiveState = 0;
		}
		var butlerPickPutState = link.props.butlersData["Pick / Put"];
		if (butlerPickPutState === undefined || butlerPickPutState === null) {
			butlerPickPutState = 0;
		}
		var butlerTotal = butlerAuditState + butlerChargingState + butlerIdleState + butlerInactiveState + butlerPickPutState;
		var butlerStopped = butlerInactiveState;
		var butlerError = 0;
		var butlerOn = butlerPickPutState + butlerIdleState + butlerAuditState;
		var butler_data = [{ component: { componentNumber: butlerTotal, componentType: 'Butler bots' }, states: { stoppedState: butlerStopped, onState: butlerOn, errorState: butlerError } }];
		return butler_data;
	}

	function _getChargingdata(link) {
		var connected = link.props.chargersData.Connected;
		if (connected === undefined || connected === null) {
			connected = 0;
		}
		var disconnected = link.props.chargersData.Disconnected;
		if (disconnected === undefined || disconnected === null) {
			disconnected = 0;
		}
		var totalChargers = connected + disconnected;
		var chargersStopped = disconnected;
		var chargersError = 0;
		var charging_data = [{ component: { componentNumber: totalChargers, componentType: 'Charging Stations' }, states: { stoppedState: chargersError, onState: connected, errorState: disconnected } }];
		return charging_data;
	}

	var PerformanceWidget = function (_React$Component) {
		(0, _inherits3.default)(PerformanceWidget, _React$Component);

		function PerformanceWidget(props) {
			(0, _classCallCheck3.default)(this, PerformanceWidget);
			return (0, _possibleConstructorReturn3.default)(this, (PerformanceWidget.__proto__ || (0, _getPrototypeOf2.default)(PerformanceWidget)).call(this, props));
		}

		(0, _createClass3.default)(PerformanceWidget, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				this.setState({ renderState: nextProps.widget });
			}
		}, {
			key: 'render',
			value: function render() {
				var item = [{ value: 'RENDER_SYSTEM_HEALTH', label: 'System Health' }, { value: 'RENDER_SYSTEM_PERFORMANCE', label: 'System Performance' }];

				if (this.props.widget === "RENDER_SYSTEM_PERFORMANCE") {
					return _react2.default.createElement(
						'div',
						{ className: 'gorPerformanceWidget' },
						_react2.default.createElement(
							'div',
							{ className: 'gorDrop' },
							_react2.default.createElement(_dropdown2.default, { optionDispatch: this.props.renderPerformanceWidget, items: item, styleClass: 'ddown', currentState: item[1] })
						),
						_react2.default.createElement(
							'div',
							{ id: 'performanceGraph' },
							_react2.default.createElement(_graph_horizontal2.default, null)
						)
					);
				} else {
					var link = this;
					var pps_data = _getPPSdata(link);
					var butler_data = _getButlerdata(link);
					var charging_data = _getChargingdata(link);
					return _react2.default.createElement(
						'div',
						{ className: 'gorPerformanceWidget' },
						_react2.default.createElement(
							'div',
							{ className: 'gorDrop' },
							_react2.default.createElement(_dropdown2.default, { optionDispatch: this.props.renderPerformanceWidget, items: item, styleClass: 'ddown', currentState: item[0] })
						),
						_react2.default.createElement(
							'div',
							{ id: 'performanceGraph' },
							_react2.default.createElement(_healthTabs2.default, { ppsData: pps_data, butlerData: butler_data, chargingData: charging_data })
						)
					);
				}
			}
		}]);
		return PerformanceWidget;
	}(_react2.default.Component);

	;

	function mapStateToProps(state, ownProps) {
		console.log(state);
		return {
			widget: state.performanceWidget.widget || {},
			ppsData: state.recieveSocketActions.ppsData || {},
			butlersData: state.recieveSocketActions.butlersData || {},
			chargersData: state.recieveSocketActions.chargersData || {}
		};
	}

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return {
			renderPerformanceWidget: function renderPerformanceWidget(data) {
				dispatch((0, _performanceWidgetActions.renderPerformanceWidget)(data));
			}
		};
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PerformanceWidget);

/***/ }

});