webpackJsonp([1,13],{401:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":l(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":l(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t){return{loginAuthorized:e.authLogin.loginAuthorized,sLang:e.intl.locale||null,loginSpinner:e.spinner.loginSpinner}}var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(20),f=o(c),p=n(49),d=(o(p),n(402)),m=o(d),g=n(404),h=o(g),y=n(405),b=o(y),v=n(317),E=n(325),S=n(182),_=n(305),O=n(322),R=n(209),C=n(206),N=n(369),P=o(N),w=n(400),M=o(w),k=n(388),I=function(e){function t(e){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={sel:0,items:[{value:_.EN,label:O.ENG},{value:_.JA,label:O.JAP}]},n}return i(t,e),u(t,[{key:"componentWillMount",value:function(){document.body.className=_.FILL_BACK,this._changeDropdown()}},{key:"_changeDropdown",value:function(){for(var e=0;e<this.state.items.length;e++)this.state.items[e].value===this.props.sLang&&this.setState({sel:e})}},{key:"componentWillReceiveProps",value:function(e){e.loginAuthorized&&(this.props.resetForm(),document.body.className="",this.context.router.push("/md"))}},{key:"_handleSelectionChange",value:function(e){if(e){var t={locale:e,messages:k.translationMessages[e]};this.props.updateIntl(t),sessionStorage.setItem("localLanguage",e),this._changeDropdown()}}},{key:"render",value:function(){var e=this;return f["default"].createElement("div",null,f["default"].createElement(M["default"],null),f["default"].createElement("div",{className:"gor-login-form"},f["default"].createElement(b["default"],{isLoading:this.props.loginSpinner,setSpinner:this.props.setLoginSpinner}),f["default"].createElement("div",{className:"gor-login-lang"},f["default"].createElement("div",{className:"gor-lang-text"},f["default"].createElement(R.FormattedMessage,{id:"login.butler.language",defaultMessage:"Language"})),f["default"].createElement(P["default"],{optionDispatch:function(t){return e._handleSelectionChange(t)},items:this.state.items,styleClass:"gor-lang-drop",currentState:this.state.items[this.state.sel]})),f["default"].createElement("div",{className:"gor-login-logo alt-gor-logo"}),f["default"].createElement(m["default"],null),f["default"].createElement("div",{className:"gor-box-bottom"},f["default"].createElement("span",{className:"gor-box-bottom-left"}),f["default"].createElement("span",{className:"gor-box-bottom-right"})),f["default"].createElement(h["default"],null)))}}]),t}(f["default"].Component);I.contextTypes={router:f["default"].PropTypes.object.isRequired};var L=function(e){return{updateIntl:function(t){e((0,C.updateIntl)(t))},resetForm:function(){e((0,E.resetForm)())},setLoginSpinner:function(t){e((0,v.setLoginSpinner)(t))}}};t["default"]=(0,S.connect)(s,L)(I)},402:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":u(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":u(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t){return{loginAuthorized:e.authLogin.loginAuthorized,connectionActive:e.authLogin.connectionActive,intlMessages:e.intl.messages||{},userNameCheck:e.appInfo.idInfo||{},passWordCheck:e.appInfo.passwordInfo||{},loginSpinner:e.spinner.loginSpinner}}function l(e){return{authLoginData:function(t){e((0,m.authLoginData)(t))},validateID:function(t){e((0,g.validateID)(t))},validatePass:function(t){e((0,g.validatePassword)(t))},setLoginSpinner:function(t){e((0,m.setLoginSpinner)(t))},setUsername:function(t){e((0,m.setUsername)(t))},connectionFault:function(){e((0,m.connectionFault)())}}}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),f=n(20),p=o(f),d=n(49),m=(o(d),n(317)),g=n(325),h=n(182),y=n(324),b=n(306),v=n(209),E=n(403),S=function(e){function t(e){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),c(t,[{key:"_checkUser",value:function(){var e=this.userName.value,t=void 0;return t=(0,E.emptyField)(e),this.props.validateID(t),t.type}},{key:"_typing",value:function(e){1===e?this.userField.className=y.TYPING:this.passField.className=y.TYPING}},{key:"_checkPass",value:function(){var e=this.password.value.trim(),t=void 0;return t=(0,E.emptyField)(e),this.props.validatePass(t),t.type}},{key:"_handleSubmit",value:function(e){if(e.preventDefault(),!window.navigator.onLine)return void this.props.connectionFault();if(!this.props.userNameCheck.type||!this.props.passWordCheck.type){if(!this._checkUser())return;if(!this._checkPass())return}var t={username:this.userName.value,password:this.password.value},n={url:b.LOGIN_URL,formdata:t,method:y.POST,cause:y.AUTH_LOGIN,contentType:y.APP_JSON,accept:y.APP_JSON};sessionStorage.setItem("nextView","md"),this.props.setLoginSpinner(!0),this.props.setUsername(t.username),this.props.authLoginData(n)}},{key:"render",value:function(){var e=this;return p["default"].createElement("form",{action:"#",id:"loginForm",ref:function(t){e.loginForm=t},onSubmit:function(t){return e._handleSubmit(t)}},p["default"].createElement("div",{className:"gor-login-mid"},p["default"].createElement("div",{className:"gor-upper-box"},p["default"].createElement("div",{className:"gor-login-head"},p["default"].createElement("span",{className:"gor-lg-txt"},p["default"].createElement(v.FormattedMessage,{id:"login.butler.title",defaultMessage:"Butler"})),p["default"].createElement("sup",null,p["default"].createElement(v.FormattedMessage,{id:"login.butler.trademark",defaultMessage:"TM"}))),p["default"].createElement("p",null,p["default"].createElement(v.FormattedMessage,{id:"login.butler.manageInterface",defaultMessage:"Management Interface"}))),this.props.loginAuthorized===!1?p["default"].createElement("div",{className:"gor-login-auth-error"},p["default"].createElement("div",{className:"gor-login-error"}),p["default"].createElement(v.FormattedMessage,{id:"login.butler.fail",defaultMessage:"Invalid username and/or password, please try again"})):"",this.props.connectionActive===!1?p["default"].createElement("div",{className:"gor-login-auth-error"},p["default"].createElement("div",{className:"gor-login-error"}),p["default"].createElement(v.FormattedMessage,{id:"login.butler.connection.fail",defaultMessage:"Connection failure"})):"",p["default"].createElement("section",null,p["default"].createElement("div",{className:"gor-login-field"+(this.props.userNameCheck.type===y.ERROR||this.props.loginAuthorized===!1?" gor-input-error":" gor-input-ok"),ref:function(t){e.userField=t}},p["default"].createElement("div",{className:this.props.userNameCheck.type===y.ERROR||this.props.loginAuthorized===!1?"gor-login-user-error":"gor-login-user"}),p["default"].createElement("input",{className:"field",onInput:this._typing.bind(this,1),onBlur:this._checkUser.bind(this),type:"text",id:"username",placeholder:this.props.intlMessages["login.form.username"],ref:function(t){e.userName=t}}))),this.props.userNameCheck&&this.props.userNameCheck.type===y.ERROR?p["default"].createElement("div",{className:"gor-login-usr-error"},p["default"].createElement(v.FormattedMessage,{id:"login.butler.error.username",defaultMessage:"Please enter your username"})):"",p["default"].createElement("section",null,p["default"].createElement("div",{className:"gor-login-field"+(this.props.passWordCheck.type===y.ERROR||this.props.loginAuthorized===!1?" gor-input-error":" gor-input-ok"),ref:function(t){e.passField=t}},p["default"].createElement("div",{className:this.props.passWordCheck.type===y.ERROR||this.props.loginAuthorized===!1?"gor-login-password-error":"gor-login-password"}),p["default"].createElement("input",{className:"field",onInput:this._typing.bind(this,2),onBlur:this._checkPass.bind(this),type:"password",id:"password",placeholder:this.props.intlMessages["login.form.password"],ref:function(t){e.password=t}}))),this.props.passWordCheck&&this.props.passWordCheck.type===y.ERROR?p["default"].createElement("div",{className:"gor-login-usr-error"},p["default"].createElement(v.FormattedMessage,{id:"login.butler.error.password",defaultMessage:"Please enter your password"})):"",p["default"].createElement("section",null,p["default"].createElement("input",{type:"submit",className:"gor-login-btn",value:this.props.intlMessages["login.form.button"]}),p["default"].createElement("br",null))))}}]),t}(p["default"].Component);t["default"]=(0,h.connect)(s,l)(S)},403:function(e,t,n){"use strict";function o(e,t){var n=void 0,o=/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;return n=!e.length||!t.length||e.length>50||t.length>50?{type:u.ERROR,msg:c.EMPTY_NAME}:o.test(e)||o.test(t)?{type:u.ERROR,msg:c.INVALID_NAME}:{type:u.SUCCESS,msg:c.TYPE_SUCCESS}}function r(e,t,n,o){var r=void 0;return r=e.length?e!=t?{type:u.ERROR,msg:c.MATCH_PWD}:e.length<8?n===o?{type:u.ERROR,msg:c.INVALID_PWD_MG}:e.length<6?{type:u.ERROR,msg:c.INVALID_PWD_OP}:{type:u.SUCCESS,msg:c.TYPE_SUCCESS}:{type:u.SUCCESS,msg:c.TYPE_SUCCESS}:{type:u.ERROR,msg:c.EMPTY_PWD}}function a(e){var t=void 0;return t=e.length<1?{type:u.ERROR,msg:c.INVALID_LOCID}:{type:u.SUCCESS,msg:c.TYPE_SUCCESS}}function i(e){var t=void 0;return t=e.length<1?{type:u.ERROR,msg:c.INVALID_SKUID}:{type:u.SUCCESS,msg:c.TYPE_SUCCESS}}function s(e){var t=void 0,n=/[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;return t=e.length<1||e.length>30?{type:u.ERROR,msg:c.INVALID_ID}:n.test(e)?{type:u.ERROR,msg:c.INVALID_FORMAT}:{type:u.SUCCESS,msg:c.TYPE_SUCCESS}}function l(e){var t=void 0;return t=e.length<1?{type:u.ERROR,msg:c.EMPTY_PWD}:{type:u.SUCCESS,msg:c.TYPE_SUCCESS}}Object.defineProperty(t,"__esModule",{value:!0}),t.nameStatus=o,t.passwordStatus=r,t.locationStatus=a,t.skuStatus=i,t.idStatus=s,t.emptyField=l;var u=n(305),c=n(322)},404:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(20),c=o(u),f=n(49),p=(o(f),n(209)),d=function(e){function t(e){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),l(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"gor-footer"},c["default"].createElement(p.FormattedMessage,{id:"footer.description",defaultMessage:"Copyright @ 2016 GreyOrange Pte Ltd"}))}}]),t}(c["default"].Component);t["default"]=d},405:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(20),c=o(u),f=n(49),p=(o(f),function(e){function t(e){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),l(t,[{key:"componentDidMount",value:function(){this.props.setSpinner&&this.props.isLoading===!0&&setTimeout(this.props.setSpinner.bind(this,!1),5e3)}},{key:"render",value:function(){return c["default"].createElement("div",{className:"loader",style:this.props.isLoading?{display:"block"}:{display:"none"}})}}]),t}(c["default"].Component));t["default"]=p}});
//# sourceMappingURL=login.4e279a199c4e15f60fc5.chunk.js.map