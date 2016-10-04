webpackJsonp([0,12],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(19);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(2)() ? Symbol : __webpack_require__(3);


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var validTypes = { object: true, symbol: true };

	module.exports = function () {
		var symbol;
		if (typeof Symbol !== 'function') return false;
		symbol = Symbol('test symbol');
		try { String(symbol); } catch (e) { return false; }

		// Return 'true' also for polyfills
		if (!validTypes[typeof Symbol.iterator]) return false;
		if (!validTypes[typeof Symbol.toPrimitive]) return false;
		if (!validTypes[typeof Symbol.toStringTag]) return false;

		return true;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// ES2015 Symbol polyfill for environments that do not support it (or partially support it)

	'use strict';

	var d              = __webpack_require__(4)
	  , validateSymbol = __webpack_require__(17)

	  , create = Object.create, defineProperties = Object.defineProperties
	  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
	  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
	  , isNativeSafe;

	if (typeof Symbol === 'function') {
		NativeSymbol = Symbol;
		try {
			String(NativeSymbol());
			isNativeSafe = true;
		} catch (ignore) {}
	}

	var generateName = (function () {
		var created = create(null);
		return function (desc) {
			var postfix = 0, name, ie11BugWorkaround;
			while (created[desc + (postfix || '')]) ++postfix;
			desc += (postfix || '');
			created[desc] = true;
			name = '@@' + desc;
			defineProperty(objPrototype, name, d.gs(null, function (value) {
				// For IE11 issue see:
				// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
				//    ie11-broken-getters-on-dom-objects
				// https://github.com/medikoo/es6-symbol/issues/12
				if (ie11BugWorkaround) return;
				ie11BugWorkaround = true;
				defineProperty(this, name, d(value));
				ie11BugWorkaround = false;
			}));
			return name;
		};
	}());

	// Internal constructor (not one exposed) for creating Symbol instances.
	// This one is used to ensure that `someSymbol instanceof Symbol` always return false
	HiddenSymbol = function Symbol(description) {
		if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
		return SymbolPolyfill(description);
	};

	// Exposed `Symbol` constructor
	// (returns instances of HiddenSymbol)
	module.exports = SymbolPolyfill = function Symbol(description) {
		var symbol;
		if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
		if (isNativeSafe) return NativeSymbol(description);
		symbol = create(HiddenSymbol.prototype);
		description = (description === undefined ? '' : String(description));
		return defineProperties(symbol, {
			__description__: d('', description),
			__name__: d('', generateName(description))
		});
	};
	defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (globalSymbols[key]) return globalSymbols[key];
			return (globalSymbols[key] = SymbolPolyfill(String(key)));
		}),
		keyFor: d(function (s) {
			var key;
			validateSymbol(s);
			for (key in globalSymbols) if (globalSymbols[key] === s) return key;
		}),

		// If there's native implementation of given symbol, let's fallback to it
		// to ensure proper interoperability with other native functions e.g. Array.from
		hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
		isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
			SymbolPolyfill('isConcatSpreadable')),
		iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
		match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
		replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
		search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
		species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
		split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
		toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
		toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
		unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
	});

	// Internal tweaks for real symbol producer
	defineProperties(HiddenSymbol.prototype, {
		constructor: d(SymbolPolyfill),
		toString: d('', function () { return this.__name__; })
	});

	// Proper implementation of methods exposed on Symbol.prototype
	// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
	defineProperties(SymbolPolyfill.prototype, {
		toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
		valueOf: d(function () { return validateSymbol(this); })
	});
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
		var symbol = validateSymbol(this);
		if (typeof symbol === 'symbol') return symbol;
		return symbol.toString();
	}));
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

	// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

	// Note: It's important to define `toPrimitive` as last one, as some implementations
	// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
	// And that may invoke error in definition flow:
	// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign        = __webpack_require__(5)
	  , normalizeOpts = __webpack_require__(12)
	  , isCallable    = __webpack_require__(13)
	  , contains      = __webpack_require__(14)

	  , d;

	d = module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if ((arguments.length < 2) || (typeof dscr !== 'string')) {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};

	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(6)()
		? Object.assign
		: __webpack_require__(7);


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== 'function') return false;
		obj = { foo: 'raz' };
		assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
		return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys  = __webpack_require__(8)
	  , value = __webpack_require__(11)

	  , max = Math.max;

	module.exports = function (dest, src/*, …srcn*/) {
		var error, i, l = max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = function (key) {
			try { dest[key] = src[key]; } catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < l; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(9)()
		? Object.keys
		: __webpack_require__(10);


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		try {
			Object.keys('primitive');
			return true;
		} catch (e) { return false; }
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var keys = Object.keys;

	module.exports = function (object) {
		return keys(object == null ? object : Object(object));
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
		if (value == null) throw new TypeError("Cannot use null or undefined");
		return value;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var forEach = Array.prototype.forEach, create = Object.create;

	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	module.exports = function (options/*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (options == null) return;
			process(Object(options), result);
		});
		return result;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	// Deprecated

	'use strict';

	module.exports = function (obj) { return typeof obj === 'function'; };


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(15)()
		? String.prototype.contains
		: __webpack_require__(16);


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var str = 'razdwatrzy';

	module.exports = function () {
		if (typeof str.contains !== 'function') return false;
		return ((str.contains('dwa') === true) && (str.contains('foo') === false));
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	var indexOf = String.prototype.indexOf;

	module.exports = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isSymbol = __webpack_require__(18);

	module.exports = function (value) {
		if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
		return value;
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (x) {
		if (!x) return false;
		if (typeof x === 'symbol') return true;
		if (!x.constructor) return false;
		if (x.constructor.name !== 'Symbol') return false;
		return (x[x.constructor.toStringTag] === 'Symbol');
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(53);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(191);

	var _reactIntlRedux = __webpack_require__(215);

	var _i18n = __webpack_require__(241);

	var _reactRouter = __webpack_require__(246);

	var _reactReduxModal = __webpack_require__(306);

	var _reactReduxModal2 = _interopRequireDefault(_reactReduxModal);

	var _store = __webpack_require__(316);

	var _store2 = _interopRequireDefault(_store);

	var _socketMiddleware = __webpack_require__(317);

	var _socketMiddleware2 = _interopRequireDefault(_socketMiddleware);

	var _Router = __webpack_require__(362);

	var _Router2 = _interopRequireDefault(_Router);

	var _intialData = __webpack_require__(461);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Creating a store and passing it to provider
	 */


	// Importing our own libraries

	/**
	 * Had to comment out intl code as 
	 * it was giving iterator error in web pack
	 * Need to work on this
	 */
	var initState = _intialData.preloadedState;

	//Import redux modal
	/**
	 * Importing required modules
	 */

	// Importing third party libraries

	var store = (0, _store2.default)(initState);

	_reactDom2.default.render(_react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2.default.createElement(
			_reactIntlRedux.IntlProvider,
			{ messages: _i18n.translationMessages.en },
			_react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_Router2.default, null),
				_react2.default.createElement(_reactReduxModal2.default, null)
			)
		)
	), document.getElementById('container'));

/***/ },
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.translationMessages = exports.formatTranslationMessages = undefined;

	var _reactIntl = __webpack_require__(218);

	var _en = __webpack_require__(242);

	var _en2 = _interopRequireDefault(_en);

	var _ja = __webpack_require__(243);

	var _ja2 = _interopRequireDefault(_ja);

	var _enUS = __webpack_require__(244);

	var _enUS2 = _interopRequireDefault(_enUS);

	var _jaJP = __webpack_require__(245);

	var _jaJP2 = _interopRequireDefault(_jaJP);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
	                                                                                                                                                                                                     * i18n.js
	                                                                                                                                                                                                     *
	                                                                                                                                                                                                     * This will setup the i18n language files and locale data for your app.
	                                                                                                                                                                                                     *
	                                                                                                                                                                                                     */


	(0, _reactIntl.addLocaleData)([].concat(_toConsumableArray(_en2.default), _toConsumableArray(_ja2.default), _toConsumableArray(_enUS2.default), _toConsumableArray(_jaJP2.default)));

	var formatTranslationMessages = exports.formatTranslationMessages = function formatTranslationMessages(messages) {
	  var formattedMessages = {};
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = messages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var message = _step.value;

	      formattedMessages[message.id] = message.message || message.defaultMessage;
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return formattedMessages;
	};

	var translationMessages = exports.translationMessages = {
	  en: formatTranslationMessages(_enUS2.default),
	  ja: formatTranslationMessages(_jaJP2.default)
	};

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,a){ true?module.exports=a():"function"==typeof define&&define.amd?define(a):(e.ReactIntlLocaleData=e.ReactIntlLocaleData||{},e.ReactIntlLocaleData.en=a())}(this,function(){"use strict";var e=[{locale:"en",pluralRuleFunction:function(e,a){var n=String(e).split("."),l=!n[1],o=Number(n[0])==e,t=o&&n[0].slice(-1),r=o&&n[0].slice(-2);return a?1==t&&11!=r?"one":2==t&&12!=r?"two":3==t&&13!=r?"few":"other":1==e&&l?"one":"other"},fields:{year:{displayName:"year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{one:"in {0} year",other:"in {0} years"},past:{one:"{0} year ago",other:"{0} years ago"}}},month:{displayName:"month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"in {0} month",other:"in {0} months"},past:{one:"{0} month ago",other:"{0} months ago"}}},day:{displayName:"day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{one:"in {0} day",other:"in {0} days"},past:{one:"{0} day ago",other:"{0} days ago"}}},hour:{displayName:"hour",relativeTime:{future:{one:"in {0} hour",other:"in {0} hours"},past:{one:"{0} hour ago",other:"{0} hours ago"}}},minute:{displayName:"minute",relativeTime:{future:{one:"in {0} minute",other:"in {0} minutes"},past:{one:"{0} minute ago",other:"{0} minutes ago"}}},second:{displayName:"second",relative:{0:"now"},relativeTime:{future:{one:"in {0} second",other:"in {0} seconds"},past:{one:"{0} second ago",other:"{0} seconds ago"}}}}},{locale:"en-001",parentLocale:"en"},{locale:"en-150",parentLocale:"en-001"},{locale:"en-AG",parentLocale:"en-001"},{locale:"en-AI",parentLocale:"en-001"},{locale:"en-AS",parentLocale:"en"},{locale:"en-AT",parentLocale:"en-150"},{locale:"en-AU",parentLocale:"en-001"},{locale:"en-BB",parentLocale:"en-001"},{locale:"en-BE",parentLocale:"en-001"},{locale:"en-BI",parentLocale:"en"},{locale:"en-BM",parentLocale:"en-001"},{locale:"en-BS",parentLocale:"en-001"},{locale:"en-BW",parentLocale:"en-001"},{locale:"en-BZ",parentLocale:"en-001"},{locale:"en-CA",parentLocale:"en-001"},{locale:"en-CC",parentLocale:"en-001"},{locale:"en-CH",parentLocale:"en-150"},{locale:"en-CK",parentLocale:"en-001"},{locale:"en-CM",parentLocale:"en-001"},{locale:"en-CX",parentLocale:"en-001"},{locale:"en-CY",parentLocale:"en-001"},{locale:"en-DE",parentLocale:"en-150"},{locale:"en-DG",parentLocale:"en-001"},{locale:"en-DK",parentLocale:"en-150"},{locale:"en-DM",parentLocale:"en-001"},{locale:"en-Dsrt",pluralRuleFunction:function(e,a){return"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"en-ER",parentLocale:"en-001"},{locale:"en-FI",parentLocale:"en-150"},{locale:"en-FJ",parentLocale:"en-001"},{locale:"en-FK",parentLocale:"en-001"},{locale:"en-FM",parentLocale:"en-001"},{locale:"en-GB",parentLocale:"en-001"},{locale:"en-GD",parentLocale:"en-001"},{locale:"en-GG",parentLocale:"en-001"},{locale:"en-GH",parentLocale:"en-001"},{locale:"en-GI",parentLocale:"en-001"},{locale:"en-GM",parentLocale:"en-001"},{locale:"en-GU",parentLocale:"en"},{locale:"en-GY",parentLocale:"en-001"},{locale:"en-HK",parentLocale:"en-001"},{locale:"en-IE",parentLocale:"en-001"},{locale:"en-IL",parentLocale:"en-001"},{locale:"en-IM",parentLocale:"en-001"},{locale:"en-IN",parentLocale:"en-001"},{locale:"en-IO",parentLocale:"en-001"},{locale:"en-JE",parentLocale:"en-001"},{locale:"en-JM",parentLocale:"en-001"},{locale:"en-KE",parentLocale:"en-001"},{locale:"en-KI",parentLocale:"en-001"},{locale:"en-KN",parentLocale:"en-001"},{locale:"en-KY",parentLocale:"en-001"},{locale:"en-LC",parentLocale:"en-001"},{locale:"en-LR",parentLocale:"en-001"},{locale:"en-LS",parentLocale:"en-001"},{locale:"en-MG",parentLocale:"en-001"},{locale:"en-MH",parentLocale:"en"},{locale:"en-MO",parentLocale:"en-001"},{locale:"en-MP",parentLocale:"en"},{locale:"en-MS",parentLocale:"en-001"},{locale:"en-MT",parentLocale:"en-001"},{locale:"en-MU",parentLocale:"en-001"},{locale:"en-MW",parentLocale:"en-001"},{locale:"en-MY",parentLocale:"en-001"},{locale:"en-NA",parentLocale:"en-001"},{locale:"en-NF",parentLocale:"en-001"},{locale:"en-NG",parentLocale:"en-001"},{locale:"en-NL",parentLocale:"en-150"},{locale:"en-NR",parentLocale:"en-001"},{locale:"en-NU",parentLocale:"en-001"},{locale:"en-NZ",parentLocale:"en-001"},{locale:"en-PG",parentLocale:"en-001"},{locale:"en-PH",parentLocale:"en-001"},{locale:"en-PK",parentLocale:"en-001"},{locale:"en-PN",parentLocale:"en-001"},{locale:"en-PR",parentLocale:"en"},{locale:"en-PW",parentLocale:"en-001"},{locale:"en-RW",parentLocale:"en-001"},{locale:"en-SB",parentLocale:"en-001"},{locale:"en-SC",parentLocale:"en-001"},{locale:"en-SD",parentLocale:"en-001"},{locale:"en-SE",parentLocale:"en-150"},{locale:"en-SG",parentLocale:"en-001"},{locale:"en-SH",parentLocale:"en-001"},{locale:"en-SI",parentLocale:"en-150"},{locale:"en-SL",parentLocale:"en-001"},{locale:"en-SS",parentLocale:"en-001"},{locale:"en-SX",parentLocale:"en-001"},{locale:"en-SZ",parentLocale:"en-001"},{locale:"en-Shaw",pluralRuleFunction:function(e,a){return"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"en-TC",parentLocale:"en-001"},{locale:"en-TK",parentLocale:"en-001"},{locale:"en-TO",parentLocale:"en-001"},{locale:"en-TT",parentLocale:"en-001"},{locale:"en-TV",parentLocale:"en-001"},{locale:"en-TZ",parentLocale:"en-001"},{locale:"en-UG",parentLocale:"en-001"},{locale:"en-UM",parentLocale:"en"},{locale:"en-US",parentLocale:"en"},{locale:"en-VC",parentLocale:"en-001"},{locale:"en-VG",parentLocale:"en-001"},{locale:"en-VI",parentLocale:"en"},{locale:"en-VU",parentLocale:"en-001"},{locale:"en-WS",parentLocale:"en-001"},{locale:"en-ZA",parentLocale:"en-001"},{locale:"en-ZM",parentLocale:"en-001"},{locale:"en-ZW",parentLocale:"en-001"}];return e});

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):(e.ReactIntlLocaleData=e.ReactIntlLocaleData||{},e.ReactIntlLocaleData.ja=t())}(this,function(){"use strict";var e=[{locale:"ja",pluralRuleFunction:function(e,t){return"other"},fields:{year:{displayName:"年",relative:{0:"今年",1:"翌年","-1":"昨年"},relativeTime:{future:{other:"{0} 年後"},past:{other:"{0} 年前"}}},month:{displayName:"月",relative:{0:"今月",1:"翌月","-1":"先月"},relativeTime:{future:{other:"{0} か月後"},past:{other:"{0} か月前"}}},day:{displayName:"日",relative:{0:"今日",1:"明日",2:"明後日","-2":"一昨日","-1":"昨日"},relativeTime:{future:{other:"{0} 日後"},past:{other:"{0} 日前"}}},hour:{displayName:"時",relativeTime:{future:{other:"{0} 時間後"},past:{other:"{0} 時間前"}}},minute:{displayName:"分",relativeTime:{future:{other:"{0} 分後"},past:{other:"{0} 分前"}}},second:{displayName:"秒",relative:{0:"今すぐ"},relativeTime:{future:{other:"{0} 秒後"},past:{other:"{0} 秒前"}}}}}];return e});

/***/ },
/* 244 */
/***/ function(module, exports) {

	"use strict";

	module.exports = [{
		"id": "login.lang.english",
		"description": "English option in the language drop down",
		"defaultMessage": "English"
	}, {
		"id": "login.lang.japanese",
		"description": "Japanese option in the language drop down",
		"defaultMessage": "Japanese"
	}, {
		"id": "login.form.username",
		"description": "Text for username",
		"defaultMessage": "Username"
	}, {
		"id": "login.form.password",
		"description": "Text for password",
		"defaultMessage": "Password"
	}, {
		"id": "login.butler.language",
		"description": "Text for language",
		"defaultMessage": "Language"
	}, {
		"id": "login.butler.title",
		"description": "Text for butler management Login form title",
		"defaultMessage": "Butler"
	}, {
		"id": "login.butler.manageInterface",
		"description": "Text for Management Interface",
		"defaultMessage": "Management Interface"
	}, {
		"id": "login.butler.fail",
		"description": "Text for login failure",
		"defaultMessage": "Invalid username and/or password"
	}, {
		"id": "login.butler.error.username",
		"description": "Text for missing username error",
		"defaultMessage": "Please enter your username"
	}, {
		"id": "login.butler.error.password",
		"description": "Text for missing password error",
		"defaultMessage": "Please enter your password"
	}, {
		"id": "widget.audit.heading.value",
		"description": "Total Items Audited",
		"defaultMessage": "None"
	}, {
		"id": "widget.audit.status.offline",
		"description": "Offline Status",
		"defaultMessage": "Offline"
	}, {
		"id": "widget.audit.status.starting",
		"description": "Awaiting throughput data",
		"defaultMessage": "Starting..."
	}, {
		"id": "widget.audit.throughput",
		"description": "Throughput message",
		"defaultMessage": "{count} {pluralMsg} auditing {throughput} items/hr"
	}, {
		"id": "widget.audit.heading",
		"description": "Audit Item Heading",
		"defaultMessage": "Items audited"
	}, {
		"id": "widget.pick.headingleft",
		"description": "Heading for pick status widget",
		"defaultMessage": "Orders to fullfill"
	}, {
		"id": "widget.pick.completed",
		"description": "Text for completed",
		"defaultMessage": "Completed"
	}, {
		"id": "widget.pick.status.idle",
		"description": "Throughput message",
		"defaultMessage": "{count} PPS idle"
	}, {
		"id": "widget.pick.headingright",
		"description": "Heading for cut-off time",
		"defaultMessage": "Time to cut-off"
	}, {
		"id": "widget.pick.textright",
		"description": "Time remaining",
		"defaultMessage": "{cut_off}"
	}, {
		"id": "widget.pick.throughput",
		"description": "Throughput message",
		"defaultMessage": "{count} PPS fullfilling at {throughput} items/hr"
	}, {
		"id": "widget.pick.lowright",
		"description": "Estimated time",
		"defaultMessage": "Completing in {eta}"
	}, {
		"id": "widget.pick.statusleft",
		"description": "Text for on schedule",
		"defaultMessage": "On Schedule"
	}, {
		"id": "widget.pick.statusRight",
		"description": "Text for orders at risk",
		"defaultMessage": "{count_risk} {count_risk, plural, one {order} other {orders}} at risk"
	}, {
		"id": "widget.put.heading.value",
		"description": "Total Items Stocked",
		"defaultMessage": "None"
	}, {
		"id": "widget.put.status.offline",
		"description": "Offline Status",
		"defaultMessage": "Offline"
	}, {
		"id": "widget.put.status.starting",
		"description": "Awaiting throughput data",
		"defaultMessage": "Starting..."
	}, {
		"id": "widget.put.throughput",
		"description": "Throughput message",
		"defaultMessage": "{count} {pluralMsg} stocking {throughput} items/hr"
	}, {
		"id": "widget.put.heading",
		"description": "Put Item Heading",
		"defaultMessage": "Items stocked"
	}, {
		"id": "butlerBot.table.heading",
		"description": "Heading for butlerbot",
		"defaultMessage": "BUTLER BOTS"
	}, {
		"id": "butlerBot.table.status",
		"description": "Status for butlerbot",
		"defaultMessage": "STATUS"
	}, {
		"id": "butlerBot.table.currentTask",
		"description": "Current task for butlerbot",
		"defaultMessage": "CURRENT TASK"
	}, {
		"id": "butlerBot.table.msu",
		"description": "MSU Status for butlerbot",
		"defaultMessage": "MSU"
	}, {
		"id": "butlerBot.table.location",
		"description": "Location for butlerbot",
		"defaultMessage": "LOCATION"
	}, {
		"id": "butlerBot.table.voltage",
		"description": "voltage for butlerbot",
		"defaultMessage": "VOLTAGE"
	}, {
		"id": "ChargingStations.table.heading",
		"description": "Heading for ChargingStations",
		"defaultMessage": "CHARGING STATIONS"
	}, {
		"id": "ChargingStations.table.operatingMode",
		"description": "operatingMode for ChargingStations",
		"defaultMessage": "OPERATING MODE"
	}, {
		"id": "pps.table.heading",
		"description": "Heading for PPS",
		"defaultMessage": "PPS"
	}, {
		"id": "PPS.table.status",
		"description": "Status for PPS",
		"defaultMessage": "STATUS"
	}, {
		"id": "PPS.table.operatingMode",
		"description": "operatingMode for PPS",
		"defaultMessage": "OPERATING MODE"
	}, {
		"id": "PPS.table.performance",
		"description": "performance Status for PPS",
		"defaultMessage": "PERFORMANCE"
	}, {
		"id": "PPS.table.operatorAssigned",
		"description": "operatorAssigned for PPS",
		"defaultMessage": "OPERATOR ASSIGNED"
	}, {
		"id": "users.add.heading",
		"description": "Heading for Add new user",
		"defaultMessage": "Add new user"
	}, {
		"id": "users.add.subheading",
		"description": "Subheading for add new user",
		"defaultMessage": "All the fields are mandatory"
	}, {
		"id": "users.add.userdetails.heading",
		"description": "Text for user details heading",
		"defaultMessage": "Enter User details"
	}, {
		"id": "users.add.userdetails.subheading",
		"description": "Text for user details subheading",
		"defaultMessage": "A User ID will be required to log into the system"
	}, {
		"id": "users.add.userdetails.userid",
		"description": "Text for user id",
		"defaultMessage": "User ID"
	}, {
		"id": "users.add.userdetails.firstname",
		"description": "Text for first name",
		"defaultMessage": "First Name"
	}, {
		"id": "users.add.userdetails.lastname",
		"description": "Text for last name",
		"defaultMessage": "Last Name"
	}, {
		"id": "users.add.roledetails.heading",
		"description": "Heading for role",
		"defaultMessage": "Choose a role"
	}, {
		"id": "users.add.roledetails.subheading",
		"description": "Subheading for role",
		"defaultMessage": "User will be given a specific level of control over the Butler system depending on the designated role"
	}, {
		"id": "users.add.roledetails.operator",
		"description": "Text for operator",
		"defaultMessage": "Operator"
	}, {
		"id": "users.add.roledetails.operatortext",
		"description": "Subtext for operator",
		"defaultMessage": "Grant access to the Operator Interface at each Pick Put Station in the Butler system"
	}, {
		"id": "users.add.roledetails.pick",
		"description": "Text for pick operator",
		"defaultMessage": "Pick Operator"
	}, {
		"id": "users.add.roledetails.put",
		"description": "Text for put operator",
		"defaultMessage": "Put Operator"
	}, {
		"id": "users.add.roledetails.audit",
		"description": "Text for audit",
		"defaultMessage": "Audit"
	}, {
		"id": "users.add.roledetails.supervisor",
		"description": "Text for supervisor",
		"defaultMessage": "Supervisor"
	}, {
		"id": "users.add.roledetails.supervisortext",
		"description": "Subtext for supervisor",
		"defaultMessage": "Grant access to the Management Interface and Operator Interface for the Butler system"
	}, {
		"id": "users.add.roledetails.manager",
		"description": "Text for manager",
		"defaultMessage": "Manager"
	}, {
		"id": "users.add.roledetails.managertext",
		"description": "Subtext for manager",
		"defaultMessage": "Grant access to the Management Interface and Operator Interface to all systems"
	}, {
		"id": "users.add.password.heading",
		"description": "Heading for create password",
		"defaultMessage": "Create password"
	}, {
		"id": "sers.add.password.subheading",
		"description": "Subheading for create password",
		"defaultMessage": "Min of 6 digits will be required for logging into the Operator Interface"
	}, {
		"id": "users.add.password.field1",
		"description": "Text for password",
		"defaultMessage": "Password"
	}, {
		"id": "users.add.password.field2",
		"description": "Text for confirm password",
		"defaultMessage": "Confirm Password"
	}, {
		"id": "users.add.password.button",
		"description": "Text for add new user button",
		"defaultMessage": "Add new user"
	}, {
		"id": "user.table.heading",
		"description": "Heading for users table",
		"defaultMessage": "USERS"
	}, {
		"id": "user.table.users",
		"description": "Users Column",
		"defaultMessage": "USERS"
	}, {
		"id": "user.table.status",
		"description": "Users Status",
		"defaultMessage": "STATUS"
	}, {
		"id": "user.table.role",
		"description": "User Role",
		"defaultMessage": "ROLE"
	}, {
		"id": "user.table.workMode",
		"description": "User Workmode",
		"defaultMessage": "WORKMODE"
	}, {
		"id": "user.table.location",
		"description": "User location",
		"defaultMessage": "LOCATION"
	}, {
		"id": "user.table.productivity",
		"description": "User productivity",
		"defaultMessage": "PRODUCTIVITY"
	}, {
		"id": "user.table.logInTime",
		"description": "User log in time",
		"defaultMessage": "LOG IN TIME"
	}];

/***/ },
/* 245 */
/***/ function(module, exports) {

	"use strict";

	module.exports = [{
		"id": "login.lang.english",
		"description": "English option in the language drop down",
		"defaultMessage": "日本語"
	}, {
		"id": "login.lang.japanese",
		"description": "Japanese option in the language drop down",
		"defaultMessage": "日本語"
	}, {
		"id": "login.form.username",
		"description": "Text for username",
		"defaultMessage": "日本語"
	}, {
		"id": "login.form.password",
		"description": "Text for password",
		"defaultMessage": "日本語"
	}, {
		"id": "login.butler.language",
		"description": "Text for language",
		"defaultMessage": "日本語"
	}, {
		"id": "login.butler.title",
		"description": "Text for butler management Login form title",
		"defaultMessage": "日本語"
	}, {
		"id": "login.butler.manageInterface",
		"description": "Text for Management Interface",
		"defaultMessage": "日本語"
	}, {
		"id": "login.butler.fail",
		"description": "Text for login failure",
		"defaultMessage": "日本語"
	}, {
		"id": "login.butler.error.username",
		"description": "Text for missing username error",
		"defaultMessage": "日本語"
	}, {
		"id": "login.butler.error.password",
		"description": "Text for missing password error",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.audit.heading.value",
		"description": "Total Items Audited",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.audit.status.offline",
		"description": "Offline Status",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.audit.status.starting",
		"description": "Awaiting throughput data",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.audit.throughput",
		"description": "Throughput message",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.audit.heading",
		"description": "Audit Item Heading",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.pick.headingleft",
		"description": "Heading for pick status widget",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.pick.completed",
		"description": "Text for completed",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.pick.status.idle",
		"description": "Throughput message",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.pick.headingright",
		"description": "Heading for cut-off time",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.pick.textright",
		"description": "Time remaining",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.pick.throughput",
		"description": "Throughput message",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.pick.lowright",
		"description": "Estimated time",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.pick.statusleft",
		"description": "Text for on schedule",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.pick.statusRight",
		"description": "Text for orders at risk",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.put.heading.value",
		"description": "Total Items Stocked",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.put.status.offline",
		"description": "Offline Status",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.put.status.starting",
		"description": "Awaiting throughput data",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.put.throughput",
		"description": "Throughput message",
		"defaultMessage": "日本語"
	}, {
		"id": "widget.put.heading",
		"description": "Put Item Heading",
		"defaultMessage": "日本語"
	}, {
		"id": "butlerBot.table.heading",
		"description": "Heading for butlerbot",
		"defaultMessage": "日本語"
	}, {
		"id": "butlerBot.table.status",
		"description": "Status for butlerbot",
		"defaultMessage": "日本語"
	}, {
		"id": "butlerBot.table.currentTask",
		"description": "Current task for butlerbot",
		"defaultMessage": "日本語"
	}, {
		"id": "butlerBot.table.msu",
		"description": "MSU Status for butlerbot",
		"defaultMessage": "日本語"
	}, {
		"id": "butlerBot.table.location",
		"description": "Location for butlerbot",
		"defaultMessage": "日本語"
	}, {
		"id": "butlerBot.table.voltage",
		"description": "voltage for butlerbot",
		"defaultMessage": "日本語"
	}, {
		"id": "ChargingStations.table.heading",
		"description": "Heading for ChargingStations",
		"defaultMessage": "日本語"
	}, {
		"id": "ChargingStations.table.operatingMode",
		"description": "operatingMode for ChargingStations",
		"defaultMessage": "日本語"
	}, {
		"id": "pps.table.heading",
		"description": "Heading for PPS",
		"defaultMessage": "日本語"
	}, {
		"id": "PPS.table.status",
		"description": "Status for PPS",
		"defaultMessage": "日本語"
	}, {
		"id": "PPS.table.operatingMode",
		"description": "operatingMode for PPS",
		"defaultMessage": "日本語"
	}, {
		"id": "PPS.table.performance",
		"description": "performance Status for PPS",
		"defaultMessage": "日本語"
	}, {
		"id": "PPS.table.operatorAssigned",
		"description": "operatorAssigned for PPS",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.heading",
		"description": "Heading for Add new user",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.subheading",
		"description": "Subheading for add new user",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.userdetails.heading",
		"description": "Text for user details heading",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.userdetails.subheading",
		"description": "Text for user details subheading",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.userdetails.userid",
		"description": "Text for user id",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.userdetails.firstname",
		"description": "Text for first name",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.userdetails.lastname",
		"description": "Text for last name",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.roledetails.heading",
		"description": "Heading for role",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.roledetails.subheading",
		"description": "Subheading for role",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.roledetails.operator",
		"description": "Text for operator",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.roledetails.operatortext",
		"description": "Subtext for operator",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.roledetails.pick",
		"description": "Text for pick operator",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.roledetails.put",
		"description": "Text for put operator",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.roledetails.audit",
		"description": "Text for audit",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.roledetails.supervisor",
		"description": "Text for supervisor",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.roledetails.supervisortext",
		"description": "Subtext for supervisor",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.roledetails.manager",
		"description": "Text for manager",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.roledetails.managertext",
		"description": "Subtext for manager",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.password.heading",
		"description": "Heading for create password",
		"defaultMessage": "日本語"
	}, {
		"id": "sers.add.password.subheading",
		"description": "Subheading for create password",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.password.field1",
		"description": "Text for password",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.password.field2",
		"description": "Text for confirm password",
		"defaultMessage": "日本語"
	}, {
		"id": "users.add.password.button",
		"description": "Text for add new user button",
		"defaultMessage": "日本語"
	}, {
		"id": "user.table.heading",
		"description": "Heading for users table",
		"defaultMessage": "日本語"
	}, {
		"id": "user.table.users",
		"description": "Users Column",
		"defaultMessage": "日本語"
	}, {
		"id": "user.table.status",
		"description": "Users Status",
		"defaultMessage": "日本語"
	}, {
		"id": "user.table.role",
		"description": "User Role",
		"defaultMessage": "日本語"
	}, {
		"id": "user.table.workMode",
		"description": "User Workmode",
		"defaultMessage": "日本語"
	}, {
		"id": "user.table.location",
		"description": "User location",
		"defaultMessage": "日本語"
	}, {
		"id": "user.table.productivity",
		"description": "User productivity",
		"defaultMessage": "日本語"
	}, {
		"id": "user.table.logInTime",
		"description": "User log in time",
		"defaultMessage": "日本語"
	}];

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.createMemoryHistory = exports.hashHistory = exports.browserHistory = exports.applyRouterMiddleware = exports.formatPattern = exports.useRouterHistory = exports.match = exports.routerShape = exports.locationShape = exports.PropTypes = exports.RoutingContext = exports.RouterContext = exports.createRoutes = exports.useRoutes = exports.RouteContext = exports.Lifecycle = exports.History = exports.Route = exports.Redirect = exports.IndexRoute = exports.IndexRedirect = exports.withRouter = exports.IndexLink = exports.Link = exports.Router = undefined;

	var _RouteUtils = __webpack_require__(247);

	Object.defineProperty(exports, 'createRoutes', {
	  enumerable: true,
	  get: function get() {
	    return _RouteUtils.createRoutes;
	  }
	});

	var _PropTypes2 = __webpack_require__(248);

	Object.defineProperty(exports, 'locationShape', {
	  enumerable: true,
	  get: function get() {
	    return _PropTypes2.locationShape;
	  }
	});
	Object.defineProperty(exports, 'routerShape', {
	  enumerable: true,
	  get: function get() {
	    return _PropTypes2.routerShape;
	  }
	});

	var _PatternUtils = __webpack_require__(252);

	Object.defineProperty(exports, 'formatPattern', {
	  enumerable: true,
	  get: function get() {
	    return _PatternUtils.formatPattern;
	  }
	});

	var _Router2 = __webpack_require__(253);

	var _Router3 = _interopRequireDefault(_Router2);

	var _Link2 = __webpack_require__(284);

	var _Link3 = _interopRequireDefault(_Link2);

	var _IndexLink2 = __webpack_require__(285);

	var _IndexLink3 = _interopRequireDefault(_IndexLink2);

	var _withRouter2 = __webpack_require__(286);

	var _withRouter3 = _interopRequireDefault(_withRouter2);

	var _IndexRedirect2 = __webpack_require__(287);

	var _IndexRedirect3 = _interopRequireDefault(_IndexRedirect2);

	var _IndexRoute2 = __webpack_require__(289);

	var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);

	var _Redirect2 = __webpack_require__(288);

	var _Redirect3 = _interopRequireDefault(_Redirect2);

	var _Route2 = __webpack_require__(290);

	var _Route3 = _interopRequireDefault(_Route2);

	var _History2 = __webpack_require__(291);

	var _History3 = _interopRequireDefault(_History2);

	var _Lifecycle2 = __webpack_require__(292);

	var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);

	var _RouteContext2 = __webpack_require__(293);

	var _RouteContext3 = _interopRequireDefault(_RouteContext2);

	var _useRoutes2 = __webpack_require__(294);

	var _useRoutes3 = _interopRequireDefault(_useRoutes2);

	var _RouterContext2 = __webpack_require__(281);

	var _RouterContext3 = _interopRequireDefault(_RouterContext2);

	var _RoutingContext2 = __webpack_require__(295);

	var _RoutingContext3 = _interopRequireDefault(_RoutingContext2);

	var _PropTypes3 = _interopRequireDefault(_PropTypes2);

	var _match2 = __webpack_require__(296);

	var _match3 = _interopRequireDefault(_match2);

	var _useRouterHistory2 = __webpack_require__(300);

	var _useRouterHistory3 = _interopRequireDefault(_useRouterHistory2);

	var _applyRouterMiddleware2 = __webpack_require__(301);

	var _applyRouterMiddleware3 = _interopRequireDefault(_applyRouterMiddleware2);

	var _browserHistory2 = __webpack_require__(302);

	var _browserHistory3 = _interopRequireDefault(_browserHistory2);

	var _hashHistory2 = __webpack_require__(305);

	var _hashHistory3 = _interopRequireDefault(_hashHistory2);

	var _createMemoryHistory2 = __webpack_require__(297);

	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Router = _Router3.default; /* components */

	exports.Link = _Link3.default;
	exports.IndexLink = _IndexLink3.default;
	exports.withRouter = _withRouter3.default;

	/* components (configuration) */

	exports.IndexRedirect = _IndexRedirect3.default;
	exports.IndexRoute = _IndexRoute3.default;
	exports.Redirect = _Redirect3.default;
	exports.Route = _Route3.default;

	/* mixins */

	exports.History = _History3.default;
	exports.Lifecycle = _Lifecycle3.default;
	exports.RouteContext = _RouteContext3.default;

	/* utils */

	exports.useRoutes = _useRoutes3.default;
	exports.RouterContext = _RouterContext3.default;
	exports.RoutingContext = _RoutingContext3.default;
	exports.PropTypes = _PropTypes3.default;
	exports.match = _match3.default;
	exports.useRouterHistory = _useRouterHistory3.default;
	exports.applyRouterMiddleware = _applyRouterMiddleware3.default;

	/* histories */

	exports.browserHistory = _browserHistory3.default;
	exports.hashHistory = _hashHistory3.default;
	exports.createMemoryHistory = _createMemoryHistory3.default;

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.isReactChildren = isReactChildren;
	exports.createRouteFromReactElement = createRouteFromReactElement;
	exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
	exports.createRoutes = createRoutes;

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isValidChild(object) {
	  return object == null || _react2.default.isValidElement(object);
	}

	function isReactChildren(object) {
	  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
	}

	function createRoute(defaultProps, props) {
	  return _extends({}, defaultProps, props);
	}

	function createRouteFromReactElement(element) {
	  var type = element.type;
	  var route = createRoute(type.defaultProps, element.props);

	  if (route.children) {
	    var childRoutes = createRoutesFromReactChildren(route.children, route);

	    if (childRoutes.length) route.childRoutes = childRoutes;

	    delete route.children;
	  }

	  return route;
	}

	/**
	 * Creates and returns a routes object from the given ReactChildren. JSX
	 * provides a convenient way to visualize how routes in the hierarchy are
	 * nested.
	 *
	 *   import { Route, createRoutesFromReactChildren } from 'react-router'
	 *
	 *   const routes = createRoutesFromReactChildren(
	 *     <Route component={App}>
	 *       <Route path="home" component={Dashboard}/>
	 *       <Route path="news" component={NewsFeed}/>
	 *     </Route>
	 *   )
	 *
	 * Note: This method is automatically used when you provide <Route> children
	 * to a <Router> component.
	 */
	function createRoutesFromReactChildren(children, parentRoute) {
	  var routes = [];

	  _react2.default.Children.forEach(children, function (element) {
	    if (_react2.default.isValidElement(element)) {
	      // Component classes may have a static create* method.
	      if (element.type.createRouteFromReactElement) {
	        var route = element.type.createRouteFromReactElement(element, parentRoute);

	        if (route) routes.push(route);
	      } else {
	        routes.push(createRouteFromReactElement(element));
	      }
	    }
	  });

	  return routes;
	}

	/**
	 * Creates and returns an array of routes from the given object which
	 * may be a JSX route, a plain object route, or an array of either.
	 */
	function createRoutes(routes) {
	  if (isReactChildren(routes)) {
	    routes = createRoutesFromReactChildren(routes);
	  } else if (routes && !Array.isArray(routes)) {
	    routes = [routes];
	  }

	  return routes;
	}

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.router = exports.routes = exports.route = exports.components = exports.component = exports.location = exports.history = exports.falsy = exports.locationShape = exports.routerShape = undefined;

	var _react = __webpack_require__(20);

	var _deprecateObjectProperties = __webpack_require__(249);

	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

	var _InternalPropTypes = __webpack_require__(251);

	var InternalPropTypes = _interopRequireWildcard(_InternalPropTypes);

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	var routerShape = exports.routerShape = shape({
	  push: func.isRequired,
	  replace: func.isRequired,
	  go: func.isRequired,
	  goBack: func.isRequired,
	  goForward: func.isRequired,
	  setRouteLeaveHook: func.isRequired,
	  isActive: func.isRequired
	});

	var locationShape = exports.locationShape = shape({
	  pathname: string.isRequired,
	  search: string.isRequired,
	  state: object,
	  action: string.isRequired,
	  key: string
	});

	// Deprecated stuff below:

	var falsy = exports.falsy = InternalPropTypes.falsy;
	var history = exports.history = InternalPropTypes.history;
	var location = exports.location = locationShape;
	var component = exports.component = InternalPropTypes.component;
	var components = exports.components = InternalPropTypes.components;
	var route = exports.route = InternalPropTypes.route;
	var routes = exports.routes = InternalPropTypes.routes;
	var router = exports.router = routerShape;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var deprecatePropType = function deprecatePropType(propType, message) {
	      return function () {
	        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
	        return propType.apply(undefined, arguments);
	      };
	    };

	    var deprecateInternalPropType = function deprecateInternalPropType(propType) {
	      return deprecatePropType(propType, 'This prop type is not intended for external use, and was previously exported by mistake. These internal prop types are deprecated for external use, and will be removed in a later version.');
	    };

	    var deprecateRenamedPropType = function deprecateRenamedPropType(propType, name) {
	      return deprecatePropType(propType, 'The `' + name + '` prop type is now exported as `' + name + 'Shape` to avoid name conflicts. This export is deprecated and will be removed in a later version.');
	    };

	    exports.falsy = falsy = deprecateInternalPropType(falsy);
	    exports.history = history = deprecateInternalPropType(history);
	    exports.component = component = deprecateInternalPropType(component);
	    exports.components = components = deprecateInternalPropType(components);
	    exports.route = route = deprecateInternalPropType(route);
	    exports.routes = routes = deprecateInternalPropType(routes);

	    exports.location = location = deprecateRenamedPropType(location, 'location');
	    exports.router = router = deprecateRenamedPropType(router, 'router');
	  })();
	}

	var defaultExport = {
	  falsy: falsy,
	  history: history,
	  location: location,
	  component: component,
	  components: components,
	  route: route,
	  // For some reason, routes was never here.
	  router: router
	};

	if (process.env.NODE_ENV !== 'production') {
	  defaultExport = (0, _deprecateObjectProperties2.default)(defaultExport, 'The default export from `react-router/lib/PropTypes` is deprecated. Please use the named exports instead.');
	}

	exports.default = defaultExport;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.canUseMembrane = undefined;

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var canUseMembrane = exports.canUseMembrane = false;

	// No-op by default.
	var deprecateObjectProperties = function deprecateObjectProperties(object) {
	  return object;
	};

	if (process.env.NODE_ENV !== 'production') {
	  try {
	    if (Object.defineProperty({}, 'x', {
	      get: function get() {
	        return true;
	      }
	    }).x) {
	      exports.canUseMembrane = canUseMembrane = true;
	    }
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */

	  if (canUseMembrane) {
	    deprecateObjectProperties = function deprecateObjectProperties(object, message) {
	      // Wrap the deprecated object in a membrane to warn on property access.
	      var membrane = {};

	      var _loop = function _loop(prop) {
	        if (!Object.prototype.hasOwnProperty.call(object, prop)) {
	          return 'continue';
	        }

	        if (typeof object[prop] === 'function') {
	          // Can't use fat arrow here because of use of arguments below.
	          membrane[prop] = function () {
	            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
	            return object[prop].apply(object, arguments);
	          };
	          return 'continue';
	        }

	        // These properties are non-enumerable to prevent React dev tools from
	        // seeing them and causing spurious warnings when accessing them. In
	        // principle this could be done with a proxy, but support for the
	        // ownKeys trap on proxies is not universal, even among browsers that
	        // otherwise support proxies.
	        Object.defineProperty(membrane, prop, {
	          get: function get() {
	            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
	            return object[prop];
	          }
	        });
	      };

	      for (var prop in object) {
	        var _ret = _loop(prop);

	        if (_ret === 'continue') continue;
	      }

	      return membrane;
	    };
	  }
	}

	exports.default = deprecateObjectProperties;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = routerWarning;
	exports._resetWarned = _resetWarned;

	var _warning = __webpack_require__(216);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var warned = {};

	function routerWarning(falseToWarn, message) {
	  // Only issue deprecation warnings once.
	  if (message.indexOf('deprecated') !== -1) {
	    if (warned[message]) {
	      return;
	    }

	    warned[message] = true;
	  }

	  message = '[react-router] ' + message;

	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  _warning2.default.apply(undefined, [falseToWarn, message].concat(args));
	}

	function _resetWarned() {
	  warned = {};
	}

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.routes = exports.route = exports.components = exports.component = exports.history = undefined;
	exports.falsy = falsy;

	var _react = __webpack_require__(20);

	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var arrayOf = _react.PropTypes.arrayOf;
	var oneOfType = _react.PropTypes.oneOfType;
	var element = _react.PropTypes.element;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	function falsy(props, propName, componentName) {
	  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
	}

	var history = exports.history = shape({
	  listen: func.isRequired,
	  push: func.isRequired,
	  replace: func.isRequired,
	  go: func.isRequired,
	  goBack: func.isRequired,
	  goForward: func.isRequired
	});

	var component = exports.component = oneOfType([func, string]);
	var components = exports.components = oneOfType([component, object]);
	var route = exports.route = oneOfType([object, element]);
	var routes = exports.routes = oneOfType([route, arrayOf(route)]);

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.compilePattern = compilePattern;
	exports.matchPattern = matchPattern;
	exports.getParamNames = getParamNames;
	exports.getParams = getParams;
	exports.formatPattern = formatPattern;

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function _compilePattern(pattern) {
	  var regexpSource = '';
	  var paramNames = [];
	  var tokens = [];

	  var match = void 0,
	      lastIndex = 0,
	      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g;
	  while (match = matcher.exec(pattern)) {
	    if (match.index !== lastIndex) {
	      tokens.push(pattern.slice(lastIndex, match.index));
	      regexpSource += escapeRegExp(pattern.slice(lastIndex, match.index));
	    }

	    if (match[1]) {
	      regexpSource += '([^/]+)';
	      paramNames.push(match[1]);
	    } else if (match[0] === '**') {
	      regexpSource += '(.*)';
	      paramNames.push('splat');
	    } else if (match[0] === '*') {
	      regexpSource += '(.*?)';
	      paramNames.push('splat');
	    } else if (match[0] === '(') {
	      regexpSource += '(?:';
	    } else if (match[0] === ')') {
	      regexpSource += ')?';
	    }

	    tokens.push(match[0]);

	    lastIndex = matcher.lastIndex;
	  }

	  if (lastIndex !== pattern.length) {
	    tokens.push(pattern.slice(lastIndex, pattern.length));
	    regexpSource += escapeRegExp(pattern.slice(lastIndex, pattern.length));
	  }

	  return {
	    pattern: pattern,
	    regexpSource: regexpSource,
	    paramNames: paramNames,
	    tokens: tokens
	  };
	}

	var CompiledPatternsCache = Object.create(null);

	function compilePattern(pattern) {
	  if (!CompiledPatternsCache[pattern]) CompiledPatternsCache[pattern] = _compilePattern(pattern);

	  return CompiledPatternsCache[pattern];
	}

	/**
	 * Attempts to match a pattern on the given pathname. Patterns may use
	 * the following special characters:
	 *
	 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
	 *                  captured string is considered a "param"
	 * - ()             Wraps a segment of the URL that is optional
	 * - *              Consumes (non-greedy) all characters up to the next
	 *                  character in the pattern, or to the end of the URL if
	 *                  there is none
	 * - **             Consumes (greedy) all characters up to the next character
	 *                  in the pattern, or to the end of the URL if there is none
	 *
	 *  The function calls callback(error, matched) when finished.
	 * The return value is an object with the following properties:
	 *
	 * - remainingPathname
	 * - paramNames
	 * - paramValues
	 */
	function matchPattern(pattern, pathname) {
	  // Ensure pattern starts with leading slash for consistency with pathname.
	  if (pattern.charAt(0) !== '/') {
	    pattern = '/' + pattern;
	  }

	  var _compilePattern2 = compilePattern(pattern);

	  var regexpSource = _compilePattern2.regexpSource;
	  var paramNames = _compilePattern2.paramNames;
	  var tokens = _compilePattern2.tokens;


	  if (pattern.charAt(pattern.length - 1) !== '/') {
	    regexpSource += '/?'; // Allow optional path separator at end.
	  }

	  // Special-case patterns like '*' for catch-all routes.
	  if (tokens[tokens.length - 1] === '*') {
	    regexpSource += '$';
	  }

	  var match = pathname.match(new RegExp('^' + regexpSource, 'i'));
	  if (match == null) {
	    return null;
	  }

	  var matchedPath = match[0];
	  var remainingPathname = pathname.substr(matchedPath.length);

	  if (remainingPathname) {
	    // Require that the match ends at a path separator, if we didn't match
	    // the full path, so any remaining pathname is a new path segment.
	    if (matchedPath.charAt(matchedPath.length - 1) !== '/') {
	      return null;
	    }

	    // If there is a remaining pathname, treat the path separator as part of
	    // the remaining pathname for properly continuing the match.
	    remainingPathname = '/' + remainingPathname;
	  }

	  return {
	    remainingPathname: remainingPathname,
	    paramNames: paramNames,
	    paramValues: match.slice(1).map(function (v) {
	      return v && decodeURIComponent(v);
	    })
	  };
	}

	function getParamNames(pattern) {
	  return compilePattern(pattern).paramNames;
	}

	function getParams(pattern, pathname) {
	  var match = matchPattern(pattern, pathname);
	  if (!match) {
	    return null;
	  }

	  var paramNames = match.paramNames;
	  var paramValues = match.paramValues;

	  var params = {};

	  paramNames.forEach(function (paramName, index) {
	    params[paramName] = paramValues[index];
	  });

	  return params;
	}

	/**
	 * Returns a version of the given pattern with params interpolated. Throws
	 * if there is a dynamic segment of the pattern for which there is no param.
	 */
	function formatPattern(pattern, params) {
	  params = params || {};

	  var _compilePattern3 = compilePattern(pattern);

	  var tokens = _compilePattern3.tokens;

	  var parenCount = 0,
	      pathname = '',
	      splatIndex = 0;

	  var token = void 0,
	      paramName = void 0,
	      paramValue = void 0;
	  for (var i = 0, len = tokens.length; i < len; ++i) {
	    token = tokens[i];

	    if (token === '*' || token === '**') {
	      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;

	      !(paramValue != null || parenCount > 0) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Missing splat #%s for path "%s"', splatIndex, pattern) : (0, _invariant2.default)(false) : void 0;

	      if (paramValue != null) pathname += encodeURI(paramValue);
	    } else if (token === '(') {
	      parenCount += 1;
	    } else if (token === ')') {
	      parenCount -= 1;
	    } else if (token.charAt(0) === ':') {
	      paramName = token.substring(1);
	      paramValue = params[paramName];

	      !(paramValue != null || parenCount > 0) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Missing "%s" parameter for path "%s"', paramName, pattern) : (0, _invariant2.default)(false) : void 0;

	      if (paramValue != null) pathname += encodeURIComponent(paramValue);
	    } else {
	      pathname += token;
	    }
	  }

	  return pathname.replace(/\/+/g, '/');
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createHashHistory = __webpack_require__(254);

	var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

	var _useQueries = __webpack_require__(270);

	var _useQueries2 = _interopRequireDefault(_useQueries);

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _createTransitionManager = __webpack_require__(273);

	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

	var _InternalPropTypes = __webpack_require__(251);

	var _RouterContext = __webpack_require__(281);

	var _RouterContext2 = _interopRequireDefault(_RouterContext);

	var _RouteUtils = __webpack_require__(247);

	var _RouterUtils = __webpack_require__(283);

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function isDeprecatedHistory(history) {
	  return !history || !history.__v2_compatible__;
	}

	/* istanbul ignore next: sanity check */
	function isUnsupportedHistory(history) {
	  // v3 histories expose getCurrentLocation, but aren't currently supported.
	  return history && history.getCurrentLocation;
	}

	var _React$PropTypes = _react2.default.PropTypes;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;

	/**
	 * A <Router> is a high-level API for automatically setting up
	 * a router that renders a <RouterContext> with all the props
	 * it needs each time the URL changes.
	 */

	var Router = _react2.default.createClass({
	  displayName: 'Router',


	  propTypes: {
	    history: object,
	    children: _InternalPropTypes.routes,
	    routes: _InternalPropTypes.routes, // alias for children
	    render: func,
	    createElement: func,
	    onError: func,
	    onUpdate: func,

	    // Deprecated:
	    parseQueryString: func,
	    stringifyQuery: func,

	    // PRIVATE: For client-side rehydration of server match.
	    matchContext: object
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      render: function render(props) {
	        return _react2.default.createElement(_RouterContext2.default, props);
	      }
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      location: null,
	      routes: null,
	      params: null,
	      components: null
	    };
	  },
	  handleError: function handleError(error) {
	    if (this.props.onError) {
	      this.props.onError.call(this, error);
	    } else {
	      // Throw errors by default so we don't silently swallow them!
	      throw error; // This error probably occurred in getChildRoutes or getComponents.
	    }
	  },
	  componentWillMount: function componentWillMount() {
	    var _this = this;

	    var _props = this.props;
	    var parseQueryString = _props.parseQueryString;
	    var stringifyQuery = _props.stringifyQuery;

	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(!(parseQueryString || stringifyQuery), '`parseQueryString` and `stringifyQuery` are deprecated. Please create a custom history. http://tiny.cc/router-customquerystring') : void 0;

	    var _createRouterObjects = this.createRouterObjects();

	    var history = _createRouterObjects.history;
	    var transitionManager = _createRouterObjects.transitionManager;
	    var router = _createRouterObjects.router;


	    this._unlisten = transitionManager.listen(function (error, state) {
	      if (error) {
	        _this.handleError(error);
	      } else {
	        _this.setState(state, _this.props.onUpdate);
	      }
	    });

	    this.history = history;
	    this.router = router;
	  },
	  createRouterObjects: function createRouterObjects() {
	    var matchContext = this.props.matchContext;

	    if (matchContext) {
	      return matchContext;
	    }

	    var history = this.props.history;
	    var _props2 = this.props;
	    var routes = _props2.routes;
	    var children = _props2.children;


	    !!isUnsupportedHistory(history) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'You have provided a history object created with history v3.x. ' + 'This version of React Router is not compatible with v3 history ' + 'objects. Please use history v2.x instead.') : (0, _invariant2.default)(false) : void 0;

	    if (isDeprecatedHistory(history)) {
	      history = this.wrapDeprecatedHistory(history);
	    }

	    var transitionManager = (0, _createTransitionManager2.default)(history, (0, _RouteUtils.createRoutes)(routes || children));
	    var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
	    var routingHistory = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);

	    return { history: routingHistory, transitionManager: transitionManager, router: router };
	  },
	  wrapDeprecatedHistory: function wrapDeprecatedHistory(history) {
	    var _props3 = this.props;
	    var parseQueryString = _props3.parseQueryString;
	    var stringifyQuery = _props3.stringifyQuery;


	    var createHistory = void 0;
	    if (history) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'It appears you have provided a deprecated history object to `<Router/>`, please use a history provided by ' + 'React Router with `import { browserHistory } from \'react-router\'` or `import { hashHistory } from \'react-router\'`. ' + 'If you are using a custom history please create it with `useRouterHistory`, see http://tiny.cc/router-usinghistory for details.') : void 0;
	      createHistory = function createHistory() {
	        return history;
	      };
	    } else {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`Router` no longer defaults the history prop to hash history. Please use the `hashHistory` singleton instead. http://tiny.cc/router-defaulthistory') : void 0;
	      createHistory = _createHashHistory2.default;
	    }

	    return (0, _useQueries2.default)(createHistory)({ parseQueryString: parseQueryString, stringifyQuery: stringifyQuery });
	  },


	  /* istanbul ignore next: sanity check */
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : void 0;

	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : void 0;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlisten) this._unlisten();
	  },
	  render: function render() {
	    var _state = this.state;
	    var location = _state.location;
	    var routes = _state.routes;
	    var params = _state.params;
	    var components = _state.components;
	    var _props4 = this.props;
	    var createElement = _props4.createElement;
	    var render = _props4.render;

	    var props = _objectWithoutProperties(_props4, ['createElement', 'render']);

	    if (location == null) return null; // Async match

	    // Only forward non-Router-specific props to routing context, as those are
	    // the only ones that might be custom routing context props.
	    Object.keys(Router.propTypes).forEach(function (propType) {
	      return delete props[propType];
	    });

	    return render(_extends({}, props, {
	      history: this.history,
	      router: this.router,
	      location: location,
	      routes: routes,
	      params: params,
	      components: components,
	      createElement: createElement
	    }));
	  }
	});

	exports.default = Router;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(255);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(256);

	var _PathUtils = __webpack_require__(257);

	var _ExecutionEnvironment = __webpack_require__(258);

	var _DOMUtils = __webpack_require__(259);

	var _DOMStateStorage = __webpack_require__(260);

	var _createDOMHistory = __webpack_require__(261);

	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

	function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	}

	function ensureSlash() {
	  var path = _DOMUtils.getHashPath();

	  if (isAbsolutePath(path)) return true;

	  _DOMUtils.replaceHashPath('/' + path);

	  return false;
	}

	function addQueryStringValueToPath(path, key, value) {
	  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
	}

	function stripQueryStringValueFromPath(path, key) {
	  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
	}

	function getQueryStringValueFromPath(path, key) {
	  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
	  return match && match[1];
	}

	var DefaultQueryKey = '_k';

	function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;

	  var queryKey = options.queryKey;

	  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;

	  function getCurrentLocation() {
	    var path = _DOMUtils.getHashPath();

	    var key = undefined,
	        state = undefined;
	    if (queryKey) {
	      key = getQueryStringValueFromPath(path, queryKey);
	      path = stripQueryStringValueFromPath(path, queryKey);

	      if (key) {
	        state = _DOMStateStorage.readState(key);
	      } else {
	        state = null;
	        key = history.createKey();
	        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
	      }
	    } else {
	      key = state = null;
	    }

	    var location = _PathUtils.parsePath(path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function startHashChangeListener(_ref) {
	    var transitionTo = _ref.transitionTo;

	    function hashChangeListener() {
	      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.

	      transitionTo(getCurrentLocation());
	    }

	    ensureSlash();
	    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);

	    return function () {
	      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
	    };
	  }

	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;

	    if (action === _Actions.POP) return; // Nothing to do.

	    var path = (basename || '') + pathname + search;

	    if (queryKey) {
	      path = addQueryStringValueToPath(path, queryKey, key);
	      _DOMStateStorage.saveState(key, state);
	    } else {
	      // Drop key and state.
	      location.key = location.state = null;
	    }

	    var currentHash = _DOMUtils.getHashPath();

	    if (action === _Actions.PUSH) {
	      if (currentHash !== path) {
	        window.location.hash = path;
	      } else {
	        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
	      }
	    } else if (currentHash !== path) {
	      // REPLACE
	      _DOMUtils.replaceHashPath(path);
	    }
	  }

	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));

	  var listenerCount = 0,
	      stopHashChangeListener = undefined;

	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    var unlisten = history.listenBefore(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }

	  function listen(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    var unlisten = history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }

	  function push(location) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.push(location);
	  }

	  function replace(location) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.replace(location);
	  }

	  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();

	  function go(n) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;

	    history.go(n);
	  }

	  function createHref(path) {
	    return '#' + history.createHref(path);
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    history.registerTransitionHook(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);

	    if (--listenerCount === 0) stopHashChangeListener();
	  }

	  // deprecated
	  function pushState(state, path) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.pushState(state, path);
	  }

	  // deprecated
	  function replaceState(state, path) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.replaceState(state, path);
	  }

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    push: push,
	    replace: replace,
	    go: go,
	    createHref: createHref,

	    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
	    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
	    pushState: pushState, // deprecated - warning is in createHistory
	    replaceState: replaceState // deprecated - warning is in createHistory
	  });
	}

	exports['default'] = createHashHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 255 */
216,
/* 256 */
/***/ function(module, exports) {

	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	'use strict';

	exports.__esModule = true;
	var PUSH = 'PUSH';

	exports.PUSH = PUSH;
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = 'REPLACE';

	exports.REPLACE = REPLACE;
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = 'POP';

	exports.POP = POP;
	exports['default'] = {
	  PUSH: PUSH,
	  REPLACE: REPLACE,
	  POP: POP
	};

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.extractPath = extractPath;
	exports.parsePath = parsePath;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(255);

	var _warning2 = _interopRequireDefault(_warning);

	function extractPath(string) {
	  var match = string.match(/^https?:\/\/[^\/]*/);

	  if (match == null) return string;

	  return string.substring(match[0].length);
	}

	function parsePath(path) {
	  var pathname = extractPath(path);
	  var search = '';
	  var hash = '';

	  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }

	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }

	  if (pathname === '') pathname = '/';

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 258 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ },
/* 259 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.getHashPath = getHashPath;
	exports.replaceHashPath = replaceHashPath;
	exports.getWindowPath = getWindowPath;
	exports.go = go;
	exports.getUserConfirmation = getUserConfirmation;
	exports.supportsHistory = supportsHistory;
	exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

	function addEventListener(node, event, listener) {
	  if (node.addEventListener) {
	    node.addEventListener(event, listener, false);
	  } else {
	    node.attachEvent('on' + event, listener);
	  }
	}

	function removeEventListener(node, event, listener) {
	  if (node.removeEventListener) {
	    node.removeEventListener(event, listener, false);
	  } else {
	    node.detachEvent('on' + event, listener);
	  }
	}

	function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  return window.location.href.split('#')[1] || '';
	}

	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}

	function getWindowPath() {
	  return window.location.pathname + window.location.search + window.location.hash;
	}

	function go(n) {
	  if (n) window.history.go(n);
	}

	function getUserConfirmation(message, callback) {
	  callback(window.confirm(message));
	}

	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */

	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}

	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */

	function supportsGoWithoutReloadUsingHash() {
	  var ua = navigator.userAgent;
	  return ua.indexOf('Firefox') === -1;
	}

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*eslint-disable no-empty */
	'use strict';

	exports.__esModule = true;
	exports.saveState = saveState;
	exports.readState = readState;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(255);

	var _warning2 = _interopRequireDefault(_warning);

	var KeyPrefix = '@@History/';
	var QuotaExceededErrors = ['QuotaExceededError', 'QUOTA_EXCEEDED_ERR'];

	var SecurityError = 'SecurityError';

	function createKey(key) {
	  return KeyPrefix + key;
	}

	function saveState(key, state) {
	  try {
	    if (state == null) {
	      window.sessionStorage.removeItem(createKey(key));
	    } else {
	      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	    }
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

	      return;
	    }

	    if (QuotaExceededErrors.indexOf(error.name) >= 0 && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

	      return;
	    }

	    throw error;
	  }
	}

	function readState(key) {
	  var json = undefined;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

	      return null;
	    }
	  }

	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }

	  return null;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ExecutionEnvironment = __webpack_require__(258);

	var _DOMUtils = __webpack_require__(259);

	var _createHistory = __webpack_require__(262);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	function createDOMHistory(options) {
	  var history = _createHistory2['default'](_extends({
	    getUserConfirmation: _DOMUtils.getUserConfirmation
	  }, options, {
	    go: _DOMUtils.go
	  }));

	  function listen(listener) {
	    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

	    return history.listen(listener);
	  }

	  return _extends({}, history, {
	    listen: listen
	  });
	}

	exports['default'] = createDOMHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(255);

	var _warning2 = _interopRequireDefault(_warning);

	var _deepEqual = __webpack_require__(263);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _PathUtils = __webpack_require__(257);

	var _AsyncUtils = __webpack_require__(266);

	var _Actions = __webpack_require__(256);

	var _createLocation2 = __webpack_require__(267);

	var _createLocation3 = _interopRequireDefault(_createLocation2);

	var _runTransitionHook = __webpack_require__(268);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _deprecate = __webpack_require__(269);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function createRandomKey(length) {
	  return Math.random().toString(36).substr(2, length);
	}

	function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search &&
	  //a.action === b.action && // Different action !== location change.
	  a.key === b.key && _deepEqual2['default'](a.state, b.state);
	}

	var DefaultKeyLength = 6;

	function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var finishTransition = options.finishTransition;
	  var saveState = options.saveState;
	  var go = options.go;
	  var getUserConfirmation = options.getUserConfirmation;
	  var keyLength = options.keyLength;

	  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

	  var transitionHooks = [];

	  function listenBefore(hook) {
	    transitionHooks.push(hook);

	    return function () {
	      transitionHooks = transitionHooks.filter(function (item) {
	        return item !== hook;
	      });
	    };
	  }

	  var allKeys = [];
	  var changeListeners = [];
	  var location = undefined;

	  function getCurrent() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) {
	      return allKeys.indexOf(pendingLocation.key);
	    } else if (location) {
	      return allKeys.indexOf(location.key);
	    } else {
	      return -1;
	    }
	  }

	  function updateLocation(newLocation) {
	    var current = getCurrent();

	    location = newLocation;

	    if (location.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
	    } else if (location.action === _Actions.REPLACE) {
	      allKeys[current] = location.key;
	    }

	    changeListeners.forEach(function (listener) {
	      listener(location);
	    });
	  }

	  function listen(listener) {
	    changeListeners.push(listener);

	    if (location) {
	      listener(location);
	    } else {
	      var _location = getCurrentLocation();
	      allKeys = [_location.key];
	      updateLocation(_location);
	    }

	    return function () {
	      changeListeners = changeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  }

	  function confirmTransitionTo(location, callback) {
	    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
	      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
	        if (result != null) {
	          done(result);
	        } else {
	          next();
	        }
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  }

	  var pendingLocation = undefined;

	  function transitionTo(nextLocation) {
	    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

	    pendingLocation = nextLocation;

	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

	      if (ok) {
	        // treat PUSH to current path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = createPath(location);
	          var nextPath = createPath(nextLocation);

	          if (nextPath === prevPath && _deepEqual2['default'](location.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
	        }

	        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
	      } else if (location && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(location.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);

	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
	      }
	    });
	  }

	  function push(location) {
	    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
	  }

	  function replace(location) {
	    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
	  }

	  function goBack() {
	    go(-1);
	  }

	  function goForward() {
	    go(1);
	  }

	  function createKey() {
	    return createRandomKey(keyLength);
	  }

	  function createPath(location) {
	    if (location == null || typeof location === 'string') return location;

	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;

	    var result = pathname;

	    if (search) result += search;

	    if (hash) result += hash;

	    return result;
	  }

	  function createHref(location) {
	    return createPath(location);
	  }

	  function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

	    if (typeof action === 'object') {
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'The state (2nd) argument to history.createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;

	      if (typeof location === 'string') location = _PathUtils.parsePath(location);

	      location = _extends({}, location, { state: action });

	      action = key;
	      key = arguments[3] || createKey();
	    }

	    return _createLocation3['default'](location, action, key);
	  }

	  // deprecated
	  function setState(state) {
	    if (location) {
	      updateLocationState(location, state);
	      updateLocation(location);
	    } else {
	      updateLocationState(getCurrentLocation(), state);
	    }
	  }

	  function updateLocationState(location, state) {
	    location.state = _extends({}, location.state, state);
	    saveState(location.key, location.state);
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    transitionHooks = transitionHooks.filter(function (item) {
	      return item !== hook;
	    });
	  }

	  // deprecated
	  function pushState(state, path) {
	    if (typeof path === 'string') path = _PathUtils.parsePath(path);

	    push(_extends({ state: state }, path));
	  }

	  // deprecated
	  function replaceState(state, path) {
	    if (typeof path === 'string') path = _PathUtils.parsePath(path);

	    replace(_extends({ state: state }, path));
	  }

	  return {
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref,
	    createLocation: createLocation,

	    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
	    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
	    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
	    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	  };
	}

	exports['default'] = createHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(264);
	var isArguments = __webpack_require__(265);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 264 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 265 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 266 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var _slice = Array.prototype.slice;
	exports.loopAsync = loopAsync;

	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var sync = false,
	      hasNext = false,
	      doneArgs = undefined;

	  function done() {
	    isDone = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = [].concat(_slice.call(arguments));
	      return;
	    }

	    callback.apply(this, arguments);
	  }

	  function next() {
	    if (isDone) {
	      return;
	    }

	    hasNext = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      return;
	    }

	    sync = true;

	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work.call(this, currentTurn++, next, done);
	    }

	    sync = false;

	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(this, doneArgs);
	      return;
	    }

	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  }

	  next();
	}

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(255);

	var _warning2 = _interopRequireDefault(_warning);

	var _Actions = __webpack_require__(256);

	var _PathUtils = __webpack_require__(257);

	function createLocation() {
	  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	  if (typeof location === 'string') location = _PathUtils.parsePath(location);

	  if (typeof action === 'object') {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'The state (2nd) argument to createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;

	    location = _extends({}, location, { state: action });

	    action = key || _Actions.POP;
	    key = _fourthArg;
	  }

	  var pathname = location.pathname || '/';
	  var search = location.search || '';
	  var hash = location.hash || '';
	  var state = location.state || null;

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	}

	exports['default'] = createLocation;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(255);

	var _warning2 = _interopRequireDefault(_warning);

	function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);

	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
	  }
	}

	exports['default'] = runTransitionHook;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(255);

	var _warning2 = _interopRequireDefault(_warning);

	function deprecate(fn, message) {
	  return function () {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] ' + message) : undefined;
	    return fn.apply(this, arguments);
	  };
	}

	exports['default'] = deprecate;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(255);

	var _warning2 = _interopRequireDefault(_warning);

	var _queryString = __webpack_require__(271);

	var _runTransitionHook = __webpack_require__(268);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _PathUtils = __webpack_require__(257);

	var _deprecate = __webpack_require__(269);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	var SEARCH_BASE_KEY = '$searchBase';

	function defaultStringifyQuery(query) {
	  return _queryString.stringify(query).replace(/%20/g, '+');
	}

	var defaultParseQueryString = _queryString.parse;

	function isNestedObject(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p) && typeof object[p] === 'object' && !Array.isArray(object[p]) && object[p] !== null) return true;
	  }return false;
	}

	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var history = createHistory(options);

	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;

	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;

	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;

	    function addQuery(location) {
	      if (location.query == null) {
	        var search = location.search;

	        location.query = parseQueryString(search.substring(1));
	        location[SEARCH_BASE_KEY] = { search: search, searchBase: '' };
	      }

	      // TODO: Instead of all the book-keeping here, this should just strip the
	      // stringified query from the search.

	      return location;
	    }

	    function appendQuery(location, query) {
	      var _extends2;

	      var searchBaseSpec = location[SEARCH_BASE_KEY];
	      var queryString = query ? stringifyQuery(query) : '';
	      if (!searchBaseSpec && !queryString) {
	        return location;
	      }

	      process.env.NODE_ENV !== 'production' ? _warning2['default'](stringifyQuery !== defaultStringifyQuery || !isNestedObject(query), 'useQueries does not stringify nested query objects by default; ' + 'use a custom stringifyQuery function') : undefined;

	      if (typeof location === 'string') location = _PathUtils.parsePath(location);

	      var searchBase = undefined;
	      if (searchBaseSpec && location.search === searchBaseSpec.search) {
	        searchBase = searchBaseSpec.searchBase;
	      } else {
	        searchBase = location.search || '';
	      }

	      var search = searchBase;
	      if (queryString) {
	        search += (search ? '&' : '?') + queryString;
	      }

	      return _extends({}, location, (_extends2 = {
	        search: search
	      }, _extends2[SEARCH_BASE_KEY] = { search: search, searchBase: searchBase }, _extends2));
	    }

	    // Override all read methods with query-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addQuery(location), callback);
	      });
	    }

	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addQuery(location));
	      });
	    }

	    // Override all write methods with query-aware versions.
	    function push(location) {
	      history.push(appendQuery(location, location.query));
	    }

	    function replace(location) {
	      history.replace(appendQuery(location, location.query));
	    }

	    function createPath(location, query) {
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](!query, 'the query argument to createPath is deprecated; use a location descriptor instead') : undefined;

	      return history.createPath(appendQuery(location, query || location.query));
	    }

	    function createHref(location, query) {
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](!query, 'the query argument to createHref is deprecated; use a location descriptor instead') : undefined;

	      return history.createHref(appendQuery(location, query || location.query));
	    }

	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var fullLocation = history.createLocation.apply(history, [appendQuery(location, location.query)].concat(args));
	      if (location.query) {
	        fullLocation.query = location.query;
	      }
	      return addQuery(fullLocation);
	    }

	    // deprecated
	    function pushState(state, path, query) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);

	      push(_extends({ state: state }, path, { query: query }));
	    }

	    // deprecated
	    function replaceState(state, path, query) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);

	      replace(_extends({ state: state }, path, { query: query }));
	    }

	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,

	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}

	exports['default'] = useQueries;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(272);

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str) {
		if (typeof str !== 'string') {
			return {};
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return {};
		}

		return str.split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			key = decodeURIComponent(key);

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (!ret.hasOwnProperty(key)) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}

			return ret;
		}, {});
	};

	exports.stringify = function (obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return key;
			}

			if (Array.isArray(val)) {
				return val.slice().sort().map(function (val2) {
					return strictUriEncode(key) + '=' + strictUriEncode(val2);
				}).join('&');
			}

			return strictUriEncode(key) + '=' + strictUriEncode(val);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 272 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = createTransitionManager;

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _Actions = __webpack_require__(256);

	var _computeChangedRoutes2 = __webpack_require__(274);

	var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);

	var _TransitionUtils = __webpack_require__(275);

	var _isActive2 = __webpack_require__(277);

	var _isActive3 = _interopRequireDefault(_isActive2);

	var _getComponents = __webpack_require__(278);

	var _getComponents2 = _interopRequireDefault(_getComponents);

	var _matchRoutes = __webpack_require__(280);

	var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function hasAnyProperties(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p)) return true;
	  }return false;
	}

	function createTransitionManager(history, routes) {
	  var state = {};

	  // Signature should be (location, indexOnly), but needs to support (path,
	  // query, indexOnly)
	  function isActive(location) {
	    var indexOnlyOrDeprecatedQuery = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    var deprecatedIndexOnly = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	    var indexOnly = void 0;
	    if (indexOnlyOrDeprecatedQuery && indexOnlyOrDeprecatedQuery !== true || deprecatedIndexOnly !== null) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`isActive(pathname, query, indexOnly) is deprecated; use `isActive(location, indexOnly)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
	      location = { pathname: location, query: indexOnlyOrDeprecatedQuery };
	      indexOnly = deprecatedIndexOnly || false;
	    } else {
	      location = history.createLocation(location);
	      indexOnly = indexOnlyOrDeprecatedQuery;
	    }

	    return (0, _isActive3.default)(location, indexOnly, state.location, state.routes, state.params);
	  }

	  function createLocationFromRedirectInfo(location) {
	    return history.createLocation(location, _Actions.REPLACE);
	  }

	  var partialNextState = void 0;

	  function match(location, callback) {
	    if (partialNextState && partialNextState.location === location) {
	      // Continue from where we left off.
	      finishMatch(partialNextState, callback);
	    } else {
	      (0, _matchRoutes2.default)(routes, location, function (error, nextState) {
	        if (error) {
	          callback(error);
	        } else if (nextState) {
	          finishMatch(_extends({}, nextState, { location: location }), callback);
	        } else {
	          callback();
	        }
	      });
	    }
	  }

	  function finishMatch(nextState, callback) {
	    var _computeChangedRoutes = (0, _computeChangedRoutes3.default)(state, nextState);

	    var leaveRoutes = _computeChangedRoutes.leaveRoutes;
	    var changeRoutes = _computeChangedRoutes.changeRoutes;
	    var enterRoutes = _computeChangedRoutes.enterRoutes;


	    (0, _TransitionUtils.runLeaveHooks)(leaveRoutes, state);

	    // Tear down confirmation hooks for left routes
	    leaveRoutes.filter(function (route) {
	      return enterRoutes.indexOf(route) === -1;
	    }).forEach(removeListenBeforeHooksForRoute);

	    // change and enter hooks are run in series
	    (0, _TransitionUtils.runChangeHooks)(changeRoutes, state, nextState, function (error, redirectInfo) {
	      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);

	      (0, _TransitionUtils.runEnterHooks)(enterRoutes, nextState, finishEnterHooks);
	    });

	    function finishEnterHooks(error, redirectInfo) {
	      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);

	      // TODO: Fetch components after state is updated.
	      (0, _getComponents2.default)(nextState, function (error, components) {
	        if (error) {
	          callback(error);
	        } else {
	          // TODO: Make match a pure function and have some other API
	          // for "match and update state".
	          callback(null, null, state = _extends({}, nextState, { components: components }));
	        }
	      });
	    }

	    function handleErrorOrRedirect(error, redirectInfo) {
	      if (error) callback(error);else callback(null, createLocationFromRedirectInfo(redirectInfo));
	    }
	  }

	  var RouteGuid = 1;

	  function getRouteID(route) {
	    var create = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	    return route.__id__ || create && (route.__id__ = RouteGuid++);
	  }

	  var RouteHooks = Object.create(null);

	  function getRouteHooksForRoutes(routes) {
	    return routes.reduce(function (hooks, route) {
	      hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
	      return hooks;
	    }, []);
	  }

	  function transitionHook(location, callback) {
	    (0, _matchRoutes2.default)(routes, location, function (error, nextState) {
	      if (nextState == null) {
	        // TODO: We didn't actually match anything, but hang
	        // onto error/nextState so we don't have to matchRoutes
	        // again in the listen callback.
	        callback();
	        return;
	      }

	      // Cache some state here so we don't have to
	      // matchRoutes() again in the listen callback.
	      partialNextState = _extends({}, nextState, { location: location });

	      var hooks = getRouteHooksForRoutes((0, _computeChangedRoutes3.default)(state, partialNextState).leaveRoutes);

	      var result = void 0;
	      for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
	        // Passing the location arg here indicates to
	        // the user that this is a transition hook.
	        result = hooks[i](location);
	      }

	      callback(result);
	    });
	  }

	  /* istanbul ignore next: untestable with Karma */
	  function beforeUnloadHook() {
	    // Synchronously check to see if any route hooks want
	    // to prevent the current window/tab from closing.
	    if (state.routes) {
	      var hooks = getRouteHooksForRoutes(state.routes);

	      var message = void 0;
	      for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
	        // Passing no args indicates to the user that this is a
	        // beforeunload hook. We don't know the next location.
	        message = hooks[i]();
	      }

	      return message;
	    }
	  }

	  var unlistenBefore = void 0,
	      unlistenBeforeUnload = void 0;

	  function removeListenBeforeHooksForRoute(route) {
	    var routeID = getRouteID(route, false);
	    if (!routeID) {
	      return;
	    }

	    delete RouteHooks[routeID];

	    if (!hasAnyProperties(RouteHooks)) {
	      // teardown transition & beforeunload hooks
	      if (unlistenBefore) {
	        unlistenBefore();
	        unlistenBefore = null;
	      }

	      if (unlistenBeforeUnload) {
	        unlistenBeforeUnload();
	        unlistenBeforeUnload = null;
	      }
	    }
	  }

	  /**
	   * Registers the given hook function to run before leaving the given route.
	   *
	   * During a normal transition, the hook function receives the next location
	   * as its only argument and can return either a prompt message (string) to show the user,
	   * to make sure they want to leave the page; or `false`, to prevent the transition.
	   * Any other return value will have no effect.
	   *
	   * During the beforeunload event (in browsers) the hook receives no arguments.
	   * In this case it must return a prompt message to prevent the transition.
	   *
	   * Returns a function that may be used to unbind the listener.
	   */
	  function listenBeforeLeavingRoute(route, hook) {
	    // TODO: Warn if they register for a route that isn't currently
	    // active. They're probably doing something wrong, like re-creating
	    // route objects on every location change.
	    var routeID = getRouteID(route);
	    var hooks = RouteHooks[routeID];

	    if (!hooks) {
	      var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);

	      RouteHooks[routeID] = [hook];

	      if (thereWereNoRouteHooks) {
	        // setup transition & beforeunload hooks
	        unlistenBefore = history.listenBefore(transitionHook);

	        if (history.listenBeforeUnload) unlistenBeforeUnload = history.listenBeforeUnload(beforeUnloadHook);
	      }
	    } else {
	      if (hooks.indexOf(hook) === -1) {
	        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'adding multiple leave hooks for the same route is deprecated; manage multiple confirmations in your own code instead') : void 0;

	        hooks.push(hook);
	      }
	    }

	    return function () {
	      var hooks = RouteHooks[routeID];

	      if (hooks) {
	        var newHooks = hooks.filter(function (item) {
	          return item !== hook;
	        });

	        if (newHooks.length === 0) {
	          removeListenBeforeHooksForRoute(route);
	        } else {
	          RouteHooks[routeID] = newHooks;
	        }
	      }
	    };
	  }

	  /**
	   * This is the API for stateful environments. As the location
	   * changes, we update state and call the listener. We can also
	   * gracefully handle errors and redirects.
	   */
	  function listen(listener) {
	    // TODO: Only use a single history listener. Otherwise we'll
	    // end up with multiple concurrent calls to match.
	    return history.listen(function (location) {
	      if (state.location === location) {
	        listener(null, state);
	      } else {
	        match(location, function (error, redirectLocation, nextState) {
	          if (error) {
	            listener(error);
	          } else if (redirectLocation) {
	            history.replace(redirectLocation);
	          } else if (nextState) {
	            listener(null, nextState);
	          } else {
	            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'Location "%s" did not match any routes', location.pathname + location.search + location.hash) : void 0;
	          }
	        });
	      }
	    });
	  }

	  return {
	    isActive: isActive,
	    match: match,
	    listenBeforeLeavingRoute: listenBeforeLeavingRoute,
	    listen: listen
	  };
	}

	//export default useRoutes

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(252);

	function routeParamsChanged(route, prevState, nextState) {
	  if (!route.path) return false;

	  var paramNames = (0, _PatternUtils.getParamNames)(route.path);

	  return paramNames.some(function (paramName) {
	    return prevState.params[paramName] !== nextState.params[paramName];
	  });
	}

	/**
	 * Returns an object of { leaveRoutes, changeRoutes, enterRoutes } determined by
	 * the change from prevState to nextState. We leave routes if either
	 * 1) they are not in the next state or 2) they are in the next state
	 * but their params have changed (i.e. /users/123 => /users/456).
	 *
	 * leaveRoutes are ordered starting at the leaf route of the tree
	 * we're leaving up to the common parent route. enterRoutes are ordered
	 * from the top of the tree we're entering down to the leaf route.
	 *
	 * changeRoutes are any routes that didn't leave or enter during
	 * the transition.
	 */
	function computeChangedRoutes(prevState, nextState) {
	  var prevRoutes = prevState && prevState.routes;
	  var nextRoutes = nextState.routes;

	  var leaveRoutes = void 0,
	      changeRoutes = void 0,
	      enterRoutes = void 0;
	  if (prevRoutes) {
	    (function () {
	      var parentIsLeaving = false;
	      leaveRoutes = prevRoutes.filter(function (route) {
	        if (parentIsLeaving) {
	          return true;
	        } else {
	          var isLeaving = nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
	          if (isLeaving) parentIsLeaving = true;
	          return isLeaving;
	        }
	      });

	      // onLeave hooks start at the leaf route.
	      leaveRoutes.reverse();

	      enterRoutes = [];
	      changeRoutes = [];

	      nextRoutes.forEach(function (route) {
	        var isNew = prevRoutes.indexOf(route) === -1;
	        var paramsChanged = leaveRoutes.indexOf(route) !== -1;

	        if (isNew || paramsChanged) enterRoutes.push(route);else changeRoutes.push(route);
	      });
	    })();
	  } else {
	    leaveRoutes = [];
	    changeRoutes = [];
	    enterRoutes = nextRoutes;
	  }

	  return {
	    leaveRoutes: leaveRoutes,
	    changeRoutes: changeRoutes,
	    enterRoutes: enterRoutes
	  };
	}

	exports.default = computeChangedRoutes;
	module.exports = exports['default'];

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.runEnterHooks = runEnterHooks;
	exports.runChangeHooks = runChangeHooks;
	exports.runLeaveHooks = runLeaveHooks;

	var _AsyncUtils = __webpack_require__(276);

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createTransitionHook(hook, route, asyncArity) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    hook.apply(route, args);

	    if (hook.length < asyncArity) {
	      var callback = args[args.length - 1];
	      // Assume hook executes synchronously and
	      // automatically call the callback.
	      callback();
	    }
	  };
	}

	function getEnterHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onEnter) hooks.push(createTransitionHook(route.onEnter, route, 3));

	    return hooks;
	  }, []);
	}

	function getChangeHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onChange) hooks.push(createTransitionHook(route.onChange, route, 4));
	    return hooks;
	  }, []);
	}

	function runTransitionHooks(length, iter, callback) {
	  if (!length) {
	    callback();
	    return;
	  }

	  var redirectInfo = void 0;
	  function replace(location, deprecatedPathname, deprecatedQuery) {
	    if (deprecatedPathname) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`replaceState(state, pathname, query) is deprecated; use `replace(location)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
	      redirectInfo = {
	        pathname: deprecatedPathname,
	        query: deprecatedQuery,
	        state: location
	      };

	      return;
	    }

	    redirectInfo = location;
	  }

	  (0, _AsyncUtils.loopAsync)(length, function (index, next, done) {
	    iter(index, replace, function (error) {
	      if (error || redirectInfo) {
	        done(error, redirectInfo); // No need to continue.
	      } else {
	        next();
	      }
	    });
	  }, callback);
	}

	/**
	 * Runs all onEnter hooks in the given array of routes in order
	 * with onEnter(nextState, replace, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replace short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	function runEnterHooks(routes, nextState, callback) {
	  var hooks = getEnterHooks(routes);
	  return runTransitionHooks(hooks.length, function (index, replace, next) {
	    hooks[index](nextState, replace, next);
	  }, callback);
	}

	/**
	 * Runs all onChange hooks in the given array of routes in order
	 * with onChange(prevState, nextState, replace, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replace short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	function runChangeHooks(routes, state, nextState, callback) {
	  var hooks = getChangeHooks(routes);
	  return runTransitionHooks(hooks.length, function (index, replace, next) {
	    hooks[index](state, nextState, replace, next);
	  }, callback);
	}

	/**
	 * Runs all onLeave hooks in the given array of routes in order.
	 */
	function runLeaveHooks(routes, prevState) {
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    if (routes[i].onLeave) routes[i].onLeave.call(routes[i], prevState);
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 276 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	exports.mapAsync = mapAsync;
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var sync = false,
	      hasNext = false,
	      doneArgs = void 0;

	  function done() {
	    isDone = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = [].concat(Array.prototype.slice.call(arguments));
	      return;
	    }

	    callback.apply(this, arguments);
	  }

	  function next() {
	    if (isDone) {
	      return;
	    }

	    hasNext = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      return;
	    }

	    sync = true;

	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work.call(this, currentTurn++, next, done);
	    }

	    sync = false;

	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(this, doneArgs);
	      return;
	    }

	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  }

	  next();
	}

	function mapAsync(array, work, callback) {
	  var length = array.length;
	  var values = [];

	  if (length === 0) return callback(null, values);

	  var isDone = false,
	      doneCount = 0;

	  function done(index, error, value) {
	    if (isDone) return;

	    if (error) {
	      isDone = true;
	      callback(error);
	    } else {
	      values[index] = value;

	      isDone = ++doneCount === length;

	      if (isDone) callback(null, values);
	    }
	  }

	  array.forEach(function (item, index) {
	    work(item, index, function (error, value) {
	      done(index, error, value);
	    });
	  });
	}

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = isActive;

	var _PatternUtils = __webpack_require__(252);

	function deepEqual(a, b) {
	  if (a == b) return true;

	  if (a == null || b == null) return false;

	  if (Array.isArray(a)) {
	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return deepEqual(item, b[index]);
	    });
	  }

	  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
	    for (var p in a) {
	      if (!Object.prototype.hasOwnProperty.call(a, p)) {
	        continue;
	      }

	      if (a[p] === undefined) {
	        if (b[p] !== undefined) {
	          return false;
	        }
	      } else if (!Object.prototype.hasOwnProperty.call(b, p)) {
	        return false;
	      } else if (!deepEqual(a[p], b[p])) {
	        return false;
	      }
	    }

	    return true;
	  }

	  return String(a) === String(b);
	}

	/**
	 * Returns true if the current pathname matches the supplied one, net of
	 * leading and trailing slash normalization. This is sufficient for an
	 * indexOnly route match.
	 */
	function pathIsActive(pathname, currentPathname) {
	  // Normalize leading slash for consistency. Leading slash on pathname has
	  // already been normalized in isActive. See caveat there.
	  if (currentPathname.charAt(0) !== '/') {
	    currentPathname = '/' + currentPathname;
	  }

	  // Normalize the end of both path names too. Maybe `/foo/` shouldn't show
	  // `/foo` as active, but in this case, we would already have failed the
	  // match.
	  if (pathname.charAt(pathname.length - 1) !== '/') {
	    pathname += '/';
	  }
	  if (currentPathname.charAt(currentPathname.length - 1) !== '/') {
	    currentPathname += '/';
	  }

	  return currentPathname === pathname;
	}

	/**
	 * Returns true if the given pathname matches the active routes and params.
	 */
	function routeIsActive(pathname, routes, params) {
	  var remainingPathname = pathname,
	      paramNames = [],
	      paramValues = [];

	  // for...of would work here but it's probably slower post-transpilation.
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    var route = routes[i];
	    var pattern = route.path || '';

	    if (pattern.charAt(0) === '/') {
	      remainingPathname = pathname;
	      paramNames = [];
	      paramValues = [];
	    }

	    if (remainingPathname !== null && pattern) {
	      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
	      if (matched) {
	        remainingPathname = matched.remainingPathname;
	        paramNames = [].concat(paramNames, matched.paramNames);
	        paramValues = [].concat(paramValues, matched.paramValues);
	      } else {
	        remainingPathname = null;
	      }

	      if (remainingPathname === '') {
	        // We have an exact match on the route. Just check that all the params
	        // match.
	        // FIXME: This doesn't work on repeated params.
	        return paramNames.every(function (paramName, index) {
	          return String(paramValues[index]) === String(params[paramName]);
	        });
	      }
	    }
	  }

	  return false;
	}

	/**
	 * Returns true if all key/value pairs in the given query are
	 * currently active.
	 */
	function queryIsActive(query, activeQuery) {
	  if (activeQuery == null) return query == null;

	  if (query == null) return true;

	  return deepEqual(query, activeQuery);
	}

	/**
	 * Returns true if a <Link> to the given pathname/query combination is
	 * currently active.
	 */
	function isActive(_ref, indexOnly, currentLocation, routes, params) {
	  var pathname = _ref.pathname;
	  var query = _ref.query;

	  if (currentLocation == null) return false;

	  // TODO: This is a bit ugly. It keeps around support for treating pathnames
	  // without preceding slashes as absolute paths, but possibly also works
	  // around the same quirks with basenames as in matchRoutes.
	  if (pathname.charAt(0) !== '/') {
	    pathname = '/' + pathname;
	  }

	  if (!pathIsActive(pathname, currentLocation.pathname)) {
	    // The path check is necessary and sufficient for indexOnly, but otherwise
	    // we still need to check the routes.
	    if (indexOnly || !routeIsActive(pathname, routes, params)) {
	      return false;
	    }
	  }

	  return queryIsActive(query, currentLocation.query);
	}
	module.exports = exports['default'];

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _AsyncUtils = __webpack_require__(276);

	var _makeStateWithLocation = __webpack_require__(279);

	var _makeStateWithLocation2 = _interopRequireDefault(_makeStateWithLocation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getComponentsForRoute(nextState, route, callback) {
	  if (route.component || route.components) {
	    callback(null, route.component || route.components);
	    return;
	  }

	  var getComponent = route.getComponent || route.getComponents;
	  if (!getComponent) {
	    callback();
	    return;
	  }

	  var location = nextState.location;

	  var nextStateWithLocation = (0, _makeStateWithLocation2.default)(nextState, location);

	  getComponent.call(route, nextStateWithLocation, callback);
	}

	/**
	 * Asynchronously fetches all components needed for the given router
	 * state and calls callback(error, components) when finished.
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getComponents method.
	 */
	function getComponents(nextState, callback) {
	  (0, _AsyncUtils.mapAsync)(nextState.routes, function (route, index, callback) {
	    getComponentsForRoute(nextState, route, callback);
	  }, callback);
	}

	exports.default = getComponents;
	module.exports = exports['default'];

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = makeStateWithLocation;

	var _deprecateObjectProperties = __webpack_require__(249);

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function makeStateWithLocation(state, location) {
	  if (process.env.NODE_ENV !== 'production' && _deprecateObjectProperties.canUseMembrane) {
	    var stateWithLocation = _extends({}, state);

	    // I don't use deprecateObjectProperties here because I want to keep the
	    // same code path between development and production, in that we just
	    // assign extra properties to the copy of the state object in both cases.

	    var _loop = function _loop(prop) {
	      if (!Object.prototype.hasOwnProperty.call(location, prop)) {
	        return 'continue';
	      }

	      Object.defineProperty(stateWithLocation, prop, {
	        get: function get() {
	          process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'Accessing location properties directly from the first argument to `getComponent`, `getComponents`, `getChildRoutes`, and `getIndexRoute` is deprecated. That argument is now the router state (`nextState` or `partialNextState`) rather than the location. To access the location, use `nextState.location` or `partialNextState.location`.') : void 0;
	          return location[prop];
	        }
	      });
	    };

	    for (var prop in location) {
	      var _ret = _loop(prop);

	      if (_ret === 'continue') continue;
	    }

	    return stateWithLocation;
	  }

	  return _extends({}, state, location);
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = matchRoutes;

	var _AsyncUtils = __webpack_require__(276);

	var _makeStateWithLocation = __webpack_require__(279);

	var _makeStateWithLocation2 = _interopRequireDefault(_makeStateWithLocation);

	var _PatternUtils = __webpack_require__(252);

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _RouteUtils = __webpack_require__(247);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getChildRoutes(route, location, paramNames, paramValues, callback) {
	  if (route.childRoutes) {
	    return [null, route.childRoutes];
	  }
	  if (!route.getChildRoutes) {
	    return [];
	  }

	  var sync = true,
	      result = void 0;

	  var partialNextState = {
	    location: location,
	    params: createParams(paramNames, paramValues)
	  };

	  var partialNextStateWithLocation = (0, _makeStateWithLocation2.default)(partialNextState, location);

	  route.getChildRoutes(partialNextStateWithLocation, function (error, childRoutes) {
	    childRoutes = !error && (0, _RouteUtils.createRoutes)(childRoutes);
	    if (sync) {
	      result = [error, childRoutes];
	      return;
	    }

	    callback(error, childRoutes);
	  });

	  sync = false;
	  return result; // Might be undefined.
	}

	function getIndexRoute(route, location, paramNames, paramValues, callback) {
	  if (route.indexRoute) {
	    callback(null, route.indexRoute);
	  } else if (route.getIndexRoute) {
	    var partialNextState = {
	      location: location,
	      params: createParams(paramNames, paramValues)
	    };

	    var partialNextStateWithLocation = (0, _makeStateWithLocation2.default)(partialNextState, location);

	    route.getIndexRoute(partialNextStateWithLocation, function (error, indexRoute) {
	      callback(error, !error && (0, _RouteUtils.createRoutes)(indexRoute)[0]);
	    });
	  } else if (route.childRoutes) {
	    (function () {
	      var pathless = route.childRoutes.filter(function (childRoute) {
	        return !childRoute.path;
	      });

	      (0, _AsyncUtils.loopAsync)(pathless.length, function (index, next, done) {
	        getIndexRoute(pathless[index], location, paramNames, paramValues, function (error, indexRoute) {
	          if (error || indexRoute) {
	            var routes = [pathless[index]].concat(Array.isArray(indexRoute) ? indexRoute : [indexRoute]);
	            done(error, routes);
	          } else {
	            next();
	          }
	        });
	      }, function (err, routes) {
	        callback(null, routes);
	      });
	    })();
	  } else {
	    callback();
	  }
	}

	function assignParams(params, paramNames, paramValues) {
	  return paramNames.reduce(function (params, paramName, index) {
	    var paramValue = paramValues && paramValues[index];

	    if (Array.isArray(params[paramName])) {
	      params[paramName].push(paramValue);
	    } else if (paramName in params) {
	      params[paramName] = [params[paramName], paramValue];
	    } else {
	      params[paramName] = paramValue;
	    }

	    return params;
	  }, params);
	}

	function createParams(paramNames, paramValues) {
	  return assignParams({}, paramNames, paramValues);
	}

	function matchRouteDeep(route, location, remainingPathname, paramNames, paramValues, callback) {
	  var pattern = route.path || '';

	  if (pattern.charAt(0) === '/') {
	    remainingPathname = location.pathname;
	    paramNames = [];
	    paramValues = [];
	  }

	  // Only try to match the path if the route actually has a pattern, and if
	  // we're not just searching for potential nested absolute paths.
	  if (remainingPathname !== null && pattern) {
	    try {
	      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
	      if (matched) {
	        remainingPathname = matched.remainingPathname;
	        paramNames = [].concat(paramNames, matched.paramNames);
	        paramValues = [].concat(paramValues, matched.paramValues);
	      } else {
	        remainingPathname = null;
	      }
	    } catch (error) {
	      callback(error);
	    }

	    // By assumption, pattern is non-empty here, which is the prerequisite for
	    // actually terminating a match.
	    if (remainingPathname === '') {
	      var _ret2 = function () {
	        var match = {
	          routes: [route],
	          params: createParams(paramNames, paramValues)
	        };

	        getIndexRoute(route, location, paramNames, paramValues, function (error, indexRoute) {
	          if (error) {
	            callback(error);
	          } else {
	            if (Array.isArray(indexRoute)) {
	              var _match$routes;

	              process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(indexRoute.every(function (route) {
	                return !route.path;
	              }), 'Index routes should not have paths') : void 0;
	              (_match$routes = match.routes).push.apply(_match$routes, indexRoute);
	            } else if (indexRoute) {
	              process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(!indexRoute.path, 'Index routes should not have paths') : void 0;
	              match.routes.push(indexRoute);
	            }

	            callback(null, match);
	          }
	        });

	        return {
	          v: void 0
	        };
	      }();

	      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	    }
	  }

	  if (remainingPathname != null || route.childRoutes) {
	    // Either a) this route matched at least some of the path or b)
	    // we don't have to load this route's children asynchronously. In
	    // either case continue checking for matches in the subtree.
	    var onChildRoutes = function onChildRoutes(error, childRoutes) {
	      if (error) {
	        callback(error);
	      } else if (childRoutes) {
	        // Check the child routes to see if any of them match.
	        matchRoutes(childRoutes, location, function (error, match) {
	          if (error) {
	            callback(error);
	          } else if (match) {
	            // A child route matched! Augment the match and pass it up the stack.
	            match.routes.unshift(route);
	            callback(null, match);
	          } else {
	            callback();
	          }
	        }, remainingPathname, paramNames, paramValues);
	      } else {
	        callback();
	      }
	    };

	    var result = getChildRoutes(route, location, paramNames, paramValues, onChildRoutes);
	    if (result) {
	      onChildRoutes.apply(undefined, result);
	    }
	  } else {
	    callback();
	  }
	}

	/**
	 * Asynchronously matches the given location to a set of routes and calls
	 * callback(error, state) when finished. The state object will have the
	 * following properties:
	 *
	 * - routes       An array of routes that matched, in hierarchical order
	 * - params       An object of URL parameters
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getChildRoutes method.
	 */
	function matchRoutes(routes, location, callback, remainingPathname) {
	  var paramNames = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
	  var paramValues = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];

	  if (remainingPathname === undefined) {
	    // TODO: This is a little bit ugly, but it works around a quirk in history
	    // that strips the leading slash from pathnames when using basenames with
	    // trailing slashes.
	    if (location.pathname.charAt(0) !== '/') {
	      location = _extends({}, location, {
	        pathname: '/' + location.pathname
	      });
	    }
	    remainingPathname = location.pathname;
	  }

	  (0, _AsyncUtils.loopAsync)(routes.length, function (index, next, done) {
	    matchRouteDeep(routes[index], location, remainingPathname, paramNames, paramValues, function (error, match) {
	      if (error || match) {
	        done(error, match);
	      } else {
	        next();
	      }
	    });
	  }, callback);
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _deprecateObjectProperties = __webpack_require__(249);

	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

	var _getRouteParams = __webpack_require__(282);

	var _getRouteParams2 = _interopRequireDefault(_getRouteParams);

	var _RouteUtils = __webpack_require__(247);

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _React$PropTypes = _react2.default.PropTypes;
	var array = _React$PropTypes.array;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;

	/**
	 * A <RouterContext> renders the component tree for a given router state
	 * and sets the history object and the current location in context.
	 */

	var RouterContext = _react2.default.createClass({
	  displayName: 'RouterContext',


	  propTypes: {
	    history: object,
	    router: object.isRequired,
	    location: object.isRequired,
	    routes: array.isRequired,
	    params: object.isRequired,
	    components: array.isRequired,
	    createElement: func.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      createElement: _react2.default.createElement
	    };
	  },


	  childContextTypes: {
	    history: object,
	    location: object.isRequired,
	    router: object.isRequired
	  },

	  getChildContext: function getChildContext() {
	    var _props = this.props;
	    var router = _props.router;
	    var history = _props.history;
	    var location = _props.location;

	    if (!router) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`<RouterContext>` expects a `router` rather than a `history`') : void 0;

	      router = _extends({}, history, {
	        setRouteLeaveHook: history.listenBeforeLeavingRoute
	      });
	      delete router.listenBeforeLeavingRoute;
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      location = (0, _deprecateObjectProperties2.default)(location, '`context.location` is deprecated, please use a route component\'s `props.location` instead. http://tiny.cc/router-accessinglocation');
	    }

	    return { history: history, location: location, router: router };
	  },
	  createElement: function createElement(component, props) {
	    return component == null ? null : this.props.createElement(component, props);
	  },
	  render: function render() {
	    var _this = this;

	    var _props2 = this.props;
	    var history = _props2.history;
	    var location = _props2.location;
	    var routes = _props2.routes;
	    var params = _props2.params;
	    var components = _props2.components;

	    var element = null;

	    if (components) {
	      element = components.reduceRight(function (element, components, index) {
	        if (components == null) return element; // Don't create new children; use the grandchildren.

	        var route = routes[index];
	        var routeParams = (0, _getRouteParams2.default)(route, params);
	        var props = {
	          history: history,
	          location: location,
	          params: params,
	          route: route,
	          routeParams: routeParams,
	          routes: routes
	        };

	        if ((0, _RouteUtils.isReactChildren)(element)) {
	          props.children = element;
	        } else if (element) {
	          for (var prop in element) {
	            if (Object.prototype.hasOwnProperty.call(element, prop)) props[prop] = element[prop];
	          }
	        }

	        if ((typeof components === 'undefined' ? 'undefined' : _typeof(components)) === 'object') {
	          var elements = {};

	          for (var key in components) {
	            if (Object.prototype.hasOwnProperty.call(components, key)) {
	              // Pass through the key as a prop to createElement to allow
	              // custom createElement functions to know which named component
	              // they're rendering, for e.g. matching up to fetched data.
	              elements[key] = _this.createElement(components[key], _extends({
	                key: key }, props));
	            }
	          }

	          return elements;
	        }

	        return _this.createElement(components, props);
	      }, element);
	    }

	    !(element === null || element === false || _react2.default.isValidElement(element)) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'The root route must render a single element') : (0, _invariant2.default)(false) : void 0;

	    return element;
	  }
	});

	exports.default = RouterContext;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(252);

	/**
	 * Extracts an object of params the given route cares about from
	 * the given params object.
	 */
	function getRouteParams(route, params) {
	  var routeParams = {};

	  if (!route.path) return routeParams;

	  (0, _PatternUtils.getParamNames)(route.path).forEach(function (p) {
	    if (Object.prototype.hasOwnProperty.call(params, p)) {
	      routeParams[p] = params[p];
	    }
	  });

	  return routeParams;
	}

	exports.default = getRouteParams;
	module.exports = exports['default'];

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.createRouterObject = createRouterObject;
	exports.createRoutingHistory = createRoutingHistory;

	var _deprecateObjectProperties = __webpack_require__(249);

	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createRouterObject(history, transitionManager) {
	  return _extends({}, history, {
	    setRouteLeaveHook: transitionManager.listenBeforeLeavingRoute,
	    isActive: transitionManager.isActive
	  });
	}

	// deprecated
	function createRoutingHistory(history, transitionManager) {
	  history = _extends({}, history, transitionManager);

	  if (process.env.NODE_ENV !== 'production') {
	    history = (0, _deprecateObjectProperties2.default)(history, '`props.history` and `context.history` are deprecated. Please use `context.router`. http://tiny.cc/router-contextchanges');
	  }

	  return history;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _PropTypes = __webpack_require__(248);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _React$PropTypes = _react2.default.PropTypes;
	var bool = _React$PropTypes.bool;
	var object = _React$PropTypes.object;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;
	var oneOfType = _React$PropTypes.oneOfType;


	function isLeftClickEvent(event) {
	  return event.button === 0;
	}

	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	// TODO: De-duplicate against hasAnyProperties in createTransitionManager.
	function isEmptyObject(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p)) return false;
	  }return true;
	}

	function createLocationDescriptor(to, _ref) {
	  var query = _ref.query;
	  var hash = _ref.hash;
	  var state = _ref.state;

	  if (query || hash || state) {
	    return { pathname: to, query: query, hash: hash, state: state };
	  }

	  return to;
	}

	/**
	 * A <Link> is used to create an <a> element that links to a route.
	 * When that route is active, the link gets the value of its
	 * activeClassName prop.
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route path="/posts/:postID" component={Post} />
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to={`/posts/${post.id}`} />
	 *
	 * Links may pass along location state and/or query string parameters
	 * in the state/query props, respectively.
	 *
	 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
	 */
	var Link = _react2.default.createClass({
	  displayName: 'Link',


	  contextTypes: {
	    router: _PropTypes.routerShape
	  },

	  propTypes: {
	    to: oneOfType([string, object]),
	    query: object,
	    hash: string,
	    state: object,
	    activeStyle: object,
	    activeClassName: string,
	    onlyActiveOnIndex: bool.isRequired,
	    onClick: func,
	    target: string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      onlyActiveOnIndex: false,
	      style: {}
	    };
	  },
	  handleClick: function handleClick(event) {
	    if (this.props.onClick) this.props.onClick(event);

	    if (event.defaultPrevented) return;

	    !this.context.router ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<Link>s rendered outside of a router context cannot navigate.') : (0, _invariant2.default)(false) : void 0;

	    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

	    // If target prop is set (e.g. to "_blank"), let browser handle link.
	    /* istanbul ignore if: untestable with Karma */
	    if (this.props.target) return;

	    event.preventDefault();

	    var _props = this.props;
	    var to = _props.to;
	    var query = _props.query;
	    var hash = _props.hash;
	    var state = _props.state;

	    var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });

	    this.context.router.push(location);
	  },
	  render: function render() {
	    var _props2 = this.props;
	    var to = _props2.to;
	    var query = _props2.query;
	    var hash = _props2.hash;
	    var state = _props2.state;
	    var activeClassName = _props2.activeClassName;
	    var activeStyle = _props2.activeStyle;
	    var onlyActiveOnIndex = _props2.onlyActiveOnIndex;

	    var props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);

	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(!(query || hash || state), 'the `query`, `hash`, and `state` props on `<Link>` are deprecated, use `<Link to={{ pathname, query, hash, state }}/>. http://tiny.cc/router-isActivedeprecated') : void 0;

	    // Ignore if rendered outside the context of router, simplifies unit testing.
	    var router = this.context.router;


	    if (router) {
	      // If user does not specify a `to` prop, return an empty anchor tag.
	      if (to == null) {
	        return _react2.default.createElement('a', props);
	      }

	      var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });
	      props.href = router.createHref(location);

	      if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
	        if (router.isActive(location, onlyActiveOnIndex)) {
	          if (activeClassName) {
	            if (props.className) {
	              props.className += ' ' + activeClassName;
	            } else {
	              props.className = activeClassName;
	            }
	          }

	          if (activeStyle) props.style = _extends({}, props.style, activeStyle);
	        }
	      }
	    }

	    return _react2.default.createElement('a', _extends({}, props, { onClick: this.handleClick }));
	  }
	});

	exports.default = Link;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _Link = __webpack_require__(284);

	var _Link2 = _interopRequireDefault(_Link);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * An <IndexLink> is used to link to an <IndexRoute>.
	 */
	var IndexLink = _react2.default.createClass({
	  displayName: 'IndexLink',
	  render: function render() {
	    return _react2.default.createElement(_Link2.default, _extends({}, this.props, { onlyActiveOnIndex: true }));
	  }
	});

	exports.default = IndexLink;
	module.exports = exports['default'];

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = withRouter;

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _hoistNonReactStatics = __webpack_require__(213);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _PropTypes = __webpack_require__(248);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}

	function withRouter(WrappedComponent, options) {
	  var withRef = options && options.withRef;

	  var WithRouter = _react2.default.createClass({
	    displayName: 'WithRouter',

	    contextTypes: { router: _PropTypes.routerShape },
	    propTypes: { router: _PropTypes.routerShape },

	    getWrappedInstance: function getWrappedInstance() {
	      !withRef ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'To access the wrapped instance, you need to specify ' + '`{ withRef: true }` as the second argument of the withRouter() call.') : (0, _invariant2.default)(false) : void 0;

	      return this.wrappedInstance;
	    },
	    render: function render() {
	      var _this = this;

	      var router = this.props.router || this.context.router;
	      var props = _extends({}, this.props, { router: router });

	      if (withRef) {
	        props.ref = function (c) {
	          _this.wrappedInstance = c;
	        };
	      }

	      return _react2.default.createElement(WrappedComponent, props);
	    }
	  });

	  WithRouter.displayName = 'withRouter(' + getDisplayName(WrappedComponent) + ')';
	  WithRouter.WrappedComponent = WrappedComponent;

	  return (0, _hoistNonReactStatics2.default)(WithRouter, WrappedComponent);
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Redirect = __webpack_require__(288);

	var _Redirect2 = _interopRequireDefault(_Redirect);

	var _InternalPropTypes = __webpack_require__(251);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;

	/**
	 * An <IndexRedirect> is used to redirect from an indexRoute.
	 */

	var IndexRedirect = _react2.default.createClass({
	  displayName: 'IndexRedirect',


	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      /* istanbul ignore else: sanity check */
	      if (parentRoute) {
	        parentRoute.indexRoute = _Redirect2.default.createRouteFromReactElement(element);
	      } else {
	        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'An <IndexRedirect> does not make sense at the root of your route config') : void 0;
	      }
	    }
	  },

	  propTypes: {
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _InternalPropTypes.falsy,
	    children: _InternalPropTypes.falsy
	  },

	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});

	exports.default = IndexRedirect;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _RouteUtils = __webpack_require__(247);

	var _PatternUtils = __webpack_require__(252);

	var _InternalPropTypes = __webpack_require__(251);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;

	/**
	 * A <Redirect> is used to declare another URL path a client should
	 * be sent to when they request a given URL.
	 *
	 * Redirects are placed alongside routes in the route configuration
	 * and are traversed in the same manner.
	 */

	var Redirect = _react2.default.createClass({
	  displayName: 'Redirect',


	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element) {
	      var route = (0, _RouteUtils.createRouteFromReactElement)(element);

	      if (route.from) route.path = route.from;

	      route.onEnter = function (nextState, replace) {
	        var location = nextState.location;
	        var params = nextState.params;


	        var pathname = void 0;
	        if (route.to.charAt(0) === '/') {
	          pathname = (0, _PatternUtils.formatPattern)(route.to, params);
	        } else if (!route.to) {
	          pathname = location.pathname;
	        } else {
	          var routeIndex = nextState.routes.indexOf(route);
	          var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
	          var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
	          pathname = (0, _PatternUtils.formatPattern)(pattern, params);
	        }

	        replace({
	          pathname: pathname,
	          query: route.query || location.query,
	          state: route.state || location.state
	        });
	      };

	      return route;
	    },
	    getRoutePattern: function getRoutePattern(routes, routeIndex) {
	      var parentPattern = '';

	      for (var i = routeIndex; i >= 0; i--) {
	        var route = routes[i];
	        var pattern = route.path || '';

	        parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;

	        if (pattern.indexOf('/') === 0) break;
	      }

	      return '/' + parentPattern;
	    }
	  },

	  propTypes: {
	    path: string,
	    from: string, // Alias for path
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _InternalPropTypes.falsy,
	    children: _InternalPropTypes.falsy
	  },

	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<Redirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});

	exports.default = Redirect;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _RouteUtils = __webpack_require__(247);

	var _InternalPropTypes = __webpack_require__(251);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var func = _react2.default.PropTypes.func;

	/**
	 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
	 * a JSX route config.
	 */

	var IndexRoute = _react2.default.createClass({
	  displayName: 'IndexRoute',


	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      /* istanbul ignore else: sanity check */
	      if (parentRoute) {
	        parentRoute.indexRoute = (0, _RouteUtils.createRouteFromReactElement)(element);
	      } else {
	        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'An <IndexRoute> does not make sense at the root of your route config') : void 0;
	      }
	    }
	  },

	  propTypes: {
	    path: _InternalPropTypes.falsy,
	    component: _InternalPropTypes.component,
	    components: _InternalPropTypes.components,
	    getComponent: func,
	    getComponents: func
	  },

	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<IndexRoute> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});

	exports.default = IndexRoute;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _RouteUtils = __webpack_require__(247);

	var _InternalPropTypes = __webpack_require__(251);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;

	/**
	 * A <Route> is used to declare which components are rendered to the
	 * page when the URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is
	 * requested, the tree is searched depth-first to find a route whose
	 * path matches the URL.  When one is found, all routes in the tree
	 * that lead to it are considered "active" and their components are
	 * rendered into the DOM, nested in the same order as in the tree.
	 */

	var Route = _react2.default.createClass({
	  displayName: 'Route',


	  statics: {
	    createRouteFromReactElement: _RouteUtils.createRouteFromReactElement
	  },

	  propTypes: {
	    path: string,
	    component: _InternalPropTypes.component,
	    components: _InternalPropTypes.components,
	    getComponent: func,
	    getComponents: func
	  },

	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<Route> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});

	exports.default = Route;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _InternalPropTypes = __webpack_require__(251);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * A mixin that adds the "history" instance variable to components.
	 */
	var History = {

	  contextTypes: {
	    history: _InternalPropTypes.history
	  },

	  componentWillMount: function componentWillMount() {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'the `History` mixin is deprecated, please access `context.router` with your own `contextTypes`. http://tiny.cc/router-historymixin') : void 0;
	    this.history = this.context.history;
	  }
	};

	exports.default = History;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var object = _react2.default.PropTypes.object;

	/**
	 * The Lifecycle mixin adds the routerWillLeave lifecycle method to a
	 * component that may be used to cancel a transition or prompt the user
	 * for confirmation.
	 *
	 * On standard transitions, routerWillLeave receives a single argument: the
	 * location we're transitioning to. To cancel the transition, return false.
	 * To prompt the user for confirmation, return a prompt message (string).
	 *
	 * During the beforeunload event (assuming you're using the useBeforeUnload
	 * history enhancer), routerWillLeave does not receive a location object
	 * because it isn't possible for us to know the location we're transitioning
	 * to. In this case routerWillLeave must return a prompt message to prevent
	 * the user from closing the window/tab.
	 */

	var Lifecycle = {

	  contextTypes: {
	    history: object.isRequired,
	    // Nested children receive the route as context, either
	    // set by the route component using the RouteContext mixin
	    // or by some other ancestor.
	    route: object
	  },

	  propTypes: {
	    // Route components receive the route object as a prop.
	    route: object
	  },

	  componentDidMount: function componentDidMount() {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'the `Lifecycle` mixin is deprecated, please use `context.router.setRouteLeaveHook(route, hook)`. http://tiny.cc/router-lifecyclemixin') : void 0;
	    !this.routerWillLeave ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'The Lifecycle mixin requires you to define a routerWillLeave method') : (0, _invariant2.default)(false) : void 0;

	    var route = this.props.route || this.context.route;

	    !route ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'The Lifecycle mixin must be used on either a) a <Route component> or ' + 'b) a descendant of a <Route component> that uses the RouteContext mixin') : (0, _invariant2.default)(false) : void 0;

	    this._unlistenBeforeLeavingRoute = this.context.history.listenBeforeLeavingRoute(route, this.routerWillLeave);
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlistenBeforeLeavingRoute) this._unlistenBeforeLeavingRoute();
	  }
	};

	exports.default = Lifecycle;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var object = _react2.default.PropTypes.object;

	/**
	 * The RouteContext mixin provides a convenient way for route
	 * components to set the route in context. This is needed for
	 * routes that render elements that want to use the Lifecycle
	 * mixin to prevent transitions.
	 */

	var RouteContext = {

	  propTypes: {
	    route: object.isRequired
	  },

	  childContextTypes: {
	    route: object.isRequired
	  },

	  getChildContext: function getChildContext() {
	    return {
	      route: this.props.route
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'The `RouteContext` mixin is deprecated. You can provide `this.props.route` on context with your own `contextTypes`. http://tiny.cc/router-routecontextmixin') : void 0;
	  }
	};

	exports.default = RouteContext;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _useQueries = __webpack_require__(270);

	var _useQueries2 = _interopRequireDefault(_useQueries);

	var _createTransitionManager = __webpack_require__(273);

	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know about routing.
	 *
	 * Enhances history objects with the following methods:
	 *
	 * - listen((error, nextState) => {})
	 * - listenBeforeLeavingRoute(route, (nextLocation) => {})
	 * - match(location, (error, redirectLocation, nextState) => {})
	 * - isActive(pathname, query, indexOnly=false)
	 */
	function useRoutes(createHistory) {
	  process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`useRoutes` is deprecated. Please use `createTransitionManager` instead.') : void 0;

	  return function () {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var routes = _ref.routes;

	    var options = _objectWithoutProperties(_ref, ['routes']);

	    var history = (0, _useQueries2.default)(createHistory)(options);
	    var transitionManager = (0, _createTransitionManager2.default)(history, routes);
	    return _extends({}, history, transitionManager);
	  };
	}

	exports.default = useRoutes;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _RouterContext = __webpack_require__(281);

	var _RouterContext2 = _interopRequireDefault(_RouterContext);

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var RoutingContext = _react2.default.createClass({
	  displayName: 'RoutingContext',
	  componentWillMount: function componentWillMount() {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`RoutingContext` has been renamed to `RouterContext`. Please use `import { RouterContext } from \'react-router\'`. http://tiny.cc/router-routercontext') : void 0;
	  },
	  render: function render() {
	    return _react2.default.createElement(_RouterContext2.default, this.props);
	  }
	});

	exports.default = RoutingContext;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _createMemoryHistory = __webpack_require__(297);

	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

	var _createTransitionManager = __webpack_require__(273);

	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

	var _RouteUtils = __webpack_require__(247);

	var _RouterUtils = __webpack_require__(283);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	/**
	 * A high-level API to be used for server-side rendering.
	 *
	 * This function matches a location to a set of routes and calls
	 * callback(error, redirectLocation, renderProps) when finished.
	 *
	 * Note: You probably don't want to use this in a browser unless you're using
	 * server-side rendering with async routes.
	 */
	function match(_ref, callback) {
	  var history = _ref.history;
	  var routes = _ref.routes;
	  var location = _ref.location;

	  var options = _objectWithoutProperties(_ref, ['history', 'routes', 'location']);

	  !(history || location) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'match needs a history or a location') : (0, _invariant2.default)(false) : void 0;

	  history = history ? history : (0, _createMemoryHistory2.default)(options);
	  var transitionManager = (0, _createTransitionManager2.default)(history, (0, _RouteUtils.createRoutes)(routes));

	  var unlisten = void 0;

	  if (location) {
	    // Allow match({ location: '/the/path', ... })
	    location = history.createLocation(location);
	  } else {
	    // Pick up the location from the history via synchronous history.listen
	    // call if needed.
	    unlisten = history.listen(function (historyLocation) {
	      location = historyLocation;
	    });
	  }

	  var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
	  history = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);

	  transitionManager.match(location, function (error, redirectLocation, nextState) {
	    callback(error, redirectLocation, nextState && _extends({}, nextState, {
	      history: history,
	      router: router,
	      matchContext: { history: history, transitionManager: transitionManager, router: router }
	    }));

	    // Defer removing the listener to here to prevent DOM histories from having
	    // to unwind DOM event listeners unnecessarily, in case callback renders a
	    // <Router> and attaches another history listener.
	    if (unlisten) {
	      unlisten();
	    }
	  });
	}

	exports.default = match;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = createMemoryHistory;

	var _useQueries = __webpack_require__(270);

	var _useQueries2 = _interopRequireDefault(_useQueries);

	var _useBasename = __webpack_require__(298);

	var _useBasename2 = _interopRequireDefault(_useBasename);

	var _createMemoryHistory = __webpack_require__(299);

	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createMemoryHistory(options) {
	  // signatures and type checking differ between `useRoutes` and
	  // `createMemoryHistory`, have to create `memoryHistory` first because
	  // `useQueries` doesn't understand the signature
	  var memoryHistory = (0, _createMemoryHistory2.default)(options);
	  var createHistory = function createHistory() {
	    return memoryHistory;
	  };
	  var history = (0, _useQueries2.default)((0, _useBasename2.default)(createHistory))(options);
	  history.__v2_compatible__ = true;
	  return history;
	}
	module.exports = exports['default'];

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(255);

	var _warning2 = _interopRequireDefault(_warning);

	var _ExecutionEnvironment = __webpack_require__(258);

	var _PathUtils = __webpack_require__(257);

	var _runTransitionHook = __webpack_require__(268);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _deprecate = __webpack_require__(269);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var history = createHistory(options);

	    var basename = options.basename;

	    var checkedBaseHref = false;

	    function checkBaseHref() {
	      if (checkedBaseHref) {
	        return;
	      }

	      // Automatically use the value of <base href> in HTML
	      // documents as basename if it's not explicitly given.
	      if (basename == null && _ExecutionEnvironment.canUseDOM) {
	        var base = document.getElementsByTagName('base')[0];
	        var baseHref = base && base.getAttribute('href');

	        if (baseHref != null) {
	          basename = baseHref;

	          process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'Automatically setting basename using <base href> is deprecated and will ' + 'be removed in the next major release. The semantics of <base href> are ' + 'subtly different from basename. Please pass the basename explicitly in ' + 'the options to createHistory') : undefined;
	        }
	      }

	      checkedBaseHref = true;
	    }

	    function addBasename(location) {
	      checkBaseHref();

	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;

	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }

	      return location;
	    }

	    function prependBasename(location) {
	      checkBaseHref();

	      if (!basename) return location;

	      if (typeof location === 'string') location = _PathUtils.parsePath(location);

	      var pname = location.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;

	      return _extends({}, location, {
	        pathname: pathname
	      });
	    }

	    // Override all read methods with basename-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addBasename(location), callback);
	      });
	    }

	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addBasename(location));
	      });
	    }

	    // Override all write methods with basename-aware versions.
	    function push(location) {
	      history.push(prependBasename(location));
	    }

	    function replace(location) {
	      history.replace(prependBasename(location));
	    }

	    function createPath(location) {
	      return history.createPath(prependBasename(location));
	    }

	    function createHref(location) {
	      return history.createHref(prependBasename(location));
	    }

	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
	    }

	    // deprecated
	    function pushState(state, path) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);

	      push(_extends({ state: state }, path));
	    }

	    // deprecated
	    function replaceState(state, path) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);

	      replace(_extends({ state: state }, path));
	    }

	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,

	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}

	exports['default'] = useBasename;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(255);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _PathUtils = __webpack_require__(257);

	var _Actions = __webpack_require__(256);

	var _createHistory = __webpack_require__(262);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	}

	function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }

	  var history = _createHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: saveState,
	    go: go
	  }));

	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;

	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }

	  entries = entries.map(function (entry) {
	    var key = history.createKey();

	    if (typeof entry === 'string') return { pathname: entry, key: key };

	    if (typeof entry === 'object' && entry) return _extends({}, entry, { key: key });

	     true ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Unable to create history entry from %s', entry) : _invariant2['default'](false) : undefined;
	  });

	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : _invariant2['default'](false) : undefined;
	  }

	  var storage = createStateStorage(entries);

	  function saveState(key, state) {
	    storage[key] = state;
	  }

	  function readState(key) {
	    return storage[key];
	  }

	  function getCurrentLocation() {
	    var entry = entries[current];
	    var basename = entry.basename;
	    var pathname = entry.pathname;
	    var search = entry.search;

	    var path = (basename || '') + pathname + (search || '');

	    var key = undefined,
	        state = undefined;
	    if (entry.key) {
	      key = entry.key;
	      state = readState(key);
	    } else {
	      key = history.createKey();
	      state = null;
	      entry.key = key;
	    }

	    var location = _PathUtils.parsePath(path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  }

	  function go(n) {
	    if (n) {
	      if (!canGo(n)) {
	        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'Cannot go(%s) there is not enough history', n) : undefined;
	        return;
	      }

	      current += n;

	      var currentLocation = getCurrentLocation();

	      // change action to POP
	      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	    }
	  }

	  function finishTransition(location) {
	    switch (location.action) {
	      case _Actions.PUSH:
	        current += 1;

	        // if we are not on the top of stack
	        // remove rest and push new
	        if (current < entries.length) entries.splice(current);

	        entries.push(location);
	        saveState(location.key, location.state);
	        break;
	      case _Actions.REPLACE:
	        entries[current] = location;
	        saveState(location.key, location.state);
	        break;
	    }
	  }

	  return history;
	}

	exports['default'] = createMemoryHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = useRouterHistory;

	var _useQueries = __webpack_require__(270);

	var _useQueries2 = _interopRequireDefault(_useQueries);

	var _useBasename = __webpack_require__(298);

	var _useBasename2 = _interopRequireDefault(_useBasename);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function useRouterHistory(createHistory) {
	  return function (options) {
	    var history = (0, _useQueries2.default)((0, _useBasename2.default)(createHistory))(options);
	    history.__v2_compatible__ = true;
	    return history;
	  };
	}
	module.exports = exports['default'];

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _RouterContext = __webpack_require__(281);

	var _RouterContext2 = _interopRequireDefault(_RouterContext);

	var _routerWarning = __webpack_require__(250);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    middlewares.forEach(function (middleware, index) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(middleware.renderRouterContext || middleware.renderRouteComponent, 'The middleware specified at index ' + index + ' does not appear to be ' + 'a valid React Router middleware.') : void 0;
	    });
	  }

	  var withContext = middlewares.map(function (middleware) {
	    return middleware.renderRouterContext;
	  }).filter(Boolean);
	  var withComponent = middlewares.map(function (middleware) {
	    return middleware.renderRouteComponent;
	  }).filter(Boolean);

	  var makeCreateElement = function makeCreateElement() {
	    var baseCreateElement = arguments.length <= 0 || arguments[0] === undefined ? _react.createElement : arguments[0];
	    return function (Component, props) {
	      return withComponent.reduceRight(function (previous, renderRouteComponent) {
	        return renderRouteComponent(previous, props);
	      }, baseCreateElement(Component, props));
	    };
	  };

	  return function (renderProps) {
	    return withContext.reduceRight(function (previous, renderRouterContext) {
	      return renderRouterContext(previous, renderProps);
	    }, _react2.default.createElement(_RouterContext2.default, _extends({}, renderProps, {
	      createElement: makeCreateElement(renderProps.createElement)
	    })));
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createBrowserHistory = __webpack_require__(303);

	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

	var _createRouterHistory = __webpack_require__(304);

	var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _createRouterHistory2.default)(_createBrowserHistory2.default);
	module.exports = exports['default'];

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(214);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(256);

	var _PathUtils = __webpack_require__(257);

	var _ExecutionEnvironment = __webpack_require__(258);

	var _DOMUtils = __webpack_require__(259);

	var _DOMStateStorage = __webpack_require__(260);

	var _createDOMHistory = __webpack_require__(261);

	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve URLs.
	 */
	function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

	  var forceRefresh = options.forceRefresh;

	  var isSupported = _DOMUtils.supportsHistory();
	  var useRefresh = !isSupported || forceRefresh;

	  function getCurrentLocation(historyState) {
	    try {
	      historyState = historyState || window.history.state || {};
	    } catch (e) {
	      historyState = {};
	    }

	    var path = _DOMUtils.getWindowPath();
	    var _historyState = historyState;
	    var key = _historyState.key;

	    var state = undefined;
	    if (key) {
	      state = _DOMStateStorage.readState(key);
	    } else {
	      state = null;
	      key = history.createKey();

	      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null);
	    }

	    var location = _PathUtils.parsePath(path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function startPopStateListener(_ref) {
	    var transitionTo = _ref.transitionTo;

	    function popStateListener(event) {
	      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

	      transitionTo(getCurrentLocation(event.state));
	    }

	    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

	    return function () {
	      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
	    };
	  }

	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;

	    if (action === _Actions.POP) return; // Nothing to do.

	    _DOMStateStorage.saveState(key, state);

	    var path = (basename || '') + pathname + search + hash;
	    var historyState = {
	      key: key
	    };

	    if (action === _Actions.PUSH) {
	      if (useRefresh) {
	        window.location.href = path;
	        return false; // Prevent location update.
	      } else {
	          window.history.pushState(historyState, null, path);
	        }
	    } else {
	      // REPLACE
	      if (useRefresh) {
	        window.location.replace(path);
	        return false; // Prevent location update.
	      } else {
	          window.history.replaceState(historyState, null, path);
	        }
	    }
	  }

	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));

	  var listenerCount = 0,
	      stopPopStateListener = undefined;

	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    var unlisten = history.listenBefore(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }

	  function listen(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    var unlisten = history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    history.registerTransitionHook(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);

	    if (--listenerCount === 0) stopPopStateListener();
	  }

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    registerTransitionHook: registerTransitionHook,
	    unregisterTransitionHook: unregisterTransitionHook
	  });
	}

	exports['default'] = createBrowserHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	exports.default = function (createHistory) {
	  var history = void 0;
	  if (canUseDOM) history = (0, _useRouterHistory2.default)(createHistory)();
	  return history;
	};

	var _useRouterHistory = __webpack_require__(300);

	var _useRouterHistory2 = _interopRequireDefault(_useRouterHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	module.exports = exports['default'];

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createHashHistory = __webpack_require__(254);

	var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

	var _createRouterHistory = __webpack_require__(304);

	var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _createRouterHistory2.default)(_createHashHistory2.default);
	module.exports = exports['default'];

/***/ },
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureStore;

	var _redux = __webpack_require__(198);

	var _socketMiddleware = __webpack_require__(317);

	var _socketMiddleware2 = _interopRequireDefault(_socketMiddleware);

	var _ajaxMiddleware = __webpack_require__(323);

	var _ajaxMiddleware2 = _interopRequireDefault(_ajaxMiddleware);

	var _mockMiddleware = __webpack_require__(327);

	var _mockMiddleware2 = _interopRequireDefault(_mockMiddleware);

	var _reducers = __webpack_require__(329);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//import {preloadedState} from './utilities/intialData';

	function configureStore(preloadedState) {
	  return (0, _redux.createStore)(_reducers2.default, preloadedState, (0, _redux.applyMiddleware)(_ajaxMiddleware2.default, _socketMiddleware2.default, _mockMiddleware2.default));
	}

/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _socketActions = __webpack_require__(318);

	var _appConstants = __webpack_require__(319);

	var _configConstants = __webpack_require__(320);

	var _responseParser = __webpack_require__(321);

	var socketMiddleware = function () {
	  var socket = null;

	  var onOpen = function onOpen(ws, store, token) {
	    return function (evt) {
	      //Send a handshake, or authenticate with remote end

	      //Tell the store we're connected
	      store.dispatch((0, _socketActions.wsResponseAction)(evt.type));
	    };
	  };

	  var onClose = function onClose(ws, store) {
	    return function (evt) {
	      //Tell the store we've disconnected
	      store.dispatch((0, _socketActions.wsEndConnection)());
	    };
	  };

	  var onMessage = function onMessage(ws, store) {
	    return function (evt) {
	      //Parse the JSON message received on the websocket
	      var msg = JSON.parse(evt.data);

	      (0, _responseParser.ResponseParse)(store, msg);
	    };
	  };

	  return function (store) {
	    return function (next) {
	      return function (action) {
	        switch (action.type) {

	          //The user wants us to connect
	          case _appConstants.WS_CONNECT:
	            //Start a new connection to the server
	            if (socket != null) {
	              socket.close();
	            }
	            //Send an action that shows a "connecting..." status for now
	            //store.dispatch(actions.connecting());

	            //Attempt to connect (we could send a 'failed' action on error)
	            socket = new WebSocket(_configConstants.WS_URL);
	            socket.onmessage = onMessage(socket, store);
	            socket.onclose = onClose(socket, store);
	            socket.onopen = onOpen(socket, store, action.token);

	            break;

	          //The user wants us to disconnect
	          case _appConstants.WS_DISCONNECT:
	            if (socket != null) {
	              socket.close();
	            }
	            socket = null;

	            //Set our state to disconnected

	            break;

	          //Send the 'SEND_MESSAGE' action down the websocket to the server
	          case _appConstants.WS_ONSEND:
	            socket.send(JSON.stringify(action.data));
	            break;

	          //This action is irrelevant to us, pass it on to the next middleware
	          default:
	            return next(action);
	        }
	      };
	    };
	  };
	}();

	exports.default = socketMiddleware;

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.wsOnMessageAction = wsOnMessageAction;
	exports.wsResponseAction = wsResponseAction;
	exports.setWsAction = setWsAction;
	exports.endWsAction = endWsAction;
	exports.wsEndConnection = wsEndConnection;
	exports.setMockAction = setMockAction;

	var _appConstants = __webpack_require__(319);

	var _configConstants = __webpack_require__(320);

	var _appConstants2 = __webpack_require__(319);

	var _socketMiddleware = __webpack_require__(317);

	//import {getFetchData} from 'headerAction'


	function wsOnMessageAction(data) {

		return {
			type: _appConstants.WS_ONMESSAGE,
			data: data
		};
	}
	function wsResponseAction(data) {

		return {
			type: _appConstants.WS_CONNECTED,
			data: data
		};
	}
	function setWsAction(params) {
		return {
			type: params.type,
			data: params.data
		};
	}
	function endWsAction() {
		return { type: _appConstants.WS_DISCONNECT };
	}
	function wsEndConnection() {
		return {
			type: _appConstants.WS_END
		};
	}
	function setMockAction(params) {
		return {
			type: params.type,
			data: params.data
		};
	}

/***/ },
/* 319 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*Constants for login module*/
	var LOGIN_REQUEST = exports.LOGIN_REQUEST = "LOGIN_REQUEST";
	var LOGIN_REDIRECT = exports.LOGIN_REDIRECT = "LOGIN_REDIRECT";
	var LOGIN_SUCCESS = exports.LOGIN_SUCCESS = "LOGIN_SUCCESS";
	var LOGIN_FAILURE = exports.LOGIN_FAILURE = "LOGIN_FAILURE";
	var LOGOUT = exports.LOGOUT = "LOGOUT";
	var AJAX_CALL = exports.AJAX_CALL = "AJAX_CALL";
	var MOCK_LOGIN = exports.MOCK_LOGIN = "MOCK_LOGIN";

	/*Constants for Web Sockets*/
	var WS_CONNECT = exports.WS_CONNECT = "WS_CONNECT";
	var WS_CONNECTED = exports.WS_CONNECTED = "WS_CONNECTED";
	var WS_DISCONNECT = exports.WS_DISCONNECT = "WS_DISCONNECT";
	var WS_ONMESSAGE = exports.WS_ONMESSAGE = "WS_ONMESSAGE";
	var WS_ONSEND = exports.WS_ONSEND = "WS_ONSEND";
	var WS_INIT = exports.WS_INIT = "WS_INIT";
	var WS_SUCCESS = exports.WS_SUCCESS = "Sucessfully logged in";
	var WS_END = exports.WS_END = "WS_END";
	var WS_MOCK = exports.WS_MOCK = "WS_MOCK";
	/* Header constants */

	var REQUEST_HEADER = exports.REQUEST_HEADER = "REQUEST_HEADER";
	var RECIEVE_HEADER = exports.RECIEVE_HEADER = "RECIEVE_HEADER";
	var RECIEVE_ITEM_TO_STOCK = exports.RECIEVE_ITEM_TO_STOCK = "RECIEVE_ITEM_TO_STOCK";

	/*Constants for performance widget*/
	var RENDER_WIDGET = exports.RENDER_WIDGET = "RENDER_WIDGET";
	var TAB_SELECTED = exports.TAB_SELECTED = "TAB_SELECTED";
	var SUB_TAB_SELECTED = exports.SUB_TAB_SELECTED = "SUB_TAB_SELECTED";

	/*Parsing Constants*/
	var PARSE_PPS = exports.PARSE_PPS = "pps_details";
	var PARSE_BUTLERS = exports.PARSE_BUTLERS = "butlers";
	var PARSE_CHARGERS = exports.PARSE_CHARGERS = "chargers";
	var PARSE_ORDERS = exports.PARSE_ORDERS = "order_details";
	var PARSE_INVENTORY = exports.PARSE_INVENTORY = "inventory";
	var PARSE_PUT = exports.PARSE_PUT = "put_details";
	var PARSE_PICK = exports.PARSE_PICK = "pick_details";
	var PARSE_PPA_THROUGHPUT = exports.PARSE_PPA_THROUGHPUT = "put_pick_audit_throughput";
	var PARSE_AUDIT = exports.PARSE_AUDIT = "audit_details";
	var SYSTEM_CHARGERS_DETAILS = exports.SYSTEM_CHARGERS_DETAILS = "system_chargers_details";
	var NOTIFICATION = exports.NOTIFICATION = "NOTIFICATION";
	var BUTLERBOTS = exports.BUTLERBOTS = "BUTLERBOTS";
	var CHARGING = exports.CHARGING = "CHARGING";
	var PPS = exports.PPS = "PPS";
	var PPS_PERFORMANCE = exports.PPS_PERFORMANCE = "PPS_PERFORMANCE";
	/*Constants for stats widget*/
	var RENDER_STATSWIDGET = exports.RENDER_STATSWIDGET = "RENDER_STATSWIDGET";

	/*Constants for main tab*/
	var OVERVIEW = exports.OVERVIEW = "OVERVIEW";
	var SYSTEM = exports.SYSTEM = "SYSTEM";
	var ORDERS = exports.ORDERS = "ORDERS";
	var INVENTORY = exports.INVENTORY = "INVENTORY";
	var USERS = exports.USERS = "USERS";
	var NOTIFICATION_TAB = exports.NOTIFICATION_TAB = "Notification";
	var BUTLERBOTS_TAB = exports.BUTLERBOTS_TAB = "Butler Bots";
	var CHARGING_TAB = exports.CHARGING_TAB = "Charging Station";
	var PPS_TAB = exports.PPS_TAB = "Pick Put Stations";
	var ORDER_LIST = exports.ORDER_LIST = "Order List";
	var WAVES = exports.WAVES = "Waves";

	/*Constants for response type */
	var PPS_DATA = exports.PPS_DATA = "PPS_DATA";
	var BUTLERS_DATA = exports.BUTLERS_DATA = "BUTLERS_DATA";
	var AUDIT_DATA = exports.AUDIT_DATA = "AUDIT_DATA";
	var PUT_DATA = exports.PUT_DATA = "PUT_DATA";
	var ORDERS_DATA = exports.ORDERS_DATA = "ORDERS_DATA";
	var INVENTORY_DATA = exports.INVENTORY_DATA = "INVENTORY_DATA";
	var CHARGERS_DATA = exports.CHARGERS_DATA = "CHARGERS_DATA";
	var THROUGHPUT_DATA = exports.THROUGHPUT_DATA = "THROUGHPUT_DATA";
	var HISTOGRAM_DATA = exports.HISTOGRAM_DATA = "HISTOGRAM_DATA";
	var CHARGERS_DETAIL = exports.CHARGERS_DETAIL = "CHARGERS_DETAIL";
	var BUTLERS_DETAIL = exports.BUTLERS_DETAIL = "BUTLERS_DETAIL";
	var PPS_DETAIL = exports.PPS_DETAIL = "pps_detail";
	var SYSTEM_PPS_DETAILS = exports.SYSTEM_PPS_DETAILS = "system_pps_details";
	var SYSTEM_BUTLERS_DETAILS = exports.SYSTEM_BUTLERS_DETAILS = "system_butlers_details";
	var HISTOGRAM_DETAILS = exports.HISTOGRAM_DETAILS = "histogram_details";

	/*Constants for type of AJAX call*/
	var AUTH_LOGIN = exports.AUTH_LOGIN = "AUTH_LOGIN";

/***/ },
/* 320 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var WS_URL = exports.WS_URL = "ws://192.168.8.118:8888/manager_api/ws";
	var LOGIN_URL = exports.LOGIN_URL = "https://192.168.8.118/api/auth/token";

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ResponseParse = ResponseParse;

	var _responseAction = __webpack_require__(322);

	var _socketActions = __webpack_require__(318);

	var _appConstants = __webpack_require__(319);

	function ResponseParse(store, res) {

		if (!res.resource_type) {
			store.dispatch((0, _socketActions.wsOnMessageAction)(res));
			return;
		}

		switch (res.resource_type) {
			case _appConstants.PARSE_PPS:
				store.dispatch((0, _responseAction.receivePpsData)(res));
				break;
			case _appConstants.PARSE_BUTLERS:
				store.dispatch((0, _responseAction.receiveButlersData)(res));
				break;
			case _appConstants.PARSE_AUDIT:
				store.dispatch((0, _responseAction.receiveAuditData)(res));
				break;
			case _appConstants.PARSE_PUT:
				store.dispatch((0, _responseAction.receivePutData)(res));
				break;
			case _appConstants.PARSE_CHARGERS:
				store.dispatch((0, _responseAction.receiveChargersData)(res));
				break;
			case _appConstants.PARSE_INVENTORY:
				store.dispatch((0, _responseAction.receiveInventoryData)(res));
				break;
			case _appConstants.PARSE_ORDERS:
				store.dispatch((0, _responseAction.receiveOrdersData)(res));
				break;
			case _appConstants.PARSE_PPA_THROUGHPUT:
				store.dispatch((0, _responseAction.receiveThroughputData)(res));
				break;
			case _appConstants.HISTOGRAM_DETAILS:
				store.dispatch((0, _responseAction.recieveHistogramData)(res));
				break;
			case _appConstants.SYSTEM_CHARGERS_DETAILS:
				store.dispatch((0, _responseAction.recieveChargersDetail)(res));
				break;
			case _appConstants.SYSTEM_BUTLERS_DETAILS:
				store.dispatch((0, _responseAction.recieveButlersDetail)(res));
				break;
			case _appConstants.SYSTEM_PPS_DETAILS:
				store.dispatch((0, _responseAction.recievePPSDetail)(res));
				break;
			case _appConstants.PPS_DETAIL:
				store.dispatch((0, _responseAction.recievePPSperformance)(res));
				break;
			default:
				store.dispatch((0, _responseAction.initData)(res)); //Default action
				break;
		}
	}

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.receivePpsData = receivePpsData;
	exports.receiveButlersData = receiveButlersData;
	exports.receiveInventoryData = receiveInventoryData;
	exports.receiveChargersData = receiveChargersData;
	exports.receiveAuditData = receiveAuditData;
	exports.receivePutData = receivePutData;
	exports.receiveOrdersData = receiveOrdersData;
	exports.receiveThroughputData = receiveThroughputData;
	exports.initData = initData;
	exports.recieveHistogramData = recieveHistogramData;
	exports.recieveChargersDetail = recieveChargersDetail;
	exports.recieveButlersDetail = recieveButlersDetail;
	exports.recievePPSDetail = recievePPSDetail;
	exports.recievePPSperformance = recievePPSperformance;

	var _appConstants = __webpack_require__(319);

	//import {getFetchData} from 'headerAction'

	function receivePpsData(data) {

		return {
			type: _appConstants.PPS_DATA,
			data: data
		};
	}
	function receiveButlersData(data) {

		return {
			type: _appConstants.BUTLERS_DATA,
			data: data
		};
	}
	function receiveInventoryData(data) {
		return {
			type: _appConstants.INVENTORY_DATA,
			data: data
		};
	}
	function receiveChargersData(data) {

		return {
			type: _appConstants.CHARGERS_DATA,
			data: data
		};
	}
	function receiveAuditData(data) {

		return {
			type: _appConstants.AUDIT_DATA,
			data: data
		};
	}
	function receivePutData(data) {

		return {
			type: _appConstants.PUT_DATA,
			data: data
		};
	}

	function receiveOrdersData(data) {

		return {
			type: _appConstants.ORDERS_DATA,
			data: data
		};
	}
	function receiveThroughputData(data) {

		return {
			type: _appConstants.THROUGHPUT_DATA,
			data: data
		};
	}
	function initData(data) {
		return {
			type: _appConstants.WS_INIT,
			data: data
		};
	}

	function recieveHistogramData(data) {
		return {
			type: _appConstants.HISTOGRAM_DATA,
			data: data
		};
	}

	function recieveChargersDetail(data) {
		return {
			type: _appConstants.CHARGERS_DETAIL,
			data: data
		};
	}

	function recieveButlersDetail(data) {
		return {
			type: _appConstants.BUTLERS_DETAIL,
			data: data
		};
	}

	function recievePPSDetail(data) {
		return {
			type: _appConstants.PPS_DETAIL,
			data: data
		};
	}

	function recievePPSperformance(data) {
		return {
			type: _appConstants.PPS_PERFORMANCE,
			data: data
		};
	}

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _appConstants = __webpack_require__(319);

	var _ajaxParser = __webpack_require__(324);

	var _showError = __webpack_require__(326);

	var ajaxMiddleware = function () {

	  return function (store) {
	    return function (next) {
	      return function (action) {
	        switch (action.type) {

	          case _appConstants.MOCK_LOGIN:
	            /**
	             * Sending arbitrary auth-token to emulate login
	             */
	            (0, _ajaxParser.AjaxParse)(store, {
	              "auth_token": "eyJhbGciOiJIUzI1NiIsImV4cCI6MTQ3NTAwNjc0OCwiaWF0IjoxNDc0OTc0MzQ4fQ.eyJpZCI6MX0.VUCUA1kqq5Robxbu_LzyLD2yrptvBEN6zVQ2DsP7uSE",
	              "duration": 32400
	            }, action.params.cause);
	            break;
	          case _appConstants.AJAX_CALL:

	            var params = action.params;

	            var formData = params.formdata || null,
	                loginData = JSON.stringify(formData || {});
	            var httpRequest = new XMLHttpRequest();

	            if (!httpRequest || !params.url) {
	              return false;
	            }
	            httpRequest.onreadystatechange = function (xhr) {
	              if (httpRequest.readyState === XMLHttpRequest.DONE) {
	                if (httpRequest.status === 200) {
	                  var response = JSON.parse(httpRequest.response);
	                  (0, _ajaxParser.AjaxParse)(store, response, params.cause);
	                } else {
	                  console.log('Connection refused');
	                  (0, _showError.ShowError)(store, params.cause);
	                }
	              }
	            };
	            httpRequest.open(params.method, params.url);
	            httpRequest.setRequestHeader('Content-Type', params.contentType || "text/html");
	            httpRequest.send(loginData);
	            break;

	          default:
	            return next(action);
	        }
	      };
	    };
	  };
	}();

	exports.default = ajaxMiddleware;

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AjaxParse = AjaxParse;

	var _loginAction = __webpack_require__(325);

	var _appConstants = __webpack_require__(319);

	function AjaxParse(store, res, cause) {
		switch (cause) {
			case _appConstants.AUTH_LOGIN:
				store.dispatch((0, _loginAction.receiveAuthData)(res));
				break;
			default:
				console.log('Call cause unknown');
		}
	}

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loginRequest = loginRequest;
	exports.logoutRequest = logoutRequest;
	exports.loginRedirect = loginRedirect;
	exports.receiveAuthData = receiveAuthData;
	exports.mockLoginAuth = mockLoginAuth;
	exports.authLoginData = authLoginData;

	var _appConstants = __webpack_require__(319);

	/**
	 * Actions for Login request
	 */

	function loginRequest() {
	  return {
	    type: _appConstants.LOGIN_REQUEST
	  };
	}

	function logoutRequest() {

	  return { type: _appConstants.LOGOUT };
	}

	function loginRedirect(data) {
	  return {
	    type: _appConstants.LOGIN_REDIRECT,
	    data: data
	  };
	}

	function receiveAuthData(data) {
	  if (data && data.auth_token) {
	    console.log('Login Pass');
	    return {
	      type: _appConstants.LOGIN_SUCCESS,
	      data: data
	    };
	  } else {
	    console.log('Login Fail');
	    return {
	      type: _appConstants.LOGIN_FAILURE,
	      data: data
	    };
	  }
	}
	/**
	 * Mock login module
	 */
	function mockLoginAuth(params) {
	  return {
	    type: _appConstants.MOCK_LOGIN,
	    params: params
	  };
	}
	/**
	 * function that sends ajax to authorize user
	 */

	function authLoginData(params) {
	  return {
	    type: _appConstants.AJAX_CALL,
	    params: params
	  };
	}

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ShowError = ShowError;

	var _loginAction = __webpack_require__(325);

	var _appConstants = __webpack_require__(319);

	function ShowError(store, cause) {
		switch (cause) {
			case _appConstants.AUTH_LOGIN:
				console.log('In Error utility');
				store.dispatch((0, _loginAction.receiveAuthData)(''));
				break;
			default:
				console.log('Error cause unknown');
		}
	}

/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mockDBData = __webpack_require__(328);

	var mockData = _interopRequireWildcard(_mockDBData);

	var _appConstants = __webpack_require__(319);

	var _responseParser = __webpack_require__(321);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var mockMiddleware = function () {
	  return function (store) {
	    return function (next) {
	      return function (action) {
	        switch (action.type) {

	          case _appConstants.WS_MOCK:
	            //var msg = JSON.parse(evt.data);
	            (0, _responseParser.ResponseParse)(store, mockData.resTypePPS);
	            (0, _responseParser.ResponseParse)(store, mockData.resTypePut);
	            (0, _responseParser.ResponseParse)(store, mockData.resTypeThroughPut);
	            (0, _responseParser.ResponseParse)(store, mockData.resTypeAudit);
	            (0, _responseParser.ResponseParse)(store, mockData.resTypeHistogram);
	            (0, _responseParser.ResponseParse)(store, mockData.resTypeChargersDetail);
	            (0, _responseParser.ResponseParse)(store, mockData.resTypeButlerDetail);
	            (0, _responseParser.ResponseParse)(store, mockData.resTypePPSdetail);
	            (0, _responseParser.ResponseParse)(store, mockData.resTypeOrders);
	            (0, _responseParser.ResponseParse)(store, mockData.resTypePPSperformance);
	            break;
	          //This action is irrelevant to us, pass it on to the next middleware
	          default:
	            return next(action);
	        }
	      };
	    };
	  };
	}();

	exports.default = mockMiddleware;

/***/ },
/* 328 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var resTypePut = exports.resTypePut = {
		"aggregate_data": {
			"items_put": 256789
		},
		"resource_type": "put_details"
	};

	var resTypeThroughPut = exports.resTypeThroughPut = {
		"aggregate_data": {
			"put_throughput": 3556,
			"pick_throughput": 3546,
			"audit_throughput": 2400 // to get clarification for audit 
		},
		"resource_type": "put_pick_audit_throughput"
	};

	var resTypeAudit = exports.resTypeAudit = {
		"aggregate_data": {
			"audit_type": null,
			"total_audited": 20687
		},
		"resource_type": "audit_details"
	};

	var resTypePPS = exports.resTypePPS = {
		"aggregate_data": [{
			"pps_id": 1,
			"time_unit": "per_hour",
			"orders_picked": 500,
			"items_picked": 1000,
			"items_put": 2400,
			"items_audited": "need_to_be_decided_per_item_or_per_audit",
			"pps_mode": "put",
			"active": "true/false"
		}, {
			"pps_id": 5,
			"time_unit": "per_hour",
			"orders_picked": 500,
			"items_picked": 1000,
			"items_put": 2400,
			"items_audited": "need_to_be_decided_per_item_or_per_audit",
			"pps_mode": "audit",
			"active": "true/false"
		}, {
			"pps_id": 2,
			"time_unit": "per_hour",
			"orders_picked": 500,
			"items_picked": 1000,
			"items_put": 2400,
			"items_audited": "need_to_be_decided_per_item_or_per_audit",
			"pps_mode": "pick",
			"active": "true/false"
		}],
		"resource_type": "pps_details"
	};

	var resTypePick = exports.resTypePick = {
		"aggregate_data": {
			"count_complete": 0
		},
		"resource_type": "pick"
	};

	var resTypeInventory1 = exports.resTypeInventory1 = {
		"aggregate_data": {
			"total_available_volume": 0,
			"count_put": 0,
			"total_utilized_percentage": 0,
			"total_utilized_volume": 0,
			"count_pick": 0,
			"available_skus": 1,
			"stock_current": 8,
			"open_stock": 15
		},
		"resource_type": "inventory"
	};
	var resTypeOrders = exports.resTypeOrders = {
		"aggregate_data": {
			"pending_orders": 100,
			"cut_off_time": 170,
			"estimated_completion_time": 20,
			"orders_at_risk": 0,
			"Wave_ending_time": '21-30-57 (IST)'
		},
		"resource_type": "order_details"
	};
	var resTypeChargers = exports.resTypeChargers = {
		"data": [{
			"charger_mode": "manual",
			"charger_id": "1",
			"charger_status": "disconnected"
		}, {
			"charger_mode": "manual",
			"charger_id": "2",
			"charger_status": "disconnected"
		}, {
			"charger_mode": "manual",
			"charger_id": "4",
			"charger_status": "disconnected"
		}, {
			"charger_mode": "manual",
			"charger_id": "5",
			"charger_status": "disconnected"
		}, {
			"charger_mode": "manual",
			"charger_id": "3",
			"charger_status": "disconnected"
		}, {
			"charger_mode": "manual",
			"charger_id": "6",
			"charger_status": "disconnected"
		}],
		"resource_type": "chargers"
	};

	var resTypeButlersData = exports.resTypeButlersData = {
		"data": [{
			"status": "ready",
			"display_id": "undefined",
			"direction": 0,
			"deltas": [0, 0, 0],
			"navstatus": "init",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": null,
			"voltage": 0,
			"tasktype": "null",
			"error_desc": "no_error",
			"position": "019.014",
			"current_subtask": "undefined",
			"butler_id": "1"
		}, {
			"status": "processing",
			"display_id": "undefined",
			"direction": 1,
			"deltas": [0, 0, 0],
			"navstatus": "info",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": "41c8ac5d-0762-42ea-9cda-4360d54512fd",
			"voltage": 0,
			"tasktype": "audittask",
			"error_desc": "no_error",
			"position": "018.022",
			"current_subtask": "pps_control",
			"butler_id": "2"
		}, {
			"status": "processing",
			"display_id": "undefined",
			"direction": 2,
			"deltas": [0, 0, 0],
			"navstatus": "info",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": "2bd7e683-3951-46c1-ad6b-9671b50331d3",
			"voltage": 0,
			"tasktype": "audittask",
			"error_desc": "no_error",
			"position": "019.024",
			"current_subtask": "goto_barcode",
			"butler_id": "3"
		}, {
			"status": "processing",
			"display_id": "undefined",
			"direction": 1,
			"deltas": [0, 0, 0],
			"navstatus": "info",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": "34b6fd43-4d95-4f30-808b-74fc4312e083",
			"voltage": 0,
			"tasktype": "audittask",
			"error_desc": "no_error",
			"position": "018.023",
			"current_subtask": "goto_barcode",
			"butler_id": "4"
		}, {
			"status": "ready",
			"display_id": "undefined",
			"direction": 0,
			"deltas": [0, 0, 0],
			"navstatus": "info",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": null,
			"voltage": 0,
			"tasktype": "null",
			"error_desc": "no_error",
			"position": "022.013",
			"current_subtask": "undefined",
			"butler_id": "5"
		}, {
			"status": "ready",
			"display_id": "undefined",
			"direction": 0,
			"deltas": [0, 0, 0],
			"navstatus": "init",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": null,
			"voltage": 0,
			"tasktype": "null",
			"error_desc": "no_error",
			"position": "044.035",
			"current_subtask": "undefined",
			"butler_id": "6"
		}, {
			"status": "ready",
			"display_id": "undefined",
			"direction": 0,
			"deltas": [0, 0, 0],
			"navstatus": "init",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": null,
			"voltage": 0,
			"tasktype": "null",
			"error_desc": "no_error",
			"position": "039.015",
			"current_subtask": "undefined",
			"butler_id": "7"
		}, {
			"status": "ready",
			"display_id": "undefined",
			"direction": 0,
			"deltas": [0, 0, 0],
			"navstatus": "init",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": null,
			"voltage": 0,
			"tasktype": "null",
			"error_desc": "no_error",
			"position": "019.011",
			"current_subtask": "undefined",
			"butler_id": "8"
		}, {
			"status": "ready",
			"display_id": "undefined",
			"direction": 0,
			"deltas": [0, 0, 0],
			"navstatus": "init",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": null,
			"voltage": 0,
			"tasktype": "null",
			"error_desc": "no_error",
			"position": "033.012",
			"current_subtask": "undefined",
			"butler_id": "9"
		}, {
			"status": "ready",
			"display_id": "undefined",
			"direction": 0,
			"deltas": [0, 0, 0],
			"navstatus": "init",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": null,
			"voltage": 0,
			"tasktype": "null",
			"error_desc": "no_error",
			"position": "040.035",
			"current_subtask": "undefined",
			"butler_id": "10"
		}, {
			"status": "ready",
			"display_id": "undefined",
			"direction": 0,
			"deltas": [0, 0, 0],
			"navstatus": "init",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": null,
			"voltage": 0,
			"tasktype": "null",
			"error_desc": "no_error",
			"position": "026.016",
			"current_subtask": "undefined",
			"butler_id": "11"
		}, {
			"status": "ready",
			"display_id": "undefined",
			"direction": 0,
			"deltas": [0, 0, 0],
			"navstatus": "init",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": null,
			"voltage": 0,
			"tasktype": "null",
			"error_desc": "no_error",
			"position": "037.027",
			"current_subtask": "undefined",
			"butler_id": "12"
		}, {
			"status": "processing",
			"display_id": "undefined",
			"direction": 1,
			"deltas": [0, 0, 0],
			"navstatus": "info",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": "1cc5249d-38c0-4716-8335-b3b3ffb99b29",
			"voltage": 0,
			"tasktype": "picktask",
			"error_desc": "no_error",
			"position": "018.034",
			"current_subtask": "pps_control",
			"butler_id": "13"
		}, {
			"status": "ready",
			"display_id": "undefined",
			"direction": 0,
			"deltas": [0, 0, 0],
			"navstatus": "init",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": null,
			"voltage": 0,
			"tasktype": "null",
			"error_desc": "no_error",
			"position": "030.013",
			"current_subtask": "undefined",
			"butler_id": "14"
		}, {
			"status": "ready",
			"display_id": "undefined",
			"direction": 0,
			"deltas": [0, 0, 0],
			"navstatus": "init",
			"address": "127.0.0.1",
			"paused": false,
			"state": "online",
			"taskkey": null,
			"voltage": 0,
			"tasktype": "null",
			"error_desc": "no_error",
			"position": "041.032",
			"current_subtask": "undefined",
			"butler_id": "15"
		}],
		"resource_type": "butlers"
	};

	var resTypeInventory2 = exports.resTypeInventory2 = {
		"aggregate_data": {
			"total_available_volume": 0,
			"count_put": 0,
			"total_utilized_percentage": 0,
			"total_utilized_volume": 0,
			"count_pick": 0,
			"available_skus": 1,
			"stock_current": 8,
			"open_stock": 15
		},
		"resource_type": "inventory"
	};

	var resTypeHistogram = exports.resTypeHistogram = {
		"aggregate_data": [{
			"start_time": 10,
			"end_time": 11,
			"orders_completed": 200,
			"items_audited": 1000,
			"items_put": 800
		}, {
			"start_time": 11,
			"end_time": 12,
			"orders_completed": 300,
			"items_audited": 900,
			"items_put": 600
		}, {
			"start_time": 12,
			"end_time": 13,
			"orders_completed": 200,
			"items_audited": 800,
			"items_put": 900
		}, {
			"start_time": 13,
			"end_time": 14,
			"orders_completed": 300,
			"items_audited": 700,
			"items_put": 800
		}, {
			"start_time": 14,
			"end_time": 15,
			"orders_completed": 350,
			"items_audited": 800,
			"items_put": 1200
		}, {
			"start_time": 15,
			"end_time": 16,
			"orders_completed": 400,
			"items_audited": 900,
			"items_put": 1000
		}, {
			"start_time": 16,
			"end_time": 17,
			"orders_completed": 420,
			"items_audited": 1000,
			"items_put": 800
		}, {
			"start_time": 17,
			"end_time": 18,
			"orders_completed": 200,
			"items_audited": 1100,
			"items_put": 900
		}, {
			"start_time": 18,
			"end_time": 19,
			"orders_completed": 300,
			"items_audited": 700,
			"items_put": 800
		}, {
			"start_time": 19,
			"end_time": 20,
			"orders_completed": 200,
			"items_audited": 500,
			"items_put": 700
		}, {
			"start_time": 20,
			"end_time": 21,
			"orders_completed": 300,
			"items_audited": 600,
			"items_put": 500
		}, {
			"start_time": 21,
			"end_time": 22,
			"orders_completed": 350,
			"items_audited": 800,
			"items_put": 600
		}, {
			"start_time": 22,
			"end_time": 23,
			"orders_completed": 400,
			"items_audited": 500,
			"items_put": 500
		}, {
			"start_time": 23,
			"end_time": 24,
			"orders_completed": 420,
			"items_audited": 900,
			"items_put": 400
		}],
		"resource_type": "histogram_details"
	};

	var resTypeChargersDetail = exports.resTypeChargersDetail = {
		"aggregate_data": [{
			"charger_id": 10,
			"docked_butler_id": 2
		}, {
			"charger_id": 12,
			"docked_butler_id": 7
		}, {
			"charger_id": 13,
			"docked_butler_id": null
		}, {
			"charger_id": 10,
			"docked_butler_id": 2
		}, {
			"charger_id": 12,
			"docked_butler_id": 7
		}, {
			"charger_id": 13,
			"docked_butler_id": null
		}, {
			"charger_id": 10,
			"docked_butler_id": 2
		}, {
			"charger_id": 12,
			"docked_butler_id": 7
		}, {
			"charger_id": 13,
			"docked_butler_id": null
		}, {
			"charger_id": 10,
			"docked_butler_id": 2
		}, {
			"charger_id": 12,
			"docked_butler_id": 7
		}, {
			"charger_id": 13,
			"docked_butler_id": null
		}, {
			"charger_id": 10,
			"docked_butler_id": 2
		}, {
			"charger_id": 12,
			"docked_butler_id": 7
		}, {
			"charger_id": 13,
			"docked_butler_id": null
		}, {
			"charger_id": 10,
			"docked_butler_id": 2
		}, {
			"charger_id": 12,
			"docked_butler_id": 7
		}, {
			"charger_id": 13,
			"docked_butler_id": null
		}, {
			"charger_id": 10,
			"docked_butler_id": 2
		}, {
			"charger_id": 12,
			"docked_butler_id": 7
		}, {
			"charger_id": 13,
			"docked_butler_id": null
		}],
		"resource_type": "system_chargers_details"
	};

	var resTypeButlerDetail = exports.resTypeButlerDetail = {

		"aggregate_data": [{
			"butler_id": 9,
			"current_task": 0,
			"current_subtask": 0,
			"msu_id": 12,
			"pps_id": 19,
			"charger_id": 2,
			"location": "018.012",
			"voltage": 29.7
		}, {
			"butler_id": 110,
			"current_task": 1,
			"current_subtask": 1,
			"msu_id": 10,
			"pps_id": 17,
			"charger_id": 11,
			"location": "028.022",
			"voltage": 240.5
		}, {
			"butler_id": 9,
			"current_task": 0,
			"current_subtask": 0,
			"msu_id": 12,
			"pps_id": 19,
			"charger_id": 2,
			"location": "018.012",
			"voltage": 29.7
		}, {
			"butler_id": 110,
			"current_task": 1,
			"current_subtask": 1,
			"msu_id": 10,
			"pps_id": 17,
			"charger_id": 11,
			"location": "028.022",
			"voltage": 240.5
		}, {
			"butler_id": 9,
			"current_task": 0,
			"current_subtask": 0,
			"msu_id": 12,
			"pps_id": 19,
			"charger_id": 2,
			"location": "018.012",
			"voltage": 29.7
		}, {
			"butler_id": 110,
			"current_task": 1,
			"current_subtask": 1,
			"msu_id": 10,
			"pps_id": 17,
			"charger_id": 11,
			"location": "028.022",
			"voltage": 240.5
		}, {
			"butler_id": 9,
			"current_task": 0,
			"current_subtask": 0,
			"msu_id": 12,
			"pps_id": 19,
			"charger_id": 2,
			"location": "018.012",
			"voltage": 29.7
		}, {
			"butler_id": 110,
			"current_task": 1,
			"current_subtask": 1,
			"msu_id": 10,
			"pps_id": 17,
			"charger_id": 11,
			"location": "028.022",
			"voltage": 240.5
		}, {
			"butler_id": 9,
			"current_task": 0,
			"current_subtask": 0,
			"msu_id": 12,
			"pps_id": 19,
			"charger_id": 2,
			"location": "018.012",
			"voltage": 29.7
		}, {
			"butler_id": 110,
			"current_task": 1,
			"current_subtask": 1,
			"msu_id": 10,
			"pps_id": 17,
			"charger_id": 11,
			"location": "028.022",
			"voltage": 240.5
		}, {
			"butler_id": 9,
			"current_task": 0,
			"current_subtask": 0,
			"msu_id": 12,
			"pps_id": 19,
			"charger_id": 2,
			"location": "018.012",
			"voltage": 29.7
		}, {
			"butler_id": 110,
			"current_task": 1,
			"current_subtask": 1,
			"msu_id": 10,
			"pps_id": 17,
			"charger_id": 11,
			"location": "028.022",
			"voltage": 240.5
		}, {
			"butler_id": 9,
			"current_task": 0,
			"current_subtask": 0,
			"msu_id": 12,
			"pps_id": 19,
			"charger_id": 2,
			"location": "018.012",
			"voltage": 29.7
		}, {
			"butler_id": 110,
			"current_task": 1,
			"current_subtask": 1,
			"msu_id": 10,
			"pps_id": 17,
			"charger_id": 11,
			"location": "028.022",
			"voltage": 240.5
		}, {
			"butler_id": 9,
			"current_task": 0,
			"current_subtask": 0,
			"msu_id": 12,
			"pps_id": 19,
			"charger_id": 2,
			"location": "018.012",
			"voltage": 29.7
		}, {
			"butler_id": 110,
			"current_task": 1,
			"current_subtask": 1,
			"msu_id": 10,
			"pps_id": 17,
			"charger_id": 11,
			"location": "028.022",
			"voltage": 240.5
		}],
		"resource_type": "system_butlers_details"
	};

	var resTypePPSdetail = exports.resTypePPSdetail = {
		"aggregate_data": [{
			"pps_id": 10,
			"pps_status": 1,
			"current_task": 0,
			"performance": 120,
			"operators_assigned": ["Aarush Tulip, ", "Aman Sharma "]
		}, {
			"pps_id": 13,
			"pps_status": 0,
			"current_task": 2,
			"performance": 320,
			"operators_assigned": ["Aarush Tulip, ", "Ajay singh "]
		}, {
			"pps_id": 10,
			"pps_status": 1,
			"current_task": 0,
			"performance": 120,
			"operators_assigned": ["Aarush Tulip, ", "Aman Sharma "]
		}, {
			"pps_id": 13,
			"pps_status": 0,
			"current_task": 2,
			"performance": 320,
			"operators_assigned": ["Aarush Tulip, ", "Ajay singh "]
		}, {
			"pps_id": 10,
			"pps_status": 1,
			"current_task": 0,
			"performance": 120,
			"operators_assigned": ["Aarush Tulip, ", "Aman Sharma "]
		}, {
			"pps_id": 13,
			"pps_status": 0,
			"current_task": 2,
			"performance": 320,
			"operators_assigned": ["Aarush Tulip, ", "Ajay singh "]
		}, {
			"pps_id": 10,
			"pps_status": 1,
			"current_task": 0,
			"performance": 120,
			"operators_assigned": ["Aarush Tulip, ", "Aman Sharma "]
		}, {
			"pps_id": 13,
			"pps_status": 0,
			"current_task": 2,
			"performance": 320,
			"operators_assigned": ["Aarush Tulip, ", "Ajay singh "]
		}, {
			"pps_id": 10,
			"pps_status": 1,
			"current_task": 0,
			"performance": 120,
			"operators_assigned": ["Aarush Tulip, ", "Aman Sharma "]
		}, {
			"pps_id": 13,
			"pps_status": 0,
			"current_task": 2,
			"performance": 320,
			"operators_assigned": ["Aarush Tulip, ", "Ajay singh "]
		}, {
			"pps_id": 10,
			"pps_status": 1,
			"current_task": 0,
			"performance": 120,
			"operators_assigned": ["Aarush Tulip, ", "Aman Sharma "]
		}, {
			"pps_id": 13,
			"pps_status": 0,
			"current_task": 2,
			"performance": 320,
			"operators_assigned": ["Aarush Tulip, ", "Ajay singh "]
		}, {
			"pps_id": 10,
			"pps_status": 1,
			"current_task": 0,
			"performance": 120,
			"operators_assigned": ["Aarush Tulip, ", "Aman Sharma "]
		}, {
			"pps_id": 13,
			"pps_status": 0,
			"current_task": 2,
			"performance": 320,
			"operators_assigned": ["Aarush Tulip, ", "Ajay singh "]
		}],
		"resource_type": "system_pps_details"
	};

	var resTypePPSperformance = exports.resTypePPSperformance = {
		"aggregate_data": [{
			"pps_id": 1,
			"time_unit": "per_hour",
			"orders_picked": 500,
			"items_picked": 800,
			"items_put": 400,
			"items_audited": 300,
			"pps_mode": "put",
			"active": "true"
		}, {
			"pps_id": 2,
			"time_unit": "per_hour",
			"orders_picked": 500,
			"items_picked": 900,
			"items_put": 500,
			"items_audited": 570,
			"pps_mode": "put",
			"active": "true"
		}, {
			"pps_id": 3,
			"time_unit": "per_hour",
			"orders_picked": 500,
			"items_picked": 800,
			"items_put": 600,
			"items_audited": 770,
			"pps_mode": "put",
			"active": "true"
		}, {
			"pps_id": 4,
			"time_unit": "per_hour",
			"orders_picked": 500,
			"items_picked": 900,
			"items_put": 700,
			"items_audited": 870,
			"pps_mode": "put",
			"active": "true"
		}, {
			"pps_id": 5,
			"time_unit": "per_hour",
			"orders_picked": 500,
			"items_picked": 800,
			"items_put": 600,
			"items_audited": 470,
			"pps_mode": "put",
			"active": "true"
		}, {
			"pps_id": 6,
			"time_unit": "per_hour",
			"orders_picked": 500,
			"items_picked": 700,
			"items_put": 700,
			"items_audited": 370,
			"pps_mode": "put",
			"active": "true"
		}, {
			"pps_id": 7,
			"time_unit": "per_hour",
			"orders_picked": 500,
			"items_picked": 600,
			"items_put": 800,
			"items_audited": 270,
			"pps_mode": "put",
			"active": "true"
		}, {
			"pps_id": 8,
			"time_unit": "per_hour",
			"orders_picked": 500,
			"items_picked": 300,
			"items_put": 300,
			"items_audited": 770,
			"pps_mode": "put",
			"active": "true"
		}, {
			"pps_id": 9,
			"time_unit": "per_hour",
			"orders_picked": 500,
			"items_picked": 200,
			"items_put": 400,
			"items_audited": 600,
			"pps_mode": "put",
			"active": "true"
		}, {
			"pps_id": 10,
			"time_unit": "per_hour",
			"orders_picked": 500,
			"items_picked": 300,
			"items_put": 500,
			"items_audited": 570,
			"pps_mode": "put",
			"active": "true"
		}],
		"resource_type": "pps_detail"
	};

	//export {resTypePPS,resTypeInventory1,resTypeButlersData,resTypeChargers,resTypeInventory2,resTypePick,resTypePut,resTypeUsers,resTypeButlers,resTypeOrders};

/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(198);

	var _headerReducer = __webpack_require__(330);

	var _loginReducer = __webpack_require__(334);

	var _socketReducer = __webpack_require__(335);

	var _reactRouterRedux = __webpack_require__(336);

	var _reactIntlRedux = __webpack_require__(215);

	var _performanceWidgetReducer = __webpack_require__(341);

	var _butlerReducer = __webpack_require__(343);

	var _chargerReducer = __webpack_require__(344);

	var _auditReducer = __webpack_require__(345);

	var _ppsReducer = __webpack_require__(346);

	var _putReducer = __webpack_require__(347);

	var _inventoryReducer = __webpack_require__(348);

	var _ordersReducer = __webpack_require__(349);

	var _throughputReducer = __webpack_require__(350);

	var _statsWidgetReducer = __webpack_require__(351);

	var _orderstatsReducer = __webpack_require__(353);

	var _chargersDetailReducer = __webpack_require__(354);

	var _butlerDetailReducer = __webpack_require__(355);

	var _ppsDetailReducer = __webpack_require__(356);

	var _tabSelectReducer = __webpack_require__(357);

	var _subTabSelectReducer = __webpack_require__(359);

	var _reactReduxModal = __webpack_require__(306);

	var _ppsPerformanceReducer = __webpack_require__(361);

	var rootReducer = (0, _redux.combineReducers)({
	  intl: _reactIntlRedux.intlReducer,
	  getData: _headerReducer.getData,
	  authLogin: _loginReducer.authLogin,
	  routing: _reactRouterRedux.routerReducer,
	  recieveSocketActions: _socketReducer.recieveSocketActions,
	  butlersInfo: _butlerReducer.butlersInfo,
	  chargerInfo: _chargerReducer.chargerInfo,
	  modals: _reactReduxModal.reducer,
	  auditInfo: _auditReducer.auditInfo,
	  putInfo: _putReducer.putInfo,
	  ppsInfo: _ppsReducer.ppsInfo,
	  throughputInfo: _throughputReducer.throughputInfo,
	  inventoryInfo: _inventoryReducer.inventoryInfo,
	  ordersInfo: _ordersReducer.ordersInfo,
	  performanceWidget: _performanceWidgetReducer.performanceWidget,
	  statsWidget: _statsWidgetReducer.statsWidget,
	  histogramData: _orderstatsReducer.histogramData,
	  chargersDetail: _chargersDetailReducer.chargersDetail,
	  butlerDetail: _butlerDetailReducer.butlerDetail,
	  PPSDetail: _ppsDetailReducer.PPSDetail,
	  tabSelected: _tabSelectReducer.tabSelected,
	  subTabSelected: _subTabSelectReducer.subTabSelected,
	  PPSperformance: _ppsPerformanceReducer.PPSperformance
	});

	exports.default = rootReducer;

/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.selectedAction = selectedAction;
	exports.getData = getData;

	var _headerAction = __webpack_require__(331);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function posts() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {
	    isFetching: false,
	    data: []
	  } : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _headerAction.REQUEST_HEADER:
	      return Object.assign({}, state, {
	        isFetching: true,
	        type: _headerAction.REQUEST_HEADER,
	        data: action.data

	      });
	    case _headerAction.RECIEVE_HEADER:
	      return Object.assign({}, state, {
	        isFetching: false,
	        type: _headerAction.RECIEVE_HEADER,
	        data: action.data

	      });
	    case _headerAction.RECIEVE_ITEM_TO_STOCK:
	      return Object.assign({}, state, {
	        isFetching: false,
	        type: _headerAction.RECIEVE_ITEM_TO_STOCK,
	        data: action.data

	      });

	    default:
	      return state;
	  }
	}

	function selectedAction() {
	  var sAction = arguments.length <= 0 || arguments[0] === undefined ? 'FETCH' : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'FETCH':
	      return action.type;
	    default:
	      return sAction;
	  }
	}

	function getData() {
	  var _Object$assign;

	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _headerAction.REQUEST_HEADER:
	    case _headerAction.RECIEVE_HEADER:
	    case _headerAction.RECIEVE_ITEM_TO_STOCK:
	      //state.selectedAction = action.type;
	      return Object.assign({}, state, (_Object$assign = {}, _defineProperty(_Object$assign, action.type, posts(state[action.type], action)), _defineProperty(_Object$assign, "selectedAction", action.type), _Object$assign));
	    default:
	      return state;
	  }
	}

/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _isomorphicFetch = __webpack_require__(332);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	var _appConstants = __webpack_require__(319);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function receiveData(json) {
	  switch (json.resource_type) {
	    case _appConstants.RECIEVE_ITEM_TO_STOCK:
	      return {
	        type: _appConstants.RECIEVE_ITEM_TO_STOCK,
	        data: json.data
	      };
	    case 'items_to_audit':
	      return {
	        type: RECIEVE_ITEM_TO_AUDIT,
	        data: json.data
	      };
	    case 'orders_to_fulfill':
	      return {
	        type: RECIEVE_ORDERS_TO_FULFILL,
	        data: json.data
	      };
	    default:
	      return {
	        type: _appConstants.RECIEVE_HEADER,
	        data: json.data
	      };
	  }
	}
	function getHeaderInfo(data) {
	  return {
	    type: _appConstants.REQUEST_HEADER,
	    data: []
	  };
	}

/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(333);
	module.exports = self.fetch.bind(self);


/***/ },
/* 333 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  function Body() {
	    this.bodyUsed = false

	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return
	      }

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.authLogin = authLogin;

	var _appConstants = __webpack_require__(319);

	/**
	 * @param  {State Object}
	 * @param  {Action object}
	 * @return {[Object] updated state}
	 */

	function authLogin() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {

	        case _appConstants.LOGIN_REQUEST:
	            return Object.assign({}, state, {
	                "loginAuthorized": true,
	                "auth_token": sessionStorage.getItem('auth_token')
	            });

	        case _appConstants.LOGIN_REDIRECT:

	        case _appConstants.LOGIN_SUCCESS:
	            sessionStorage.setItem('auth_token', action.data.auth_token);
	            return Object.assign({}, state, {
	                "loginAuthorized": true,
	                "auth_token": action.data.auth_token
	            });

	        case _appConstants.LOGIN_FAILURE:
	            return Object.assign({}, state, {
	                "loginAuthorized": false
	            });

	        case _appConstants.LOGOUT:
	            sessionStorage.removeItem('auth_token');
	            return Object.assign({}, state, {
	                "loginAuthorized": false,
	                "auth_token": null
	            });

	        default:
	            return state;
	    }
	}

/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.recieveSocketActions = recieveSocketActions;

	var _appConstants = __webpack_require__(319);

	/**
	 * @param  {State Object}
	 * @param  {Action object}
	 * @return {[Object] updated state}
	 */
	function recieveSocketActions() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {

	    case _appConstants.WS_CONNECTED:
	      return Object.assign({}, state, {
	        "socketConnected": true

	      });
	    case _appConstants.WS_END:
	      return Object.assign({}, state, {
	        "socketConnected": false,
	        "socketAuthorized": false,
	        "initDataSent": false
	      });
	    case _appConstants.WS_ONMESSAGE:
	      // Handshaking and login successful message.
	      if (action.data.message === _appConstants.WS_SUCCESS) {
	        return Object.assign({}, state, {
	          "socketAuthorized": true,
	          "initDataSent": false
	        });
	      } else return state;
	    case _appConstants.WS_INIT:
	      // Initiate data sending
	      return Object.assign({}, state, {
	        "socketConnected": true,
	        "initDataSent": true
	      });
	    default:
	      return state;
	  }
	}

/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.routerMiddleware = exports.routerActions = exports.goForward = exports.goBack = exports.go = exports.replace = exports.push = exports.CALL_HISTORY_METHOD = exports.routerReducer = exports.LOCATION_CHANGE = exports.syncHistoryWithStore = undefined;

	var _reducer = __webpack_require__(337);

	Object.defineProperty(exports, 'LOCATION_CHANGE', {
	  enumerable: true,
	  get: function get() {
	    return _reducer.LOCATION_CHANGE;
	  }
	});
	Object.defineProperty(exports, 'routerReducer', {
	  enumerable: true,
	  get: function get() {
	    return _reducer.routerReducer;
	  }
	});

	var _actions = __webpack_require__(338);

	Object.defineProperty(exports, 'CALL_HISTORY_METHOD', {
	  enumerable: true,
	  get: function get() {
	    return _actions.CALL_HISTORY_METHOD;
	  }
	});
	Object.defineProperty(exports, 'push', {
	  enumerable: true,
	  get: function get() {
	    return _actions.push;
	  }
	});
	Object.defineProperty(exports, 'replace', {
	  enumerable: true,
	  get: function get() {
	    return _actions.replace;
	  }
	});
	Object.defineProperty(exports, 'go', {
	  enumerable: true,
	  get: function get() {
	    return _actions.go;
	  }
	});
	Object.defineProperty(exports, 'goBack', {
	  enumerable: true,
	  get: function get() {
	    return _actions.goBack;
	  }
	});
	Object.defineProperty(exports, 'goForward', {
	  enumerable: true,
	  get: function get() {
	    return _actions.goForward;
	  }
	});
	Object.defineProperty(exports, 'routerActions', {
	  enumerable: true,
	  get: function get() {
	    return _actions.routerActions;
	  }
	});

	var _sync = __webpack_require__(339);

	var _sync2 = _interopRequireDefault(_sync);

	var _middleware = __webpack_require__(340);

	var _middleware2 = _interopRequireDefault(_middleware);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports.syncHistoryWithStore = _sync2['default'];
	exports.routerMiddleware = _middleware2['default'];

/***/ },
/* 337 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.routerReducer = routerReducer;
	/**
	 * This action type will be dispatched when your history
	 * receives a location change.
	 */
	var LOCATION_CHANGE = exports.LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

	var initialState = {
	  locationBeforeTransitions: null
	};

	/**
	 * This reducer will update the state with the most recent location history
	 * has transitioned to. This may not be in sync with the router, particularly
	 * if you have asynchronously-loaded routes, so reading from and relying on
	 * this state is discouraged.
	 */
	function routerReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];

	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var type = _ref.type;
	  var payload = _ref.payload;

	  if (type === LOCATION_CHANGE) {
	    return _extends({}, state, { locationBeforeTransitions: payload });
	  }

	  return state;
	}

/***/ },
/* 338 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * This action type will be dispatched by the history actions below.
	 * If you're writing a middleware to watch for navigation events, be sure to
	 * look for actions of this type.
	 */
	var CALL_HISTORY_METHOD = exports.CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

	function updateLocation(method) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return {
	      type: CALL_HISTORY_METHOD,
	      payload: { method: method, args: args }
	    };
	  };
	}

	/**
	 * These actions correspond to the history API.
	 * The associated routerMiddleware will capture these events before they get to
	 * your reducer and reissue them as the matching function on your history.
	 */
	var push = exports.push = updateLocation('push');
	var replace = exports.replace = updateLocation('replace');
	var go = exports.go = updateLocation('go');
	var goBack = exports.goBack = updateLocation('goBack');
	var goForward = exports.goForward = updateLocation('goForward');

	var routerActions = exports.routerActions = { push: push, replace: replace, go: go, goBack: goBack, goForward: goForward };

/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = syncHistoryWithStore;

	var _reducer = __webpack_require__(337);

	var defaultSelectLocationState = function defaultSelectLocationState(state) {
	  return state.routing;
	};

	/**
	 * This function synchronizes your history state with the Redux store.
	 * Location changes flow from history to the store. An enhanced history is
	 * returned with a listen method that responds to store updates for location.
	 *
	 * When this history is provided to the router, this means the location data
	 * will flow like this:
	 * history.push -> store.dispatch -> enhancedHistory.listen -> router
	 * This ensures that when the store state changes due to a replay or other
	 * event, the router will be updated appropriately and can transition to the
	 * correct router state.
	 */
	function syncHistoryWithStore(history, store) {
	  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  var _ref$selectLocationSt = _ref.selectLocationState;
	  var selectLocationState = _ref$selectLocationSt === undefined ? defaultSelectLocationState : _ref$selectLocationSt;
	  var _ref$adjustUrlOnRepla = _ref.adjustUrlOnReplay;
	  var adjustUrlOnReplay = _ref$adjustUrlOnRepla === undefined ? true : _ref$adjustUrlOnRepla;

	  // Ensure that the reducer is mounted on the store and functioning properly.
	  if (typeof selectLocationState(store.getState()) === 'undefined') {
	    throw new Error('Expected the routing state to be available either as `state.routing` ' + 'or as the custom expression you can specify as `selectLocationState` ' + 'in the `syncHistoryWithStore()` options. ' + 'Ensure you have added the `routerReducer` to your store\'s ' + 'reducers via `combineReducers` or whatever method you use to isolate ' + 'your reducers.');
	  }

	  var initialLocation = void 0;
	  var isTimeTraveling = void 0;
	  var unsubscribeFromStore = void 0;
	  var unsubscribeFromHistory = void 0;

	  // What does the store say about current location?
	  var getLocationInStore = function getLocationInStore(useInitialIfEmpty) {
	    var locationState = selectLocationState(store.getState());
	    return locationState.locationBeforeTransitions || (useInitialIfEmpty ? initialLocation : undefined);
	  };

	  // Init currentLocation with potential location in store
	  var currentLocation = getLocationInStore();

	  // If the store is replayed, update the URL in the browser to match.
	  if (adjustUrlOnReplay) {
	    var handleStoreChange = function handleStoreChange() {
	      var locationInStore = getLocationInStore(true);
	      if (currentLocation === locationInStore) {
	        return;
	      }

	      // Update address bar to reflect store state
	      isTimeTraveling = true;
	      currentLocation = locationInStore;
	      history.transitionTo(_extends({}, locationInStore, {
	        action: 'PUSH'
	      }));
	      isTimeTraveling = false;
	    };

	    unsubscribeFromStore = store.subscribe(handleStoreChange);
	    handleStoreChange();
	  }

	  // Whenever location changes, dispatch an action to get it in the store
	  var handleLocationChange = function handleLocationChange(location) {
	    // ... unless we just caused that location change
	    if (isTimeTraveling) {
	      return;
	    }

	    // Remember where we are
	    currentLocation = location;

	    // Are we being called for the first time?
	    if (!initialLocation) {
	      // Remember as a fallback in case state is reset
	      initialLocation = location;

	      // Respect persisted location, if any
	      if (getLocationInStore()) {
	        return;
	      }
	    }

	    // Tell the store to update by dispatching an action
	    store.dispatch({
	      type: _reducer.LOCATION_CHANGE,
	      payload: location
	    });
	  };
	  unsubscribeFromHistory = history.listen(handleLocationChange);

	  // The enhanced history uses store as source of truth
	  return _extends({}, history, {
	    // The listeners are subscribed to the store instead of history

	    listen: function listen(listener) {
	      // Copy of last location.
	      var lastPublishedLocation = getLocationInStore(true);

	      // Keep track of whether we unsubscribed, as Redux store
	      // only applies changes in subscriptions on next dispatch
	      var unsubscribed = false;
	      var unsubscribeFromStore = store.subscribe(function () {
	        var currentLocation = getLocationInStore(true);
	        if (currentLocation === lastPublishedLocation) {
	          return;
	        }
	        lastPublishedLocation = currentLocation;
	        if (!unsubscribed) {
	          listener(lastPublishedLocation);
	        }
	      });

	      // History listeners expect a synchronous call. Make the first call to the
	      // listener after subscribing to the store, in case the listener causes a
	      // location change (e.g. when it redirects)
	      listener(lastPublishedLocation);

	      // Let user unsubscribe later
	      return function () {
	        unsubscribed = true;
	        unsubscribeFromStore();
	      };
	    },


	    // It also provides a way to destroy internal listeners
	    unsubscribe: function unsubscribe() {
	      if (adjustUrlOnReplay) {
	        unsubscribeFromStore();
	      }
	      unsubscribeFromHistory();
	    }
	  });
	}

/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = routerMiddleware;

	var _actions = __webpack_require__(338);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
	 * provided history object. This will prevent these actions from reaching your
	 * reducer or any middleware that comes after this one.
	 */
	function routerMiddleware(history) {
	  return function () {
	    return function (next) {
	      return function (action) {
	        if (action.type !== _actions.CALL_HISTORY_METHOD) {
	          return next(action);
	        }

	        var _action$payload = action.payload;
	        var method = _action$payload.method;
	        var args = _action$payload.args;

	        history[method].apply(history, _toConsumableArray(args));
	      };
	    };
	  };
	}

/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.performanceWidget = performanceWidget;

	var _performanceWidgetActions = __webpack_require__(342);

	function performanceWidget() {
		var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var action = arguments[1];

		switch (action.type) {

			case "RENDER_WIDGET":
				return Object.assign({}, state, {
					"widget": action.data
				});

			default:
				return state;
		}
	}

/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.renderPerformanceWidget = renderPerformanceWidget;

	var _appConstants = __webpack_require__(319);

	function renderPerformanceWidget(data) {
		return {
			type: _appConstants.RENDER_WIDGET,
			data: data
		};
	}

/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.butlersInfo = butlersInfo;

	var _appConstants = __webpack_require__(319);

	/**
	 * @param  {State Object}
	 * @param  {Action object}
	 * @return {[Object] updated state}
	 */
	function butlersInfo() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _appConstants.BUTLERS_DATA:
	      var count_active = 0,
	          res;
	      res = action.data;
	      if (res.aggregate_data) {
	        count_active = res.aggregate_data.count_active;
	      }
	      var botKey = {
	        "count_active": count_active
	      };
	      return Object.assign({}, state, {
	        "butlersData": botKey
	      });

	    default:
	      return state;
	  }
	}

/***/ },
/* 344 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.chargerInfo = chargerInfo;

	var _appConstants = __webpack_require__(319);

	/**
	 * @param  {State Object}
	 * @param  {Action object}
	 * @return {[Object] updated state}
	 */
	function chargerInfo() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _appConstants.CHARGERS_DATA:
	            var connected = 0,
	                disconnected = 0,
	                res;
	            res = action.data;
	            if (res.data) {
	                res.data.map(function (key, index) {
	                    if (key.charger_status == 'disconnected') {
	                        disconnected = disconnected + 1;
	                    } else if (key.charger_status == 'connected') {
	                        connected = connected + 1;
	                    }
	                });
	            }
	            var chargersKey = {
	                "Connected": connected,
	                "Disconnected": disconnected
	            };
	            return Object.assign({}, state, {
	                "chargersData": chargersKey
	            });

	        default:
	            return state;
	    }
	}

/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.auditInfo = auditInfo;

	var _appConstants = __webpack_require__(319);

	/**
	 * @param  {State Object}
	 * @param  {Action object}
	 * @return {[Object] updated state}
	 */
	function auditInfo() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _appConstants.AUDIT_DATA:

	      var res,
	          auditData = {};
	      res = action.data;
	      if (res.aggregate_data) {
	        if (res.aggregate_data.total_audited) auditData.total_audited = Number(res.aggregate_data.total_audited);
	      }
	      return Object.assign({}, state, {
	        "auditData": auditData
	      });

	    default:
	      return state;
	  }
	}

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ppsInfo = ppsInfo;

	var _appConstants = __webpack_require__(319);

	/**
	 * @param  {State Object}
	 * @param  {Action object}
	 * @return {[Object] updated state}
	 */
	function ppsInfo() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _appConstants.PPS_DATA:

	      var ppsData = {},
	          totalCount = void 0;
	      totalCount = processPPSData(action.data);
	      ppsData.totalPut = totalCount.totalPut;
	      ppsData.totalAudit = totalCount.totalAudit;
	      ppsData.totalPick = totalCount.totalPick;

	      return Object.assign({}, state, {
	        "ppsData": ppsData
	      });

	    default:
	      return state;
	  }
	}

	function processPPSData(response) {
	  var aggData = response["aggregate_data"] || [],
	      totalPut = 0,
	      totalAudit = 0,
	      totalPick = 0;
	  for (var i = 0; i < aggData.length; i++) {
	    if (aggData[i].hasOwnProperty("pps_mode") && aggData[i]["pps_mode"] === "put") {
	      totalPut++;
	    } else if (aggData[i].hasOwnProperty("pps_mode") && aggData[i]["pps_mode"] === "audit") {
	      totalAudit++;
	    } else if (aggData[i].hasOwnProperty("pps_mode") && aggData[i]["pps_mode"] === "pick") {
	      totalPick++;
	    }
	  }
	  return {
	    "totalPut": totalPut,
	    "totalAudit": totalAudit,
	    "totalPick": totalPick
	  };
	}

/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.putInfo = putInfo;

	var _appConstants = __webpack_require__(319);

	/**
	 * @param  {State Object}
	 * @param  {Action object}
	 * @return {[Object] updated state}
	 */
	function putInfo() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _appConstants.PUT_DATA:
	      var putObj = {},
	          res = action.data,
	          totalPut = 5; //state.ppsInfo.ppsData.totalPut;

	      if (res.aggregate_data) {
	        putObj.value = res.aggregate_data.items_put;
	      }
	      return Object.assign({}, state, {
	        "putData": putObj
	      });

	    default:
	      return state;
	  }
	}

/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.inventoryInfo = inventoryInfo;

	var _appConstants = __webpack_require__(319);

	/**
	 * @param  {State Object}
	 * @param  {Action object}
	 * @return {[Object] updated state}
	 */
	function inventoryInfo() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _appConstants.INVENTORY_DATA:
	      var avail_volume = 0,
	          count_put = 0,
	          util_perc = 0,
	          util_vol = 0,
	          count_pick = 0,
	          avail_sku = 0,
	          stock_current = 0,
	          open_stock = 0,
	          res;
	      res = action.data;
	      if (res.aggregate_data) {
	        avail_volume = res.aggregate_data.total_available_volume;
	        count_put = res.aggregate_data.count_put;
	        util_perc = res.aggregate_data.total_utilized_percentage;
	        util_vol = res.aggregate_data.total_utilized_volume;
	        count_pick = res.aggregate_data.count_pick;
	        avail_sku = res.aggregate_data.available_skus;
	        stock_current = res.aggregate_data.stock_current;
	        open_stock = res.aggregate_data.open_stock;
	      }
	      var ivData = {
	        "avail_volume": avail_volume,
	        "count_put": count_put,
	        "util_perc": util_perc,
	        "util_vol": util_vol,
	        "count_pick": count_pick,
	        "avail_sku": avail_sku,
	        "stock_current": stock_current,
	        "open_stock": open_stock
	      };

	      return Object.assign({}, state, {
	        "inventoryData": ivData
	      });

	    default:
	      return state;
	  }
	}

/***/ },
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ordersInfo = ordersInfo;

	var _appConstants = __webpack_require__(319);

	/**
	 * @param  {State Object}
	 * @param  {Action object}
	 * @return {[Object] updated state}
	 */
	function ordersInfo() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _appConstants.ORDERS_DATA:
	      var count_pending = 0,
	          cut_off = 0,
	          eta = 0,
	          count_risk = 0,
	          wave_end = '',
	          res;

	      res = action.data;
	      if (res.aggregate_data) {
	        if (res.aggregate_data.cut_off_time) cut_off = parseInt(res.aggregate_data.cut_off_time);
	        if (res.aggregate_data.pending_orders) count_pending = parseInt(res.aggregate_data.pending_orders);
	        if (res.aggregate_data.estimated_completion_time) eta = parseInt(res.aggregate_data.estimated_completion_time);
	        if (res.aggregate_data.orders_at_risk) count_risk = parseInt(res.aggregate_data.orders_at_risk);
	        if (res.aggregate_data.Wave_ending_time) wave_end = res.aggregate_data.Wave_ending_time;
	      }
	      var ordersData = {
	        "cut_off": cut_off,
	        "count_pending": count_pending,
	        "count_risk": count_risk,
	        "eta": eta,
	        "wave_end": wave_end
	      };
	      return Object.assign({}, state, {
	        "ordersData": ordersData
	      });

	    default:
	      return state;
	  }
	}

/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.throughputInfo = throughputInfo;

	var _appConstants = __webpack_require__(319);

	/**
	 * @param  {State Object}
	 * @param  {Action object}
	 * @return {[Object] updated state}
	 */
	function throughputInfo() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _appConstants.THROUGHPUT_DATA:
	      var put_throughput,
	          pick_throughput,
	          audit_throughput,
	          res,
	          throughput_data = {};
	      res = action.data;
	      if (res.aggregate_data) {
	        put_throughput = res.aggregate_data.put_throughput ? parseInt(res.aggregate_data.put_throughput) : 0;
	        pick_throughput = res.aggregate_data.pick_throughput ? parseInt(res.aggregate_data.pick_throughput) : 0;
	        audit_throughput = res.aggregate_data.audit_throughput ? parseInt(res.aggregate_data.audit_throughput) : 0;
	      }
	      throughput_data = {
	        put_throughput: put_throughput,
	        pick_throughput: pick_throughput,
	        audit_throughput: audit_throughput
	      };
	      return Object.assign({}, state, {
	        "throughputData": throughput_data
	      });

	    default:
	      return state;
	  }
	}

/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.statsWidget = statsWidget;

	var _statsWidgetActions = __webpack_require__(352);

	function statsWidget() {
		var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var action = arguments[1];

		switch (action.type) {

			case "RENDER_STATSWIDGET":
				return Object.assign({}, state, {
					"statsWidget": action.data
				});

			default:
				return state;
		}
	}

/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.renderStatsWidget = renderStatsWidget;

	var _appConstants = __webpack_require__(319);

	function renderStatsWidget(data) {
		return {
			type: _appConstants.RENDER_STATSWIDGET,
			data: data
		};
	}

/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.histogramData = histogramData;

	var _appConstants = __webpack_require__(319);

	/**
	 * @param  {State Object}
	 * @param  {Action object}
	 * @return {[Object] updated state}
	 */
	function processHistogramData(data) {
	  var graphData = [],
	      barData = {},
	      j = 0;
	  var startIndex = data[0].start_time - 9;
	  var endIndex = data[data.length - 1].start_time - 9;
	  for (var i = 0; i < startIndex; i++) {
	    barData.timeInterval = (9 + i) % 24;
	    barData.put = 0;
	    barData.pick = 0;
	    barData.audit = 0;
	    graphData.push(barData);
	    barData = {};
	  }
	  for (var i = startIndex; i < endIndex; i++) {
	    barData.timeInterval = (9 + i) % 24;
	    barData.put = data[j].items_put || 0;
	    barData.pick = data[j].orders_completed;
	    barData.audit = data[j].items_audited;
	    graphData.push(barData);
	    j++;
	    barData = {};
	  }
	  for (var i = endIndex; i < 24; i++) {
	    barData.timeInterval = (9 + i) % 24;
	    barData.put = 0;
	    barData.pick = 0;
	    barData.audit = 0;
	    graphData.push(barData);
	    barData = {};
	  }
	  return graphData;
	}

	function histogramData() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _appConstants.HISTOGRAM_DATA:
	      var res;
	      res = action.data;
	      if (res.aggregate_data) {
	        var histData = processHistogramData(res.aggregate_data);
	      }
	      return Object.assign({}, state, {
	        "histData": histData
	      });

	    default:
	      return state;
	  }
	}

/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.chargersDetail = chargersDetail;

	var _appConstants = __webpack_require__(319);

	/**
	 * @param  {State Object}
	 * @param  {Action object}
	 * @return {[Object] updated state}
	 */

	function processChargersData(data) {
	  var chargerData = [];
	  var detail = { "id": "", "status": "", "dockedBots": "" };
	  for (var i = data.length - 1; i >= 0; i--) {
	    var detail = {};
	    detail.id = "Charging Station " + data[i].charger_id;
	    detail.status = "On";
	    if (data[i].docked_butler_id !== null) {
	      detail.dockedBots = "Butler " + data[i].docked_butler_id;
	    } else {
	      detail.dockedBots = null;
	    }
	    chargerData.push(detail);
	  }
	  return chargerData;
	}

	function chargersDetail() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _appConstants.CHARGERS_DETAIL:
	      var res;
	      res = action.data;
	      if (res.aggregate_data) {
	        var chargers = processChargersData(res.aggregate_data);
	      }
	      return Object.assign({}, state, {
	        "chargersDetail": chargers
	      });

	    default:
	      return state;
	  }
	}

/***/ },
/* 355 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.butlerDetail = butlerDetail;

	var _appConstants = __webpack_require__(319);

	function processButlersData(data) {
	  var butlerData = [];
	  var task = ["Pick - ", "Put - ", "Audit - ", "Charging - ", "move - "];
	  var subTask = ["Moving", "Mounting", "Dismounting", "Docked"];
	  var detail = { "id": "", "status": "", "current": "", "msu": "", "location": "", "voltage": "" };
	  for (var i = data.length - 1; i >= 0; i--) {
	    var detail = {};
	    detail.id = "BOT " + data[i].butler_id;
	    detail.status = "On";
	    var currentTask = task[data[i].current_task];
	    var currentSubTask = subTask[data[i].current_subtask];
	    detail.current = currentTask + currentSubTask + " MSU " + data[i].msu_id;
	    detail.msu = "MSU " + data[i].msu_id;
	    detail.location = data[i].location;
	    detail.voltage = data[i].voltage;
	    butlerData.push(detail);
	  }
	  return butlerData;
	}

	function butlerDetail() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _appConstants.BUTLERS_DETAIL:
	      var res;
	      res = action.data;
	      if (res.aggregate_data) {
	        var butlers = processButlersData(res.aggregate_data);
	      }
	      return Object.assign({}, state, {
	        "butlerDetail": butlers
	      });

	    default:
	      return state;
	  }
	}

/***/ },
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PPSDetail = PPSDetail;

	var _appConstants = __webpack_require__(319);

	function processPPSData(data) {
	  //TODO: codes need to be replaced after checking with backend
	  var PPSData = [];
	  var ppsStatus = ["Off", "On"];
	  var current_task = ["Pick", "Put", "Audit"];
	  for (var i = data.length - 1; i >= 0; i--) {
	    var detail = {};
	    detail.id = "PPS " + data[i].pps_id;
	    detail.status = ppsStatus[data[i].pps_status];
	    detail.operatingMode = current_task[data[i].current_task];
	    detail.performance = data[i].performance + " orders/hr";
	    detail.operatorAssigned = data[i].operators_assigned;
	    PPSData.push(detail);
	  }
	  return PPSData;
	}

	function PPSDetail() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _appConstants.PPS_DETAIL:
	      var res;
	      res = action.data;
	      if (res.aggregate_data) {
	        var PPSDetail = processPPSData(res.aggregate_data);
	      }
	      return Object.assign({}, state, {
	        "PPStypeDetail": PPSDetail
	      });

	    default:
	      return state;
	  }
	}

/***/ },
/* 357 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.tabSelected = tabSelected;

	var _tabSelectAction = __webpack_require__(358);

	function tabSelected() {
		var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var action = arguments[1];

		switch (action.type) {

			case "TAB_SELECTED":
				return Object.assign({}, state, {
					"tab": action.data
				});

			default:
				return state;
		}
	}

/***/ },
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.tabSelected = tabSelected;

	var _appConstants = __webpack_require__(319);

	function tabSelected(data) {
		return {
			type: _appConstants.TAB_SELECTED,
			data: data
		};
	}

/***/ },
/* 359 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.subTabSelected = subTabSelected;

	var _subTabSelectAction = __webpack_require__(360);

	function subTabSelected() {
		var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var action = arguments[1];

		switch (action.type) {

			case "SUB_TAB_SELECTED":
				return Object.assign({}, state, {
					"subTab": action.data
				});

			default:
				return state;
		}
	}

/***/ },
/* 360 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.subTabSelected = subTabSelected;

	var _appConstants = __webpack_require__(319);

	function subTabSelected(data) {
		return {
			type: _appConstants.SUB_TAB_SELECTED,
			data: data
		};
	}

/***/ },
/* 361 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PPSperformance = PPSperformance;

	var _appConstants = __webpack_require__(319);

	/**
	 * @param  {State Object}
	 * @param  {Action object}
	 * @return {[Object] updated state}
	 */
	function processHistogramData(data) {
	  var graphData = [],
	      barData = {},
	      j = 0;
	  var startIndex = data[0].start_time - 9;
	  var endIndex = data[data.length - 1].start_time - 9;
	  for (var i = 0; i < startIndex; i++) {
	    barData.timeInterval = (9 + i) % 24;
	    barData.put = 0;
	    barData.pick = 0;
	    barData.audit = 0;
	    graphData.push(barData);
	    barData = {};
	  }
	  for (var i = startIndex; i < endIndex; i++) {
	    barData.timeInterval = (9 + i) % 24;
	    barData.put = data[j].items_put || 0;
	    barData.pick = data[j].orders_completed;
	    barData.audit = data[j].items_audited;
	    graphData.push(barData);
	    j++;
	    barData = {};
	  }
	  for (var i = endIndex; i < 24; i++) {
	    barData.timeInterval = (9 + i) % 24;
	    barData.put = 0;
	    barData.pick = 0;
	    barData.audit = 0;
	    graphData.push(barData);
	    barData = {};
	  }
	  return graphData;
	}

	function PPSperformance() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _appConstants.PPS_PERFORMANCE:
	      var res;
	      res = action.data;
	      if (res.aggregate_data) {
	        //var histData = processHistogramData(res.aggregate_data)
	      }
	      return Object.assign({}, state, {
	        "ppsPerformance": action.data
	      });

	    default:
	      return state;
	  }
	}

/***/ },
/* 362 */
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

	var _reactRedux = __webpack_require__(191);

	var _reactRouter = __webpack_require__(246);

	var _loginAction = __webpack_require__(325);

	var _OverviewTab = __webpack_require__(363);

	var _OverviewTab2 = _interopRequireDefault(_OverviewTab);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Importing Router dependencies
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Routes = function (_React$Component) {
		_inherits(Routes, _React$Component);

		function Routes(props) {
			_classCallCheck(this, Routes);

			return _possibleConstructorReturn(this, (Routes.__proto__ || Object.getPrototypeOf(Routes)).call(this, props));
		}

		_createClass(Routes, [{
			key: 'requireAuth',
			value: function requireAuth(nextState, replaceState) {
				if (sessionStorage.getItem('auth_token')) {
					this.props.loginRequest();
					replaceState({ nextPathname: nextState.location.pathname }, '/overview', nextState.location.query);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					_reactRouter.Router,
					{ history: _reactRouter.hashHistory },
					_react2.default.createElement(_reactRouter.Route, { name: 'default', path: '/',
						getComponent: function getComponent(location, callback) {
							!/* require.ensure */(function (require) {
								callback(null, __webpack_require__(383).default);
							}(__webpack_require__));
						}
					}),
					_react2.default.createElement(_reactRouter.Route, { name: 'login', path: '/login', onEnter: this.requireAuth.bind(this),
						getComponent: function getComponent(location, callback) {
							__webpack_require__.e/* nsure */(1, function (require) {
								callback(null, __webpack_require__(389).default);
							});
						}
					}),
					_react2.default.createElement(
						_reactRouter.Route,
						{ name: 'app', path: '/md',
							getComponent: function getComponent(location, callback) {
								__webpack_require__.e/* nsure */(0, function (require) {
									callback(null, __webpack_require__(383).default);
								});
							}
						},
						_react2.default.createElement(_reactRouter.IndexRoute, {
							getComponent: function getComponent(location, callback) {
								!/* require.ensure */(function (require) {
									callback(null, __webpack_require__(363).default);
								}(__webpack_require__));
							}
						}),
						_react2.default.createElement(
							_reactRouter.Route,
							{ name: 'system', path: '/system',
								getComponent: function getComponent(location, callback) {
									__webpack_require__.e/* nsure */(2, function (require) {
										callback(null, __webpack_require__(391).default);
									});
								}
							},
							_react2.default.createElement(_reactRouter.IndexRoute, {
								getComponent: function getComponent(location, callback) {
									__webpack_require__.e/* nsure */(3, function (require) {
										callback(null, __webpack_require__(394).default);
									});
								}
							}),
							_react2.default.createElement(_reactRouter.Route, { name: 'butlerbots', path: '/butlerbots',
								getComponent: function getComponent(location, callback) {
									__webpack_require__.e/* nsure */(4, function (require) {
										callback(null, __webpack_require__(448).default);
									});
								}
							}),
							_react2.default.createElement(_reactRouter.Route, { name: 'pps', path: '/pps',
								getComponent: function getComponent(location, callback) {
									__webpack_require__.e/* nsure */(5, function (require) {
										callback(null, __webpack_require__(450).default);
									});
								}
							}),
							_react2.default.createElement(_reactRouter.Route, { name: 'chargingstation', path: '/chargingstation',
								getComponent: function getComponent(location, callback) {
									__webpack_require__.e/* nsure */(6, function (require) {
										callback(null, __webpack_require__(452).default);
									});
								}
							}),
							_react2.default.createElement(_reactRouter.Route, { name: 'notification', path: '/notification',
								getComponent: function getComponent(location, callback) {
									__webpack_require__.e/* nsure */(3/* duplicate */, function (require) {
										callback(null, __webpack_require__(394).default);
									});
								}
							})
						),
						_react2.default.createElement(
							_reactRouter.Route,
							{ name: 'orders', path: '/orders',
								getComponent: function getComponent(location, callback) {
									__webpack_require__.e/* nsure */(7, function (require) {
										callback(null, __webpack_require__(454).default);
									});
								}
							},
							_react2.default.createElement(_reactRouter.IndexRoute, {
								getComponent: function getComponent(location, callback) {
									__webpack_require__.e/* nsure */(8, function (require) {
										callback(null, __webpack_require__(456).default);
									});
								}
							}),
							_react2.default.createElement(_reactRouter.Route, { name: 'waves', path: '/waves',
								getComponent: function getComponent(location, callback) {
									__webpack_require__.e/* nsure */(9, function (require) {
										callback(null, __webpack_require__(457).default);
									});
								}
							}),
							_react2.default.createElement(_reactRouter.Route, { name: 'orderlist', path: '/orderlist',
								getComponent: function getComponent(location, callback) {
									__webpack_require__.e/* nsure */(8/* duplicate */, function (require) {
										callback(null, __webpack_require__(456).default);
									});
								}
							})
						),
						_react2.default.createElement(_reactRouter.Route, { name: 'users', path: '/users',
							getComponent: function getComponent(location, callback) {
								__webpack_require__.e/* nsure */(10, function (require) {
									callback(null, __webpack_require__(458).default);
								});
							}
						}),
						_react2.default.createElement(_reactRouter.Route, { name: 'overview', path: '/overview',
							getComponent: function getComponent(location, callback) {
								!/* require.ensure */(function (require) {
									callback(null, __webpack_require__(363).default);
								}(__webpack_require__));
							}
						})
					)
				);
			}
		}]);

		return Routes;
	}(_react2.default.Component);

	function mapStateToProps(state, ownProps) {
		return {};
	}
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return {
			loginRequest: function loginRequest() {
				dispatch((0, _loginAction.loginRequest)());
			}
		};
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Routes);

/***/ },
/* 363 */
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

	var _orderStatsWidget = __webpack_require__(364);

	var _orderStatsWidget2 = _interopRequireDefault(_orderStatsWidget);

	var _performanceWidget = __webpack_require__(374);

	var _performanceWidget2 = _interopRequireDefault(_performanceWidget);

	var _auditStatusWidget = __webpack_require__(378);

	var _auditStatusWidget2 = _interopRequireDefault(_auditStatusWidget);

	var _putStatusWidget = __webpack_require__(380);

	var _putStatusWidget2 = _interopRequireDefault(_putStatusWidget);

	var _pickStatusWidget = __webpack_require__(381);

	var _pickStatusWidget2 = _interopRequireDefault(_pickStatusWidget);

	var _reactRedux = __webpack_require__(191);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Container for Overview tab
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This will be switched based on tab click
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Overview = function (_React$Component) {
		_inherits(Overview, _React$Component);

		function Overview(props) {
			_classCallCheck(this, Overview);

			return _possibleConstructorReturn(this, (Overview.__proto__ || Object.getPrototypeOf(Overview)).call(this, props));
		}

		_createClass(Overview, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'gorWidgetWrap' },
					_react2.default.createElement(
						'div',
						{ className: 'section group' },
						_react2.default.createElement(
							'div',
							{ className: 'col span_2_of_4' },
							_react2.default.createElement(_putStatusWidget2.default, null),
							_react2.default.createElement(_auditStatusWidget2.default, null)
						),
						_react2.default.createElement(
							'div',
							{ className: 'col span_2_of_4 gorNoML' },
							_react2.default.createElement(_pickStatusWidget2.default, null)
						)
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_orderStatsWidget2.default, null),
						_react2.default.createElement(_performanceWidget2.default, null)
					)
				);
			}
		}]);

		return Overview;
	}(_react2.default.Component);

	;

	// function mapStateToProps(state, ownProps){
	// 	return {
	//         putData: state.putInfo.putData,
	//         ppsData:state.ppsInfo.ppsData,
	//         throughputData : state.throughputInfo.throughputData,
	//         auditData: state.auditInfo.auditData
	//     };
	// }

	exports.default = Overview;

/***/ },
/* 364 */
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

	var _dropdown = __webpack_require__(365);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _reactRedux = __webpack_require__(191);

	var _graphd = __webpack_require__(367);

	var _graphd2 = _interopRequireDefault(_graphd);

	var _statsWidgetActions = __webpack_require__(352);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var OrderStatsWidget = function (_React$Component) {
		_inherits(OrderStatsWidget, _React$Component);

		function OrderStatsWidget() {
			_classCallCheck(this, OrderStatsWidget);

			return _possibleConstructorReturn(this, (OrderStatsWidget.__proto__ || Object.getPrototypeOf(OrderStatsWidget)).apply(this, arguments));
		}

		_createClass(OrderStatsWidget, [{
			key: 'render',
			value: function render() {
				var item = [{ value: 'PPS_PICK_PERFORMANCE', label: 'PPS - pick performance' }, { value: 'PPS_PUT_PERFORMANCE', label: 'PPS - put performance' }, { value: 'PPS_AUDIT_PERFORMANCE', label: 'PPS - audit performance' }];
				var renderWidget = this.props.statsWidget.statsWidget,
				    chartRender;
				var currentState = item[0],
				    index = 0;
				if (renderWidget !== undefined || renderWidget !== null) {
					for (var i = 0; i < item.length; i++) {
						if (item[i].value === renderWidget) {
							index = i;
						}
					}
				}

				if (renderWidget === "PPS_PUT_PERFORMANCE") {
					chartRender = _react2.default.createElement(_graphd2.default, { tableData: this.props.histdata, type: "put" });
				} else if (renderWidget === "PPS_AUDIT_PERFORMANCE") {
					chartRender = _react2.default.createElement(_graphd2.default, { tableData: this.props.histdata, type: "audit" });
				} else {

					chartRender = _react2.default.createElement(_graphd2.default, { tableData: this.props.histdata, type: "pick" });
				}

				return _react2.default.createElement(
					'div',
					{ className: 'gorOrderStatsWidget' },
					_react2.default.createElement(
						'div',
						{ className: 'gorDrop' },
						_react2.default.createElement(
							'div',
							{ className: 'Order-Stats-Drop' },
							_react2.default.createElement(_dropdown2.default, { optionDispatch: this.props.renderStatsWidget, items: item, styleClass: 'ddown', currentState: item[index] })
						),
						_react2.default.createElement(
							'div',
							{ id: 'chart_att' },
							chartRender
						)
					)
				);
			}
		}]);

		return OrderStatsWidget;
	}(_react2.default.Component);

	;

	function mapStateToProps(state, ownProps) {
		return {
			histdata: state.histogramData || {},
			statsWidget: state.statsWidget || {}
		};
	}

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return {
			renderStatsWidget: function renderStatsWidget(data) {
				dispatch((0, _statsWidgetActions.renderStatsWidget)(data));
			}
		};
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(OrderStatsWidget);

/***/ },
/* 365 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactDropdown = __webpack_require__(366);

	var _reactDropdown2 = _interopRequireDefault(_reactDropdown);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //styleClass is the name of the css class to be used for styling, defsel is the index of the selected dropdown option.

	var Dropdown = function (_Component) {
	  _inherits(Dropdown, _Component);

	  function Dropdown(props) {
	    _classCallCheck(this, Dropdown);

	    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

	    _this.state = { selected: { value: props.currentState.value, label: props.currentState.label }
	    };
	    _this._onSelect = _this._onSelect.bind(_this);
	    return _this;
	  }

	  _createClass(Dropdown, [{
	    key: '_onSelect',
	    value: function _onSelect(option) {
	      this.setState({ selected: option });
	      this.props.optionDispatch(option.value);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var defaultOption = this.state.selected;

	      return _react2.default.createElement(
	        'div',
	        { className: this.props.styleClass },
	        _react2.default.createElement(_reactDropdown2.default, { options: this.props.items, onChange: this._onSelect, value: defaultOption })
	      );
	    }
	  }]);

	  return Dropdown;
	}(_react.Component);

	exports.default = Dropdown;

/***/ },
/* 366 */
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

	var _classnames = __webpack_require__(315);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dropdown = function (_Component) {
	  _inherits(Dropdown, _Component);

	  function Dropdown(props) {
	    _classCallCheck(this, Dropdown);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dropdown).call(this, props));

	    _this.state = {
	      selected: props.value || {
	        label: props.placeholder || 'Select...',
	        value: ''
	      },
	      isOpen: false
	    };
	    _this.mounted = true;
	    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
	    _this.fireChangeEvent = _this.fireChangeEvent.bind(_this);
	    return _this;
	  }

	  _createClass(Dropdown, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      if (newProps.value && newProps.value !== this.state.selected) {
	        this.setState({ selected: newProps.value });
	      } else if (!newProps.value && newProps.placeholder) {
	        this.setState({ selected: { label: newProps.placeholder, value: '' } });
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      document.addEventListener('click', this.handleDocumentClick, false);
	      document.addEventListener('touchend', this.handleDocumentClick, false);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.mounted = false;
	      document.removeEventListener('click', this.handleDocumentClick, false);
	      document.removeEventListener('touchend', this.handleDocumentClick, false);
	    }
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(event) {
	      if (event.type === 'mousedown' && event.button !== 0) return;
	      event.stopPropagation();
	      event.preventDefault();

	      this.setState({
	        isOpen: !this.state.isOpen
	      });
	    }
	  }, {
	    key: 'setValue',
	    value: function setValue(value, label) {
	      var newState = {
	        selected: {
	          value: value,
	          label: label
	        },
	        isOpen: false
	      };
	      this.fireChangeEvent(newState);
	      this.setState(newState);
	    }
	  }, {
	    key: 'fireChangeEvent',
	    value: function fireChangeEvent(newState) {
	      if (newState.selected !== this.state.selected && this.props.onChange) {
	        this.props.onChange(newState.selected);
	      }
	    }
	  }, {
	    key: 'renderOption',
	    value: function renderOption(option) {
	      var _classNames;

	      var optionClass = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, this.props.baseClassName + '-option', true), _defineProperty(_classNames, 'is-selected', option === this.state.selected), _classNames));

	      var value = option.value || option.label || option;
	      var label = option.label || option.value || option;

	      return _react2.default.createElement(
	        'div',
	        {
	          key: value,
	          className: optionClass,
	          onMouseDown: this.setValue.bind(this, value, label),
	          onClick: this.setValue.bind(this, value, label) },
	        label
	      );
	    }
	  }, {
	    key: 'buildMenu',
	    value: function buildMenu() {
	      var _this2 = this;

	      var _props = this.props;
	      var options = _props.options;
	      var baseClassName = _props.baseClassName;

	      var ops = options.map(function (option) {
	        if (option.type === 'group') {
	          var groupTitle = _react2.default.createElement(
	            'div',
	            { className: baseClassName + '-title' },
	            option.name
	          );
	          var _options = option.items.map(function (item) {
	            return _this2.renderOption(item);
	          });

	          return _react2.default.createElement(
	            'div',
	            { className: baseClassName + '-group', key: option.name },
	            groupTitle,
	            _options
	          );
	        } else {
	          return _this2.renderOption(option);
	        }
	      });

	      return ops.length ? ops : _react2.default.createElement(
	        'div',
	        { className: baseClassName + '-noresults' },
	        'No options found'
	      );
	    }
	  }, {
	    key: 'handleDocumentClick',
	    value: function handleDocumentClick(event) {
	      if (this.mounted) {
	        if (!_reactDom2.default.findDOMNode(this).contains(event.target)) {
	          this.setState({ isOpen: false });
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _classNames2;

	      var baseClassName = this.props.baseClassName;

	      var placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;
	      var value = _react2.default.createElement(
	        'div',
	        { className: baseClassName + '-placeholder' },
	        placeHolderValue
	      );
	      var menu = this.state.isOpen ? _react2.default.createElement(
	        'div',
	        { className: baseClassName + '-menu' },
	        this.buildMenu()
	      ) : null;

	      var dropdownClass = (0, _classnames2.default)((_classNames2 = {}, _defineProperty(_classNames2, baseClassName + '-root', true), _defineProperty(_classNames2, 'is-open', this.state.isOpen), _classNames2));

	      return _react2.default.createElement(
	        'div',
	        { className: dropdownClass },
	        _react2.default.createElement(
	          'div',
	          { className: baseClassName + '-control', onMouseDown: this.handleMouseDown.bind(this), onTouchEnd: this.handleMouseDown.bind(this) },
	          value,
	          _react2.default.createElement('span', { className: baseClassName + '-arrow' })
	        ),
	        menu
	      );
	    }
	  }]);

	  return Dropdown;
	}(_react.Component);

	Dropdown.defaultProps = { baseClassName: 'Dropdown' };
	exports.default = Dropdown;

/***/ },
/* 367 */
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

	var _reactD3Library = __webpack_require__(368);

	var _reactD3Library2 = _interopRequireDefault(_reactD3Library);

	var _d = __webpack_require__(369);

	var d3 = _interopRequireWildcard(_d);

	var _d3Tip = __webpack_require__(370);

	var _d3Tip2 = _interopRequireDefault(_d3Tip);

	var _reactDimensions = __webpack_require__(372);

	var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RD3Component = _reactD3Library2.default.Component;

	var Chart = function (_React$Component) {
	  _inherits(Chart, _React$Component);

	  function Chart(props) {
	    _classCallCheck(this, Chart);

	    var _this = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this, props));

	    _this.state = { d3: '' };
	    return _this;
	  }

	  _createClass(Chart, [{
	    key: 'graphRender',
	    value: function graphRender(containerWidth, tData, nextP) {
	      var component = this;
	      var widther = containerWidth;
	      var margin = { top: 20, right: 20, bottom: 20, left: 40 },
	          width = widther - margin.left - margin.right,
	          height = 300 - margin.top - margin.bottom;
	      var count = -1;
	      var temp = -1;
	      var y = d3.scale.linear().range([height, 0]);
	      var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
	      var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(function (d) {
	        count++;
	        temp++;
	        if (count === 3 || temp === 0 || temp === 23) {
	          count = 0;
	          return d;
	        }
	        return "";
	      });

	      var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

	      var node = document.createElement('div');

	      var tip = (0, _d3Tip2.default)().attr('class', 'd3-tip').offset([100, 90]).html(function (d) {
	        return "<div> Time:<div/><div> 27 Jul,2016</div> <div style='color:#ffffff'> Fulfilled:    </div>";
	      });

	      //d3.tip=tip;

	      var svg = d3.select(node).append('svg').attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")").call(tip);

	      var data = [];
	      var barData = {};
	      var json = tData;
	      for (var i = 0; i < json.length; i++) {
	        barData.timeInterval = json[i].timeInterval;
	        barData.type = json[i][nextP];
	        data.push(barData);
	        barData = {};
	      }
	      update(data);
	      function update(data) {
	        data.forEach(function (d) {
	          d.type = +d.type;
	        });
	        x.domain(data.map(function (d) {
	          return d.timeInterval;
	        }));
	        y.domain([0, d3.max(data, function (d) {
	          return d.type;
	        })]);

	        svg.append("g").attr("class", "grid").call(make_y_axis().tickSize(-width, 0, 0).tickFormat(""));

	        svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).style("font-size", "12px").style("font-family", "sans-serif").style("fill", "#666666");

	        svg.append("g").attr("class", "y axis").call(yAxis).style("font-size", "12px").style("font-family", "sans-serif").style("fill", "#666666").append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "4em").style("text-anchor", "end");

	        svg.selectAll(".bar").data(data).enter().append("rect").attr("rx", 2).attr("ry", 2).attr("class", "bar").attr("x", function (d) {
	          return x(d.timeInterval);
	        }).attr("width", x.rangeBand()).attr("y", function (d) {
	          return y(d.type);
	        }).attr("height", 0).attr("height", function (d) {
	          return height - y(d.type);
	        });

	        //Not a dead code still working on this
	        //.on('mouseover', tip.show)
	        //.on('mouseout', tip.hide)


	        console.log(d3);
	        // d3.event.target = event.target;

	        component.setState({ d3: node });
	      }

	      function type(d) {
	        return d;
	      }

	      function make_x_axis() {
	        return d3.svg.axis().scale(x).orient("bottom").ticks(5);
	      }

	      function make_y_axis() {
	        return d3.svg.axis().scale(y).orient("left").ticks(5);
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.graphRender(this.props.containerWidth, this.props.tableData.histData, this.props.type);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.graphRender(nextProps.containerWidth, nextProps.tableData.histData, nextProps.type);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(RD3Component, { data: this.state.d3 })
	      );
	    }
	  }]);

	  return Chart;
	}(_react2.default.Component);

	;
	exports.default = (0, _reactDimensions2.default)()(Chart);

/***/ },
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(20);
	var onElementResize = __webpack_require__(373);

	var defaultContainerStyle = {
	  width: '100%',
	  height: '100%',
	  padding: 0,
	  border: 0
	};

	function defaultGetWidth(element) {
	  return element.clientWidth;
	}

	function defaultGetHeight(element) {
	  return element.clientHeight;
	}

	/**
	 * Wraps a react component and adds properties `containerHeight` and
	 * `containerWidth`. Useful for responsive design. Properties update on
	 * window resize. **Note** that the parent element must have either a
	 * height or a width, or nothing will be rendered
	 *
	 * Can be used as a
	 * [higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
	 * or as an [ES7 class decorator](https://github.com/wycats/javascript-decorators)
	 * (see examples)
	 *
	 * @param {object} [options]
	 * @param {function} [options.getHeight] A function that is passed an element and returns element
	 * height, where element is the wrapper div. Defaults to `(element) => element.clientHeight`
	 * @param {function} [options.getWidth]  A function that is passed an element and returns element
	 * width, where element is the wrapper div. Defaults to `(element) => element.clientWidth`
	 * @param {object} [options.containerStyle] A style object for the `<div>` that will wrap your component.
	 * The dimensions of this `div` are what are passed as props to your component. The default style is
	 * `{ width: '100%', height: '100%', padding: 0, border: 0 }` which will cause the `div` to fill its
	 * parent in most cases. If you are using a flexbox layout you will want to change this default style.
	 * @param {string} [options.className] Control the class name set on the wrapper `<div>`
	 * @param {boolean} [options.elementResize=false] Set true to watch the wrapper `div` for changes in
	 * size which are not a result of window resizing - e.g. changes to the flexbox and other layout.
	 * @return {function}                   A higher-order component that can be
	 * used to enhance a react component `Dimensions()(MyComponent)`
	 *
	 * @example
	 * // ES2015
	 * import React from 'react'
	 * import Dimensions from 'react-dimensions'
	 *
	 * class MyComponent extends React.Component {
	 *   render() (
	 *     <div
	 *       containerWidth={this.props.containerWidth}
	 *       containerHeight={this.props.containerHeight}
	 *     >
	 *     </div>
	 *   )
	 * }
	 *
	 * export default Dimensions()(MyComponent) // Enhanced component
	 *
	 * @example
	 * // ES5
	 * var React = require('react')
	 * var Dimensions = require('react-dimensions')
	 *
	 * var MyComponent = React.createClass({
	 *   render: function() {(
	 *     <div
	 *       containerWidth={this.props.containerWidth}
	 *       containerHeight={this.props.containerHeight}
	 *     >
	 *     </div>
	 *   )}
	 * }
	 *
	 * module.exports = Dimensions()(MyComponent) // Enhanced component
	 *
	 */
	module.exports = function Dimensions() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var _ref$getHeight = _ref.getHeight;
	  var getHeight = _ref$getHeight === undefined ? defaultGetHeight : _ref$getHeight;
	  var _ref$getWidth = _ref.getWidth;
	  var getWidth = _ref$getWidth === undefined ? defaultGetWidth : _ref$getWidth;
	  var _ref$containerStyle = _ref.containerStyle;
	  var containerStyle = _ref$containerStyle === undefined ? defaultContainerStyle : _ref$containerStyle;
	  var _ref$className = _ref.className;
	  var className = _ref$className === undefined ? null : _ref$className;
	  var _ref$elementResize = _ref.elementResize;
	  var elementResize = _ref$elementResize === undefined ? false : _ref$elementResize;

	  return function (ComposedComponent) {
	    return function (_React$Component) {
	      _inherits(DimensionsHOC, _React$Component);

	      function DimensionsHOC() {
	        var _Object$getPrototypeO;

	        var _temp, _this, _ret;

	        _classCallCheck(this, DimensionsHOC);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DimensionsHOC)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _this.updateDimensions = function () {
	          var container = _this.refs.container;
	          var containerWidth = getWidth(container);
	          var containerHeight = getHeight(container);

	          if (containerWidth !== _this.state.containerWidth || containerHeight !== _this.state.containerHeight) {
	            _this.setState({ containerWidth: containerWidth, containerHeight: containerHeight });
	          }
	        }, _this.onResize = function () {
	          if (_this.rqf) return;
	          _this.rqf = _this.getWindow().requestAnimationFrame(function () {
	            _this.rqf = null;
	            _this.updateDimensions();
	          });
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	      }
	      // ES7 Class properties
	      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers


	      // Using arrow functions and ES7 Class properties to autobind
	      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#arrow-functions


	      _createClass(DimensionsHOC, [{
	        key: 'getWindow',


	        // If the component is mounted in a different window to the javascript
	        // context, as with https://github.com/JakeGinnivan/react-popout
	        // then the `window` global will be different from the `window` that
	        // contains the component.
	        // Depends on `defaultView` which is not supported <IE9
	        value: function getWindow() {
	          return this.refs.container ? this.refs.container.ownerDocument.defaultView || window : window;
	        }
	      }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	          if (!this.refs.container) {
	            throw new Error('Cannot find container div');
	          }
	          this.updateDimensions();
	          if (elementResize) {
	            // Experimental: `element-resize-event` fires when an element resizes.
	            // It attaches its own window resize listener and also uses
	            // requestAnimationFrame, so we can just call `this.updateDimensions`.
	            onElementResize(this.refs.container, this.updateDimensions);
	          } else {
	            this.getWindow().addEventListener('resize', this.onResize, false);
	          }
	        }
	      }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	          this.getWindow().removeEventListener('resize', this.onResize);
	        }

	        /**
	         * Returns the underlying wrapped component instance.
	         * Useful if you need to access a method or property of the component
	         * passed to react-dimensions.
	         *
	         * @return {object} The rendered React component
	         **/

	      }, {
	        key: 'getWrappedInstance',
	        value: function getWrappedInstance() {
	          this.refs.wrappedInstance;
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          var _state = this.state;
	          var containerWidth = _state.containerWidth;
	          var containerHeight = _state.containerHeight;

	          if (!containerWidth && !containerHeight) {
	            console.warn('Wrapper div has no height or width, try overriding style with `containerStyle` option');
	          }
	          return React.createElement(
	            'div',
	            { className: className, style: containerStyle, ref: 'container' },
	            (containerWidth || containerHeight) && React.createElement(ComposedComponent, _extends({}, this.state, this.props, {
	              updateDimensions: this.updateDimensions,
	              ref: 'wrappedInstance'
	            }))
	          );
	        }
	      }]);

	      return DimensionsHOC;
	    }(React.Component);
	  };
	};


/***/ },
/* 373 */
/***/ function(module, exports) {

	var exports = function exports(element, fn) {
	  var window = this
	  var document = window.document
	  var isIE
	  var requestFrame

	  var attachEvent = document.attachEvent
	  if (typeof navigator !== 'undefined') {
	    isIE = navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/Edge/)
	  }

	  requestFrame = (function () {
	    var raf = window.requestAnimationFrame ||
	      window.mozRequestAnimationFrame ||
	        window.webkitRequestAnimationFrame ||
	          function fallbackRAF(func) {
	            return window.setTimeout(func, 20)
	          }
	    return function requestFrameFunction(func) {
	      return raf(func)
	    }
	  })()

	  var cancelFrame = (function () {
	    var cancel = window.cancelAnimationFrame ||
	      window.mozCancelAnimationFrame ||
	        window.webkitCancelAnimationFrame ||
	          window.clearTimeout
	    return function cancelFrameFunction(id) {
	      return cancel(id)
	    }
	  })()

	  function resizeListener(e) {
	    var win = e.target || e.srcElement
	    if (win.__resizeRAF__) {
	      cancelFrame(win.__resizeRAF__)
	    }
	    win.__resizeRAF__ = requestFrame(function () {
	      var trigger = win.__resizeTrigger__
	      if(trigger !== undefined) {
	        trigger.__resizeListeners__.forEach(function (fn) {
	          fn.call(trigger, e)
	        })
	      }
	    })
	  }

	  function objectLoad() {
	    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
	    this.contentDocument.defaultView.addEventListener('resize', resizeListener)
	  }

	  if (!element.__resizeListeners__) {
	    element.__resizeListeners__ = []
	    if (attachEvent) {
	      element.__resizeTrigger__ = element
	      element.attachEvent('onresize', resizeListener)
	    } else {
	      if (getComputedStyle(element).position === 'static') {
	        element.style.position = 'relative'
	      }
	      var obj = element.__resizeTrigger__ = document.createElement('object')
	      obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;')
	      obj.setAttribute('class', 'resize-sensor')
	      obj.__resizeElement__ = element
	      obj.onload = objectLoad
	      obj.type = 'text/html'
	      if (isIE) {
	        element.appendChild(obj)
	      }
	      obj.data = 'about:blank'
	      if (!isIE) {
	        element.appendChild(obj)
	      }
	    }
	  }
	  element.__resizeListeners__.push(fn)
	}

	exports.unbind = function(element, fn){
	  var attachEvent = document.attachEvent;
	  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
	  if (!element.__resizeListeners__.length) {
	    if (attachEvent) {
	      element.detachEvent('onresize', resizeListener);
	    } else {
	      element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', resizeListener);
	      element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
	    }
	  }
	}

	module.exports = (typeof window === 'undefined') ? exports : exports.bind(window)


/***/ },
/* 374 */
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

	var _healthTabs = __webpack_require__(375);

	var _healthTabs2 = _interopRequireDefault(_healthTabs);

	var _dropdown = __webpack_require__(365);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _graph_horizontal = __webpack_require__(377);

	var _graph_horizontal2 = _interopRequireDefault(_graph_horizontal);

	var _reactRedux = __webpack_require__(191);

	var _performanceWidgetActions = __webpack_require__(342);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _getPPSdata(link) {
		var ppsPickState = link.props.ppsData.pick;
		if (ppsPickState === undefined || ppsPickState === null) {
			ppsPickState = 0;
		}
		var ppsPutState = link.props.ppsData.put;
		if (ppsPutState === undefined || ppsPutState === null) {
			ppsPutState = 0;
		}
		var ppsAuditState = link.props.ppsData.audit;
		if (ppsAuditState === undefined || ppsAuditState === null) {
			ppsAuditState = 0;
		}
		var ppsInactiveState = link.props.ppsData.inactive;
		if (ppsInactiveState === undefined || ppsInactiveState === null) {
			ppsInactiveState = 0;
		}
		var ppsTotal = ppsPickState + ppsPutState + ppsAuditState + ppsInactiveState;
		var ppsOn = ppsPickState + ppsPutState + ppsAuditState;
		var ppsStopped = ppsInactiveState;
		var ppsError = 0;
		var pps_data = [{ component: { componentNumber: ppsTotal, componentType: 'PPS' }, states: { offState: ppsError, onState: ppsOn, errorState: ppsError } }];
		return pps_data;
	}

	function _getButlerdata(link) {
		var butlerAuditState = link.props.butlersData.Audit;
		if (butlerAuditState === undefined || butlerAuditState === null) {
			butlerAuditState = 0;
		}
		var butlerChargingState = link.props.butlersData.Charging;
		if (butlerChargingState === undefined || butlerChargingState === null) {
			butlerChargingState = 0;
		}
		var butlerIdleState = link.props.butlersData.Idle;
		if (butlerIdleState === undefined || butlerIdleState === null) {
			butlerIdleState = 0;
		}
		var butlerInactiveState = link.props.butlersData.Inactive;
		if (butlerInactiveState === undefined || butlerInactiveState === null) {
			butlerInactiveState = 0;
		}
		var butlerPickPutState = link.props.butlersData["Pick / Put"];
		if (butlerPickPutState === undefined || butlerPickPutState === null) {
			butlerPickPutState = 0;
		}
		var butlerTotal = butlerAuditState + butlerChargingState + butlerIdleState + butlerInactiveState + butlerPickPutState;
		var butlerStopped = butlerInactiveState;
		var butlerError = 0;
		var butlerOn = butlerPickPutState + butlerIdleState + butlerAuditState;
		var butler_data = [{ component: { componentNumber: butlerTotal, componentType: 'Butler bots' }, states: { offState: butlerStopped, onState: butlerOn, errorState: butlerError } }];
		return butler_data;
	}

	function _getChargingdata(link) {
		var connected = link.props.chargersData.Connected;
		if (connected === undefined || connected === null) {
			connected = 0;
		}
		var disconnected = link.props.chargersData.Disconnected;
		if (disconnected === undefined || disconnected === null) {
			disconnected = 0;
		}
		var totalChargers = connected + disconnected;
		var chargersStopped = disconnected;
		var chargersError = 0;
		var charging_data = [{ component: { componentNumber: totalChargers, componentType: 'Charging Stations' }, states: { offState: chargersError, onState: connected, errorState: disconnected } }];
		return charging_data;
	}

	var PerformanceWidget = function (_React$Component) {
		_inherits(PerformanceWidget, _React$Component);

		function PerformanceWidget(props) {
			_classCallCheck(this, PerformanceWidget);

			return _possibleConstructorReturn(this, (PerformanceWidget.__proto__ || Object.getPrototypeOf(PerformanceWidget)).call(this, props));
		}

		_createClass(PerformanceWidget, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				this.setState({ renderState: nextProps.widget });
			}
		}, {
			key: 'render',
			value: function render() {
				var item = [{ value: 'RENDER_SYSTEM_HEALTH', label: 'System Health' }, { value: 'PICK_PPS_PERFORMANCE', label: 'PPS Pick Performance' }, { value: 'PUT_PPS_PERFORMANCE', label: 'PPS Put Performance' }, { value: 'AUDIT_PPS_PERFORMANCE', label: 'PPS Audit Performance' }];
				var currentState = item[0],
				    index = 0;
				if (this.props.widget !== undefined || this.props.widget !== null) {
					for (var i = 0; i < item.length; i++) {
						if (item[i].value === this.props.widget) {
							index = i;
						}
					}
				}
				var link = this;
				var pps_data = _getPPSdata(link);
				var butler_data = _getButlerdata(link);
				var charging_data = _getChargingdata(link);

				var itemRender;
				if (this.props.widget === "PICK_PPS_PERFORMANCE") {
					itemRender = _react2.default.createElement(_graph_horizontal2.default, { data: this.props.ppsPerformance, type: 'items_picked' });
				} else if (this.props.widget === "PUT_PPS_PERFORMANCE") {
					itemRender = _react2.default.createElement(_graph_horizontal2.default, { data: this.props.ppsPerformance, type: 'items_put' });
				} else if (this.props.widget === "AUDIT_PPS_PERFORMANCE") {
					itemRender = _react2.default.createElement(_graph_horizontal2.default, { data: this.props.ppsPerformance, type: 'items_audited' });
				} else {
					itemRender = _react2.default.createElement(_healthTabs2.default, { ppsData: pps_data, butlerData: butler_data, chargingData: charging_data });
				}

				return _react2.default.createElement(
					'div',
					{ className: 'gorPerformanceWidget' },
					_react2.default.createElement(
						'div',
						{ className: 'gorDrop Performance-Widget-Drop' },
						_react2.default.createElement(_dropdown2.default, { optionDispatch: this.props.renderPerformanceWidget, items: item, styleClass: 'ddown', currentState: item[index] })
					),
					_react2.default.createElement(
						'div',
						{ id: 'performanceGraph' },
						itemRender
					)
				);
			}
		}]);

		return PerformanceWidget;
	}(_react2.default.Component);

	;

	function mapStateToProps(state, ownProps) {
		return {
			widget: state.performanceWidget.widget || {},
			ppsData: state.recieveSocketActions.ppsData || {},
			butlersData: state.recieveSocketActions.butlersData || {},
			chargersData: state.recieveSocketActions.chargersData || {},
			ppsPerformance: state.PPSperformance || {}
		};
	}

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return {
			renderPerformanceWidget: function renderPerformanceWidget(data) {
				dispatch((0, _performanceWidgetActions.renderPerformanceWidget)(data));
			}
		};
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PerformanceWidget);

/***/ },
/* 375 */
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

	var _health = __webpack_require__(376);

	var _health2 = _interopRequireDefault(_health);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HealthTabs = function (_React$Component) {
		_inherits(HealthTabs, _React$Component);

		function HealthTabs(props) {
			_classCallCheck(this, HealthTabs);

			return _possibleConstructorReturn(this, (HealthTabs.__proto__ || Object.getPrototypeOf(HealthTabs)).call(this, props));
		}

		_createClass(HealthTabs, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_health2.default, { items: this.props.ppsData }),
					_react2.default.createElement(_health2.default, { items: this.props.butlerData }),
					_react2.default.createElement(_health2.default, { items: this.props.chargingData })
				);
			}
		}]);

		return HealthTabs;
	}(_react2.default.Component);

	;
	exports.default = HealthTabs;

/***/ },
/* 376 */
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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Health = function (_React$Component) {
		_inherits(Health, _React$Component);

		function Health(props) {
			_classCallCheck(this, Health);

			return _possibleConstructorReturn(this, (Health.__proto__ || Object.getPrototypeOf(Health)).call(this, props));
		}

		_createClass(Health, [{
			key: 'render',
			value: function render() {

				return _react2.default.createElement(
					'div',
					{ className: 'health mainBlock' },
					_react2.default.createElement(
						'div',
						{ className: 'block attributes' },
						_react2.default.createElement(
							'div',
							{ className: 'upperText' },
							this.props.items[0].component.componentNumber
						),
						_react2.default.createElement(
							'div',
							{ className: 'subtext' },
							this.props.items[0].component.componentType
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'horizontal-line' },
						' '
					),
					_react2.default.createElement(
						'div',
						{ className: 'block' },
						_react2.default.createElement(
							'div',
							{ className: 'block parameters' },
							_react2.default.createElement(
								'div',
								{ className: 'block paramPositionMiddle ' },
								_react2.default.createElement(
									'div',
									{ className: 'block onState' },
									_react2.default.createElement(
										'span',
										null,
										this.props.items[0].states.onState
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'status' },
									'On'
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'block paramPositionMiddle ' },
								_react2.default.createElement(
									'div',
									{ className: 'block offState' },
									_react2.default.createElement(
										'span',
										null,
										this.props.items[0].states.offState
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'status' },
									'Off'
								)
							)
						)
					)
				);
			}
		}]);

		return Health;
	}(_react2.default.Component);

	;

	exports.default = Health;

/***/ },
/* 377 */
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

	var _reactD3Library = __webpack_require__(368);

	var _reactD3Library2 = _interopRequireDefault(_reactD3Library);

	var _d = __webpack_require__(369);

	var d3 = _interopRequireWildcard(_d);

	var _d3Tip = __webpack_require__(370);

	var _d3Tip2 = _interopRequireDefault(_d3Tip);

	var _reactDimensions = __webpack_require__(372);

	var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RD3Component = _reactD3Library2.default.Component;

	var ChartHorizontal = function (_React$Component) {
	  _inherits(ChartHorizontal, _React$Component);

	  function ChartHorizontal(props) {
	    _classCallCheck(this, ChartHorizontal);

	    var _this = _possibleConstructorReturn(this, (ChartHorizontal.__proto__ || Object.getPrototypeOf(ChartHorizontal)).call(this, props));

	    _this.state = { d3: '' };
	    return _this;
	  }

	  _createClass(ChartHorizontal, [{
	    key: 'graphRender',
	    value: function graphRender(containerWidth, tData, nextP) {
	      var component = this;
	      var widther = containerWidth;
	      var parentHeight = 300;

	      var json = tData;
	      var data = [];
	      var barData = {};
	      for (var i = 0; i < json.length; i++) {
	        barData.pps_id = json[i].pps_id;
	        barData.type = json[i][nextP];
	        data.push(barData);
	        barData = {};
	      }
	      update(data);

	      function update(data) {

	        var width = widther - 100;
	        var barHeight = parentHeight / data.length;
	        var left = 30;
	        var top = 20;

	        //var margin = {top: 20, right: 20, bottom: 50, left: 100};

	        var x = d3.scale.linear().range([0, width]);

	        var xAxis = d3.svg.axis().scale(x).orient("top");

	        var y = d3.scale.ordinal().rangeRoundBands([0, barHeight], .1);
	        var yAxis = d3.svg.axis().scale(y).orient("right");

	        var node = document.createElement('div');
	        var chart = d3.select(node).append('svg').attr("width", widther).attr("height", 400).append("g").attr("transform", "translate(" + left + "," + top + ")");

	        x.domain([0, d3.max(data, function (d) {
	          return d.type;
	        })]);

	        var bar = chart.selectAll("g").data(data).enter().append("g").attr("class", "g").attr("y", function (d) {
	          return y(d.pps_id);
	        }).attr("width", y.rangeBand()).attr("transform", function (d, i) {
	          return "translate(0," + i * barHeight + ")";
	        });

	        bar.append("g").attr("class", "axis").call(yAxis).style("font-size", "30px").style("font-family", "sans-serif").style("fill", "red").append("text").attr("y", 6).attr("dy", "4em").style("text-anchor", "end");

	        bar.append("g").attr("class", "y axis").attr("transform", "translate(" + "50" + ",0)").style({ 'stroke': '#D3D3D3', 'fill': '#D3D3D3', 'stroke-width': '1px' }).call(yAxis);

	        bar.append("rect").attr("rx", 2).attr("ry", 2).attr("x", 50).attr("width", function (d) {
	          return x(d.type);
	        }).attr("height", barHeight - 8).style("fill", "#D3D3D3").style("opacity", "0.5");

	        bar.append("text").attr("x", function (d) {
	          return x(d.type) + 25;
	        }).attr("y", barHeight / 2 - 3).attr("dy", ".35em").text(function (d) {
	          if (d.type === 0) {
	            return "ERROR";
	          } else {
	            return d.type;
	          }
	        }).style("font-size", "12px").style("font-weight", "bold").style("font-family", "sans-serif").style("fill", "#666666");

	        bar.append("text").attr("x", -10).attr("y", barHeight / 2 - 3).attr("dy", ".35em").text(function (d) {
	          if (d.type === 4) {
	            return "PPS " + d.pps_id;
	          } else {
	            return "PPS " + d.pps_id;
	          }
	        }).style("font-size", "12px").style("font-family", "sans-serif").style("fill", "#666666");

	        chart.append("text").attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
	        .attr("transform", "translate(" + (width / 2 + 30) + "," + -7 + ")") // centre below axis
	        .text("Orders/hr").style("font-size", "12px").style("font-family", "sans-serif").style("fill", "#666666");

	        component.setState({ d3: node });
	      }

	      function type(d) {
	        d.type = +d.type;
	        return d;
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.graphRender(this.props.containerWidth, this.props.data.ppsPerformance.aggregate_data, this.props.type);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.graphRender(nextProps.containerWidth, nextProps.data.ppsPerformance.aggregate_data, nextProps.type);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(RD3Component, { data: this.state.d3 })
	      );
	    }
	  }]);

	  return ChartHorizontal;
	}(_react2.default.Component);

	;
	exports.default = (0, _reactDimensions2.default)()(ChartHorizontal);

/***/ },
/* 378 */
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

	var _Tilex = __webpack_require__(379);

	var _Tilex2 = _interopRequireDefault(_Tilex);

	var _reactRedux = __webpack_require__(191);

	var _reactIntl = __webpack_require__(218);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AuditStatusWidget = function (_React$Component) {
		_inherits(AuditStatusWidget, _React$Component);

		/**
	  * Called once before rendering of component,used to displatch fetch action
	  * @return {[type]}
	  */
		function AuditStatusWidget(props) {
			_classCallCheck(this, AuditStatusWidget);

			return _possibleConstructorReturn(this, (AuditStatusWidget.__proto__ || Object.getPrototypeOf(AuditStatusWidget)).call(this, props));
		}

		/**
	  * [format display data coming from server/mock]
	  * @return {[type]} [description]
	  */


		_createClass(AuditStatusWidget, [{
			key: 'formatContainerData',
			value: function formatContainerData() {
				var lowStr,
				    auditData = Object.assign({}, this.props.auditData),
				    totalAudit = this.props.ppsData ? this.props.ppsData.totalAudit : null,
				    auditThroughput = this.props.throughputData ? this.props.throughputData.audit_throughput : null,
				    value = auditData.total_audited ? auditData.total_audited : null,
				    pluralMsg;

				//Setting display values based on server values/mock
				if (!value) {
					value = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.audit.heading.value',
						defaultMessage: 'None' });

					lowStr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.audit.status.offline',
						defaultMessage: 'Offline' });
				} else if (!totalAudit) {
					lowStr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.audit.status.starting',
						defaultMessage: 'Starting...' });
				} else {
					value = _react2.default.createElement(_reactIntl.FormattedNumber, { value: value });
					auditThroughput = _react2.default.createElement(_reactIntl.FormattedNumber, { value: auditThroughput });
					pluralMsg = _react2.default.createElement(_reactIntl.FormattedPlural, {
						value: totalAudit,
						one: 'PPS',
						other: 'PPS'
					});
					lowStr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.audit.throughput',
						defaultMessage: '{count} {pluralMsg} auditing {throughput} items/hr',
						values: {
							count: totalAudit,
							pluralMsg: pluralMsg,
							throughput: auditThroughput
						} });
				}

				auditData.heading = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.audit.heading',
					defaultMessage: 'Items audited' });
				auditData.value = value;
				auditData.low = lowStr;
				auditData.logo = "iAudit";

				return auditData;
			}
		}, {
			key: 'render',
			value: function render() {
				var auditData = this.formatContainerData();
				return _react2.default.createElement(_Tilex2.default, { items: auditData });
			}
		}]);

		return AuditStatusWidget;
	}(_react2.default.Component);

	function mapStateToProps(state, ownProps) {
		return {
			auditData: state.auditInfo.auditData,
			ppsData: state.ppsInfo.ppsData,
			throughputData: state.throughputInfo.throughputData
		};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(AuditStatusWidget);

/***/ },
/* 379 */
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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tilex = function (_React$Component) {
		_inherits(Tilex, _React$Component);

		function Tilex(props) {
			_classCallCheck(this, Tilex);

			return _possibleConstructorReturn(this, (Tilex.__proto__ || Object.getPrototypeOf(Tilex)).call(this, props));
		}

		_createClass(Tilex, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'gor-tile gor-single' },
					_react2.default.createElement(
						'div',
						{ className: 'gor-up-tile' },
						_react2.default.createElement(
							'div',
							{ className: 'gor-tile-left' },
							_react2.default.createElement(
								'span',
								{ className: 'gor-heading' },
								this.props.items.heading
							),
							_react2.default.createElement(
								'p',
								{ className: 'gor-heading-value' },
								this.props.items.value
							),
							_react2.default.createElement('p', { className: 'gor-status' })
						),
						_react2.default.createElement('span', { className: "gor-tile-right " + this.props.items.logo })
					),
					_react2.default.createElement(
						'div',
						{ className: 'gor-low-tile' },
						_react2.default.createElement(
							'span',
							null,
							this.props.items.low
						)
					)
				);
			}
		}]);

		return Tilex;
	}(_react2.default.Component);

	;

	exports.default = Tilex;

/***/ },
/* 380 */
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

	var _Tilex = __webpack_require__(379);

	var _Tilex2 = _interopRequireDefault(_Tilex);

	var _reactRedux = __webpack_require__(191);

	var _reactIntl = __webpack_require__(218);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PutStatusWidget = function (_React$Component) {
	        _inherits(PutStatusWidget, _React$Component);

	        /**
	         * Called once before rendering of component,used to displatch fetch action
	         * @return {[type]}
	         */
	        function PutStatusWidget(props) {
	                _classCallCheck(this, PutStatusWidget);

	                return _possibleConstructorReturn(this, (PutStatusWidget.__proto__ || Object.getPrototypeOf(PutStatusWidget)).call(this, props));
	        }
	        /**
	         * [function to format display data coming from server/mock]
	         * @return {[void]} 
	         */


	        _createClass(PutStatusWidget, [{
	                key: '_formatContainerData',
	                value: function _formatContainerData() {
	                        var lowStr,
	                            totalPut = this.props.ppsData ? this.props.ppsData.totalPut : null,
	                            putData = Object.assign({}, this.props.putData),
	                            putThroughput = this.props.throughputData ? this.props.throughputData.put_throughput : null,
	                            value = putData ? putData.value : null,
	                            pluralMsg,
	                            heading;

	                        //Setting display values based on server values/mock
	                        if (!value) {
	                                value = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.put.heading.value',
	                                        defaultMessage: 'None' });

	                                lowStr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.put.status.offline',
	                                        defaultMessage: 'Offline' });
	                        } else if (!totalPut) {
	                                lowStr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.put.status.starting',
	                                        defaultMessage: 'Starting...' });
	                        } else {
	                                value = _react2.default.createElement(_reactIntl.FormattedNumber, { value: value });
	                                putThroughput = _react2.default.createElement(_reactIntl.FormattedNumber, { value: putThroughput });
	                                pluralMsg = _react2.default.createElement(_reactIntl.FormattedPlural, {
	                                        value: totalPut,
	                                        one: 'PPS',
	                                        other: 'PPS'
	                                });
	                                lowStr = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.put.throughput',
	                                        defaultMessage: '{count} {pluralMsg} stocking {throughput} items/hr',
	                                        values: {
	                                                count: totalPut,
	                                                pluralMsg: pluralMsg,
	                                                throughput: putThroughput
	                                        } });
	                        }

	                        putData.heading = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.put.heading',
	                                defaultMessage: 'Items stocked' });
	                        putData.value = value;
	                        putData.low = lowStr;
	                        putData.logo = "iStock";

	                        return putData;
	                }
	        }, {
	                key: 'render',
	                value: function render() {
	                        var putData = this._formatContainerData();
	                        return _react2.default.createElement(_Tilex2.default, { items: putData });
	                }
	        }]);

	        return PutStatusWidget;
	}(_react2.default.Component);

	function mapStateToProps(state, ownProps) {
	        return {
	                putData: state.putInfo.putData,
	                ppsData: state.ppsInfo.ppsData,
	                throughputData: state.throughputInfo.throughputData

	        };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PutStatusWidget);

/***/ },
/* 381 */
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

	var _Tile2x = __webpack_require__(382);

	var _Tile2x2 = _interopRequireDefault(_Tile2x);

	var _reactRedux = __webpack_require__(191);

	var _reactIntl = __webpack_require__(218);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PickStatusWidget = function (_React$Component) {
	    _inherits(PickStatusWidget, _React$Component);

	    /**
	     * Called once before rendering of component,used to displatch fetch action
	     * @return {[type]}
	     */
	    function PickStatusWidget(props) {
	        _classCallCheck(this, PickStatusWidget);

	        return _possibleConstructorReturn(this, (PickStatusWidget.__proto__ || Object.getPrototypeOf(PickStatusWidget)).call(this, props));
	    }

	    _createClass(PickStatusWidget, [{
	        key: '_toTime',
	        value: function _toTime(m) {
	            var hh = 0,
	                mm = 0,
	                timestr = '';
	            hh = parseInt(m / 60, 10);
	            mm = m - hh * 60;

	            if (hh) timestr += hh + 'h ';
	            timestr += mm + 'm ';

	            return timestr;
	        }
	    }, {
	        key: '_parseProps',
	        value: function _parseProps() {
	            var statusClass = void 0,
	                statusLogo = void 0,
	                headingleft = void 0,
	                valueLeftStatus = void 0,
	                valueRightStatus = void 0,
	                textleft = 0,
	                headingright = void 0,
	                textright = void 0,
	                statusleft = void 0,
	                statusright = void 0,
	                lowleft = void 0,
	                lowright = void 0,
	                logo = void 0,
	                remTime = 0,
	                eta = 0,
	                items = {},
	                ordersData = Object.assign({}, this.props.ordersData),
	                ppsCount = this.props.ppsData ? this.props.ppsData.totalPick : null,
	                pickThroughput = this.props.throughputData ? this.props.throughputData.pick_throughput : null;

	            headingleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.headingleft',
	                defaultMessage: 'Orders to fullfill' });
	            logo = ' iPick';
	            textleft = ordersData.count_pending;

	            if (!textleft) {
	                valueLeftStatus = 'gor-none';
	                textleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.completed',
	                    defaultMessage: 'Completed' });

	                lowleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.status.idle',
	                    defaultMessage: '{count} PPS idle',
	                    values: {
	                        count: ppsCount
	                    } });
	            } else {

	                textleft = _react2.default.createElement(_reactIntl.FormattedNumber, { id: 'widget.pick.textleft', value: ordersData.count_pending });

	                lowleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.throughput',
	                    defaultMessage: '{count} PPS fullfilling at {throughput} items/hr',
	                    values: {
	                        count: ppsCount,
	                        throughput: pickThroughput
	                    } });

	                headingright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.headingright',
	                    defaultMessage: 'Time to cut-off' });

	                remTime = this._toTime(ordersData.cut_off);

	                textright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.textright',
	                    defaultMessage: '{cut_off}', values: { cut_off: remTime } });

	                eta = this._toTime(ordersData.eta);
	                lowright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.lowright',
	                    defaultMessage: 'Completing in {eta}', values: { eta: eta } });

	                statusright = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.statusright',
	                    defaultMessage: '{wave_end}', values: { wave_end: ordersData.wave_end } });

	                if (!ordersData.count_risk) {
	                    statusClass = 'gor-success';
	                    statusLogo = 'overview-tile-ontime-icon';
	                    statusleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.statusleft.onschedule',
	                        defaultMessage: 'On Schedule' });
	                } else {
	                    statusClass = 'gor-risk';
	                    statusLogo = 'header-yellow-alert-icon';
	                    statusleft = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'widget.pick.statusleft.atrisk',
	                        defaultMessage: '{count_risk} {count_risk,plural, one {order} other {orders}} at risk',
	                        values: { count_risk: ordersData.count_risk } });
	                    valueLeftStatus = 'gor-risk';
	                    valueRightStatus = 'gor-risk';
	                }
	            }
	            items = { headingleft: headingleft, headingright: headingright, textleft: textleft, valueLeftStatus: valueLeftStatus, valueRightStatus: valueRightStatus, textright: textright, statusleft: statusleft, statusClass: statusClass, statusLogo: statusLogo, statusright: statusright, lowleft: lowleft, lowright: lowright, logo: logo };
	            return items;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var items = this._parseProps();
	            return _react2.default.createElement(_Tile2x2.default, { items: items });
	        }
	    }]);

	    return PickStatusWidget;
	}(_react2.default.Component);

	function mapStateToProps(state, ownProps) {
	    return {
	        ordersData: state.ordersInfo.ordersData,
	        ppsData: state.ppsInfo.ppsData,
	        throughputData: state.throughputInfo.throughputData
	    };
	}
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PickStatusWidget);

/***/ },
/* 382 */
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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tile2x = function (_React$Component) {
		_inherits(Tile2x, _React$Component);

		function Tile2x(props) {
			_classCallCheck(this, Tile2x);

			return _possibleConstructorReturn(this, (Tile2x.__proto__ || Object.getPrototypeOf(Tile2x)).call(this, props));
		}

		_createClass(Tile2x, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'gor-tile gor-double' },
					_react2.default.createElement(
						'div',
						{ className: 'gor-tile-one' },
						_react2.default.createElement(
							'div',
							{ className: 'gor-up-tile' },
							_react2.default.createElement(
								'span',
								{ className: 'gor-heading' },
								this.props.items.headingleft
							),
							_react2.default.createElement(
								'p',
								{ className: 'gor-heading-value' },
								_react2.default.createElement(
									'span',
									{ className: this.props.items.valueLeftStatus },
									this.props.items.textleft
								)
							),
							_react2.default.createElement(
								'p',
								{ className: 'gor-status' },
								_react2.default.createElement('span', { className: this.props.items.statusLogo }),
								_react2.default.createElement(
									'span',
									{ className: this.props.items.statusClass },
									this.props.items.statusleft
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'gor-low-tile' },
							_react2.default.createElement(
								'span',
								null,
								this.props.items.lowleft
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'gor-tile-two' },
						_react2.default.createElement(
							'div',
							{ className: 'gor-up-tile' },
							_react2.default.createElement(
								'div',
								{ className: 'gor-tile-left' },
								_react2.default.createElement(
									'span',
									{ className: 'gor-heading' },
									this.props.items.headingright
								),
								_react2.default.createElement(
									'p',
									{ className: "gor-heading-value " + this.props.items.valueRightStatus },
									this.props.items.textright
								),
								_react2.default.createElement(
									'p',
									{ className: 'gor-status' },
									this.props.items.statusright
								)
							),
							_react2.default.createElement('div', { className: "gor-tile-right " + this.props.items.logo })
						),
						_react2.default.createElement(
							'div',
							{ className: 'gor-low-tile' },
							_react2.default.createElement(
								'span',
								null,
								this.props.items.lowright
							)
						)
					)
				);
			}
		}]);

		return Tile2x;
	}(_react2.default.Component);

	;

	exports.default = Tile2x;

/***/ },
/* 383 */
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

	var _tabs = __webpack_require__(384);

	var _tabs2 = _interopRequireDefault(_tabs);

	var _header = __webpack_require__(386);

	var _header2 = _interopRequireDefault(_header);

	var _socketActions = __webpack_require__(318);

	var _appConstants = __webpack_require__(319);

	var _initData = __webpack_require__(388);

	var _headerAction = __webpack_require__(331);

	var _reactRedux = __webpack_require__(191);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_React$Component) {
	  _inherits(App, _React$Component);

	  /**
	   * Called once before rendering of component,used to displatch fetch action
	   * @return {[type]}
	   */
	  function App(props) {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	  }

	  _createClass(App, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {

	      this.context.router.push("/login");
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      /**
	       * Checking if the user is loggedin 
	       * and redirecting to main page
	       */
	      var loginAuthorized = nextProps.loginAuthorized,
	          authToken = nextProps.authToken,
	          socketStatus = nextProps.socketStatus;

	      if (!loginAuthorized) this.context.router.push("/login");

	      if (false) {
	        if (loginAuthorized && !socketStatus) this.props.initWebSocket();
	      } else {
	        this.props.initMockData(_initData.wsInitData);
	      }

	      if (false) {
	        if (loginAuthorized && socketStatus && !nextProps.socketAuthorized) {
	          var webSocketData = {
	            'type': 'auth',
	            'data': {
	              "auth_token": authToken
	            }
	          };
	          this.props.sendAuthToSocket(webSocketData);
	        }
	        if (loginAuthorized && socketStatus && nextProps.socketAuthorized && !nextProps.initDataSent) {
	          this.props.initDataSentCall(_initData.wsInitData);
	        }
	      } else {
	        this.props.initMockData(_initData.wsInitData);
	      }
	    }
	    /**Render method called when component react renders
	     * @return {[type]}
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      var items3 = { start: "09:10:25", name: "Krish verma gandhi sharma", post: "Manager" };

	      return _react2.default.createElement(
	        'div',
	        { className: 'mainContainer' },
	        _react2.default.createElement(_header2.default, { user: items3 }),
	        _react2.default.createElement(_tabs2.default, null),
	        this.props.children
	      );
	    }
	  }]);

	  return App;
	}(_react2.default.Component);

	;
	/**
	 * [Passing Router to component through context]
	 * @type {Object}
	 */
	App.contextTypes = {
	  router: _react2.default.PropTypes.object.isRequired
	};
	/**
	 * Function to pass state values as props
	 */

	function mapStateToProps(state, ownProps) {
	  return {
	    authToken: state.authLogin.auth_token,
	    loginAuthorized: state.authLogin.loginAuthorized,
	    socketStatus: state.recieveSocketActions.socketConnected,
	    socketAuthorized: state.recieveSocketActions.socketAuthorized,
	    initDataSent: state.recieveSocketActions.initDataSent,
	    intl: state.intl
	  };
	}
	/**
	 * Function to dispatch action values as props
	 */
	function mapDispatchToProps(dispatch) {
	  return {
	    initWebSocket: function initWebSocket() {
	      dispatch((0, _socketActions.setWsAction)({ type: _appConstants.WS_CONNECT }));
	    },
	    sendAuthToSocket: function sendAuthToSocket(data) {
	      dispatch((0, _socketActions.setWsAction)({ type: _appConstants.WS_ONSEND, data: data }));
	    },
	    initDataSentCall: function initDataSentCall(data) {
	      dispatch((0, _socketActions.setWsAction)({ type: _appConstants.WS_ONSEND, data: data }));
	    },
	    initMockData: function initMockData(data) {
	      dispatch((0, _socketActions.setMockAction)({ type: _appConstants.WS_MOCK, data: data }));
	    }
	  };
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

/***/ },
/* 384 */
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

	var _tab = __webpack_require__(385);

	var _tab2 = _interopRequireDefault(_tab);

	var _reactRouter = __webpack_require__(246);

	var _reactRedux = __webpack_require__(191);

	var _tabSelectAction = __webpack_require__(358);

	var _appConstants = __webpack_require__(319);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tabs = function (_React$Component) {
	  _inherits(Tabs, _React$Component);

	  function Tabs(props) {
	    _classCallCheck(this, Tabs);

	    return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));
	  }

	  _createClass(Tabs, [{
	    key: 'handleOverviewClick',
	    value: function handleOverviewClick(data) {
	      var temp = _appConstants.OVERVIEW;
	      this.props.tabSelected(temp);
	    }
	  }, {
	    key: 'handleSystemClick',
	    value: function handleSystemClick(data) {
	      var temp = _appConstants.SYSTEM;
	      this.props.tabSelected(temp);
	    }
	  }, {
	    key: 'handleOrdersClick',
	    value: function handleOrdersClick(data) {
	      var temp = _appConstants.ORDERS;
	      this.props.tabSelected(temp);
	    }
	  }, {
	    key: 'handleUsersClick',
	    value: function handleUsersClick(data) {
	      var temp = _appConstants.USERS;
	      this.props.tabSelected(temp);
	    }
	  }, {
	    key: 'render',
	    value: function render() {

	      var item1 = [{ tab: 'OVERVIEW', Status: 'Fulfiling orders', currentState: 'gorOffline' }];
	      var item2 = [{ tab: 'SYSTEM', Status: 'Online', currentState: 'gorOnline' }];
	      var item3 = [{ tab: 'ORDERS', Status: '70% fulfilled', currentState: 'gorError' }];

	      var item5 = [{ tab: 'USERS', Status: '35 users logged in', currentState: 'gorOffline' }];
	      var selectClass = { OVERVIEW: "gorMainBlock", SYSTEM: "gorMainBlock", ORDERS: "gorMainBlock", INVENTORY: "gorMainBlock", USERS: "gorMainBlock" };

	      selectClass[this.props.tab] = "gorMainBlockSelect";

	      return _react2.default.createElement(
	        'div',
	        { className: 'gorTabs gorMainBlock' },
	        _react2.default.createElement(
	          _reactRouter.Link,
	          { to: '/overview', onClick: this.handleOverviewClick.bind(this) },
	          _react2.default.createElement(_tab2.default, { items: item1, changeClass: selectClass["OVERVIEW"], subIcons: false })
	        ),
	        _react2.default.createElement(
	          _reactRouter.Link,
	          { to: '/system', onClick: this.handleSystemClick.bind(this) },
	          _react2.default.createElement(_tab2.default, { items: item2, changeClass: selectClass["SYSTEM"], subIcons: true })
	        ),
	        _react2.default.createElement(
	          _reactRouter.Link,
	          { to: '/orders', onClick: this.handleOrdersClick.bind(this) },
	          _react2.default.createElement(_tab2.default, { items: item3, changeClass: selectClass["ORDERS"], subIcons: true })
	        ),
	        _react2.default.createElement(
	          _reactRouter.Link,
	          { to: '/users', onClick: this.handleUsersClick.bind(this) },
	          _react2.default.createElement(_tab2.default, { items: item5, changeClass: selectClass["USERS"], subIcons: false })
	        )
	      );
	    }
	  }]);

	  return Tabs;
	}(_react2.default.Component);

	function mapStateToProps(state, ownProps) {

	  return {
	    tab: state.tabSelected.tab || "OVERVIEW"
	  };
	}

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    tabSelected: function tabSelected(data) {
	      dispatch((0, _tabSelectAction.tabSelected)(data));
	    }
	  };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Tabs);

/***/ },
/* 385 */
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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tab = function (_React$Component) {
		_inherits(Tab, _React$Component);

		function Tab(props) {
			_classCallCheck(this, Tab);

			return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, props));
		}

		_createClass(Tab, [{
			key: 'render',
			value: function render() {
				var icon = {};
				if (this.props.subIcons === true && this.props.items[0].currentState === "gorError") {
					icon = _react2.default.createElement('div', { className: 'tab-alert-icon' });
				} else if (this.props.subIcons === true && this.props.items[0].currentState === "gorOnline") {
					icon = _react2.default.createElement('div', { className: 'tab-online-icon' });
				} else {
					icon = _react2.default.createElement('div', null);
				}
				return _react2.default.createElement(
					'div',
					{ className: 'gorTab gorContainer' },
					_react2.default.createElement(
						'div',
						{ className: this.props.changeClass },
						_react2.default.createElement(
							'div',
							{ className: 'gorInlineDisplay' },
							_react2.default.createElement(
								'div',
								null,
								_react2.default.createElement(
									'div',
									{ className: 'gor-upperText' },
									this.props.items[0].tab
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'gorOffline' },
								_react2.default.createElement(
									'div',
									{ className: this.props.items[0].currentState },
									this.props.items[0].Status
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'gorIconsInline' },
							icon
						)
					)
				);
			}
		}]);

		return Tab;
	}(_react2.default.Component);

	;

	exports.default = Tab;

/***/ },
/* 386 */
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

	var _headerAction = __webpack_require__(331);

	var _reactReduxModal = __webpack_require__(306);

	var _logoutTab = __webpack_require__(387);

	var _logoutTab2 = _interopRequireDefault(_logoutTab);

	var _reactIntl = __webpack_require__(218);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var dropdownFlag = 0;
	var temp;

	var Header = function (_React$Component) {
		_inherits(Header, _React$Component);

		function Header(props) {
			_classCallCheck(this, Header);

			var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

			if (dropdownFlag === 0) {
				temp = "dropdown-content";
			}

			return _this;
		}

		_createClass(Header, [{
			key: 'componentDidMount',
			value: function componentDidMount() {}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {}
		}, {
			key: 'openDropdown',
			value: function openDropdown() {
				dropdownFlag = 1;
				temp = "dropdown-content-afterClick";
			}
		}, {
			key: 'addModal',
			value: function addModal() {
				_reactReduxModal.modal.add(_logoutTab2.default, {
					title: '',
					size: 'large', // large, medium or small,
					closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
					hideCloseButton: true // (optional) if you don't wanna show the top right close button
					//.. all what you put in here you will get access in the modal props ;)
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var headData = this.props.headData;


				var item = [{ value: 'logout', label: 'Logout' }];
				return _react2.default.createElement(
					'header',
					{ className: 'gorHeader head' },
					_react2.default.createElement(
						'div',
						{ className: 'mainBlock' },
						_react2.default.createElement(
							'div',
							{ className: 'logoWrap' },
							_react2.default.createElement('div', { className: 'gor-logo logo' })
						),
						_react2.default.createElement(
							'div',
							{ className: 'blockSystem' },
							_react2.default.createElement(
								'div',
								{ className: 'upperText' },
								_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'header.description',
									defaultMessage: 'Butler Management System' })
							),
							_react2.default.createElement(
								'div',
								{ className: 'subText' },
								_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'header.start_time',
									defaultMessage: 'Start time:{time} ',
									values: {
										time: this.props.user.start
									} })
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'blockLeft' },
						_react2.default.createElement(
							'div',
							{ className: 'logoWrap' },
							_react2.default.createElement('div', { className: 'logo fk-logo' })
						),
						_react2.default.createElement(
							'div',
							{ className: 'dropdown', id: 'profile' },
							_react2.default.createElement(
								'div',
								{ className: 'dropbtn', onClick: this.openDropdown },
								_react2.default.createElement(
									'div',
									{ className: 'block' },
									_react2.default.createElement(
										'div',
										{ className: 'upperTextClient truncate' },
										_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'header.user_name',
											defaultMessage: '{user_name}',
											values: {
												user_name: this.props.user.name
											} })
									),
									_react2.default.createElement(
										'div',
										{ className: 'subTextClient' },
										_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'header.user_post',
											defaultMessage: '{user_post}',
											values: {
												user_post: this.props.user.post
											} })
									)
								),
								_react2.default.createElement('div', { className: 'block user-icon' }),
								_react2.default.createElement(
									'div',
									{ id: 'myDropdown', className: 'dropdown-content' },
									_react2.default.createElement('div', { className: 'horizontalDiv' }),
									_react2.default.createElement(
										'div',
										null,
										_react2.default.createElement(
											'a',
											{ href: 'javascript:void(0)', onClick: this.addModal.bind(this) },
											'Logout'
										)
									)
								)
							)
						)
					)
				);
			}
		}]);

		return Header;
	}(_react2.default.Component);

	;

	exports.default = Header;

/***/ },
/* 387 */
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

	var _reactRedux = __webpack_require__(191);

	var _loginAction = __webpack_require__(325);

	var _socketActions = __webpack_require__(318);

	var _reactIntl = __webpack_require__(218);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LogOut = function (_React$Component) {
	  _inherits(LogOut, _React$Component);

	  function LogOut(props) {
	    _classCallCheck(this, LogOut);

	    return _possibleConstructorReturn(this, (LogOut.__proto__ || Object.getPrototypeOf(LogOut)).call(this, props));
	  }

	  _createClass(LogOut, [{
	    key: 'removeThisModal',
	    value: function removeThisModal() {}
	  }, {
	    key: 'appLogout',
	    value: function appLogout() {
	      this.props.removeModal();
	      this.props.userLogout();
	      this.props.endConnect();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: 'gor-logout' },
	          _react2.default.createElement(
	            'div',
	            { className: 'gor-logout-text' },
	            _react2.default.createElement('div', { className: 'iQuestion' }),
	            _react2.default.createElement(
	              'span',
	              null,
	              'Are you sure you would like to log out now?'
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'gor-logout-bottom' },
	            _react2.default.createElement(
	              'button',
	              { className: 'gor-cancel-btn', onClick: this.removeThisModal.bind(this) },
	              'Cancel'
	            ),
	            _react2.default.createElement(
	              'button',
	              { className: 'gor-logout-btn', onClick: this.appLogout.bind(this) },
	              'Log out now'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return LogOut;
	}(_react2.default.Component);

	;
	function mapStateToProps(state, ownProps) {
	  return {};
	}
	function mapDispatchToProps(dispatch) {
	  return {
	    endConnect: function endConnect() {
	      dispatch((0, _socketActions.endWsAction)());
	    },
	    userLogout: function userLogout() {
	      dispatch((0, _loginAction.logoutRequest)());
	    }
	  };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LogOut);

/***/ },
/* 388 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var wsInitData = exports.wsInitData = {
		"type": "subscribe",
		"data": [{
			"resource_id": "pps",
			"details": {
				"data": "aggregate",
				"callback": []
			}
		}, {
			"resource_id": "pps",
			"details": {
				"data": "complete",
				"callback": []
			}
		}, {
			"resource_id": "orders",
			"details": {
				"data": "aggregate",
				"callback": []
			}
		}, {
			"resource_id": "butlers",
			"details": {
				"data": "aggregate",
				"callback": []
			}
		}, {
			"resource_id": "users",
			"details": {
				"data": "aggregate",
				"callback": []
			}
		}, {
			"resource_id": "put",
			"details": {
				"data": "aggregate",
				"callback": []
			}
		}, {
			"resource_id": "pick",
			"details": {
				"data": "aggregate",
				"callback": []
			}
		}, {
			"resource_id": "inventory",
			"details": {
				"data": "aggregate",
				"callback": []
			}
		}, {
			"resource_id": "chargers",
			"details": {
				"data": "complete",
				"callback": []
			}
		}, {
			"resource_id": "butlers",
			"details": {
				"data": "complete",
				"callback": []
			}
		}]
	};

/***/ },
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var preloadedState = exports.preloadedState = {
	  "ordersInfo": { "ordersData": { cut_off: null, count_pending: null, count_risk: null, eta: null, wave_end: null } }

	};

/***/ }
]);