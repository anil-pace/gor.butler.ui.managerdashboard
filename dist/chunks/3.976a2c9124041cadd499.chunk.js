webpackJsonp([3,6],{

/***/ 450:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(416);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(420);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(421);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(422);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(441);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _health = __webpack_require__(451);

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

/***/ 451:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(416);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(420);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(421);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(422);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(441);

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

/***/ 456:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(416);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(420);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(421);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(422);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(441);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDropdown = __webpack_require__(457);

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

/***/ 457:
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

	var _classnames = __webpack_require__(458);

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

/***/ 458:
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

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(416);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(420);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(421);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(422);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(441);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _dropdown = __webpack_require__(456);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _reactRedux = __webpack_require__(191);

	var _graphd = __webpack_require__(460);

	var _graphd2 = _interopRequireDefault(_graphd);

	var _graph_horizontal = __webpack_require__(464);

	var _graph_horizontal2 = _interopRequireDefault(_graph_horizontal);

	var _statsWidgetActions = __webpack_require__(414);

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

/***/ 460:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(416);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(420);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(421);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(422);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(441);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactD3Library = __webpack_require__(461);

	var _reactD3Library2 = _interopRequireDefault(_reactD3Library);

	var _d = __webpack_require__(462);

	var d3 = _interopRequireWildcard(_d);

	var _d3Tip = __webpack_require__(463);

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

/***/ 464:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(416);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(420);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(421);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(422);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(441);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactD3Library = __webpack_require__(461);

	var _reactD3Library2 = _interopRequireDefault(_reactD3Library);

	var _d = __webpack_require__(462);

	var d3 = _interopRequireWildcard(_d);

	var _d3Tip = __webpack_require__(463);

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

/***/ 465:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(416);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(420);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(421);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(422);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(441);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _healthTabs = __webpack_require__(450);

	var _healthTabs2 = _interopRequireDefault(_healthTabs);

	var _dropdown = __webpack_require__(456);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _graph_horizontal = __webpack_require__(464);

	var _graph_horizontal2 = _interopRequireDefault(_graph_horizontal);

	var _reactRedux = __webpack_require__(191);

	var _performanceWidgetActions = __webpack_require__(404);

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

/***/ },

/***/ 468:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(416);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(420);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(421);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(422);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(441);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _healthTabs = __webpack_require__(450);

	var _healthTabs2 = _interopRequireDefault(_healthTabs);

	var _health = __webpack_require__(451);

	var _health2 = _interopRequireDefault(_health);

	var _orderStatsWidget = __webpack_require__(459);

	var _orderStatsWidget2 = _interopRequireDefault(_orderStatsWidget);

	var _performanceWidget = __webpack_require__(465);

	var _performanceWidget2 = _interopRequireDefault(_performanceWidget);

	var _auditStatusWidget = __webpack_require__(469);

	var _auditStatusWidget2 = _interopRequireDefault(_auditStatusWidget);

	var _putStatusWidget = __webpack_require__(471);

	var _putStatusWidget2 = _interopRequireDefault(_putStatusWidget);

	var _pickStatusWidget = __webpack_require__(472);

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

/***/ 469:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _assign = __webpack_require__(387);

	var _assign2 = _interopRequireDefault(_assign);

	var _getPrototypeOf = __webpack_require__(416);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(420);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(421);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(422);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(441);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Tilex = __webpack_require__(470);

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

/***/ 470:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(416);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(420);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(421);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(422);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(441);

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

/***/ 471:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _assign = __webpack_require__(387);

	var _assign2 = _interopRequireDefault(_assign);

	var _getPrototypeOf = __webpack_require__(416);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(420);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(421);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(422);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(441);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Tilex = __webpack_require__(470);

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

/***/ 472:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(416);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(420);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(421);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(422);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(441);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Tile2x = __webpack_require__(473);

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

	                lowleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.status.idle',
	                    defaultMessage: '{count} PPS idle',
	                    values: {
	                        count: this.props.ppsData.totalAudit
	                    } });
	            } else {
	                textleft = _react2.default.createElement(_reactIntl.FormattedNumber, { id: 'widget.pick.textleft', value: this.props.ordersData.count_pending });

	                headingright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.headingright',
	                    defaultMessage: 'Time to cut-off' });

	                textright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.textright',
	                    defaultMessage: ' {wave_end}', values: { wave_end: this.props.ordersData.wave_end } });

	                lowleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.throughput',
	                    defaultMessage: '{count} PPS picking {throughput} items/hr',
	                    values: {
	                        count: this.props.ppsData.totalAudit,
	                        throughput: this.props.throughputData.audit_throughput
	                    } });

	                lowright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.lowright',
	                    defaultMessage: 'Completing in {eta}', values: { eta: this.props.ordersData.eta } });

	                if (!this.props.ordersData.count_risk) {
	                    statusClass = 'gor-success';
	                    statusLogo = 'overview-tile-ontime-icon';
	                    statusleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.statusleft',
	                        defaultMessage: 'On Schedule' });
	                } else {
	                    statusClass = 'gor-risk';
	                    statusLogo = 'header-yellow-alert-icon';
	                    statusleft = _react2.default.createElement(_reactIntl.FormattedPlural, { id: 'widget.pick.statusRight', description: 'Heading for pick status widget',
	                        value: { count_risk: this.props.ordersData.count_risk }, one: 'order at risk', other: 'orders at risk' });
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

/***/ 473:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(416);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(420);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(421);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(422);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(441);

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