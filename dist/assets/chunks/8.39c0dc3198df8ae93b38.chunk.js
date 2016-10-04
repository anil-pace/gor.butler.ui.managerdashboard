webpackJsonp([8,12],{

/***/ 456:
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Container for Overview tab
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This will be switched based on tab click
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var OrderListTab = function (_React$Component) {
		_inherits(OrderListTab, _React$Component);

		function OrderListTab(props) {
			_classCallCheck(this, OrderListTab);

			return _possibleConstructorReturn(this, (OrderListTab.__proto__ || Object.getPrototypeOf(OrderListTab)).call(this, props));
		}

		_createClass(OrderListTab, [{
			key: 'render',
			value: function render() {
				/**
	    * Need to remove these hardcoded variables
	    * 
	    */

				return _react2.default.createElement(
					'div',
					null,
					'OrderListTab'
				);
			}
		}]);

		return OrderListTab;
	}(_react2.default.Component);

	;

	exports.default = OrderListTab;

/***/ }

});