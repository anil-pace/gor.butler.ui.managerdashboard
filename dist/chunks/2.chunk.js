webpackJsonp([2,5],{

/***/ 417:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(289);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(294);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(295);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(296);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(331);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(34);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _loginAction = __webpack_require__(204);

	var _reactRedux = __webpack_require__(172);

	var _appConstants = __webpack_require__(202);

	var _reactIntl = __webpack_require__(262);

	var _messages = __webpack_require__(418);

	var _messages2 = _interopRequireDefault(_messages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Login = function (_React$Component) {
	    (0, _inherits3.default)(Login, _React$Component);

	    function Login(props) {
	        (0, _classCallCheck3.default)(this, Login);
	        return (0, _possibleConstructorReturn3.default)(this, (Login.__proto__ || (0, _getPrototypeOf2.default)(Login)).call(this, props));
	    }

	    (0, _createClass3.default)(Login, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            /**
	             * Checking if the user is loggedin 
	             * and redirecting to main page
	             */

	            if (nextProps.auth_token && nextProps.userName) {
	                this.context.router.push("/overview");
	            }
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
	                } else {
	                    this.passError.style.display = 'block';
	                }
	                return;
	            }
	            var loginData = {

	                'url': _appConstants.LOGIN_URL,
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

	            return _react2.default.createElement(
	                'div',
	                { className: 'login-form' },
	                _react2.default.createElement(
	                    'form',
	                    { action: '#', id: 'loginForm', ref: function ref(node) {
	                            _this2.loginForm = node;
	                        }, onSubmit: function onSubmit(e) {
	                            return _this2.handleSubmit(e);
	                        } },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'login-lang' },
	                        _react2.default.createElement(
	                            'span',
	                            null,
	                            'Language:'
	                        ),
	                        _react2.default.createElement(
	                            'select',
	                            { ref: 'language' },
	                            _react2.default.createElement(
	                                'option',
	                                { value: 'en-US' },
	                                'English'
	                            ),
	                            _react2.default.createElement(
	                                'option',
	                                { value: 'ch' },
	                                'Chinese'
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'login-mid' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'upper-box' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'login-head' },
	                                'Butler'
	                            ),
	                            _react2.default.createElement(
	                                'p',
	                                null,
	                                'Management Interface'
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'section',
	                            null,
	                            _react2.default.createElement('input', { className: 'login-field', type: 'text', id: 'username', placeholder: 'Username', ref: function ref(node) {
	                                    _this2.userName = node;
	                                } })
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: ' login-usr-error', ref: function ref(node) {
	                                    _this2.userError = node;
	                                } },
	                            'Please enter your username'
	                        ),
	                        _react2.default.createElement(
	                            'section',
	                            null,
	                            _react2.default.createElement('input', { className: 'login-field', type: 'password', id: 'password', placeholder: 'Password', ref: function ref(node) {
	                                    _this2.password = node;
	                                } })
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
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'login-fgt' },
	                            _react2.default.createElement(
	                                'a',
	                                null,
	                                'Forgot password?'
	                            )
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
	        auth_token: state.authLogin.auth_token,
	        userName: state.authLogin.username
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
	        }
	    };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Login);

/***/ },

/***/ 418:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reactIntl = __webpack_require__(262);

	exports.default = (0, _reactIntl.defineMessages)({
	  lsicenseMessage: {
	    id: 'boilerplate.components.Footer.license.message',
	    defaultMessage: 'This project is licensed under the MIT license.'
	  },
	  authorMessage: {
	    id: 'boilerplate.components.Footer.author.message',
	    defaultMessage: 'Author {author}.'
	  }
	}); /*
	     * Footer Messages
	     *
	     * This contains all the text for the Footer component.
	     */

/***/ }

});