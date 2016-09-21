webpackJsonp([2,5],{

/***/ 529:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(417);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(421);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(422);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(423);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(442);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(191);

	var _healthTabs = __webpack_require__(513);

	var _healthTabs2 = _interopRequireDefault(_healthTabs);

	var _health = __webpack_require__(514);

	var _health2 = _interopRequireDefault(_health);

	var _orderStatsWidget = __webpack_require__(520);

	var _orderStatsWidget2 = _interopRequireDefault(_orderStatsWidget);

	var _performanceWidget = __webpack_require__(526);

	var _performanceWidget2 = _interopRequireDefault(_performanceWidget);

	var _auditStatusWidget = __webpack_require__(530);

	var _auditStatusWidget2 = _interopRequireDefault(_auditStatusWidget);

	var _putStatusWidget = __webpack_require__(532);

	var _putStatusWidget2 = _interopRequireDefault(_putStatusWidget);

	var _pickStatusWidget = __webpack_require__(533);

	var _pickStatusWidget2 = _interopRequireDefault(_pickStatusWidget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Container for Overview tab
	 * This will be switched based on tab click
	 */
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

				var putData = this.props.putData ? this.props.putData : {}; //{heading:'Items to Stock', value:'4,74,579', low:'4 PPS stocking 3,546 items/hr', logo:'iStock'};
				var item2 = { heading: 'Items to Audit', value: '3,74,519', low: '4 PPS auditing 1,546 items/hr', logo: 'iAudit' };;

				return _react2.default.createElement(
					'div',
					{ className: 'gorWidgetWrap' },
					_react2.default.createElement(
						'div',
						{ className: 'section group' },
						_react2.default.createElement(
							'div',
							{ className: 'col span_2_of_4' },
							_react2.default.createElement(_putStatusWidget2.default, { items: putData }),
							_react2.default.createElement(_auditStatusWidget2.default, { items: item2 })
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

	function mapStateToProps(state, ownProps) {
		return {
			putData: state.putInfo.putData

		};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Overview);

/***/ },

/***/ 530:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(417);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(421);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(422);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(423);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(442);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Tilex = __webpack_require__(531);

	var _Tilex2 = _interopRequireDefault(_Tilex);

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

	  (0, _createClass3.default)(AuditStatusWidget, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(_Tilex2.default, { items: this.props.items });
	    }
	  }]);
	  return AuditStatusWidget;
	}(_react2.default.Component);

	exports.default = AuditStatusWidget;

/***/ },

/***/ 531:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(417);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(421);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(422);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(423);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(442);

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

/***/ 532:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(417);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(421);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(422);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(423);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(442);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Tilex = __webpack_require__(531);

	var _Tilex2 = _interopRequireDefault(_Tilex);

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

	  (0, _createClass3.default)(PutStatusWidget, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(_Tilex2.default, { items: this.props.items });
	    }
	  }]);
	  return PutStatusWidget;
	}(_react2.default.Component);

	exports.default = PutStatusWidget;

/***/ },

/***/ 533:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(417);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(421);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(422);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(423);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(442);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Tile2x = __webpack_require__(534);

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
	        key: '_parseProps',
	        value: function _parseProps() {
	            var statusClass = '',
	                statusLogo = '',
	                headingleft = '',
	                valueLeftStatus = '',
	                valueRightStatus = '',
	                textleft = '',
	                headingright = '',
	                textright = '',
	                statusleft = '',
	                statusright = '',
	                lowleft = '',
	                lowright = '',
	                logo = '',
	                items = {};

	            headingleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.headingleft',
	                defaultMessage: 'Orders to fullfill' });
	            logo = ' iPick';

	            textleft = this.props.ordersData.count_pending;

	            if (!textleft) {
	                valueLeftStatus = 'gor-none';
	                textleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.completed',
	                    defaultMessage: 'Completed' });

	                lowleft = this.props.ordersData.avg + ' Idle';
	            } else {
	                textleft = _react2.default.createElement(FormattedNumber, { id: 'widget.pick.textleft', value: this.props.ordersData.count_pending });

	                headingright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.headingright',
	                    defaultMessage: 'Time to cut-off' });

	                textright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.textright',
	                    defaultMessage: '{wave_end}', values: { wave_end: this.props.ordersData.wave_end } });

	                lowleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'pickWidget.lowleft',
	                    defaultMessage: '{pps_count} PPS Opertaing at {pick_throughput} per/hr', values: { pps_count: 10, pick_throughput: 10 } });

	                //statusright=this.props.ordersData.time_current;

	                lowright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.lowright',
	                    defaultMessage: 'Completing in {eta}', values: { eta: this.props.ordersData.eta } });

	                if (!this.props.ordersData.count_risk) {
	                    statusClass = 'gor-success';
	                    statusLogo = 'overview-tile-ontime-icon';
	                    statusleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.statusleft',
	                        defaultMessage: 'On Schedule' });
	                } else {
	                    statusClass = 'gor-risk';
	                    valueLeftStatus = 'gor-risk';
	                    statusleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.statusRight',
	                        defaultMessage: '{count_risk} orders at risk', values: { count_risk: this.props.ordersData.count_risk } });
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
	        "ordersData": state.ordersInfo.ordersData || {}
	    };
	}
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PickStatusWidget);

/***/ },

/***/ 534:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(417);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(421);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(422);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(423);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(442);

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