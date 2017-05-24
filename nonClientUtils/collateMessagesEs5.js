/**
 * This file is a node utility for collating all the internatilization messages into 
 * en-US.json from where the translations have to be done for other languages
 *
 * Steps to use this file.
 *
 * 1. cd into the root directory of the git repo for this project
 * 2. cd to 'nonClientUtils' folder
 * 3. execute 'node collateMessagesEs5.js'
 * 4. check the en-US.json for the updated string for translations.
 * 
 */


'use strict';

var _stringify=require('babel-runtime/core-js/json/stringify');

var _stringify2=_interopRequireDefault(_stringify);

var _fs=require('fs');

var fs=_interopRequireWildcard(_fs);

var _glob=require('glob');

var _mkdirp=require('mkdirp');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj={}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key]=obj[key]; } } newObj.default=obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MESSAGES_PATTERN='../src/formattedMessages/**/*.json';
var LANG_DIR='../src/translations/';

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
// Execute this file by running the following commands
var arrayOfMessages=[];
var defaultMessages=(0, _glob.sync)(MESSAGES_PATTERN).map(function (filename) {
    return fs.readFileSync(filename, 'utf8');
}).map(function (file) {
    return JSON.parse(file);
}).reduce(function (collection, descriptors) {
    descriptors.forEach(function (_ref) {
        var id=_ref.id;
        var defaultMessage=_ref.defaultMessage;

        if (collection.hasOwnProperty(id)) {
            throw new Error('Duplicate message id: ' + id);
        }

        arrayOfMessages.push({
                    "id" : _ref.id,
                    "description" : _ref.description,
                    "defaultMessage" : _ref.defaultMessage
                })
    });

    return arrayOfMessages;
}, {});

(0, _mkdirp.sync)(LANG_DIR);
 fs.writeFileSync(LANG_DIR + 'en-US.json', (0, _stringify2.default)(defaultMessages, null, 2));

