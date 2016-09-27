webpackJsonp([2,12],{

/***/ 476:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(436);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(440);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(441);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(442);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(461);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDropdown = __webpack_require__(477);

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
	        _react2.default.createElement(_reactDropdown2.default, { options: this.props.items, onChange: this._onSelect, value: defaultOption })
	      );
	    }
	  }]);
	  return Dropdown;
	}(_react.Component);

	exports.default = Dropdown;

/***/ },

/***/ 477:
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

	var _classnames = __webpack_require__(376);

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

/***/ 478:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(436);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(440);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(441);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(442);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(461);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _orderStatsWidget = __webpack_require__(479);

	var _orderStatsWidget2 = _interopRequireDefault(_orderStatsWidget);

	var _performanceWidget = __webpack_require__(487);

	var _performanceWidget2 = _interopRequireDefault(_performanceWidget);

	var _auditStatusWidget = __webpack_require__(491);

	var _auditStatusWidget2 = _interopRequireDefault(_auditStatusWidget);

	var _putStatusWidget = __webpack_require__(493);

	var _putStatusWidget2 = _interopRequireDefault(_putStatusWidget);

	var _pickStatusWidget = __webpack_require__(494);

	var _pickStatusWidget2 = _interopRequireDefault(_pickStatusWidget);

	var _reactRedux = __webpack_require__(191);

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

	// function mapStateToProps(state, ownProps){
	// 	return {
	//         putData: state.putInfo.putData,
	//         ppsData:state.ppsInfo.ppsData,
	//         throughputData : state.throughputInfo.throughputData,
	//         auditData: state.auditInfo.auditData
	//     };
	// }

	exports.default = Overview;

/***/ },

/***/ 479:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(436);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(440);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(441);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(442);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(461);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _dropdown = __webpack_require__(476);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _reactRedux = __webpack_require__(191);

	var _graphd = __webpack_require__(480);

	var _graphd2 = _interopRequireDefault(_graphd);

	var _statsWidgetActions = __webpack_require__(425);

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
				var item = [{ value: 'PPS_PICK_PERFORMANCE', label: 'PPS - pick performance' }, { value: 'PPS_PUT_PERFORMANCE', label: 'PPS - put performance' }, { value: 'PPS_AUDIT_PERFORMANCE', label: 'PPS - audit performance' }];
				var renderWidget = this.props.statsWidget.statsWidget,
				    chartRender;
				var currentState = item[0],
				    index = 0;
				if (renderWidget !== undefined || renderWidget !== null) {
					for (var i = 0; i < item.length; i++) {
						if (item[i].value === renderWidget) {
							index = i;
						}
					}
				}

				if (renderWidget === "PPS_PUT_PERFORMANCE") {
					chartRender = _react2.default.createElement(_graphd2.default, { tableData: this.props.histdata, type: "put" });
				} else if (renderWidget === "PPS_AUDIT_PERFORMANCE") {
					chartRender = _react2.default.createElement(_graphd2.default, { tableData: this.props.histdata, type: "audit" });
				} else {

					chartRender = _react2.default.createElement(_graphd2.default, { tableData: this.props.histdata, type: "pick" });
				}

				return _react2.default.createElement(
					'div',
					{ className: 'gorOrderStatsWidget' },
					_react2.default.createElement(
						'div',
						{ className: 'gorDrop' },
						_react2.default.createElement(
							'div',
							{ className: 'Order-Stats-Drop' },
							_react2.default.createElement(_dropdown2.default, { optionDispatch: this.props.renderStatsWidget, items: item, styleClass: 'ddown', currentState: item[index] })
						),
						_react2.default.createElement(
							'div',
							{ id: 'chart_att' },
							chartRender
						)
					)
				);
			}
		}]);
		return OrderStatsWidget;
	}(_react2.default.Component);

	;

	function mapStateToProps(state, ownProps) {
		return {
			histdata: state.histogramData || {},
			statsWidget: state.statsWidget || {}
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

/***/ 480:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(436);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(440);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(441);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(442);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(461);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactD3Library = __webpack_require__(481);

	var _reactD3Library2 = _interopRequireDefault(_reactD3Library);

	var _d = __webpack_require__(482);

	var d3 = _interopRequireWildcard(_d);

	var _d3Tip = __webpack_require__(483);

	var _d3Tip2 = _interopRequireDefault(_d3Tip);

	var _reactDimensions = __webpack_require__(485);

	var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

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
	    key: 'graphRender',
	    value: function graphRender(containerWidth, tData, nextP) {
	      var component = this;
	      var widther = containerWidth;
	      var margin = { top: 20, right: 20, bottom: 20, left: 40 },
	          width = widther - margin.left - margin.right,
	          height = 300 - margin.top - margin.bottom;
	      var count = -1;
	      var temp = -1;
	      var y = d3.scale.linear().range([height, 0]);
	      var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
	      var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(function (d) {
	        count++;
	        temp++;
	        if (count === 3 || temp === 0 || temp === 23) {
	          count = 0;
	          return d;
	        }
	        return "";
	      });

	      var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

	      var node = document.createElement('div');

	      var svg = d3.select(node).append('svg').attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	      // const tip = d3tip()
	      //   .attr('class', 'd3-tip')
	      //   .offset([100, 90])
	      //   .html(function(d) {
	      //     //var time=d.timeInterval.split(" ");
	      //     return "<div> Time:<div/><div> 27 Jul,2016</div> <div style='color:#ffffff'> Fulfilled:    </div>";
	      //   })


	      //svg.call(tip);
	      var data = [];
	      var barData = {};
	      var json = tData;
	      for (var i = 0; i < json.length; i++) {
	        barData.timeInterval = json[i].timeInterval;
	        barData.type = json[i][nextP];
	        data.push(barData);
	        barData = {};
	      }
	      update(data);
	      function update(data) {
	        data.forEach(function (d) {
	          d.type = +d.type;
	        });
	        x.domain(data.map(function (d) {
	          return d.timeInterval;
	        }));
	        y.domain([0, d3.max(data, function (d) {
	          return d.type;
	        })]);

	        svg.append("g").attr("class", "grid").call(make_y_axis().tickSize(-width, 0, 0).tickFormat(""));

	        svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).style("font-size", "12px").style("font-family", "sans-serif").style("fill", "#666666");

	        svg.append("g").attr("class", "y axis").call(yAxis).style("font-size", "12px").style("font-family", "sans-serif").style("fill", "#666666").append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "4em").style("text-anchor", "end");

	        svg.selectAll(".bar").data(data).enter().append("rect").attr("rx", 2).attr("ry", 2).attr("class", "bar").attr("x", function (d) {
	          return x(d.timeInterval);
	        }).attr("width", x.rangeBand()).attr("y", function (d) {
	          return y(d.type);
	        }).attr("height", 0).attr("height", function (d) {
	          return height - y(d.type);
	        });

	        // .on('mouseover', tip.show)
	        // .on('mouseout', tip.hide)

	        //   var txt = svg.selectAll(".bar");

	        //    txt.append("g")
	        // .attr("class", "below")
	        // .attr("x", function(d) { 
	        //     return x(d.timeInterval); 
	        //   })
	        // .attr("y", function(d) { return height-y(d.type); })
	        // .attr("dy", "1.2em")
	        // .attr("text-anchor", "right")
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
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.graphRender(this.props.containerWidth, this.props.tableData.histData, this.props.type);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.graphRender(nextProps.containerWidth, nextProps.tableData.histData, nextProps.type);
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
	exports.default = (0, _reactDimensions2.default)()(Chart);

/***/ },

/***/ 485:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(20);
	var onElementResize = __webpack_require__(486);

	var defaultContainerStyle = {
	  width: '100%',
	  height: '100%',
	  padding: 0,
	  border: 0
	};

	function defaultGetWidth(element) {
	  return element.clientWidth;
	}

	function defaultGetHeight(element) {
	  return element.clientHeight;
	}

	/**
	 * Wraps a react component and adds properties `containerHeight` and
	 * `containerWidth`. Useful for responsive design. Properties update on
	 * window resize. **Note** that the parent element must have either a
	 * height or a width, or nothing will be rendered
	 *
	 * Can be used as a
	 * [higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
	 * or as an [ES7 class decorator](https://github.com/wycats/javascript-decorators)
	 * (see examples)
	 *
	 * @param {object} [options]
	 * @param {function} [options.getHeight] A function that is passed an element and returns element
	 * height, where element is the wrapper div. Defaults to `(element) => element.clientHeight`
	 * @param {function} [options.getWidth]  A function that is passed an element and returns element
	 * width, where element is the wrapper div. Defaults to `(element) => element.clientWidth`
	 * @param {object} [options.containerStyle] A style object for the `<div>` that will wrap your component.
	 * The dimensions of this `div` are what are passed as props to your component. The default style is
	 * `{ width: '100%', height: '100%', padding: 0, border: 0 }` which will cause the `div` to fill its
	 * parent in most cases. If you are using a flexbox layout you will want to change this default style.
	 * @param {string} [options.className] Control the class name set on the wrapper `<div>`
	 * @param {boolean} [options.elementResize=false] Set true to watch the wrapper `div` for changes in
	 * size which are not a result of window resizing - e.g. changes to the flexbox and other layout.
	 * @return {function}                   A higher-order component that can be
	 * used to enhance a react component `Dimensions()(MyComponent)`
	 *
	 * @example
	 * // ES2015
	 * import React from 'react'
	 * import Dimensions from 'react-dimensions'
	 *
	 * class MyComponent extends React.Component {
	 *   render() (
	 *     <div
	 *       containerWidth={this.props.containerWidth}
	 *       containerHeight={this.props.containerHeight}
	 *     >
	 *     </div>
	 *   )
	 * }
	 *
	 * export default Dimensions()(MyComponent) // Enhanced component
	 *
	 * @example
	 * // ES5
	 * var React = require('react')
	 * var Dimensions = require('react-dimensions')
	 *
	 * var MyComponent = React.createClass({
	 *   render: function() {(
	 *     <div
	 *       containerWidth={this.props.containerWidth}
	 *       containerHeight={this.props.containerHeight}
	 *     >
	 *     </div>
	 *   )}
	 * }
	 *
	 * module.exports = Dimensions()(MyComponent) // Enhanced component
	 *
	 */
	module.exports = function Dimensions() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var _ref$getHeight = _ref.getHeight;
	  var getHeight = _ref$getHeight === undefined ? defaultGetHeight : _ref$getHeight;
	  var _ref$getWidth = _ref.getWidth;
	  var getWidth = _ref$getWidth === undefined ? defaultGetWidth : _ref$getWidth;
	  var _ref$containerStyle = _ref.containerStyle;
	  var containerStyle = _ref$containerStyle === undefined ? defaultContainerStyle : _ref$containerStyle;
	  var _ref$className = _ref.className;
	  var className = _ref$className === undefined ? null : _ref$className;
	  var _ref$elementResize = _ref.elementResize;
	  var elementResize = _ref$elementResize === undefined ? false : _ref$elementResize;

	  return function (ComposedComponent) {
	    return function (_React$Component) {
	      _inherits(DimensionsHOC, _React$Component);

	      function DimensionsHOC() {
	        var _Object$getPrototypeO;

	        var _temp, _this, _ret;

	        _classCallCheck(this, DimensionsHOC);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DimensionsHOC)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _this.updateDimensions = function () {
	          var container = _this.refs.container;
	          var containerWidth = getWidth(container);
	          var containerHeight = getHeight(container);

	          if (containerWidth !== _this.state.containerWidth || containerHeight !== _this.state.containerHeight) {
	            _this.setState({ containerWidth: containerWidth, containerHeight: containerHeight });
	          }
	        }, _this.onResize = function () {
	          if (_this.rqf) return;
	          _this.rqf = _this.getWindow().requestAnimationFrame(function () {
	            _this.rqf = null;
	            _this.updateDimensions();
	          });
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	      }
	      // ES7 Class properties
	      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers


	      // Using arrow functions and ES7 Class properties to autobind
	      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#arrow-functions


	      _createClass(DimensionsHOC, [{
	        key: 'getWindow',


	        // If the component is mounted in a different window to the javascript
	        // context, as with https://github.com/JakeGinnivan/react-popout
	        // then the `window` global will be different from the `window` that
	        // contains the component.
	        // Depends on `defaultView` which is not supported <IE9
	        value: function getWindow() {
	          return this.refs.container ? this.refs.container.ownerDocument.defaultView || window : window;
	        }
	      }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	          if (!this.refs.container) {
	            throw new Error('Cannot find container div');
	          }
	          this.updateDimensions();
	          if (elementResize) {
	            // Experimental: `element-resize-event` fires when an element resizes.
	            // It attaches its own window resize listener and also uses
	            // requestAnimationFrame, so we can just call `this.updateDimensions`.
	            onElementResize(this.refs.container, this.updateDimensions);
	          } else {
	            this.getWindow().addEventListener('resize', this.onResize, false);
	          }
	        }
	      }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	          this.getWindow().removeEventListener('resize', this.onResize);
	        }

	        /**
	         * Returns the underlying wrapped component instance.
	         * Useful if you need to access a method or property of the component
	         * passed to react-dimensions.
	         *
	         * @return {object} The rendered React component
	         **/

	      }, {
	        key: 'getWrappedInstance',
	        value: function getWrappedInstance() {
	          this.refs.wrappedInstance;
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          var _state = this.state;
	          var containerWidth = _state.containerWidth;
	          var containerHeight = _state.containerHeight;

	          if (!containerWidth && !containerHeight) {
	            console.warn('Wrapper div has no height or width, try overriding style with `containerStyle` option');
	          }
	          return React.createElement(
	            'div',
	            { className: className, style: containerStyle, ref: 'container' },
	            (containerWidth || containerHeight) && React.createElement(ComposedComponent, _extends({}, this.state, this.props, {
	              updateDimensions: this.updateDimensions,
	              ref: 'wrappedInstance'
	            }))
	          );
	        }
	      }]);

	      return DimensionsHOC;
	    }(React.Component);
	  };
	};


/***/ },

/***/ 486:
/***/ function(module, exports) {

	var exports = function exports(element, fn) {
	  var window = this
	  var document = window.document
	  var isIE
	  var requestFrame

	  var attachEvent = document.attachEvent
	  if (typeof navigator !== 'undefined') {
	    isIE = navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/Edge/)
	  }

	  requestFrame = (function () {
	    var raf = window.requestAnimationFrame ||
	      window.mozRequestAnimationFrame ||
	        window.webkitRequestAnimationFrame ||
	          function fallbackRAF(func) {
	            return window.setTimeout(func, 20)
	          }
	    return function requestFrameFunction(func) {
	      return raf(func)
	    }
	  })()

	  var cancelFrame = (function () {
	    var cancel = window.cancelAnimationFrame ||
	      window.mozCancelAnimationFrame ||
	        window.webkitCancelAnimationFrame ||
	          window.clearTimeout
	    return function cancelFrameFunction(id) {
	      return cancel(id)
	    }
	  })()

	  function resizeListener(e) {
	    var win = e.target || e.srcElement
	    if (win.__resizeRAF__) {
	      cancelFrame(win.__resizeRAF__)
	    }
	    win.__resizeRAF__ = requestFrame(function () {
	      var trigger = win.__resizeTrigger__
	      if(trigger !== undefined) {
	        trigger.__resizeListeners__.forEach(function (fn) {
	          fn.call(trigger, e)
	        })
	      }
	    })
	  }

	  function objectLoad() {
	    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
	    this.contentDocument.defaultView.addEventListener('resize', resizeListener)
	  }

	  if (!element.__resizeListeners__) {
	    element.__resizeListeners__ = []
	    if (attachEvent) {
	      element.__resizeTrigger__ = element
	      element.attachEvent('onresize', resizeListener)
	    } else {
	      if (getComputedStyle(element).position === 'static') {
	        element.style.position = 'relative'
	      }
	      var obj = element.__resizeTrigger__ = document.createElement('object')
	      obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;')
	      obj.setAttribute('class', 'resize-sensor')
	      obj.__resizeElement__ = element
	      obj.onload = objectLoad
	      obj.type = 'text/html'
	      if (isIE) {
	        element.appendChild(obj)
	      }
	      obj.data = 'about:blank'
	      if (!isIE) {
	        element.appendChild(obj)
	      }
	    }
	  }
	  element.__resizeListeners__.push(fn)
	}

	exports.unbind = function(element, fn){
	  var attachEvent = document.attachEvent;
	  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
	  if (!element.__resizeListeners__.length) {
	    if (attachEvent) {
	      element.detachEvent('onresize', resizeListener);
	    } else {
	      element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', resizeListener);
	      element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
	    }
	  }
	}

	module.exports = (typeof window === 'undefined') ? exports : exports.bind(window)


/***/ },

/***/ 487:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(436);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(440);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(441);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(442);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(461);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _healthTabs = __webpack_require__(488);

	var _healthTabs2 = _interopRequireDefault(_healthTabs);

	var _dropdown = __webpack_require__(476);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _graph_horizontal = __webpack_require__(490);

	var _graph_horizontal2 = _interopRequireDefault(_graph_horizontal);

	var _reactRedux = __webpack_require__(191);

	var _performanceWidgetActions = __webpack_require__(415);

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
		var pps_data = [{ component: { componentNumber: ppsTotal, componentType: 'PPS' }, states: { offState: ppsError, onState: ppsOn, errorState: ppsError } }];
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
		var butler_data = [{ component: { componentNumber: butlerTotal, componentType: 'Butler bots' }, states: { offState: butlerStopped, onState: butlerOn, errorState: butlerError } }];
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
		var charging_data = [{ component: { componentNumber: totalChargers, componentType: 'Charging Stations' }, states: { offState: chargersError, onState: connected, errorState: disconnected } }];
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
				var item = [{ value: 'RENDER_SYSTEM_HEALTH', label: 'System Health' }, { value: 'PICK_PPS_PERFORMANCE', label: 'PPS Pick Performance' }, { value: 'PUT_PPS_PERFORMANCE', label: 'PPS Put Performance' }, { value: 'AUDIT_PPS_PERFORMANCE', label: 'PPS Audit Performance' }];
				var currentState = item[0],
				    index = 0;
				if (this.props.widget !== undefined || this.props.widget !== null) {
					for (var i = 0; i < item.length; i++) {
						if (item[i].value === this.props.widget) {
							index = i;
						}
					}
				}
				var link = this;
				var pps_data = _getPPSdata(link);
				var butler_data = _getButlerdata(link);
				var charging_data = _getChargingdata(link);

				var itemRender;
				if (this.props.widget === "PICK_PPS_PERFORMANCE") {
					itemRender = _react2.default.createElement(_graph_horizontal2.default, { data: this.props.ppsPerformance, type: 'items_picked' });
				} else if (this.props.widget === "PUT_PPS_PERFORMANCE") {
					itemRender = _react2.default.createElement(_graph_horizontal2.default, { data: this.props.ppsPerformance, type: 'items_put' });
				} else if (this.props.widget === "AUDIT_PPS_PERFORMANCE") {
					itemRender = _react2.default.createElement(_graph_horizontal2.default, { data: this.props.ppsPerformance, type: 'items_audited' });
				} else {
					itemRender = _react2.default.createElement(_healthTabs2.default, { ppsData: pps_data, butlerData: butler_data, chargingData: charging_data });
				}

				return _react2.default.createElement(
					'div',
					{ className: 'gorPerformanceWidget' },
					_react2.default.createElement(
						'div',
						{ className: 'gorDrop Performance-Widget-Drop' },
						_react2.default.createElement(_dropdown2.default, { optionDispatch: this.props.renderPerformanceWidget, items: item, styleClass: 'ddown', currentState: item[index] })
					),
					_react2.default.createElement(
						'div',
						{ id: 'performanceGraph' },
						itemRender
					)
				);
			}
		}]);
		return PerformanceWidget;
	}(_react2.default.Component);

	;

	function mapStateToProps(state, ownProps) {
		return {
			widget: state.performanceWidget.widget || {},
			ppsData: state.recieveSocketActions.ppsData || {},
			butlersData: state.recieveSocketActions.butlersData || {},
			chargersData: state.recieveSocketActions.chargersData || {},
			ppsPerformance: state.PPSperformance || {}
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

/***/ },

/***/ 488:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(436);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(440);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(441);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(442);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(461);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _health = __webpack_require__(489);

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

/***/ 489:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(436);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(440);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(441);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(442);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(461);

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
								{ className: 'block paramPositionMiddle ' },
								_react2.default.createElement(
									'div',
									{ className: 'block offState' },
									_react2.default.createElement(
										'span',
										null,
										this.props.items[0].states.offState
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'status' },
									'Off'
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

/***/ 490:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(436);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(440);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(441);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(442);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(461);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactD3Library = __webpack_require__(481);

	var _reactD3Library2 = _interopRequireDefault(_reactD3Library);

	var _d = __webpack_require__(482);

	var d3 = _interopRequireWildcard(_d);

	var _d3Tip = __webpack_require__(483);

	var _d3Tip2 = _interopRequireDefault(_d3Tip);

	var _reactDimensions = __webpack_require__(485);

	var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

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
	    key: 'graphRender',
	    value: function graphRender(containerWidth, tData, nextP) {
	      var component = this;
	      var widther = containerWidth;
	      var parentHeight = 300;

	      var json = tData;
	      var data = [];
	      var barData = {};
	      for (var i = 0; i < json.length; i++) {
	        barData.pps_id = json[i].pps_id;
	        barData.type = json[i][nextP];
	        data.push(barData);
	        barData = {};
	      }
	      update(data);

	      function update(data) {

	        var width = widther - 100;
	        var barHeight = parentHeight / data.length;
	        var left = 30;
	        var top = 20;

	        //var margin = {top: 20, right: 20, bottom: 50, left: 100};

	        var x = d3.scale.linear().range([0, width]);

	        var xAxis = d3.svg.axis().scale(x).orient("top");

	        var y = d3.scale.ordinal().rangeRoundBands([0, barHeight], .1);
	        var yAxis = d3.svg.axis().scale(y).orient("right");

	        var node = document.createElement('div');
	        var chart = d3.select(node).append('svg').attr("width", widther).attr("height", 400).append("g").attr("transform", "translate(" + left + "," + top + ")");

	        x.domain([0, d3.max(data, function (d) {
	          return d.type;
	        })]);

	        var bar = chart.selectAll("g").data(data).enter().append("g").attr("class", "g").attr("y", function (d) {
	          return y(d.pps_id);
	        }).attr("width", y.rangeBand()).attr("transform", function (d, i) {
	          return "translate(0," + i * barHeight + ")";
	        });

	        bar.append("g").attr("class", "axis").call(yAxis).style("font-size", "30px").style("font-family", "sans-serif").style("fill", "red").append("text").attr("y", 6).attr("dy", "4em").style("text-anchor", "end");

	        bar.append("g").attr("class", "y axis").attr("transform", "translate(" + "50" + ",0)").style({ 'stroke': '#D3D3D3', 'fill': '#D3D3D3', 'stroke-width': '1px' }).call(yAxis);

	        bar.append("rect").attr("rx", 2).attr("ry", 2).attr("x", 50).attr("width", function (d) {
	          return x(d.type);
	        }).attr("height", barHeight - 8).style("fill", "#D3D3D3").style("opacity", "0.5");

	        bar.append("text").attr("x", function (d) {
	          return x(d.type) + 25;
	        }).attr("y", barHeight / 2 - 3).attr("dy", ".35em").text(function (d) {
	          if (d.type === 0) {
	            return "ERROR";
	          } else {
	            return d.type;
	          }
	        }).style("font-size", "12px").style("font-weight", "bold").style("font-family", "sans-serif").style("fill", "#666666");

	        bar.append("text").attr("x", -10).attr("y", barHeight / 2 - 3).attr("dy", ".35em").text(function (d) {
	          if (d.type === 4) {
	            return "PPS " + d.pps_id;
	          } else {
	            return "PPS " + d.pps_id;
	          }
	        }).style("font-size", "12px").style("font-family", "sans-serif").style("fill", "#666666");

	        component.setState({ d3: node });
	      }

	      function type(d) {
	        d.type = +d.type;
	        return d;
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.graphRender(this.props.containerWidth, this.props.data.ppsPerformance.aggregate_data, this.props.type);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.graphRender(nextProps.containerWidth, nextProps.data.ppsPerformance.aggregate_data, nextProps.type);
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
	exports.default = (0, _reactDimensions2.default)()(ChartHorizontal);

/***/ },

/***/ 491:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _assign = __webpack_require__(398);

	var _assign2 = _interopRequireDefault(_assign);

	var _getPrototypeOf = __webpack_require__(436);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(440);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(441);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(442);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(461);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Tilex = __webpack_require__(492);

	var _Tilex2 = _interopRequireDefault(_Tilex);

	var _reactRedux = __webpack_require__(191);

	var _reactIntl = __webpack_require__(218);

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
				    value = auditData.total_audited ? auditData.total_audited : null,
				    pluralMsg;

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
					value = _react2.default.createElement(_reactIntl.FormattedNumber, { value: value });
					auditThroughput = _react2.default.createElement(_reactIntl.FormattedNumber, { value: auditThroughput });
					pluralMsg = _react2.default.createElement(_reactIntl.FormattedPlural, {
						value: totalAudit,
						one: 'PPS',
						other: 'PPS'
					});
					lowStr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.audit.throughput',
						defaultMessage: '{count} {pluralMsg} auditing {throughput} items/hr',
						values: {
							count: totalAudit,
							pluralMsg: pluralMsg,
							throughput: auditThroughput
						} });
				}

				auditData.heading = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.audit.heading',
					defaultMessage: 'Items audited' });
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

/***/ 492:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(436);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(440);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(441);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(442);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(461);

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

/***/ 493:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _assign = __webpack_require__(398);

	var _assign2 = _interopRequireDefault(_assign);

	var _getPrototypeOf = __webpack_require__(436);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(440);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(441);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(442);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(461);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Tilex = __webpack_require__(492);

	var _Tilex2 = _interopRequireDefault(_Tilex);

	var _reactRedux = __webpack_require__(191);

	var _reactIntl = __webpack_require__(218);

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
	                            pluralMsg,
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
	                                value = _react2.default.createElement(_reactIntl.FormattedNumber, { value: value });
	                                putThroughput = _react2.default.createElement(_reactIntl.FormattedNumber, { value: putThroughput });
	                                pluralMsg = _react2.default.createElement(_reactIntl.FormattedPlural, {
	                                        value: totalPut,
	                                        one: 'PPS',
	                                        other: 'PPS'
	                                });
	                                lowStr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.put.throughput',
	                                        defaultMessage: '{count} {pluralMsg} stocking {throughput} items/hr',
	                                        values: {
	                                                count: totalPut,
	                                                pluralMsg: pluralMsg,
	                                                throughput: putThroughput
	                                        } });
	                        }

	                        putData.heading = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.put.heading',
	                                defaultMessage: 'Items stocked' });
	                        putData.value = value;
	                        putData.low = lowStr;
	                        putData.logo = "iStock";

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

/***/ 494:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(436);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(440);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(441);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(442);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(461);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Tile2x = __webpack_require__(495);

	var _Tile2x2 = _interopRequireDefault(_Tile2x);

	var _reactRedux = __webpack_require__(191);

	var _reactIntl = __webpack_require__(218);

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

/***/ 495:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(436);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(440);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(441);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(442);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(461);

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