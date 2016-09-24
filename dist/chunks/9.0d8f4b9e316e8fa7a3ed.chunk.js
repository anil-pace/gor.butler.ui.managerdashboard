webpackJsonp([9,11],{

/***/ 550:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(426);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(430);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(431);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(432);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(451);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _userTabTable = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./userTab/userTabTable\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _userTabTable2 = _interopRequireDefault(_userTabTable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var UsersTab = function (_React$Component) {
	  (0, _inherits3.default)(UsersTab, _React$Component);

	  function UsersTab(props) {
	    (0, _classCallCheck3.default)(this, UsersTab);
	    return (0, _possibleConstructorReturn3.default)(this, (UsersTab.__proto__ || (0, _getPrototypeOf2.default)(UsersTab)).call(this, props));
	  }

	  (0, _createClass3.default)(UsersTab, [{
	    key: 'render',
	    value: function render() {
	      var itemNumber = 8;
	      var temp_data = [{
	        "name": "xyz",
	        "status": "Online",
	        "role": "Manager",
	        "workMode": "Management",
	        "location": "PPS 001",
	        "productivity": "300 packet/hr",
	        "logInTime": "09:00:25(4h 10m)"
	      }, {
	        "name": "xyz",
	        "status": "Online",
	        "role": "Supevisor",
	        "workMode": "Management",
	        "location": "PPS 001",
	        "productivity": "300 packet/hr",
	        "logInTime": "09:00:25(4h 10m)"
	      }, {
	        "name": "xyz",
	        "status": "Online",
	        "role": "Operator",
	        "workMode": "Pick Back",
	        "location": "PPS 001",
	        "productivity": "300 packet/hr",
	        "logInTime": "09:00:25(4h 10m)"
	      }, {
	        "name": "xyz",
	        "status": "Offline",
	        "role": "Operator",
	        "workMode": "Pick back",
	        "location": "PPS 001",
	        "productivity": "300 packet/hr",
	        "logInTime": "09:00:25(4h 10m)"
	      }, {
	        "name": "xyz",
	        "status": "Offline",
	        "role": "Operator",
	        "workMode": "Pick back",
	        "location": "PPS 001",
	        "productivity": "300 packet/hr",
	        "logInTime": "09:00:25(4h 10m)"
	      }, {
	        "name": "xyz",
	        "status": "Online",
	        "role": "Manager",
	        "workMode": "Management",
	        "location": "PPS 001",
	        "productivity": "300 packet/hr",
	        "logInTime": "09:00:25(4h 10m)"
	      }, {
	        "name": "xyz",
	        "status": "Online",
	        "role": "Supevisor",
	        "workMode": "Management",
	        "location": "PPS 001",
	        "productivity": "300 packet/hr",
	        "logInTime": "09:00:25(4h 10m)"
	      }, {
	        "name": "xyz",
	        "status": "Online",
	        "role": "Operator",
	        "workMode": "Pick Back",
	        "location": "PPS 001",
	        "productivity": "300 packet/hr",
	        "logInTime": "09:00:25(4h 10m)"
	      }, {
	        "name": "xyz",
	        "status": "Offline",
	        "role": "Operator",
	        "workMode": "Pick back",
	        "location": "PPS 001",
	        "productivity": "300 packet/hr",
	        "logInTime": "09:00:25(4h 10m)"
	      }, {
	        "name": "xyz",
	        "status": "Offline",
	        "role": "Operator",
	        "workMode": "Pick back",
	        "location": "PPS 001",
	        "productivity": "300 packet/hr",
	        "logInTime": "09:00:25(4h 10m)"
	      }];
	      /**
	       * Need to remove these hardcoded variables
	       * 
	       */

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'div',
	            { className: 'gorTesting' },
	            _react2.default.createElement(_userTabTable2.default, { items: temp_data, itemNumber: itemNumber })
	          )
	        )
	      );
	    }
	  }]);
	  return UsersTab;
	}(_react2.default.Component);

	;

	exports.default = UsersTab;

/***/ }

});