webpackJsonp([1,13],{390:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":l(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":l(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t){return{loginAuthorized:e.authLogin.loginAuthorized,connectionActive:e.authLogin.connectionActive,auth_token:e.authLogin.auth_token,userName:e.authLogin.username,sLang:e.intl.locale,intlMessages:e.intl.messages,idInfo:e.appInfo.idInfo||{},loginPassCheck:e.appInfo.passwordInfo||{},loginSpinner:e.spinner.loginSpinner}}var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(20),f=o(c),p=n(49),d=(o(p),n(391)),g=o(d),m=n(392),h=o(m),y=n(315),b=n(322),v=n(182),E=n(305),_=n(321),w=n(306),S=n(209),O=n(206),k=n(365),N=o(k),P=n(393),M=function(e){function t(e){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={sel:0,items:[{value:"en",label:f["default"].createElement(S.FormattedMessage,{id:"login.lang.english",defaultMessage:"English"})},{value:"ja",label:f["default"].createElement(S.FormattedMessage,{id:"login.lang.japanese",defaultMessage:"Japanese"})}]},n}return i(t,e),u(t,[{key:"componentWillMount",value:function(){document.body.className="gor-fill-back",this._changeDropdown()}},{key:"_changeDropdown",value:function(){for(var e=0;e<this.state.items.length;e++)this.state.items[e].value===this.props.sLang&&this.setState({sel:e})}},{key:"componentWillReceiveProps",value:function(e){e.loginAuthorized&&(this.props.resetForm(),document.body.className="",this.context.router.push("/md"))}},{key:"_checkUser",value:function(){var e=this.userName.value,t=void 0;return t=e.length<1?{type:E.ERROR,msg:_.INVALID_ID}:{type:E.SUCCESS,msg:_.TYPE_SUCCESS},this.props.validateID(t),t.type}},{key:"_typing",value:function(e){1===e?this.userField.className="gor-login-field gor-input-ok gor-input-typing":this.passField.className="gor-login-field gor-input-ok gor-input-typing"}},{key:"_checkPass",value:function(){var e=this.password.value.trim(),t=void 0;return t=e.length<1?{type:E.ERROR,msg:_.EMPTY_PWD}:{type:E.SUCCESS,msg:_.TYPE_SUCCESS},this.props.validatePass(t),t.type}},{key:"_handleSelectionChange",value:function(e){if(e){var t={locale:e,messages:P.translationMessages[e]};this.props.updateIntl(t),this._changeDropdown()}}},{key:"_handleSubmit",value:function(e){if(e.preventDefault(),window.navigator.onLine){var t={username:this.userName.value,password:this.password.value};if(!this.props.idInfo.type&&!this._checkUser())return;if(!this.props.loginPassCheck.type&&!this._checkPass())return;var n={url:w.LOGIN_URL,formdata:t,method:"POST",cause:E.AUTH_LOGIN,contentType:"application/json",accept:"application/json"};sessionStorage.setItem("nextView","md"),this.props.setUsername(t.username),this.props.setLoginSpinner(!0),this.props.authLoginData(n)}else this.props.connectionFault()}},{key:"render",value:function(){var e=this;return f["default"].createElement("div",{className:"gor-login-form"},f["default"].createElement(h["default"],{isLoading:this.props.loginSpinner}),f["default"].createElement("form",{action:"#",id:"loginForm",ref:function(t){e.loginForm=t},onSubmit:function(t){return e._handleSubmit(t)}},f["default"].createElement("div",{className:"gor-login-lang"},f["default"].createElement("div",{className:"gor-lang-text"},f["default"].createElement(S.FormattedMessage,{id:"login.butler.language",defaultMessage:"Language"})),f["default"].createElement(N["default"],{optionDispatch:function(t){return e._handleSelectionChange(t)},items:this.state.items,styleClass:"gor-lang-drop",currentState:this.state.items[this.state.sel]})),f["default"].createElement("div",{className:"gor-login-logo alt-gor-logo"}),f["default"].createElement("div",{className:"gor-login-mid"},f["default"].createElement("div",{className:"gor-upper-box"},f["default"].createElement("div",{className:"gor-login-head"},f["default"].createElement("span",{className:"gor-lg-txt"},f["default"].createElement(S.FormattedMessage,{id:"login.butler.title",defaultMessage:"Butler"})),f["default"].createElement("sup",null,"TM")),f["default"].createElement("p",null,f["default"].createElement(S.FormattedMessage,{id:"login.butler.manageInterface",defaultMessage:"Management Interface"}))),this.props.loginAuthorized===!1?f["default"].createElement("div",{className:"gor-login-auth-error"},f["default"].createElement("div",{className:"gor-login-error"}),f["default"].createElement(S.FormattedMessage,{id:"login.butler.fail",defaultMessage:"Invalid username and/or password, please try again"})):"",this.props.connectionActive===!1?f["default"].createElement("div",{className:"gor-login-auth-error"},f["default"].createElement("div",{className:"gor-login-error"}),f["default"].createElement(S.FormattedMessage,{id:"login.butler.connection.fail",defaultMessage:"Connection failure"})):"",f["default"].createElement("section",null,f["default"].createElement("div",{className:"gor-login-field"+(this.props.idInfo.type===E.ERROR||this.props.loginAuthorized===!1?" gor-input-error":" gor-input-ok"),ref:function(t){e.userField=t}},f["default"].createElement("div",{className:this.props.idInfo.type===E.ERROR||this.props.loginAuthorized===!1?"gor-login-user-error":"gor-login-user"}),f["default"].createElement("input",{className:"field",onInput:this._typing.bind(this,1),onBlur:this._checkUser.bind(this),type:"text",id:"username",placeholder:this.props.intlMessages["login.form.username"],ref:function(t){e.userName=t}}))),this.props.idInfo&&this.props.idInfo.type===E.ERROR?f["default"].createElement("div",{className:"gor-login-usr-error"},f["default"].createElement(S.FormattedMessage,{id:"login.butler.error.username",defaultMessage:"Please enter your username"})):"",f["default"].createElement("section",null,f["default"].createElement("div",{className:"gor-login-field"+(this.props.loginPassCheck.type===E.ERROR||this.props.loginAuthorized===!1?" gor-input-error":" gor-input-ok"),ref:function(t){e.passField=t}},f["default"].createElement("div",{className:this.props.loginPassCheck.type===E.ERROR||this.props.loginAuthorized===!1?"gor-login-password-error":"gor-login-password"}),f["default"].createElement("input",{className:"field",onInput:this._typing.bind(this,2),onBlur:this._checkPass.bind(this),type:"password",id:"password",placeholder:this.props.intlMessages["login.form.password"],ref:function(t){e.password=t}}))),this.props.loginPassCheck&&this.props.loginPassCheck.type===E.ERROR?f["default"].createElement("div",{className:"gor-login-usr-error"},f["default"].createElement(S.FormattedMessage,{id:"login.butler.error.password",defaultMessage:"Please enter your password"})):"",f["default"].createElement("section",null,f["default"].createElement("input",{type:"submit",className:"gor-login-btn",value:this.props.intlMessages["login.form.button"]}),f["default"].createElement("br",null))),f["default"].createElement("div",{className:"gor-box-bottom"},f["default"].createElement("span",{className:"gor-box-bottom-left"}),f["default"].createElement("span",{className:"gor-box-bottom-right"}))),f["default"].createElement(g["default"],null))}}]),t}(f["default"].Component);M.contextTypes={router:f["default"].PropTypes.object.isRequired};var R=function(e){return{authLoginData:function(t){e((0,y.authLoginData)(t))},updateIntl:function(t){e((0,O.updateIntl)(t))},mockLoginAuth:function(t){e((0,y.mockLoginAuth)(t))},validateID:function(t){e((0,b.validateID)(t))},setUsername:function(t){e((0,y.setUsername)(t))},validatePass:function(t){e((0,b.validatePassword)(t))},resetForm:function(){e((0,b.resetForm)())},setLoginSpinner:function(t){e((0,y.setLoginSpinner)(t))},connectionFault:function(){e((0,y.connectionFault)())}}};t["default"]=(0,v.connect)(s,R)(M)},391:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(20),c=o(u),f=n(49),p=(o(f),n(209)),d=function(e){function t(e){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),l(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"gor-footer"},c["default"].createElement(p.FormattedMessage,{id:"footer.description",defaultMessage:"Copyright @ 2016 GreyOrange Pte Ltd"}))}}]),t}(c["default"].Component);t["default"]=d},392:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(20),c=o(u),f=n(49),p=(o(f),function(e){function t(e){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),l(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"loader",style:this.props.isLoading?{display:"block"}:{display:"none"}})}}]),t}(c["default"].Component));t["default"]=p}});
//# sourceMappingURL=login.6c430ccd165319c8dd4b.chunk.js.map