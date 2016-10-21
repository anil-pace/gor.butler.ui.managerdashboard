webpackJsonp([1,11],{466:function(module,exports,__webpack_require__){eval("'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () {\n    function defineProperties(target, props) {\n        for (var i = 0; i < props.length; i++) {\n            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n        }\n    }return function (Constructor, protoProps, staticProps) {\n        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n    };\n}();\n\nvar _react = __webpack_require__(95);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(128);\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _Footer = __webpack_require__(467);\n\nvar _Footer2 = _interopRequireDefault(_Footer);\n\nvar _Loader = __webpack_require__(468);\n\nvar _Loader2 = _interopRequireDefault(_Loader);\n\nvar _loginAction = __webpack_require__(395);\n\nvar _validationActions = __webpack_require__(399);\n\nvar _reactRedux = __webpack_require__(266);\n\nvar _appConstants = __webpack_require__(388);\n\nvar _messageConstants = __webpack_require__(400);\n\nvar _configConstants = __webpack_require__(389);\n\nvar _reactIntl = __webpack_require__(292);\n\nvar _reactIntlRedux = __webpack_require__(289);\n\nvar _dropdown = __webpack_require__(441);\n\nvar _dropdown2 = _interopRequireDefault(_dropdown);\n\nvar _i18n = __webpack_require__(469);\n\nfunction _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\n\nfunction _possibleConstructorReturn(self, call) {\n    if (!self) {\n        throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }return call && ((typeof call === \"undefined\" ? \"undefined\" : _typeof(call)) === \"object\" || typeof call === \"function\") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n        throw new TypeError(\"Super expression must either be null or a function, not \" + (typeof superClass === \"undefined\" ? \"undefined\" : _typeof(superClass)));\n    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n}\n\nvar Login = function (_React$Component) {\n    _inherits(Login, _React$Component);\n\n    function Login(props) {\n        _classCallCheck(this, Login);\n\n        return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));\n    }\n\n    _createClass(Login, [{\n        key: 'componentWillMount',\n        value: function componentWillMount() {\n            document.body.className = 'gor-fill-back';\n        }\n    }, {\n        key: 'componentWillReceiveProps',\n        value: function componentWillReceiveProps(nextProps) {\n            /**\n             * Checking if the user is loggedin \n             * and redirecting to main page\n             */\n            if (nextProps.loginAuthorized) {\n                this.props.resetForm();\n                document.body.className = '';\n                this.context.router.push(\"/md\");\n            }\n        }\n    }, {\n        key: '_checkUser',\n        value: function _checkUser() {\n            var userid = this.userName.value,\n                idInfo = void 0;\n            if (userid.length < 1) {\n                idInfo = {\n                    type: _appConstants.ERROR,\n                    msg: _messageConstants.INVALID_ID\n                };\n            } else {\n                idInfo = {\n                    type: _appConstants.SUCCESS,\n                    msg: _messageConstants.TYPE_SUCCESS\n                };\n            }\n            this.props.validateID(idInfo);\n            return idInfo.type;\n        }\n    }, {\n        key: '_checkPass',\n        value: function _checkPass() {\n            var password = this.password.value.trim(),\n                loginPassInfo = void 0;\n            if (password.length < 1) {\n                loginPassInfo = {\n                    type: _appConstants.ERROR,\n                    msg: _messageConstants.EMPTY_PWD\n                };\n            } else {\n                loginPassInfo = {\n                    type: _appConstants.SUCCESS,\n                    msg: _messageConstants.TYPE_SUCCESS\n                };\n            };\n            this.props.validatePass(loginPassInfo);\n            return loginPassInfo.type;\n        }\n        /**\n         * Checks for the changes in the language selection\n         * and dispatches the corresponding action.\n         * @param  {String} sLocale sLocale has to be of pattern 'en-US'\n         */\n\n    }, {\n        key: '_handleSelectionChange',\n        value: function _handleSelectionChange(sLocale) {\n            if (!sLocale) {\n                return;\n            }\n\n            var data = {\n                locale: sLocale,\n                messages: _i18n.translationMessages[sLocale]\n            };\n            this.props.updateIntl(data);\n        }\n        /**\n         * @param  {[event]}\n         * @return {[void]}\n         * Function to handle login form submit\n         */\n\n    }, {\n        key: '_handleSubmit',\n        value: function _handleSubmit(e) {\n            e.preventDefault();\n            var formdata = {\n                'username': this.userName.value,\n                'password': this.password.value\n            };\n            if (!this.props.idInfo.type) {\n                if (!this._checkUser()) return;\n            }\n            if (!this.props.loginPassCheck.type) {\n                if (!this._checkPass()) return;\n            }\n            var loginData = {\n                'url': _configConstants.LOGIN_URL,\n                'formdata': formdata,\n                'method': 'POST',\n                'cause': _appConstants.AUTH_LOGIN,\n                'contentType': 'application/json',\n                'accept': 'application/json'\n            };\n            sessionStorage.setItem('nextView', 'md');\n            if (true) {\n                this.props.setUsername(formdata.username);\n                this.props.setLoginLoader(true);\n                this.props.authLoginData(loginData);\n            } else {\n                this.props.mockLoginAuth(loginData);\n            }\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var _this2 = this;\n\n            var sel = 0;\n            var items = [{ value: 'en', label: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.lang.english', defaultMessage: 'English' }) }, { value: 'ja', label: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.lang.japanese', defaultMessage: 'Japanese' }) }];\n            for (var i = 0; i < items.length; i++) {\n                if (items[i].value === this.props.sLang) sel = i;\n            }\n            return _react2.default.createElement('div', { className: 'gor-login-form' }, _react2.default.createElement(_Loader2.default, { isLoading: this.props.loginLoading }), _react2.default.createElement('form', { action: '#', id: 'loginForm', ref: function ref(node) {\n                    _this2.loginForm = node;\n                },\n                onSubmit: function onSubmit(e) {\n                    return _this2._handleSubmit(e);\n                } }, _react2.default.createElement('div', { className: 'gor-login-lang' }, _react2.default.createElement('div', { className: 'gor-lang-text' }, _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.language',\n                defaultMessage: 'Language' })), _react2.default.createElement(_dropdown2.default, { optionDispatch: function optionDispatch(e) {\n                    return _this2._handleSelectionChange(e);\n                }, items: items, styleClass: 'gor-lang-drop', currentState: items[sel] })), _react2.default.createElement('div', { className: 'gor-login-logo alt-gor-logo' }), _react2.default.createElement('div', { className: 'gor-login-mid' }, _react2.default.createElement('div', { className: 'gor-upper-box' }, _react2.default.createElement('div', { className: 'gor-login-head' }, _react2.default.createElement('span', { className: 'gor-lg-txt' }, _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.title',\n                defaultMessage: 'Butler' })), _react2.default.createElement('sup', null, 'TM')), _react2.default.createElement('p', null, _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.manageInterface',\n\n                defaultMessage: 'Management Interface'\n            }))), this.props.loginAuthorized === false ? _react2.default.createElement('div', { className: 'gor-login-auth-error' }, _react2.default.createElement('div', { className: 'gor-login-error' }), _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.fail',\n                defaultMessage: 'Invalid username and/or password, please try again' })) : '', _react2.default.createElement('section', null, _react2.default.createElement('div', { className: 'gor-login-field' + (this.props.idInfo.type === _appConstants.ERROR || this.props.loginAuthorized === false ? ' gor-input-error' : ' gor-input-ok'), ref: function ref(node) {\n                    _this2.userField = node;\n                } }, _react2.default.createElement('div', { className: this.props.idInfo.type === _appConstants.ERROR || this.props.loginAuthorized === false ? 'gor-login-user-error' : 'gor-login-user' }), _react2.default.createElement('input', { className: 'field', onBlur: this._checkUser.bind(this), type: 'text', id: 'username',\n                placeholder: this.props.intlMessages[\"login.form.username\"],\n                ref: function ref(node) {\n                    _this2.userName = node;\n                } }))), this.props.idInfo ? this.props.idInfo.type === _appConstants.ERROR ? _react2.default.createElement('div', { className: 'gor-login-usr-error' }, _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.error.username',\n                defaultMessage: 'Please enter your username' })) : '' : '', _react2.default.createElement('section', null, _react2.default.createElement('div', { className: 'gor-login-field' + (this.props.loginPassCheck.type === _appConstants.ERROR || this.props.loginAuthorized === false ? ' gor-input-error' : ' gor-input-ok'), ref: function ref(node) {\n                    _this2.passField = node;\n                } }, _react2.default.createElement('div', { className: this.props.loginPassCheck.type === _appConstants.ERROR || this.props.loginAuthorized === false ? 'gor-login-password-error' : 'gor-login-password' }), _react2.default.createElement('input', { className: 'field', onBlur: this._checkPass.bind(this), type: 'password', id: 'password',\n                placeholder: this.props.intlMessages[\"login.form.password\"],\n                ref: function ref(node) {\n                    _this2.password = node;\n                } }))), this.props.loginPassCheck ? this.props.loginPassCheck.type === _appConstants.ERROR ? _react2.default.createElement('div', { className: 'gor-login-usr-error' }, _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.error.password',\n                defaultMessage: 'Please enter your password' })) : '' : '', _react2.default.createElement('section', null, _react2.default.createElement('input', { type: 'submit', className: 'gor-login-btn', value: this.props.intlMessages[\"login.form.button\"] }), _react2.default.createElement('br', null))), _react2.default.createElement('div', { className: 'gor-box-bottom' }, _react2.default.createElement('span', { className: 'gor-box-bottom-left' }), _react2.default.createElement('span', { className: 'gor-box-bottom-right' }))), _react2.default.createElement(_Footer2.default, null));\n        }\n    }]);\n\n    return Login;\n}(_react2.default.Component);\n\n;\n/**\n * [Passing Router to component through context]\n * @type {Object}\n */\nLogin.contextTypes = {\n    router: _react2.default.PropTypes.object.isRequired\n};\n\nfunction mapStateToProps(state, ownProps) {\n    return {\n        loginAuthorized: state.authLogin.loginAuthorized,\n        auth_token: state.authLogin.auth_token,\n        userName: state.authLogin.username,\n        sLang: state.intl.locale,\n        intlMessages: state.intl.messages,\n        idInfo: state.appInfo.idInfo || {},\n        loginPassCheck: state.appInfo.passwordInfo || {},\n        loginLoading: state.loader.loginLoader\n    };\n}\n/**\n * @param  {[Function]}\n * @return {[Object]}\n * mapping dispatch function to props\n * so that they could be called from props\n */\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n\n    return {\n        authLoginData: function authLoginData(params) {\n            dispatch((0, _loginAction.authLoginData)(params));\n        },\n        updateIntl: function updateIntl(params) {\n            dispatch((0, _reactIntlRedux.updateIntl)(params));\n        },\n        mockLoginAuth: function mockLoginAuth(params) {\n            dispatch((0, _loginAction.mockLoginAuth)(params));\n        },\n        validateID: function validateID(data) {\n            dispatch((0, _validationActions.validateID)(data));\n        },\n        setUsername: function setUsername(data) {\n            dispatch((0, _loginAction.setUsername)(data));\n        },\n        validatePass: function validatePass(data) {\n            dispatch((0, _validationActions.validatePassword)(data));\n        },\n        resetForm: function resetForm() {\n            dispatch((0, _validationActions.resetForm)());\n        },\n        setLoginLoader: function setLoginLoader(data) {\n            dispatch((0, _loginAction.setLoginLoader)(data));\n        }\n    };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Login);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/Login/login.js\n ** module id = 466\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./src/components/Login/login.js?")},467:function(module,exports,__webpack_require__){eval('\'use strict\';\n\nvar _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };\n\nObject.defineProperty(exports, "__esModule", {\n\tvalue: true\n});\n\nvar _createClass = function () {\n\tfunction defineProperties(target, props) {\n\t\tfor (var i = 0; i < props.length; i++) {\n\t\t\tvar descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n\t\t}\n\t}return function (Constructor, protoProps, staticProps) {\n\t\tif (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n\t};\n}();\n\nvar _react = __webpack_require__(95);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(128);\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _reactIntl = __webpack_require__(292);\n\nfunction _interopRequireDefault(obj) {\n\treturn obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n\tif (!(instance instanceof Constructor)) {\n\t\tthrow new TypeError("Cannot call a class as a function");\n\t}\n}\n\nfunction _possibleConstructorReturn(self, call) {\n\tif (!self) {\n\t\tthrow new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");\n\t}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n\tif (typeof superClass !== "function" && superClass !== null) {\n\t\tthrow new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));\n\t}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n}\n\nvar Footer = function (_React$Component) {\n\t_inherits(Footer, _React$Component);\n\n\tfunction Footer(props) {\n\t\t_classCallCheck(this, Footer);\n\n\t\treturn _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));\n\t}\n\n\t_createClass(Footer, [{\n\t\tkey: \'render\',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\'div\', { className: \'gor-footer\' }, _react2.default.createElement(_reactIntl.FormattedMessage, { id: \'footer.description\',\n\t\t\t\tdefaultMessage: \'Copyright @ 2016 GreyOrange Pte Ltd\' }));\n\t\t}\n\t}]);\n\n\treturn Footer;\n}(_react2.default.Component);\n\n;\n\nexports.default = Footer;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/Footer/Footer.js\n ** module id = 467\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./src/components/Footer/Footer.js?')},468:function(module,exports,__webpack_require__){eval('\'use strict\';\n\nvar _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n  };\n}();\n\nvar _react = __webpack_require__(95);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(128);\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError("Cannot call a class as a function");\n  }\n}\n\nfunction _possibleConstructorReturn(self, call) {\n  if (!self) {\n    throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");\n  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== "function" && superClass !== null) {\n    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));\n  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n}\n\nvar Loader = function (_React$Component) {\n  _inherits(Loader, _React$Component);\n\n  /**\n   * Called once before rendering of component,used to displatch fetch action\n   * @return {[type]}\n   */\n  function Loader(props) {\n    _classCallCheck(this, Loader);\n\n    return _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this, props));\n  }\n\n  /**Render method called when component react renders\n   * @return {[type]}\n   */\n\n  _createClass(Loader, [{\n    key: \'render\',\n    value: function render() {\n      return _react2.default.createElement(\'div\', { className: \'loader\', style: this.props.isLoading ? { display: \'block\' } : { display: \'none\' } });\n    }\n  }]);\n\n  return Loader;\n}(_react2.default.Component);\n\n;\n/**\n * [Passing Router to component through context]\n * @type {Object}\n */\n\nexports.default = Loader;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/loader/Loader.js\n ** module id = 468\n ** module chunks = 1 9\n **/\n//# sourceURL=webpack:///./src/components/loader/Loader.js?')}});