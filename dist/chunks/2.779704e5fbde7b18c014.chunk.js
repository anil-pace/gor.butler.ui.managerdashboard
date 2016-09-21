webpackJsonp([2,6],{

/***/ 457:
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

	var _reactDropdown = __webpack_require__(458);

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

/***/ 458:
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

	var _classnames = __webpack_require__(459);

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

/***/ 459:
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

/***/ 468:
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

	var _Footer = __webpack_require__(469);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _loginAction = __webpack_require__(377);

	var _reactRedux = __webpack_require__(191);

	var _appConstants = __webpack_require__(371);

	var _configConstants = __webpack_require__(372);

	var _reactIntl = __webpack_require__(217);

	var _reactIntlRedux = __webpack_require__(214);

	var _dropdown = __webpack_require__(457);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _i18n = __webpack_require__(240);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Login = function (_React$Component) {
	    (0, _inherits3.default)(Login, _React$Component);

	    function Login(props) {
	        (0, _classCallCheck3.default)(this, Login);
	        return (0, _possibleConstructorReturn3.default)(this, (Login.__proto__ || (0, _getPrototypeOf2.default)(Login)).call(this, props));
	    }

	    (0, _createClass3.default)(Login, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            document.body.className = 'gor-fill-back';
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            /**
	             * Checking if the user is loggedin 
	             * and redirecting to main page
	             */
	            if (!nextProps.loginAuthorized) {
	                this.authError.style.display = 'block';
	                this.userError.style.display = 'none';
	                this.passError.style.display = 'none';
	            } else {
	                document.body.className = '';
	                this.context.router.push("/md");
	            }
	        }

	        /**
	         * Checks for the changes in the language selection
	         * and dispatches the corresponding action.
	         * @param  {String} sLocale sLocale has to be of pattern 'en-US'
	         */

	    }, {
	        key: '_handleSelectionChange',
	        value: function _handleSelectionChange(sLocale) {
	            if (!sLocale) {
	                return;
	            }

	            var data = {
	                locale: sLocale,
	                messages: _i18n.translationMessages[sLocale]
	            };
	            this.props.updateIntl(data);
	        }
	        /**
	         * @param  {[event]}
	         * @return {[void]}
	         * Function to handle login form submit
	         */

	    }, {
	        key: '_handleSubmit',
	        value: function _handleSubmit(e) {
	            e.preventDefault();
	            var formdata = {
	                'username': this.userName.value,
	                'password': this.password.value
	            };
	            if (!formdata.username || !formdata.password) {
	                if (!formdata.username) {
	                    this.userError.style.display = 'block';
	                    this.authError.style.display = 'none';
	                    this.passError.style.display = 'none';
	                    this.userField.style.borderColor = '#EC1C24';
	                    this.passField.style.borderColor = '';
	                } else {
	                    this.passError.style.display = 'block';
	                    this.authError.style.display = 'none';
	                    this.userError.style.display = 'none';
	                    this.userField.style.borderColor = '';
	                    this.passField.style.borderColor = '#EC1C24';
	                }
	                return;
	            }
	            var loginData = {

	                'url': _configConstants.LOGIN_URL,
	                'formdata': formdata,
	                'method': 'POST',
	                'cause': _appConstants.AUTH_LOGIN,
	                'contentType': 'application/json'
	            };
	            this.props.authLoginData(loginData);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var sel = 0;
	            var items = [{ value: 'en', label: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.lang.english', defaultMessage: 'English' }) }, { value: 'ja', label: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.lang.japanese', defaultMessage: 'Japanese' }) }];
	            for (var i = 0; i < items.length; i++) {
	                if (items[i].value === this.props.sLang) sel = i;
	            }
	            var usernamePlace = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.placeholder.username', defaultMessage: 'Username' });
	            var passwordPlace = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.placeholder.password', defaultMessage: 'Password' });

	            return _react2.default.createElement(
	                'div',
	                { className: 'gor-login-form' },
	                _react2.default.createElement(
	                    'form',
	                    { action: '#', id: 'loginForm', ref: function ref(node) {
	                            _this2.loginForm = node;
	                        },
	                        onSubmit: function onSubmit(e) {
	                            return _this2._handleSubmit(e);
	                        } },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'gor-login-lang' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'gor-lang-text' },
	                            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.language',
	                                defaultMessage: 'Language' })
	                        ),
	                        _react2.default.createElement(_dropdown2.default, { optionDispatch: function optionDispatch(e) {
	                                return _this2._handleSelectionChange(e);
	                            }, items: items, styleClass: 'gor-lang-drop', currentState: items[sel] })
	                    ),
	                    _react2.default.createElement('div', { className: 'gor-login-logo alt-gor-logo' }),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'gor-login-mid' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'gor-upper-box' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'gor-login-head' },
	                                _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.title',
	                                    defaultMessage: 'Butler' })
	                            ),
	                            _react2.default.createElement(
	                                'p',
	                                null,
	                                _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.manageInterface',

	                                    defaultMessage: 'Management Interface'
	                                })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'gor-login-auth-error',
	                                ref: function ref(node) {
	                                    _this2.authError = node;
	                                } },
	                            _react2.default.createElement('div', { className: 'gor-login-error' }),
	                            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.fail',
	                                defaultMessage: 'Invalid username and/or password' })
	                        ),
	                        _react2.default.createElement(
	                            'section',
	                            null,
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'gor-login-field', ref: function ref(node) {
	                                        _this2.userField = node;
	                                    } },
	                                _react2.default.createElement('div', { className: 'gor-login-user' }),
	                                _react2.default.createElement('input', { className: 'field', type: 'text', id: 'username', placeholder: usernamePlace, ref: function ref(node) {
	                                        _this2.userName = node;
	                                    } })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'gor-login-usr-error',
	                                ref: function ref(node) {
	                                    _this2.userError = node;
	                                } },
	                            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.error.username',
	                                defaultMessage: 'Please enter your username' })
	                        ),
	                        _react2.default.createElement(
	                            'section',
	                            null,
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'gor-login-field', ref: function ref(node) {
	                                        _this2.passField = node;
	                                    } },
	                                _react2.default.createElement('div', { className: 'gor-login-password' }),
	                                _react2.default.createElement('input', { className: 'field', type: 'password', id: 'password', placeholder: passwordPlace, ref: function ref(node) {
	                                        _this2.password = node;
	                                    } })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'gor-login-usr-error', ref: function ref(node) {
	                                    _this2.passError = node;
	                                } },
	                            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.error.password',
	                                defaultMessage: 'Please enter your password' })
	                        ),
	                        _react2.default.createElement(
	                            'section',
	                            null,
	                            _react2.default.createElement('input', { type: 'submit', className: 'gor-login-btn', value: 'Login' }),
	                            _react2.default.createElement('br', null)
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'gor-box-bottom-left' },
	                        _react2.default.createElement(
	                            'span',
	                            null,
	                            'Current time: 09:00:15(IST)'
	                        )
	                    ),
	                    _react2.default.createElement('div', { className: 'gor-box-bottom-right' })
	                ),
	                _react2.default.createElement(_Footer2.default, null)
	            );
	        }
	    }]);
	    return Login;
	}(_react2.default.Component);

	;
	/**
	 * [Passing Router to component through context]
	 * @type {Object}
	 */
	Login.contextTypes = {
	    router: _react2.default.PropTypes.object.isRequired
	};

	function mapStateToProps(state, ownProps) {
	    return {
	        loginAuthorized: state.authLogin.loginAuthorized,
	        auth_token: state.authLogin.auth_token,
	        userName: state.authLogin.username,
	        sLang: state.intl.locale
	    };
	}
	/**
	 * @param  {[Function]}
	 * @return {[Object]}
	 * mapping dispatch function to props
	 * so that they could be called from props
	 */
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        authLoginData: function authLoginData(params) {
	            dispatch((0, _loginAction.authLoginData)(params));
	        },
	        updateIntl: function updateIntl(params) {
	            dispatch((0, _reactIntlRedux.updateIntl)(params));
	        }
	    };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Login);

/***/ },

/***/ 469:
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

	var Footer = function (_React$Component) {
		(0, _inherits3.default)(Footer, _React$Component);

		function Footer(props) {
			(0, _classCallCheck3.default)(this, Footer);
			return (0, _possibleConstructorReturn3.default)(this, (Footer.__proto__ || (0, _getPrototypeOf2.default)(Footer)).call(this, props));
		}

		(0, _createClass3.default)(Footer, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'gor-footer' },
					'Copyright @ 2016 GreyOrange Pte Ltd'
				);
			}
		}]);
		return Footer;
	}(_react2.default.Component);

	;

	exports.default = Footer;

/***/ }

});