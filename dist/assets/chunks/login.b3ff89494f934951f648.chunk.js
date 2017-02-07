webpackJsonp([1,13],{496:function(module,exports,__webpack_require__){eval("'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol ? \"symbol\" : typeof obj; };\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () {\n    function defineProperties(target, props) {\n        for (var i = 0; i < props.length; i++) {\n            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n        }\n    }return function (Constructor, protoProps, staticProps) {\n        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n    };\n}();\n\nvar _react = __webpack_require__(96);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(129);\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _loginForm = __webpack_require__(497);\n\nvar _loginForm2 = _interopRequireDefault(_loginForm);\n\nvar _Footer = __webpack_require__(499);\n\nvar _Footer2 = _interopRequireDefault(_Footer);\n\nvar _Spinner = __webpack_require__(500);\n\nvar _Spinner2 = _interopRequireDefault(_Spinner);\n\nvar _loginAction = __webpack_require__(401);\n\nvar _validationActions = __webpack_require__(402);\n\nvar _reactRedux = __webpack_require__(267);\n\nvar _frontEndConstants = __webpack_require__(390);\n\nvar _messageConstants = __webpack_require__(403);\n\nvar _reactIntl = __webpack_require__(294);\n\nvar _reactIntlRedux = __webpack_require__(291);\n\nvar _dropdown = __webpack_require__(456);\n\nvar _dropdown2 = _interopRequireDefault(_dropdown);\n\nvar _topnotify = __webpack_require__(495);\n\nvar _topnotify2 = _interopRequireDefault(_topnotify);\n\nvar _i18n = __webpack_require__(475);\n\nfunction _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\n\nfunction _possibleConstructorReturn(self, call) {\n    if (!self) {\n        throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }return call && ((typeof call === \"undefined\" ? \"undefined\" : _typeof(call)) === \"object\" || typeof call === \"function\") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n        throw new TypeError(\"Super expression must either be null or a function, not \" + (typeof superClass === \"undefined\" ? \"undefined\" : _typeof(superClass)));\n    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n}\n\nvar Login = function (_React$Component) {\n    _inherits(Login, _React$Component);\n\n    function Login(props) {\n        _classCallCheck(this, Login);\n\n        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));\n\n        _this.state = { sel: 0, items: [{ value: _frontEndConstants.EN, label: _messageConstants.ENG }, { value: _frontEndConstants.JA, label: _messageConstants.JAP }, { value: _frontEndConstants.ES, label: _messageConstants.SPANISH }, { value: _frontEndConstants.ZH, label: _messageConstants.CHINESE }, { value: _frontEndConstants.DE, label: _messageConstants.GERMAN }, { value: _frontEndConstants.FR, label: _messageConstants.FRENCH }] };\n        return _this;\n    }\n\n    _createClass(Login, [{\n        key: 'componentWillMount',\n        value: function componentWillMount() {\n            document.body.className = _frontEndConstants.FILL_BACK;\n            this._changeDropdown();\n        }\n    }, {\n        key: '_changeDropdown',\n        value: function _changeDropdown() {\n            for (var i = 0; i < this.state.items.length; i++) {\n                if (this.state.items[i].value === this.props.sLang) this.setState({ sel: i });\n            }\n        }\n    }, {\n        key: 'componentWillReceiveProps',\n        value: function componentWillReceiveProps(nextProps) {\n            /**\n             * Checking if the user is loggedin \n             * and redirecting to main page\n             */\n            if (nextProps.loginAuthorized) {\n                this.props.resetForm();\n                document.body.className = '';\n                this.context.router.push(\"/md\");\n            }\n        }\n\n        /**\n         * Checks for the changes in the language selection\n         * and dispatches the corresponding action.\n         * @param  {String} sLocale sLocale has to be of pattern 'en-US'\n         */\n\n    }, {\n        key: '_handleSelectionChange',\n        value: function _handleSelectionChange(sLocale) {\n            if (!sLocale) {\n                return;\n            }\n            var data = {\n                locale: sLocale,\n                messages: _i18n.translationMessages[sLocale]\n            };\n            this.props.updateIntl(data);\n            sessionStorage.setItem('localLanguage', sLocale);\n            this._changeDropdown();\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var _this2 = this;\n\n            return _react2.default.createElement('div', null, _react2.default.createElement(_topnotify2.default, null), _react2.default.createElement('div', { className: 'gor-login-form' }, _react2.default.createElement(_Spinner2.default, { isLoading: this.props.loginSpinner, setSpinner: this.props.setLoginSpinner }), _react2.default.createElement('div', { className: 'gor-login-lang' }, _react2.default.createElement('div', { className: 'gor-lang-text' }, _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.language',\n                defaultMessage: 'Language' })), _react2.default.createElement(_dropdown2.default, { optionDispatch: function optionDispatch(e) {\n                    return _this2._handleSelectionChange(e);\n                }, items: this.state.items,\n                styleClass: 'gor-lang-drop',\n                currentState: this.state.items[this.state.sel] })), _react2.default.createElement('div', { className: 'gor-login-logo alt-gor-logo' }), _react2.default.createElement(_loginForm2.default, null), _react2.default.createElement('div', { className: 'gor-box-bottom' }, _react2.default.createElement('span', { className: 'gor-box-bottom-left' }), _react2.default.createElement('span', { className: 'gor-box-bottom-right' })), _react2.default.createElement(_Footer2.default, null)));\n        }\n    }]);\n\n    return Login;\n}(_react2.default.Component);\n\n;\n/**\n * [Passing Router to component through context]\n * @type {Object}\n */\nLogin.contextTypes = {\n    router: _react2.default.PropTypes.object.isRequired\n};\n\nfunction mapStateToProps(state, ownProps) {\n    return {\n        loginAuthorized: state.authLogin.loginAuthorized,\n        sLang: state.intl.locale || null,\n        loginSpinner: state.spinner.loginSpinner\n    };\n}\n/**\n * @param  {[Function]}\n * @return {[Object]}\n * mapping dispatch function to props\n * so that they could be called from props\n */\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n\n    return {\n        updateIntl: function updateIntl(params) {\n            dispatch((0, _reactIntlRedux.updateIntl)(params));\n        },\n        resetForm: function resetForm() {\n            dispatch((0, _validationActions.resetForm)());\n        },\n        setLoginSpinner: function setLoginSpinner(params) {\n            dispatch((0, _loginAction.setLoginSpinner)(params));\n        }\n    };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Login);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/Login/login.js\n ** module id = 496\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./src/components/Login/login.js?")},497:function(module,exports,__webpack_require__){eval("'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol ? \"symbol\" : typeof obj; };\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () {\n    function defineProperties(target, props) {\n        for (var i = 0; i < props.length; i++) {\n            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n        }\n    }return function (Constructor, protoProps, staticProps) {\n        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n    };\n}();\n\nvar _react = __webpack_require__(96);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(129);\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _loginAction = __webpack_require__(401);\n\nvar _validationActions = __webpack_require__(402);\n\nvar _reactRedux = __webpack_require__(267);\n\nvar _frontEndConstants = __webpack_require__(390);\n\nvar _messageConstants = __webpack_require__(403);\n\nvar _configConstants = __webpack_require__(391);\n\nvar _reactIntl = __webpack_require__(294);\n\nvar _fieldCheck = __webpack_require__(498);\n\nfunction _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\n\nfunction _possibleConstructorReturn(self, call) {\n    if (!self) {\n        throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }return call && ((typeof call === \"undefined\" ? \"undefined\" : _typeof(call)) === \"object\" || typeof call === \"function\") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n        throw new TypeError(\"Super expression must either be null or a function, not \" + (typeof superClass === \"undefined\" ? \"undefined\" : _typeof(superClass)));\n    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n}\n\nvar LoginForm = function (_React$Component) {\n    _inherits(LoginForm, _React$Component);\n\n    function LoginForm(props) {\n        _classCallCheck(this, LoginForm);\n\n        return _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));\n    }\n\n    _createClass(LoginForm, [{\n        key: '_checkUser',\n        value: function _checkUser() {\n            var userid = this.userName.value,\n                userNameCheck = void 0;\n            userNameCheck = (0, _fieldCheck.emptyField)(userid);\n            this.props.validateID(userNameCheck);\n            return userNameCheck.type;\n        }\n    }, {\n        key: '_typing',\n        value: function _typing(Field) {\n            if (Field === 1) this.userField.className = _frontEndConstants.TYPING;else this.passField.className = _frontEndConstants.TYPING;\n        }\n    }, {\n        key: '_checkPass',\n        value: function _checkPass() {\n            var password = this.password.value.trim(),\n                loginPassInfo = void 0;\n            loginPassInfo = (0, _fieldCheck.emptyField)(password);\n            this.props.validatePass(loginPassInfo);\n            return loginPassInfo.type;\n        }\n    }, {\n        key: '_handleSubmit',\n        value: function _handleSubmit(e) {\n            e.preventDefault();\n            if (!window.navigator.onLine) {\n                this.props.loginError(_messageConstants.NO_NET);\n                return;\n            }\n            if (!this.props.userNameCheck.type || !this.props.passWordCheck.type) {\n                if (!this._checkUser()) return;\n                if (!this._checkPass()) return;\n            }\n            var formdata = {\n                'username': this.userName.value,\n                'password': this.password.value\n            };\n\n            var loginData = {\n                'url': _configConstants.LOGIN_URL,\n                'formdata': formdata,\n                'method': _frontEndConstants.POST,\n                'cause': _frontEndConstants.AUTH_LOGIN,\n                'contentType': _frontEndConstants.APP_JSON,\n                'accept': _frontEndConstants.APP_JSON\n            };\n            sessionStorage.setItem('nextView', 'md');\n            this.props.setLoginSpinner(true);\n            this.props.setUsername(formdata.username);\n            this.props.authLoginData(loginData);\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var _this2 = this;\n\n            return _react2.default.createElement('form', { action: '#', id: 'loginForm', ref: function ref(node) {\n                    _this2.loginForm = node;\n                },\n                onSubmit: function onSubmit(e) {\n                    return _this2._handleSubmit(e);\n                } }, _react2.default.createElement('div', { className: 'gor-login-mid' }, _react2.default.createElement('div', { className: 'gor-upper-box' }, _react2.default.createElement('div', { className: 'gor-login-head' }, _react2.default.createElement('span', { className: 'gor-lg-txt' }, _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.title',\n                defaultMessage: 'Butler' })), _react2.default.createElement('sup', null, _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.trademark',\n                defaultMessage: 'TM'\n            }))), _react2.default.createElement('p', null, _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.manageInterface',\n                defaultMessage: 'Management Interface'\n            }))), this.props.loginInfo.type === _frontEndConstants.ERROR && _react2.default.createElement('div', { className: 'gor-login-auth-error' }, _react2.default.createElement('div', { className: 'gor-login-error' }), this.props.loginInfo.msg), _react2.default.createElement('section', null, _react2.default.createElement('div', { className: 'gor-login-field' + (this.props.userNameCheck.type === _frontEndConstants.ERROR || this.props.loginInfo.type === _frontEndConstants.ERROR ? ' gor-input-error' : ' gor-input-ok'), ref: function ref(node) {\n                    _this2.userField = node;\n                } }, _react2.default.createElement('div', { className: this.props.userNameCheck.type === _frontEndConstants.ERROR || this.props.loginInfo.type === _frontEndConstants.ERROR ? 'gor-login-user-error' : 'gor-login-user' }), _react2.default.createElement('input', { className: 'field', onInput: this._typing.bind(this, 1), onBlur: this._checkUser.bind(this), type: 'text', id: 'username',\n                placeholder: this.props.intlMessages[\"login.form.username\"],\n                ref: function ref(node) {\n                    _this2.userName = node;\n                } }))), this.props.userNameCheck ? this.props.userNameCheck.type === _frontEndConstants.ERROR ? _react2.default.createElement('div', { className: 'gor-login-usr-error' }, _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.error.username',\n                defaultMessage: 'Please enter your username' })) : '' : '', _react2.default.createElement('section', null, _react2.default.createElement('div', { className: 'gor-login-field' + (this.props.passWordCheck.type === _frontEndConstants.ERROR || this.props.loginInfo.type === _frontEndConstants.ERROR ? ' gor-input-error' : ' gor-input-ok'), ref: function ref(node) {\n                    _this2.passField = node;\n                } }, _react2.default.createElement('div', { className: this.props.passWordCheck.type === _frontEndConstants.ERROR || this.props.loginInfo.type === _frontEndConstants.ERROR ? 'gor-login-password-error' : 'gor-login-password' }), _react2.default.createElement('input', { className: 'field', onInput: this._typing.bind(this, 2), onBlur: this._checkPass.bind(this), type: 'password', id: 'password',\n                placeholder: this.props.intlMessages[\"login.form.password\"],\n                ref: function ref(node) {\n                    _this2.password = node;\n                } }))), this.props.passWordCheck ? this.props.passWordCheck.type === _frontEndConstants.ERROR ? _react2.default.createElement('div', { className: 'gor-login-usr-error' }, _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.butler.error.password',\n                defaultMessage: 'Please enter your password' })) : '' : '', _react2.default.createElement('section', null, _react2.default.createElement('input', { type: 'submit', className: 'gor-login-btn', value: this.props.intlMessages[\"login.form.button\"] }), _react2.default.createElement('br', null))));\n        }\n    }]);\n\n    return LoginForm;\n}(_react2.default.Component);\n\n;\n\nfunction mapStateToProps(state, ownProps) {\n    return {\n        intlMessages: state.intl.messages || {},\n        userNameCheck: state.appInfo.idInfo || {},\n        loginInfo: state.appInfo.loginInfo || {},\n        passWordCheck: state.appInfo.passwordInfo || {},\n        loginSpinner: state.spinner.loginSpinner\n    };\n}\nfunction mapDispatchToProps(dispatch) {\n    return {\n        authLoginData: function authLoginData(params) {\n            dispatch((0, _loginAction.authLoginData)(params));\n        },\n        validateID: function validateID(data) {\n            dispatch((0, _validationActions.validateID)(data));\n        },\n        validatePass: function validatePass(data) {\n            dispatch((0, _validationActions.validatePassword)(data));\n        },\n        setLoginSpinner: function setLoginSpinner(data) {\n            dispatch((0, _loginAction.setLoginSpinner)(data));\n        },\n        setUsername: function setUsername(data) {\n            dispatch((0, _loginAction.setUsername)(data));\n        },\n        loginError: function loginError(data) {\n            dispatch((0, _validationActions.loginError)(data));\n        }\n    };\n}\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LoginForm);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/Login/loginForm.js\n ** module id = 497\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./src/components/Login/loginForm.js?")},498:function(module,exports,__webpack_require__){eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.nameStatus = nameStatus;\nexports.passwordStatus = passwordStatus;\nexports.locationStatus = locationStatus;\nexports.skuStatus = skuStatus;\nexports.idStatus = idStatus;\nexports.emptyField = emptyField;\n\nvar _frontEndConstants = __webpack_require__(390);\n\nvar _messageConstants = __webpack_require__(403);\n\nfunction nameStatus(firstname, lastname) {\n  var nameInfo = void 0,\n      format = /[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]/;\n  if (!firstname.length || !lastname.length || firstname.length > 50 || lastname.length > 50) {\n    nameInfo = {\n      type: _frontEndConstants.ERROR,\n      msg: _messageConstants.EMPTY_NAME\n    };\n  } else if (format.test(firstname) || format.test(lastname)) {\n    nameInfo = {\n      type: _frontEndConstants.ERROR,\n      msg: _messageConstants.INVALID_NAME\n    };\n  } else {\n    nameInfo = {\n      type: _frontEndConstants.SUCCESS,\n      msg: _messageConstants.TYPE_SUCCESS\n    };\n  };\n  return nameInfo;\n}\nfunction passwordStatus(pswd, confirmPswd, selectedRole, managerRole) {\n  var passwordInfo = void 0;\n  if (!pswd.length) {\n    passwordInfo = {\n      type: _frontEndConstants.ERROR,\n      msg: _messageConstants.EMPTY_PWD\n    };\n  } else if (pswd != confirmPswd) {\n    passwordInfo = {\n      type: _frontEndConstants.ERROR,\n      msg: _messageConstants.MATCH_PWD\n    };\n  } else if (pswd.length < 8) {\n    if (selectedRole === managerRole) {\n      passwordInfo = {\n        type: _frontEndConstants.ERROR,\n        msg: _messageConstants.INVALID_PWD_MG\n      };\n    } else if (pswd.length < 6) {\n      passwordInfo = {\n        type: _frontEndConstants.ERROR,\n        msg: _messageConstants.INVALID_PWD_OP\n      };\n    } else {\n      passwordInfo = {\n        type: _frontEndConstants.SUCCESS,\n        msg: _messageConstants.TYPE_SUCCESS\n      };\n    }\n  } else {\n    passwordInfo = {\n      type: _frontEndConstants.SUCCESS,\n      msg: _messageConstants.TYPE_SUCCESS\n    };\n  }\n\n  return passwordInfo;\n}\nfunction locationStatus(locId) {\n  var locInfo = void 0;\n  if (locId.length < 1) {\n    locInfo = {\n      type: _frontEndConstants.ERROR,\n      msg: _messageConstants.INVALID_LOCID\n    };\n  } else {\n    locInfo = {\n      type: _frontEndConstants.SUCCESS,\n      msg: _messageConstants.TYPE_SUCCESS\n    };\n  }\n  return locInfo;\n}\nfunction skuStatus(skuId) {\n  var skuInfo = void 0;\n  if (skuId.length < 1) {\n    skuInfo = {\n      type: _frontEndConstants.ERROR,\n      msg: _messageConstants.INVALID_SKUID\n    };\n  } else {\n    skuInfo = {\n      type: _frontEndConstants.SUCCESS,\n      msg: _messageConstants.TYPE_SUCCESS\n    };\n  }\n  return skuInfo;\n}\nfunction idStatus(userid) {\n  var idInfo = void 0,\n      format = /[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,<>\\/?]/;\n  if (userid.length < 1 || userid.length > 30) {\n    idInfo = {\n      type: _frontEndConstants.ERROR,\n      msg: _messageConstants.INVALID_ID\n    };\n  } else if (format.test(userid)) {\n    idInfo = {\n      type: _frontEndConstants.ERROR,\n      msg: _messageConstants.INVALID_FORMAT\n    };\n  } else {\n    idInfo = {\n      type: _frontEndConstants.SUCCESS,\n      msg: _messageConstants.TYPE_SUCCESS\n    };\n  }\n  return idInfo;\n}\nfunction emptyField(field) {\n  var fieldInfo = void 0;\n  if (field.length < 1) {\n    fieldInfo = {\n      type: _frontEndConstants.ERROR,\n      msg: _messageConstants.EMPTY_PWD\n    };\n  } else {\n    fieldInfo = {\n      type: _frontEndConstants.SUCCESS,\n      msg: _messageConstants.TYPE_SUCCESS\n    };\n  }\n  return fieldInfo;\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/utilities/fieldCheck.js\n ** module id = 498\n ** module chunks = 1 9 11\n **/\n//# sourceURL=webpack:///./src/utilities/fieldCheck.js?")},499:function(module,exports,__webpack_require__){eval('\'use strict\';\n\nvar _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };\n\nObject.defineProperty(exports, "__esModule", {\n\tvalue: true\n});\n\nvar _createClass = function () {\n\tfunction defineProperties(target, props) {\n\t\tfor (var i = 0; i < props.length; i++) {\n\t\t\tvar descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n\t\t}\n\t}return function (Constructor, protoProps, staticProps) {\n\t\tif (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n\t};\n}();\n\nvar _react = __webpack_require__(96);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(129);\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _reactIntl = __webpack_require__(294);\n\nfunction _interopRequireDefault(obj) {\n\treturn obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n\tif (!(instance instanceof Constructor)) {\n\t\tthrow new TypeError("Cannot call a class as a function");\n\t}\n}\n\nfunction _possibleConstructorReturn(self, call) {\n\tif (!self) {\n\t\tthrow new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");\n\t}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n\tif (typeof superClass !== "function" && superClass !== null) {\n\t\tthrow new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));\n\t}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n}\n\nvar Footer = function (_React$Component) {\n\t_inherits(Footer, _React$Component);\n\n\tfunction Footer(props) {\n\t\t_classCallCheck(this, Footer);\n\n\t\treturn _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));\n\t}\n\n\t_createClass(Footer, [{\n\t\tkey: \'render\',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\'div\', { className: \'gor-footer\' }, _react2.default.createElement(_reactIntl.FormattedMessage, { id: \'footer.description\',\n\t\t\t\tdefaultMessage: \'Copyright @ 2016 GreyOrange Pte Ltd\' }));\n\t\t}\n\t}]);\n\n\treturn Footer;\n}(_react2.default.Component);\n\n;\n\nexports.default = Footer;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/Footer/Footer.js\n ** module id = 499\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./src/components/Footer/Footer.js?')},500:function(module,exports,__webpack_require__){eval('\'use strict\';\n\nvar _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n  };\n}();\n\nvar _react = __webpack_require__(96);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(129);\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError("Cannot call a class as a function");\n  }\n}\n\nfunction _possibleConstructorReturn(self, call) {\n  if (!self) {\n    throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");\n  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== "function" && superClass !== null) {\n    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));\n  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n}\n\nvar Spinner = function (_React$Component) {\n  _inherits(Spinner, _React$Component);\n\n  /**\n   * Called once before rendering of component,used to displatch fetch action\n   * @return {[type]}\n   */\n  function Spinner(props) {\n    _classCallCheck(this, Spinner);\n\n    return _possibleConstructorReturn(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).call(this, props));\n  }\n\n  _createClass(Spinner, [{\n    key: \'componentDidMount\',\n    value: function componentDidMount() {\n      if (this.props.setSpinner) {\n        if (this.props.isLoading === true) {\n          setTimeout(this.props.setSpinner.bind(this, false), 5000);\n        }\n      }\n    }\n    /**Render method called when component react renders\n     * @return {[type]}\n     */\n\n  }, {\n    key: \'render\',\n    value: function render() {\n      return _react2.default.createElement(\'div\', { className: \'loader\', style: this.props.isLoading ? { display: \'block\' } : { display: \'none\' } });\n    }\n  }]);\n\n  return Spinner;\n}(_react2.default.Component);\n\n;\n/**\n * [Passing Router to component through context]\n * @type {Object}\n */\n\nexports.default = Spinner;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/spinner/Spinner.js\n ** module id = 500\n ** module chunks = 1 3 4 5 7 8 9 10\n **/\n//# sourceURL=webpack:///./src/components/spinner/Spinner.js?')}});