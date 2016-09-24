webpackJsonp([2,10],{

/***/ 480:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(426);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(430);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(431);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(432);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(451);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _healthTabs = __webpack_require__(460);

	var _healthTabs2 = _interopRequireDefault(_healthTabs);

	var _health = __webpack_require__(461);

	var _health2 = _interopRequireDefault(_health);

	var _orderStatsWidget = __webpack_require__(468);

	var _orderStatsWidget2 = _interopRequireDefault(_orderStatsWidget);

	var _performanceWidget = __webpack_require__(477);

	var _performanceWidget2 = _interopRequireDefault(_performanceWidget);

	var _auditStatusWidget = __webpack_require__(481);

	var _auditStatusWidget2 = _interopRequireDefault(_auditStatusWidget);

	var _putStatusWidget = __webpack_require__(483);

	var _putStatusWidget2 = _interopRequireDefault(_putStatusWidget);

	var _pickStatusWidget = __webpack_require__(484);

	var _pickStatusWidget2 = _interopRequireDefault(_pickStatusWidget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Overview = function (_React$Component) {
		(0, _inherits3.default)(Overview, _React$Component);

		function Overview(props) {
			(0, _classCallCheck3.default)(this, Overview);
			return (0, _possibleConstructorReturn3.default)(this, (Overview.__proto__ || (0, _getPrototypeOf2.default)(Overview)).call(this, props));
		}

		(0, _createClass3.default)(Overview, [{
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
	}(_react2.default.Component); /**
	                               * Container for Overview tab
	                               * This will be switched based on tab click
	                               */


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

/***/ 481:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _assign = __webpack_require__(397);

	var _assign2 = _interopRequireDefault(_assign);

	var _getPrototypeOf = __webpack_require__(426);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(430);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(431);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(432);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(451);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Tilex = __webpack_require__(482);

	var _Tilex2 = _interopRequireDefault(_Tilex);

	var _reactRedux = __webpack_require__(191);

	var _reactIntl = __webpack_require__(217);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AuditStatusWidget = function (_React$Component) {
		(0, _inherits3.default)(AuditStatusWidget, _React$Component);

		/**
	  * Called once before rendering of component,used to displatch fetch action
	  * @return {[type]}
	  */
		function AuditStatusWidget(props) {
			(0, _classCallCheck3.default)(this, AuditStatusWidget);
			return (0, _possibleConstructorReturn3.default)(this, (AuditStatusWidget.__proto__ || (0, _getPrototypeOf2.default)(AuditStatusWidget)).call(this, props));
		}

		/**
	  * [format display data coming from server/mock]
	  * @return {[type]} [description]
	  */


		(0, _createClass3.default)(AuditStatusWidget, [{
			key: 'formatContainerData',
			value: function formatContainerData() {
				var lowStr,
				    auditData = (0, _assign2.default)({}, this.props.auditData),
				    totalAudit = this.props.ppsData ? this.props.ppsData.totalAudit : null,
				    auditThroughput = this.props.throughputData ? this.props.throughputData.audit_throughput : null,
				    value = auditData.total_audited ? auditData.total_audited : null;

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
					defaultMessage: 'Items to audit' });
				auditData.value = value;
				auditData.low = lowStr;
				auditData.logo = "iAudit";

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

/***/ 482:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(426);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(430);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(431);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(432);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(451);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Tilex = function (_React$Component) {
		(0, _inherits3.default)(Tilex, _React$Component);

		function Tilex(props) {
			(0, _classCallCheck3.default)(this, Tilex);
			return (0, _possibleConstructorReturn3.default)(this, (Tilex.__proto__ || (0, _getPrototypeOf2.default)(Tilex)).call(this, props));
		}

		(0, _createClass3.default)(Tilex, [{
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

/***/ 483:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _assign = __webpack_require__(397);

	var _assign2 = _interopRequireDefault(_assign);

	var _getPrototypeOf = __webpack_require__(426);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(430);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(431);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(432);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(451);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Tilex = __webpack_require__(482);

	var _Tilex2 = _interopRequireDefault(_Tilex);

	var _reactRedux = __webpack_require__(191);

	var _reactIntl = __webpack_require__(217);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PutStatusWidget = function (_React$Component) {
	        (0, _inherits3.default)(PutStatusWidget, _React$Component);

	        /**
	         * Called once before rendering of component,used to displatch fetch action
	         * @return {[type]}
	         */
	        function PutStatusWidget(props) {
	                (0, _classCallCheck3.default)(this, PutStatusWidget);
	                return (0, _possibleConstructorReturn3.default)(this, (PutStatusWidget.__proto__ || (0, _getPrototypeOf2.default)(PutStatusWidget)).call(this, props));
	        }
	        /**
	         * [function to format display data coming from server/mock]
	         * @return {[void]} 
	         */


	        (0, _createClass3.default)(PutStatusWidget, [{
	                key: '_formatContainerData',
	                value: function _formatContainerData() {
	                        var lowStr,
	                            totalPut = this.props.ppsData ? this.props.ppsData.totalPut : null,
	                            putData = (0, _assign2.default)({}, this.props.putData),
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
	                                defaultMessage: 'Items to stock' });
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

/***/ 484:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(426);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(430);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(431);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(432);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(451);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Tile2x = __webpack_require__(485);

	var _Tile2x2 = _interopRequireDefault(_Tile2x);

	var _reactRedux = __webpack_require__(191);

	var _reactIntl = __webpack_require__(217);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PickStatusWidget = function (_React$Component) {
	    (0, _inherits3.default)(PickStatusWidget, _React$Component);

	    /**
	     * Called once before rendering of component,used to displatch fetch action
	     * @return {[type]}
	     */
	    function PickStatusWidget(props) {
	        (0, _classCallCheck3.default)(this, PickStatusWidget);
	        return (0, _possibleConstructorReturn3.default)(this, (PickStatusWidget.__proto__ || (0, _getPrototypeOf2.default)(PickStatusWidget)).call(this, props));
	        //console.log(this.props.ordersData);
	    }

	    (0, _createClass3.default)(PickStatusWidget, [{
	        key: '_tomillisecs',
	        value: function _tomillisecs(m) {
	            var hh = 0,
	                mm = 0,
	                timestr = '';
	            hh = parseInt(m / 60, 10);
	            mm = m - hh * 60;

	            if (hh) timestr += hh + 'h ';
	            timestr += mm + 'm ';

	            return timestr;
	        }
	    }, {
	        key: '_parseProps',
	        value: function _parseProps() {
	            var statusClass = '',
	                statusLogo = '',
	                headingleft = '',
	                valueLeftStatus = '',
	                valueRightStatus = '',
	                textleft = 0,
	                headingright = '',
	                textright = '',
	                statusleft = '',
	                statusright = '',
	                lowleft = '',
	                lowright = '',
	                logo = '',
	                ppsCount = 0,
	                remTime = 0,
	                eta = 0,
	                items = {};

	            headingleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.headingleft',
	                defaultMessage: 'Orders to fullfill' });
	            logo = ' iPick';
	            ppsCount = this.props.ppsData.totalPick;
	            textleft = this.props.ordersData.count_pending;

	            if (!textleft) {
	                valueLeftStatus = 'gor-none';
	                textleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.completed',
	                    defaultMessage: 'Completed' });

	                lowleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.status.idle',
	                    defaultMessage: '{count} PPS idle',
	                    values: {
	                        count: ppsCount
	                    } });
	            } else {
	                textleft = _react2.default.createElement(_reactIntl.FormattedNumber, { id: 'widget.pick.textleft', value: this.props.ordersData.count_pending });

	                headingright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.headingright',
	                    defaultMessage: 'Time to cut-off' });

	                remTime = this._tomillisecs(this.props.ordersData.cut_off);

	                textright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.textright',
	                    defaultMessage: '{cut_off}', values: { cut_off: remTime } });

	                lowleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.throughput',
	                    defaultMessage: '{count} PPS fullfilling at {throughput} items/hr',
	                    values: {
	                        count: ppsCount,
	                        throughput: this.props.throughputData.pick_throughput
	                    } });
	                eta = this._tomillisecs(this.props.ordersData.eta);
	                lowright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.lowright',
	                    defaultMessage: 'Completing in {eta}', values: { eta: eta } });

	                if (!this.props.ordersData.count_risk) {
	                    statusClass = 'gor-success';
	                    statusLogo = 'overview-tile-ontime-icon';
	                    statusleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.statusleft',
	                        defaultMessage: 'On Schedule' });
	                } else {
	                    statusClass = 'gor-risk';
	                    statusLogo = 'header-yellow-alert-icon';
	                    statusleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.statusRight',
	                        defaultMessage: '{count_risk} {count_risk,plural, one {order} other {orders}} at risk',
	                        values: { count_risk: this.props.ordersData.count_risk } });
	                    valueLeftStatus = 'gor-risk';
	                    valueRightStatus = 'gor-risk';
	                }
	            }
	            items = { headingleft: headingleft, headingright: headingright, textleft: textleft, valueLeftStatus: valueLeftStatus, valueRightStatus: valueRightStatus, textright: textright, statusleft: statusleft, statusClass: statusClass, statusLogo: statusLogo, statusright: statusright, lowleft: lowleft, lowright: lowright, logo: logo };
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
	        ordersData: state.ordersInfo.ordersData || {},
	        ppsData: state.ppsInfo.ppsData || {},
	        throughputData: state.throughputInfo.throughputData || {}
	    };
	}
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PickStatusWidget);

/***/ },

/***/ 485:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(426);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(430);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(431);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(432);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(451);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Tile2x = function (_React$Component) {
		(0, _inherits3.default)(Tile2x, _React$Component);

		function Tile2x(props) {
			(0, _classCallCheck3.default)(this, Tile2x);
			return (0, _possibleConstructorReturn3.default)(this, (Tile2x.__proto__ || (0, _getPrototypeOf2.default)(Tile2x)).call(this, props));
		}

		(0, _createClass3.default)(Tile2x, [{
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
									{ className: this.props.items.valueLeftStatus },
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
									{ className: "gor-heading-value " + this.props.items.valueRightStatus },
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