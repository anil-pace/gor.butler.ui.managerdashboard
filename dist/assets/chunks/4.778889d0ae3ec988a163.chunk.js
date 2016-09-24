webpackJsonp([4,10],{

/***/ 489:
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Container for Overview tab
	 * This will be switched based on tab click
	 */
	var Notifications = function (_React$Component) {
		(0, _inherits3.default)(Notifications, _React$Component);

		function Notifications(props) {
			(0, _classCallCheck3.default)(this, Notifications);
			return (0, _possibleConstructorReturn3.default)(this, (Notifications.__proto__ || (0, _getPrototypeOf2.default)(Notifications)).call(this, props));
		}

		(0, _createClass3.default)(Notifications, [{
			key: 'render',
			value: function render() {
				console.log("call");
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
							null,
							'Notifications'
						)
					)
				);
			}
		}]);
		return Notifications;
	}(_react2.default.Component);

	;

	exports.default = Notifications;

/***/ }

});