webpackJsonp([1,11],{381:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":i(t))&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":i(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t){return{loginAuthorized:e.authLogin.loginAuthorized,auth_token:e.authLogin.auth_token,userName:e.authLogin.username,sLang:e.intl.locale,intlMessages:e.intl.messages,idInfo:e.appInfo.idInfo||{},loginPassCheck:e.appInfo.loginPassInfo||{},loginLoading:e.loader.loginLoader}}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(20),f=o(c),d=n(49),p=(o(d),n(382)),m=o(p),g=n(383),h=o(g),y=n(312),b=n(316),v=n(182),E=n(305),_=n(306),w=n(209),O=n(206),M=n(357),P=o(M),N=n(384),k=(n(389),function(e){function t(e){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return l(t,e),u(t,[{key:"componentWillMount",value:function(){document.body.className="gor-fill-back"}},{key:"componentWillReceiveProps",value:function(e){e.loginAuthorized&&(this.props.resetForm(),document.body.className="",this.context.router.push("/md"))}},{key:"_checkUser",value:function(){var e={userid:this.userName.value};this.props.validateID(e)}},{key:"_checkPass",value:function(){var e={password:this.password.value};this.props.validatePass(e)}},{key:"_handleSelectionChange",value:function(e){if(e){var t={locale:e,messages:N.translationMessages[e]};this.props.updateIntl(t)}}},{key:"_handleSubmit",value:function(e){e.preventDefault();var t={username:this.userName.value,password:this.password.value};if(t.username&&t.password){var n={url:_.LOGIN_URL,formdata:t,method:"POST",cause:E.AUTH_LOGIN,contentType:"application/json",accept:"application/json"};sessionStorage.setItem("nextView","md"),this.props.setUsername(t.username),this.props.setLoginLoader(!0),this.props.authLoginData(n)}}},{key:"render",value:function(){for(var e=this,t=0,n=[{value:"en",label:f["default"].createElement(w.FormattedMessage,{id:"login.lang.english",defaultMessage:"English"})},{value:"ja",label:f["default"].createElement(w.FormattedMessage,{id:"login.lang.japanese",defaultMessage:"Japanese"})}],o=0;o<n.length;o++)n[o].value===this.props.sLang&&(t=o);return f["default"].createElement("div",{className:"gor-login-form"},f["default"].createElement(h["default"],{isLoading:this.props.loginLoading}),f["default"].createElement("form",{action:"#",id:"loginForm",ref:function(t){e.loginForm=t},onSubmit:function(t){return e._handleSubmit(t)}},f["default"].createElement("div",{className:"gor-login-lang"},f["default"].createElement("div",{className:"gor-lang-text"},f["default"].createElement(w.FormattedMessage,{id:"login.butler.language",defaultMessage:"Language"})),f["default"].createElement(P["default"],{optionDispatch:function(t){return e._handleSelectionChange(t)},items:n,styleClass:"gor-lang-drop",currentState:n[t]})),f["default"].createElement("div",{className:"gor-login-logo alt-gor-logo"}),f["default"].createElement("div",{className:"gor-login-mid"},f["default"].createElement("div",{className:"gor-upper-box"},f["default"].createElement("div",{className:"gor-login-head"},f["default"].createElement("span",{className:"gor-lg-txt"},f["default"].createElement(w.FormattedMessage,{id:"login.butler.title",defaultMessage:"Butler"})),f["default"].createElement("sup",null,"TM")),f["default"].createElement("p",null,f["default"].createElement(w.FormattedMessage,{id:"login.butler.manageInterface",defaultMessage:"Management Interface"}))),this.props.loginAuthorized===!1?f["default"].createElement("div",{className:"gor-login-auth-error"},f["default"].createElement("div",{className:"gor-login-error"}),f["default"].createElement(w.FormattedMessage,{id:"login.butler.fail",defaultMessage:"Invalid username and/or password"})):"",f["default"].createElement("section",null,f["default"].createElement("div",{className:"gor-login-field"+(this.props.idInfo.type===E.ERROR||this.props.loginAuthorized===!1?" gor-input-error":" gor-input-ok"),ref:function(t){e.userField=t}},f["default"].createElement("div",{className:this.props.idInfo.type===E.ERROR||this.props.loginAuthorized===!1?"gor-login-user-error":"gor-login-user"}),f["default"].createElement("input",{className:"field",onBlur:this._checkUser.bind(this),type:"text",id:"username",placeholder:this.props.intlMessages["login.form.username"],ref:function(t){e.userName=t}}))),this.props.idInfo&&this.props.idInfo.type===E.ERROR?f["default"].createElement("div",{className:"gor-login-usr-error"},f["default"].createElement(w.FormattedMessage,{id:"login.butler.error.username",defaultMessage:"Please enter your username"})):"",f["default"].createElement("section",null,f["default"].createElement("div",{className:"gor-login-field"+(this.props.loginPassCheck.type===E.ERROR||this.props.loginAuthorized===!1?" gor-input-error":" gor-input-ok"),ref:function(t){e.passField=t}},f["default"].createElement("div",{className:this.props.idInfo.type===E.ERROR||this.props.loginAuthorized===!1?"gor-login-password-error":"gor-login-password"}),f["default"].createElement("input",{className:"field",onBlur:this._checkPass.bind(this),type:"password",id:"password",placeholder:this.props.intlMessages["login.form.password"],ref:function(t){e.password=t}}))),this.props.loginPassCheck&&this.props.loginPassCheck.type===E.ERROR?f["default"].createElement("div",{className:"gor-login-usr-error"},f["default"].createElement(w.FormattedMessage,{id:"login.butler.error.password",defaultMessage:"Please enter your password"})):"",f["default"].createElement("section",null,f["default"].createElement("input",{type:"submit",className:"gor-login-btn",value:"Login"}),f["default"].createElement("br",null))),f["default"].createElement("div",{className:"gor-box-bottom"},f["default"].createElement("span",{className:"gor-box-bottom-left"}),f["default"].createElement("span",{className:"gor-box-bottom-right"}))),f["default"].createElement(m["default"],null))}}]),t}(f["default"].Component));k.contextTypes={router:f["default"].PropTypes.object.isRequired};var j=function(e){return{authLoginData:function(t){e((0,y.authLoginData)(t))},updateIntl:function(t){e((0,O.updateIntl)(t))},mockLoginAuth:function(t){e((0,y.mockLoginAuth)(t))},validateID:function(t){e((0,b.validateID)(t))},setUsername:function(t){e((0,y.setUsername)(t))},validatePass:function(t){e((0,b.validatePass)(t))},resetForm:function(){e((0,b.resetForm)())},setLoginLoader:function(t){e((0,y.setLoginLoader)(t))}}};t["default"]=(0,v.connect)(s,j)(k)},382:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(20),c=o(u),f=n(49),d=(o(f),n(209)),p=function(e){function t(e){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return l(t,e),i(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"gor-footer"},c["default"].createElement(d.FormattedMessage,{id:"footer.description",defaultMessage:"Copyright @ 2016 GreyOrange Pte Ltd"}))}}]),t}(c["default"].Component);t["default"]=p},383:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(20),c=o(u),f=n(49),d=(o(f),function(e){function t(e){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return l(t,e),i(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"loader",style:this.props.isLoading?{display:"block"}:{display:"none"}})}}]),t}(c["default"].Component));t["default"]=d},389:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.messages=void 0;var o=n(209);t.messages=(0,o.defineMessages)({placeholderUsr:{id:"login.form.username",defaultMessage:"Username"},placeholderPwd:{id:"login.form.password",defaultMessage:"Password"}})}});
//# sourceMappingURL=login.8b7b6ed5b13caab94afb.chunk.js.map