webpackJsonp([1,5],{

/***/ 467:
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

	var _loginAction = __webpack_require__(377);

	var _reactRedux = __webpack_require__(191);

	var _appConstants = __webpack_require__(372);

	var _configConstants = __webpack_require__(468);

	var _reactIntl = __webpack_require__(218);

	var _reactIntlRedux = __webpack_require__(215);

	var _dropdown = __webpack_require__(456);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _i18n = __webpack_require__(241);

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
	            document.body.className = 'fill-back';
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
	                this.context.router.push("/overview");
	            }
	        }

	        /**
	         * Checks for the changes in the language selection
	         * and dispatches the corresponding action.
	         * @param  {String} sLocale sLocale has to be of pattern 'en-US'
	         */

	    }, {
	        key: 'handleSelectionChange',
	        value: function handleSelectionChange(sLocale) {
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
	        key: 'handleSubmit',
	        value: function handleSubmit(e) {
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
	                } else {
	                    this.passError.style.display = 'block';
	                    this.authError.style.display = 'none';
	                    this.userError.style.display = 'none';
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
	            var item = [{ value: 'en', label: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.lang.english', defaultMessage: 'English' }) }, { value: 'ja', label: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.lang.japanese', defaultMessage: 'Japanese' }) }];
	            for (var i = 0; i < item.length; i++) {
	                if (item[i].value === this.props.sLang) sel = i;
	            }
	            console.log(item[sel]);
	            return _react2.default.createElement(
	                'div',
	                { className: 'login-form' },
	                _react2.default.createElement(
	                    'form',
	                    { action: '#', id: 'loginForm', ref: function ref(node) {
	                            _this2.loginForm = node;
	                        },
	                        onSubmit: function onSubmit(e) {
	                            return _this2.handleSubmit(e);
	                        } },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'login-lang' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'lang-text' },
	                            'Language:'
	                        ),
	                        _react2.default.createElement(_dropdown2.default, { optionDispatch: function optionDispatch(e) {
	                                return _this2.handleSelectionChange(e);
	                            }, items: item, styleClass: 'lang-drop', currentState: item[sel] })
	                    ),
	                    _react2.default.createElement('div', { className: 'login-logo alt-gor-logo' }),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'login-mid' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'upper-box' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'login-head' },
	                                _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler',
	                                    defaultMessage: 'BUTLER' })
	                            ),
	                            _react2.default.createElement(
	                                'p',
	                                null,
	                                _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.title.manageInterface',
	                                    defaultMessage: 'Management Interface'
	                                })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: ' login-auth-error',
	                                ref: function ref(node) {
	                                    _this2.authError = node;
	                                } },
	                            _react2.default.createElement('div', { className: 'login-error' }),
	                            'Invalid username and/or password, please try again'
	                        ),
	                        _react2.default.createElement(
	                            'section',
	                            null,
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'login-field' },
	                                _react2.default.createElement('div', { className: 'login-user' }),
	                                _react2.default.createElement('input', { className: 'field', type: 'text', id: 'username', placeholder: 'Username', ref: function ref(node) {
	                                        _this2.userName = node;
	                                    } })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: ' login-usr-error',
	                                ref: function ref(node) {
	                                    _this2.userError = node;
	                                } },
	                            'Please enter your username'
	                        ),
	                        _react2.default.createElement(
	                            'section',
	                            null,
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'login-field' },
	                                _react2.default.createElement('div', { className: 'login-password' }),
	                                _react2.default.createElement('input', { className: 'field', type: 'password', id: 'password', placeholder: 'Password', ref: function ref(node) {
	                                        _this2.password = node;
	                                    } })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'login-usr-error', ref: function ref(node) {
	                                    _this2.passError = node;
	                                } },
	                            'Please enter your password'
	                        ),
	                        _react2.default.createElement(
	                            'section',
	                            null,
	                            _react2.default.createElement('input', { type: 'submit', className: 'login-btn', value: 'Login' }),
	                            _react2.default.createElement('br', null)
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'box-bottom-left' },
	                        _react2.default.createElement(
	                            'span',
	                            null,
	                            'Current time: 09:00:15(IST)'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'box-bottom-right' },
	                        _react2.default.createElement(
	                            'span',
	                            null,
	                            'v 1.0'
	                        )
	                    )
	                )
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

/***/ 468:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var WS_URL = exports.WS_URL = "wss://192.168.8.118/manager_api/wss";
	var LOGIN_URL = exports.LOGIN_URL = "https://192.168.8.118/api/auth/token";

/***/ }

});