webpackJsonp([1,12],{

/***/ 389:
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

	var _Footer = __webpack_require__(390);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _loginAction = __webpack_require__(325);

	var _reactRedux = __webpack_require__(191);

	var _appConstants = __webpack_require__(319);

	var _configConstants = __webpack_require__(320);

	var _reactIntl = __webpack_require__(218);

	var _reactIntlRedux = __webpack_require__(215);

	var _dropdown = __webpack_require__(365);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _i18n = __webpack_require__(241);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Login = function (_React$Component) {
	    _inherits(Login, _React$Component);

	    function Login(props) {
	        _classCallCheck(this, Login);

	        return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));
	    }

	    _createClass(Login, [{
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
	            if (false) {
	                this.props.authLoginData(loginData);
	            } else {
	                this.props.mockLoginAuth(loginData);
	            }
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
	            var usr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.form.username', defaultMessage: 'Username' });
	            var pwd = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.form.password', defaultMessage: 'Password' });

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
	                                _react2.default.createElement(
	                                    'span',
	                                    { className: 'gor-lg-txt' },
	                                    _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.title',
	                                        defaultMessage: 'Butler' })
	                                ),
	                                _react2.default.createElement(
	                                    'sup',
	                                    null,
	                                    'TM'
	                                )
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
	                                _react2.default.createElement('input', { className: 'field', type: 'text', id: 'username',
	                                    placeholder: usr.props.defaultMessage, ref: function ref(node) {
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
	                                _react2.default.createElement('input', { className: 'field', type: 'password', id: 'password', placeholder: pwd.props.defaultMessage, ref: function ref(node) {
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
	                        { className: 'gor-box-bottom' },
	                        _react2.default.createElement(
	                            'span',
	                            { className: 'gor-box-bottom-left' },
	                            'Current time: 09:00:15(IST)'
	                        ),
	                        _react2.default.createElement('span', { className: 'gor-box-bottom-right' })
	                    )
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
	        },
	        mockLoginAuth: function mockLoginAuth(params) {
	            dispatch((0, _loginAction.mockLoginAuth)(params));
	        }
	    };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Login);

/***/ },

/***/ 390:
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

	var _reactIntl = __webpack_require__(218);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Footer = function (_React$Component) {
		_inherits(Footer, _React$Component);

		function Footer(props) {
			_classCallCheck(this, Footer);

			return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));
		}

		_createClass(Footer, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'gor-footer' },
					_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'footer.description',
						defaultMessage: 'Copyright @ 2016 GreyOrange Pte Ltd' })
				);
			}
		}]);

		return Footer;
	}(_react2.default.Component);

	;

	exports.default = Footer;

/***/ }

});