webpackJsonp([9,12],{548:function(module,exports,__webpack_require__){eval('\'use strict\';\n\nvar _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };\n\nObject.defineProperty(exports, "__esModule", {\n\tvalue: true\n});\n\nvar _createClass = function () {\n\tfunction defineProperties(target, props) {\n\t\tfor (var i = 0; i < props.length; i++) {\n\t\t\tvar descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n\t\t}\n\t}return function (Constructor, protoProps, staticProps) {\n\t\tif (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n\t};\n}();\n\nvar _react = __webpack_require__(95);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactAddonsShallowCompare = __webpack_require__(549);\n\nvar _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);\n\nvar _inventory = __webpack_require__(551);\n\nvar _inventory2 = _interopRequireDefault(_inventory);\n\nvar _reactRedux = __webpack_require__(266);\n\nfunction _interopRequireDefault(obj) {\n\treturn obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n\tif (!(instance instanceof Constructor)) {\n\t\tthrow new TypeError("Cannot call a class as a function");\n\t}\n}\n\nfunction _possibleConstructorReturn(self, call) {\n\tif (!self) {\n\t\tthrow new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");\n\t}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n\tif (typeof superClass !== "function" && superClass !== null) {\n\t\tthrow new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));\n\t}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n} /**\n   * Container for Inventory tab\n   * This will be switched based on tab click\n   */\n\nvar InventoryTab = function (_React$Component) {\n\t_inherits(InventoryTab, _React$Component);\n\n\tfunction InventoryTab(props) {\n\t\t_classCallCheck(this, InventoryTab);\n\n\t\treturn _possibleConstructorReturn(this, (InventoryTab.__proto__ || Object.getPrototypeOf(InventoryTab)).call(this, props));\n\t}\n\n\t_createClass(InventoryTab, [{\n\t\tkey: \'shouldComponentUpdate\',\n\t\tvalue: function shouldComponentUpdate(nextProps, nextState) {\n\t\t\treturn (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);\n\t\t}\n\t}, {\n\t\tkey: \'render\',\n\t\tvalue: function render() {\n\t\t\t/**\n    * Need to remove these hardcoded variables\n    * \n    */\n\n\t\t\tvar label = "Stock level history";\n\t\t\treturn _react2.default.createElement(\'div\', { className: \'gorInventory wrapper\' }, _react2.default.createElement(_inventory2.default, { data: this.props.inventoryData.legendData || {}, label: label, snapshotData: this.props.snapshotData }));\n\t\t}\n\t}]);\n\n\treturn InventoryTab;\n}(_react2.default.Component);\n\n;\n\nInventoryTab.propTypes = {\n\tinventoryData: _react2.default.PropTypes.object,\n\tsnapshotData: _react2.default.PropTypes.array\n};\n\nfunction mapStateToProps(state, ownProps) {\n\treturn {\n\t\t"inventoryData": state.inventoryInfo.inventoryDataHistory || {},\n\t\t"snapshotData": state.inventoryInfo.inventoryDataToday || []\n\t};\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(InventoryTab);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/containers/inventoryTab.js\n ** module id = 548\n ** module chunks = 9\n **/\n//# sourceURL=webpack:///./src/containers/inventoryTab.js?')},549:function(module,exports,__webpack_require__){eval("module.exports = __webpack_require__(550);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/react-addons-shallow-compare/index.js\n ** module id = 549\n ** module chunks = 9\n **/\n//# sourceURL=webpack:///./~/react-addons-shallow-compare/index.js?")},550:function(module,exports,__webpack_require__){eval("/**\n * Copyright 2013-present, Facebook, Inc.\n * All rights reserved.\n *\n * This source code is licensed under the BSD-style license found in the\n * LICENSE file in the root directory of this source tree. An additional grant\n * of patent rights can be found in the PATENTS file in the same directory.\n *\n* @providesModule shallowCompare\n*/\n\n'use strict';\n\nvar shallowEqual = __webpack_require__(218);\n\n/**\n * Does a shallow comparison for props and state.\n * See ReactComponentWithPureRenderMixin\n * See also https://facebook.github.io/react/docs/shallow-compare.html\n */\nfunction shallowCompare(instance, nextProps, nextState) {\n  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);\n}\n\nmodule.exports = shallowCompare;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/react/lib/shallowCompare.js\n ** module id = 550\n ** module chunks = 9\n **/\n//# sourceURL=webpack:///./~/react/lib/shallowCompare.js?")},551:function(module,exports,__webpack_require__){eval("'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () {\n\tfunction defineProperties(target, props) {\n\t\tfor (var i = 0; i < props.length; i++) {\n\t\t\tvar descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n\t\t}\n\t}return function (Constructor, protoProps, staticProps) {\n\t\tif (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n\t};\n}();\n\nvar _react = __webpack_require__(95);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _legend = __webpack_require__(552);\n\nvar _legend2 = _interopRequireDefault(_legend);\n\nvar _inventoryStacked = __webpack_require__(554);\n\nvar _inventoryStacked2 = _interopRequireDefault(_inventoryStacked);\n\nvar _snapShot = __webpack_require__(556);\n\nvar _snapShot2 = _interopRequireDefault(_snapShot);\n\nvar _ItemCategoryTable = __webpack_require__(557);\n\nvar _ItemCategoryTable2 = _interopRequireDefault(_ItemCategoryTable);\n\nfunction _interopRequireDefault(obj) {\n\treturn obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n\tif (!(instance instanceof Constructor)) {\n\t\tthrow new TypeError(\"Cannot call a class as a function\");\n\t}\n}\n\nfunction _possibleConstructorReturn(self, call) {\n\tif (!self) {\n\t\tthrow new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n\t}return call && ((typeof call === \"undefined\" ? \"undefined\" : _typeof(call)) === \"object\" || typeof call === \"function\") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n\tif (typeof superClass !== \"function\" && superClass !== null) {\n\t\tthrow new TypeError(\"Super expression must either be null or a function, not \" + (typeof superClass === \"undefined\" ? \"undefined\" : _typeof(superClass)));\n\t}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n} /**\n   * Container for Inventory tab\n   * This will be switched based on tab click\n   */\n\nvar Inventory = function (_React$Component) {\n\t_inherits(Inventory, _React$Component);\n\n\tfunction Inventory(props) {\n\t\t_classCallCheck(this, Inventory);\n\n\t\treturn _possibleConstructorReturn(this, (Inventory.__proto__ || Object.getPrototypeOf(Inventory)).call(this, props));\n\t}\n\n\t_createClass(Inventory, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\n\t\t\treturn _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'head' }, _react2.default.createElement('div', { className: 'labelCnt' }, _react2.default.createElement('span', null, 'Inventory')), _react2.default.createElement('div', { className: 'dwnLoadCnt' }, _react2.default.createElement('a', { href: 'javascript:void(0)', className: 'gorBtn' }, 'Download'))), _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'histCnt' }, _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'histLbl' }, _react2.default.createElement('span', null, this.props.label)), _react2.default.createElement('div', { className: 'legendCnt' }))), _react2.default.createElement('div', { className: 'stkSnapSht' }, _react2.default.createElement('div', { className: 'snapShtWrap' }, _react2.default.createElement(_snapShot2.default, { snapshotTabData: this.props.snapshotData[0] || {} }), _react2.default.createElement(_inventoryStacked2.default, { snapshotData: this.props.snapshotData[0] }), _react2.default.createElement(_ItemCategoryTable2.default, { snapshotData: this.props.snapshotData[0] || {} })))));\n\t\t}\n\t}]);\n\n\treturn Inventory;\n}(_react2.default.Component);\n\n;\nInventory.propTypes = {\n\tdata: _react2.default.PropTypes.object,\n\tlabel: _react2.default.PropTypes.string,\n\tsnapshotData: _react2.default.PropTypes.array\n};\nexports.default = Inventory;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/inventory/inventory.js\n ** module id = 551\n ** module chunks = 9\n **/\n//# sourceURL=webpack:///./src/components/inventory/inventory.js?")},552:function(module,exports,__webpack_require__){eval('\'use strict\';\n\nvar _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };\n\nObject.defineProperty(exports, "__esModule", {\n\tvalue: true\n});\n\nvar _createClass = function () {\n\tfunction defineProperties(target, props) {\n\t\tfor (var i = 0; i < props.length; i++) {\n\t\t\tvar descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n\t\t}\n\t}return function (Constructor, protoProps, staticProps) {\n\t\tif (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n\t};\n}();\n\nvar _react = __webpack_require__(95);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _legendElement = __webpack_require__(553);\n\nvar _legendElement2 = _interopRequireDefault(_legendElement);\n\nfunction _interopRequireDefault(obj) {\n\treturn obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n\tif (!(instance instanceof Constructor)) {\n\t\tthrow new TypeError("Cannot call a class as a function");\n\t}\n}\n\nfunction _possibleConstructorReturn(self, call) {\n\tif (!self) {\n\t\tthrow new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");\n\t}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n\tif (typeof superClass !== "function" && superClass !== null) {\n\t\tthrow new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));\n\t}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n} /**\n   * Component for creating graph legend \n   */\n\nvar Legend = function (_React$Component) {\n\t_inherits(Legend, _React$Component);\n\n\tfunction Legend(props) {\n\t\t_classCallCheck(this, Legend);\n\n\t\treturn _possibleConstructorReturn(this, (Legend.__proto__ || Object.getPrototypeOf(Legend)).call(this, props));\n\t}\n\n\t_createClass(Legend, [{\n\t\tkey: \'_processData\',\n\t\tvalue: function _processData() {\n\t\t\tvar data = this.props.legendData.data || [];\n\t\t\tvar config = this.props.legendData.config || {};\n\t\t\tvar elements = data.map(function (item, i) {\n\t\t\t\treturn _react2.default.createElement(_legendElement2.default, { color: item.color, xpos: config.xpos + i * config.xIncrement, ypos: config.ypos, name: item.name, key: i });\n\t\t\t});\n\t\t\treturn elements;\n\t\t}\n\t}, {\n\t\tkey: \'render\',\n\t\tvalue: function render() {\n\t\t\tvar elements = this._processData();\n\t\t\treturn _react2.default.createElement(\'svg\', { className: \'legend\', width: \'50%\', height: \'60\', style: { "float": "right" } }, elements);\n\t\t}\n\t}]);\n\n\treturn Legend;\n}(_react2.default.Component);\n\n;\nLegend.propTypes = {\n\tlegendData: _react2.default.PropTypes.object\n};\nexports.default = Legend;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/legend/legend.js\n ** module id = 552\n ** module chunks = 9\n **/\n//# sourceURL=webpack:///./src/components/legend/legend.js?')},553:function(module,exports,__webpack_require__){eval('"use strict";\n\nvar _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };\n\nObject.defineProperty(exports, "__esModule", {\n\tvalue: true\n});\n\nvar _createClass = function () {\n\tfunction defineProperties(target, props) {\n\t\tfor (var i = 0; i < props.length; i++) {\n\t\t\tvar descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n\t\t}\n\t}return function (Constructor, protoProps, staticProps) {\n\t\tif (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n\t};\n}();\n\nvar _react = __webpack_require__(95);\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) {\n\treturn obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n\tif (!(instance instanceof Constructor)) {\n\t\tthrow new TypeError("Cannot call a class as a function");\n\t}\n}\n\nfunction _possibleConstructorReturn(self, call) {\n\tif (!self) {\n\t\tthrow new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");\n\t}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n\tif (typeof superClass !== "function" && superClass !== null) {\n\t\tthrow new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));\n\t}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n} /**\n   * Component for creating graph legend \n   */\n\nvar legendElement = function (_React$Component) {\n\t_inherits(legendElement, _React$Component);\n\n\tfunction legendElement(props) {\n\t\t_classCallCheck(this, legendElement);\n\n\t\treturn _possibleConstructorReturn(this, (legendElement.__proto__ || Object.getPrototypeOf(legendElement)).call(this, props));\n\t}\n\n\t_createClass(legendElement, [{\n\t\tkey: "render",\n\t\tvalue: function render() {\n\t\t\tvar position = "translate(" + this.props.xpos + "," + this.props.ypos + ")";\n\t\t\treturn _react2.default.createElement("g", { transform: position }, _react2.default.createElement("line", { x1: "5", y1: "15", x2: "60", y2: "15", stroke: this.props.color, style: { "strokeWidth": 5, "borderRadius": "2px", "strokeLinecap": "round" } }), _react2.default.createElement("circle", { cx: "33", cy: "15", r: "8", stroke: this.props.color, fill: "#fff", style: { "strokeWidth": 5 } }), _react2.default.createElement("text", { x: "15", y: "40", fontFamily: "Verdana", fontSize: "18" }, this.props.name));\n\t\t}\n\t}]);\n\n\treturn legendElement;\n}(_react2.default.Component);\n\n;\nlegendElement.propTypes = {\n\tcolor: _react2.default.PropTypes.string,\n\txpos: _react2.default.PropTypes.number,\n\typos: _react2.default.PropTypes.number,\n\tname: _react2.default.PropTypes.string\n};\n\nexports.default = legendElement;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/legend/legendElement.js\n ** module id = 553\n ** module chunks = 9\n **/\n//# sourceURL=webpack:///./src/components/legend/legendElement.js?')},554:function(module,exports,__webpack_require__){eval('\'use strict\';\n\nvar _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n  };\n}();\n\nvar _react = __webpack_require__(95);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _stackedChartHorizontal = __webpack_require__(555);\n\nvar _stackedChartHorizontal2 = _interopRequireDefault(_stackedChartHorizontal);\n\nvar _reactRedux = __webpack_require__(266);\n\nvar _d = __webpack_require__(445);\n\nvar d3 = _interopRequireWildcard(_d);\n\nvar _reactIntl = __webpack_require__(292);\n\nfunction _interopRequireWildcard(obj) {\n  if (obj && obj.__esModule) {\n    return obj;\n  } else {\n    var newObj = {};if (obj != null) {\n      for (var key in obj) {\n        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];\n      }\n    }newObj.default = obj;return newObj;\n  }\n}\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError("Cannot call a class as a function");\n  }\n}\n\nfunction _possibleConstructorReturn(self, call) {\n  if (!self) {\n    throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");\n  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== "function" && superClass !== null) {\n    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));\n  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n}\n\nvar InventoryStacked = function (_React$Component) {\n  _inherits(InventoryStacked, _React$Component);\n\n  function InventoryStacked(props) {\n    _classCallCheck(this, InventoryStacked);\n\n    return _possibleConstructorReturn(this, (InventoryStacked.__proto__ || Object.getPrototypeOf(InventoryStacked)).call(this, props));\n  }\n\n  _createClass(InventoryStacked, [{\n    key: \'_processData\',\n    value: function _processData() {\n      var node = document.createElement(\'div\');\n      var svg = d3.select(node).append(\'svg\').attr("width", "100%").attr("height", "100").append("g").attr("transform", "translate(" + 0 + "," + 20 + ")");\n      var data = this.props.snapshotData ? this.props.snapshotData.category_data : [];\n      var x = 0,\n          utilisedSpace = 0;\n\n      for (var i = 0; i < data.length; i++) {\n\n        if (!data[i].warehouse_utilization && data[i].unusedSpace) {\n          svg.append("line").attr("x1", x + "%").attr("x2", x + "%").attr("y1", "-8").attr("y2", "50").style("stroke", d3.rgb("#BFBFBF")).style("stroke-width", "1");\n          svg.append("text").attr("x", x - 14 + "%").attr("y", "-8").text(this.context.intl.formatMessage({ id: "snapshot.inventory.usedSpace", defaultMessage: utilisedSpace + "% space utilized" }));\n        } else {\n          utilisedSpace += data[i].warehouse_utilization;\n        }\n        svg.append("rect").attr("x", x + "%").attr("y", "20").attr("width", "" + (data[i].warehouse_utilization || data[i].unusedSpace) + "%").attr("height", "50").style("fill", d3.rgb(data[i].colorCode));\n\n        x += data[i].warehouse_utilization || data[i].unusedSpace;\n      }\n\n      return node;\n    }\n  }, {\n    key: \'render\',\n    value: function render() {\n      var node = this._processData();\n      return _react2.default.createElement(\'div\', null, _react2.default.createElement(_stackedChartHorizontal2.default, { schData: node }));\n    }\n  }]);\n\n  return InventoryStacked;\n}(_react2.default.Component);\n\n;\n\nInventoryStacked.propTypes = {\n  snapshotData: _react2.default.PropTypes.object\n};\nInventoryStacked.contextTypes = {\n  intl: _react2.default.PropTypes.object.isRequired\n};\n\nexports.default = InventoryStacked;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/containers/inventoryTab/inventoryStacked.js\n ** module id = 554\n ** module chunks = 9\n **/\n//# sourceURL=webpack:///./src/containers/inventoryTab/inventoryStacked.js?')},555:function(module,exports,__webpack_require__){eval('\'use strict\';\n\nvar _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n  };\n}();\n\nvar _react = __webpack_require__(95);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactD3Library = __webpack_require__(444);\n\nvar _reactD3Library2 = _interopRequireDefault(_reactD3Library);\n\nvar _d = __webpack_require__(445);\n\nvar d3 = _interopRequireWildcard(_d);\n\nvar _reactDimensions = __webpack_require__(446);\n\nvar _reactDimensions2 = _interopRequireDefault(_reactDimensions);\n\nvar _reactRedux = __webpack_require__(266);\n\nfunction _interopRequireWildcard(obj) {\n  if (obj && obj.__esModule) {\n    return obj;\n  } else {\n    var newObj = {};if (obj != null) {\n      for (var key in obj) {\n        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];\n      }\n    }newObj.default = obj;return newObj;\n  }\n}\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError("Cannot call a class as a function");\n  }\n}\n\nfunction _possibleConstructorReturn(self, call) {\n  if (!self) {\n    throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");\n  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== "function" && superClass !== null) {\n    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));\n  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n}\n\nvar RD3Component = _reactD3Library2.default.Component;\n\nvar StackedChartHorizontal = function (_React$Component) {\n  _inherits(StackedChartHorizontal, _React$Component);\n\n  function StackedChartHorizontal(props) {\n    _classCallCheck(this, StackedChartHorizontal);\n\n    var _this = _possibleConstructorReturn(this, (StackedChartHorizontal.__proto__ || Object.getPrototypeOf(StackedChartHorizontal)).call(this, props));\n\n    _this.state = { d3: \'\' };\n    return _this;\n  }\n\n  _createClass(StackedChartHorizontal, [{\n    key: \'componentDidMount\',\n    value: function componentDidMount() {\n      this._processData();\n    }\n  }, {\n    key: \'_processData\',\n    value: function _processData() {\n      this.setState({ d3: this.props.schData });\n    }\n  }, {\n    key: \'render\',\n    value: function render() {\n\n      return _react2.default.createElement(\'div\', null, _react2.default.createElement(RD3Component, { data: this.state.d3 }));\n    }\n  }]);\n\n  return StackedChartHorizontal;\n}(_react2.default.Component);\n\n;\n\nStackedChartHorizontal.propTypes = {\n  schData: _react2.default.PropTypes.object\n};\nfunction mapStateToProps(state, ownProps) {\n\n  return {};\n}\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {};\n};\n\nexports.default = StackedChartHorizontal;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/graphd3/stackedChartHorizontal.js\n ** module id = 555\n ** module chunks = 9\n **/\n//# sourceURL=webpack:///./src/components/graphd3/stackedChartHorizontal.js?')},556:function(module,exports,__webpack_require__){eval('"use strict";\n\nvar _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };\n\nObject.defineProperty(exports, "__esModule", {\n\tvalue: true\n});\n\nvar _createClass = function () {\n\tfunction defineProperties(target, props) {\n\t\tfor (var i = 0; i < props.length; i++) {\n\t\t\tvar descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n\t\t}\n\t}return function (Constructor, protoProps, staticProps) {\n\t\tif (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n\t};\n}();\n\nvar _react = __webpack_require__(95);\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) {\n\treturn obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n\tif (!(instance instanceof Constructor)) {\n\t\tthrow new TypeError("Cannot call a class as a function");\n\t}\n}\n\nfunction _possibleConstructorReturn(self, call) {\n\tif (!self) {\n\t\tthrow new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");\n\t}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n\tif (typeof superClass !== "function" && superClass !== null) {\n\t\tthrow new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));\n\t}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n} /**\n   * Container for Inventory tab\n   * This will be switched based on tab click\n   */\n\nvar SnapShotDetails = function (_React$Component) {\n\t_inherits(SnapShotDetails, _React$Component);\n\n\tfunction SnapShotDetails(props) {\n\t\t_classCallCheck(this, SnapShotDetails);\n\n\t\treturn _possibleConstructorReturn(this, (SnapShotDetails.__proto__ || Object.getPrototypeOf(SnapShotDetails)).call(this, props));\n\t}\n\n\t_createClass(SnapShotDetails, [{\n\t\tkey: "render",\n\t\tvalue: function render() {\n\n\t\t\treturn _react2.default.createElement("div", { className: "gorSnapShot" }, _react2.default.createElement("h1", null, "Today\'s stock snapshot"), _react2.default.createElement("div", { className: "gorSnapShotCont" }, _react2.default.createElement("table", { width: "100%" }, _react2.default.createElement("tbody", null, _react2.default.createElement("tr", null, _react2.default.createElement("td", null, _react2.default.createElement("p", null, "Opening Stock"), _react2.default.createElement("p", null, this.props.snapshotTabData.opening_stock)), _react2.default.createElement("td", null, _react2.default.createElement("p", null, "Items Put"), _react2.default.createElement("p", null, this.props.snapshotTabData.items_put)), _react2.default.createElement("td", null, _react2.default.createElement("p", null, "Items Pick"), _react2.default.createElement("p", null, this.props.snapshotTabData.items_picked))), _react2.default.createElement("tr", null, _react2.default.createElement("td", null, _react2.default.createElement("p", null, "Current Stock"), _react2.default.createElement("p", null, this.props.snapshotTabData.current_stock)), _react2.default.createElement("td", null, _react2.default.createElement("p", null, "SKUs"), _react2.default.createElement("p", null, this.props.snapshotTabData.total_skus)), _react2.default.createElement("td", null, _react2.default.createElement("p", null, "CBM Used"), _react2.default.createElement("p", null, this.props.snapshotTabData.cbm_used)))))));\n\t\t}\n\t}]);\n\n\treturn SnapShotDetails;\n}(_react2.default.Component);\n\n;\nSnapShotDetails.propTypes = {\n\tsnapshotTabData: _react2.default.PropTypes.object\n};\nexports.default = SnapShotDetails;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/inventory/snapShot.js\n ** module id = 556\n ** module chunks = 9\n **/\n//# sourceURL=webpack:///./src/components/inventory/snapShot.js?');
},557:function(module,exports,__webpack_require__){eval("'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () {\n\tfunction defineProperties(target, props) {\n\t\tfor (var i = 0; i < props.length; i++) {\n\t\t\tvar descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n\t\t}\n\t}return function (Constructor, protoProps, staticProps) {\n\t\tif (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n\t};\n}();\n\nvar _react = __webpack_require__(95);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactIntl = __webpack_require__(292);\n\nfunction _interopRequireDefault(obj) {\n\treturn obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n\tif (!(instance instanceof Constructor)) {\n\t\tthrow new TypeError(\"Cannot call a class as a function\");\n\t}\n}\n\nfunction _possibleConstructorReturn(self, call) {\n\tif (!self) {\n\t\tthrow new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n\t}return call && ((typeof call === \"undefined\" ? \"undefined\" : _typeof(call)) === \"object\" || typeof call === \"function\") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n\tif (typeof superClass !== \"function\" && superClass !== null) {\n\t\tthrow new TypeError(\"Super expression must either be null or a function, not \" + (typeof superClass === \"undefined\" ? \"undefined\" : _typeof(superClass)));\n\t}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n} /**\n   * Container for Inventory tab\n   * This will be switched based on tab click\n   */\n\nvar ItemCategoryTable = function (_React$Component) {\n\t_inherits(ItemCategoryTable, _React$Component);\n\n\tfunction ItemCategoryTable(props) {\n\t\t_classCallCheck(this, ItemCategoryTable);\n\n\t\treturn _possibleConstructorReturn(this, (ItemCategoryTable.__proto__ || Object.getPrototypeOf(ItemCategoryTable)).call(this, props));\n\t}\n\n\t_createClass(ItemCategoryTable, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar structure = void 0;\n\t\t\tif (this.props.snapshotData.category_data) {\n\t\t\t\tstructure = this.props.snapshotData.category_data.map(function (object, i) {\n\t\t\t\t\treturn _react2.default.createElement('tr', null, _react2.default.createElement('td', null, _react2.default.createElement('span', null), _react2.default.createElement('span', null, object.category_type)), _react2.default.createElement('td', null, object.cbm_used), _react2.default.createElement('td', null, object.days_on_hand));\n\t\t\t\t});\n\t\t\t}\n\t\t\treturn _react2.default.createElement('div', { className: 'gorSnapShot' }, _react2.default.createElement('div', { className: 'gorSnapShotCont' }, _react2.default.createElement('table', { width: '100%' }, _react2.default.createElement('thead', null, _react2.default.createElement('tr', null, _react2.default.createElement('th', null, _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'itemTable.categoryType.category', defaultMessage: 'Category' })), _react2.default.createElement('th', null, _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'itemTable.cbmUsed.cbm', defaultMessage: 'CBM Used' })), _react2.default.createElement('th', null, _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'itemTable.daysInHand.count', defaultMessage: 'Days in Hand' })))), _react2.default.createElement('tbody', null, structure))));\n\t\t}\n\t}]);\n\n\treturn ItemCategoryTable;\n}(_react2.default.Component);\n\n;\nItemCategoryTable.propTypes = {\n\tsnapshotData: _react2.default.PropTypes.object\n};\nexports.default = ItemCategoryTable;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/inventory/ItemCategoryTable.js\n ** module id = 557\n ** module chunks = 9\n **/\n//# sourceURL=webpack:///./src/components/inventory/ItemCategoryTable.js?")}});