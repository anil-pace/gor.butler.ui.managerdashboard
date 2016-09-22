webpackJsonp([2,5],{

/***/ 363:
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

	var _healthTabs = __webpack_require__(344);

	var _healthTabs2 = _interopRequireDefault(_healthTabs);

	var _health = __webpack_require__(345);

	var _health2 = _interopRequireDefault(_health);

	var _orderStatsWidget = __webpack_require__(353);

	var _orderStatsWidget2 = _interopRequireDefault(_orderStatsWidget);

	var _performanceWidget = __webpack_require__(360);

	var _performanceWidget2 = _interopRequireDefault(_performanceWidget);

	var _auditStatusWidget = __webpack_require__(364);

	var _auditStatusWidget2 = _interopRequireDefault(_auditStatusWidget);

	var _putStatusWidget = __webpack_require__(366);

	var _putStatusWidget2 = _interopRequireDefault(_putStatusWidget);

	var _pickStatusWidget = __webpack_require__(367);

	var _pickStatusWidget2 = _interopRequireDefault(_pickStatusWidget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Container for Overview tab
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This will be switched based on tab click
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Overview = function (_React$Component) {
		_inherits(Overview, _React$Component);

		function Overview(props) {
			_classCallCheck(this, Overview);

			return _possibleConstructorReturn(this, (Overview.__proto__ || Object.getPrototypeOf(Overview)).call(this, props));
		}

		_createClass(Overview, [{
			key: 'render',
			value: function render() {
				/**
	    * Need to remove these hardcoded variables
	    * 
	    */

				//this.formatContainerData('put');
				//this.formatContainerData('audit');
				//var putData=this.props.putData ;
				//var auditData=this.props.auditData;//{heading:'Items to Audit', value:'3,74,519', low:'4 PPS auditing 1,546 items/hr', logo:'iAudit'};;

				return _react2.default.createElement(
					'div',
					{ className: 'gorWidgetWrap' },
					_react2.default.createElement(
						'div',
						{ className: 'section group' },
						_react2.default.createElement(
							'div',
							{ className: 'col span_2_of_4' },
							_react2.default.createElement(_putStatusWidget2.default, null),
							_react2.default.createElement(_auditStatusWidget2.default, null)
						),
						_react2.default.createElement(
							'div',
							{ className: 'col span_2_of_4 gorNoML' },
							_react2.default.createElement(_pickStatusWidget2.default, null)
						)
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_orderStatsWidget2.default, null),
						_react2.default.createElement(_performanceWidget2.default, null)
					)
				);
			}
		}]);

		return Overview;
	}(_react2.default.Component);

	;

	/*function mapStateToProps(state, ownProps){
		return {
	        putData: state.putInfo.putData,
	        ppsData:state.ppsInfo.ppsData,
	        throughputData : state.throughputInfo.throughputData,
	        auditData: state.auditInfo.auditData
	    };
	}*/

	exports.default = Overview;

/***/ },

/***/ 364:
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

	var _Tilex = __webpack_require__(365);

	var _Tilex2 = _interopRequireDefault(_Tilex);

	var _reactRedux = __webpack_require__(191);

	var _reactIntl = __webpack_require__(218);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AuditStatusWidget = function (_React$Component) {
		_inherits(AuditStatusWidget, _React$Component);

		/**
	  * Called once before rendering of component,used to displatch fetch action
	  * @return {[type]}
	  */
		function AuditStatusWidget(props) {
			_classCallCheck(this, AuditStatusWidget);

			return _possibleConstructorReturn(this, (AuditStatusWidget.__proto__ || Object.getPrototypeOf(AuditStatusWidget)).call(this, props));
		}

		/**
	  * [format display data coming from server/mock]
	  * @return {[type]} [description]
	  */


		_createClass(AuditStatusWidget, [{
			key: 'formatContainerData',
			value: function formatContainerData() {
				var lowStr,
				    auditData = Object.assign({}, this.props.auditData),
				    totalAudit = this.props.ppsData ? this.props.ppsData.totalAudit : null,
				    auditThroughput = this.props.throughputData ? this.props.throughputData.audit_throughput : null,
				    value = auditData.value ? auditData.value : null;

				//Setting display values based on server values/mock
				if (!value) {
					value = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.audit.heading.value',
						defaultMessage: 'None' });

					lowStr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.audit.status.offline',
						defaultMessage: 'Offline' });
				} else if (!totalAudit) {
					lowStr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.audit.status.starting',
						defaultMessage: 'Starting...' });
				} else {
					lowStr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.audit.throughput',
						defaultMessage: '{count} PPS auditing {throughput} items/hr',
						values: {
							count: totalAudit,
							throughput: auditThroughput
						} });
				}

				auditData.heading = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.audit.heading',
					defaultMessage: 'Items to Audit' });
				auditData.value = value;
				auditData.low = lowStr;

				return auditData;
			}
		}, {
			key: 'render',
			value: function render() {
				var auditData = this.formatContainerData();
				return _react2.default.createElement(_Tilex2.default, { items: auditData });
			}
		}]);

		return AuditStatusWidget;
	}(_react2.default.Component);

	function mapStateToProps(state, ownProps) {
		return {
			auditData: state.auditInfo.auditData,
			ppsData: state.ppsInfo.ppsData,
			throughputData: state.throughputInfo.throughputData
		};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(AuditStatusWidget);

/***/ },

/***/ 365:
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tilex = function (_React$Component) {
		_inherits(Tilex, _React$Component);

		function Tilex(props) {
			_classCallCheck(this, Tilex);

			return _possibleConstructorReturn(this, (Tilex.__proto__ || Object.getPrototypeOf(Tilex)).call(this, props));
		}

		_createClass(Tilex, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'gor-tile gor-single' },
					_react2.default.createElement(
						'div',
						{ className: 'gor-up-tile' },
						_react2.default.createElement(
							'div',
							{ className: 'gor-tile-left' },
							_react2.default.createElement(
								'span',
								{ className: 'gor-heading' },
								this.props.items.heading
							),
							_react2.default.createElement(
								'p',
								{ className: 'gor-heading-value' },
								this.props.items.value
							),
							_react2.default.createElement('p', { className: 'gor-status' })
						),
						_react2.default.createElement('span', { className: "gor-tile-right " + this.props.items.logo })
					),
					_react2.default.createElement(
						'div',
						{ className: 'gor-low-tile' },
						_react2.default.createElement(
							'span',
							null,
							this.props.items.low
						)
					)
				);
			}
		}]);

		return Tilex;
	}(_react2.default.Component);

	;

	exports.default = Tilex;

/***/ },

/***/ 366:
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

	var _Tilex = __webpack_require__(365);

	var _Tilex2 = _interopRequireDefault(_Tilex);

	var _reactRedux = __webpack_require__(191);

	var _reactIntl = __webpack_require__(218);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PutStatusWidget = function (_React$Component) {
	        _inherits(PutStatusWidget, _React$Component);

	        /**
	         * Called once before rendering of component,used to displatch fetch action
	         * @return {[type]}
	         */
	        function PutStatusWidget(props) {
	                _classCallCheck(this, PutStatusWidget);

	                return _possibleConstructorReturn(this, (PutStatusWidget.__proto__ || Object.getPrototypeOf(PutStatusWidget)).call(this, props));
	        }
	        /**
	         * [function to format display data coming from server/mock]
	         * @return {[void]} 
	         */


	        _createClass(PutStatusWidget, [{
	                key: '_formatContainerData',
	                value: function _formatContainerData() {
	                        var lowStr,
	                            totalPut = this.props.ppsData ? this.props.ppsData.totalPut : null,
	                            putData = Object.assign({}, this.props.putData),
	                            putThroughput = this.props.throughputData ? this.props.throughputData.put_throughput : null,
	                            value = putData ? putData.value : null,
	                            heading;

	                        //Setting display values based on server values/mock
	                        if (!value) {
	                                value = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.put.heading.value',
	                                        defaultMessage: 'None' });

	                                lowStr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.put.status.offline',
	                                        defaultMessage: 'Offline' });
	                        } else if (!totalPut) {
	                                lowStr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.put.status.starting',
	                                        defaultMessage: 'Starting...' });
	                        } else {
	                                lowStr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.put.throughput',
	                                        defaultMessage: '{count} PPS stocking {throughput} items/hr',
	                                        values: {
	                                                count: totalPut,
	                                                throughput: putThroughput
	                                        } });
	                        }

	                        putData.heading = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.put.heading',
	                                defaultMessage: 'Items to Stock' });
	                        putData.value = value;
	                        putData.low = lowStr;

	                        return putData;
	                }
	        }, {
	                key: 'render',
	                value: function render() {
	                        var putData = this._formatContainerData();
	                        return _react2.default.createElement(_Tilex2.default, { items: putData });
	                }
	        }]);

	        return PutStatusWidget;
	}(_react2.default.Component);

	function mapStateToProps(state, ownProps) {
	        return {
	                putData: state.putInfo.putData,
	                ppsData: state.ppsInfo.ppsData,
	                throughputData: state.throughputInfo.throughputData

	        };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PutStatusWidget);

/***/ },

/***/ 367:
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

	var _Tile2x = __webpack_require__(368);

	var _Tile2x2 = _interopRequireDefault(_Tile2x);

	var _reactRedux = __webpack_require__(191);

	var _reactIntl = __webpack_require__(218);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PickStatusWidget = function (_React$Component) {
	    _inherits(PickStatusWidget, _React$Component);

	    /**
	     * Called once before rendering of component,used to displatch fetch action
	     * @return {[type]}
	     */
	    function PickStatusWidget(props) {
	        _classCallCheck(this, PickStatusWidget);

	        return _possibleConstructorReturn(this, (PickStatusWidget.__proto__ || Object.getPrototypeOf(PickStatusWidget)).call(this, props));
	        //console.log(this.props.ordersData);
	    }

	    _createClass(PickStatusWidget, [{
	        key: '_parseProps',
	        value: function _parseProps() {
	            var statusClass = '',
	                statusLogo = '',
	                headingleft = '',
	                valueStatus = '',
	                textleft = '',
	                headingright = '',
	                textright = '',
	                statusleft = '',
	                statusright = '',
	                lowleft = '',
	                lowright = '',
	                logo = '',
	                items = {};
	            headingleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'pickWidget.headingleft',
	                defaultMessage: 'Orders to fullfill' });
	            logo = ' iPick';

	            textleft = this.props.ordersData.count_pending;
	            if (!textleft) {
	                valueStatus = 'gor-none';
	                textleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'pickWidget.textleft',
	                    defaultMessage: 'NONE' });

	                lowleft = this.props.ordersData.avg + ' Idle';
	            } else {
	                headingright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'pickWidget.headingright',
	                    defaultMessage: 'Time to cut-off' });

	                textright = 'something';

	                lowleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'pickWidget.lowleft',
	                    defaultMessage: 'PPS Opertaing' }) + this.props.ordersData.avg + _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'pickWidget.heading',
	                    defaultMessage: 'per/hr' });

	                statusright = this.props.ordersData.time_current;

	                lowright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'pickWidget.lowright',
	                    defaultMessage: 'Estimated time' }) + '8hr 3min';

	                if (this.props.ordersData.status === 'On Schedule') {
	                    statusClass = 'gor-success';
	                    statusLogo = 'overview-tile-ontime-icon';

	                    statusleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'pickWidget.statusleft',
	                        defaultMessage: 'On Schedule' });
	                } else {
	                    statusClass = 'gor-breach';
	                    statusleft = this.props.ordersData.status;
	                }
	            }
	            items = { headingleft: headingleft, headingright: headingright, textleft: textleft, valueStatus: valueStatus, textright: textright, statusleft: statusleft, statusClass: statusClass, statusLogo: statusLogo, statusright: statusright, lowleft: lowleft, lowright: lowright, logo: logo };
	            return items;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var items = this._parseProps();
	            return _react2.default.createElement(_Tile2x2.default, { items: items });
	        }
	    }]);

	    return PickStatusWidget;
	}(_react2.default.Component);

	function mapStateToProps(state, ownProps) {

	    return {
	        "ordersData": state.ordersInfo.ordersData || {}
	    };
	}
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PickStatusWidget);

/***/ },

/***/ 368:
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tile2x = function (_React$Component) {
		_inherits(Tile2x, _React$Component);

		function Tile2x(props) {
			_classCallCheck(this, Tile2x);

			return _possibleConstructorReturn(this, (Tile2x.__proto__ || Object.getPrototypeOf(Tile2x)).call(this, props));
		}

		_createClass(Tile2x, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'gor-tile gor-double' },
					_react2.default.createElement(
						'div',
						{ className: 'gor-tile-one' },
						_react2.default.createElement(
							'div',
							{ className: 'gor-up-tile' },
							_react2.default.createElement(
								'span',
								{ className: 'gor-heading' },
								this.props.items.headingleft
							),
							_react2.default.createElement(
								'p',
								{ className: 'gor-heading-value' },
								_react2.default.createElement(
									'span',
									{ className: this.props.items.valueStatus },
									this.props.items.textleft
								)
							),
							_react2.default.createElement(
								'p',
								{ className: 'gor-status' },
								_react2.default.createElement('span', { className: this.props.items.statusLogo }),
								_react2.default.createElement(
									'span',
									{ className: this.props.items.statusClass },
									this.props.items.statusleft
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'gor-low-tile' },
							_react2.default.createElement(
								'span',
								null,
								this.props.items.lowleft
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'gor-tile-two' },
						_react2.default.createElement(
							'div',
							{ className: 'gor-up-tile' },
							_react2.default.createElement(
								'div',
								{ className: 'gor-tile-left' },
								_react2.default.createElement(
									'span',
									{ className: 'gor-heading' },
									this.props.items.headingright
								),
								_react2.default.createElement(
									'p',
									{ className: 'gor-heading-value gorRisk' },
									this.props.items.textright
								),
								_react2.default.createElement(
									'p',
									{ className: 'gor-status' },
									this.props.items.statusright
								)
							),
							_react2.default.createElement('div', { className: "gor-tile-right " + this.props.items.logo })
						),
						_react2.default.createElement(
							'div',
							{ className: 'gor-low-tile' },
							_react2.default.createElement(
								'span',
								null,
								this.props.items.lowright
							)
						)
					)
				);
			}
		}]);

		return Tile2x;
	}(_react2.default.Component);

	;

	exports.default = Tile2x;

/***/ }

});