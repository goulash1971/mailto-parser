/*
 * MailTo Parser
 *
 * Copyright 2011, Stuart Hudson <goulash1971@yahoo.com>
 * Released under the terms of the MIT License.
 * 
 * Version 1.0.0
 */
var parseMailTo = require("./parseMailTo");


/**
 * Utility function that will sort a attribues (keys and values) and produce a new
 * attributes string that is sorted by key order.
 *
 * @param {Object} attributes as keys and values
 * @return {String} a new attributes strinng sorted in key order
 * @api private
 */
function sortedAttributes (attributes) {
  var keys = [], name, i, len, key, sorted = [];
  for (name in attributes) {
    for (i = 0, len = keys.length; i < len; i++) {
      if (keys[i] >= name) break;
    }
    keys.splice(i, 0, name);
  }
  for (i = 0, len = keys.length; i < len; i++) {
    key = keys[i];
    sorted.push(key + "=" + attributes[key]);
  }
  if (sorted.length !== 0)
	return sorted.join("&");
};

/**
 * Utility function that will sort email addresses and produce a new
 * string that is sorted by address order.
 *
 * @param {Array} addresses the email addresses
 * @return {String} a to strinng sorted in address order
 * @api private
 */
function sortedAddresses (addresses) {
  var name, i, len, address, sorted = [];
  for (address in addresses) {
    for (i = 0, len = sorted.length; i < len; i++) {
      if (sorted[i] >= address) break;
    }
    sorted.splice(i, 0, address);
  }
  if (sorted.length !== 0)
	return sorted.join(",");
};

/**
 * Macro function that returns {@code true} if the {@param value} supplied
 * is not {@code undefined} and not {@code null}
 *
 * @param {Mixed} value to test
 * @return {Boolean} indicating if the value is set
 * @api private
 */
function isSet(value) {
	if ((value !== undefined) && (value !== null))
		return value !== '';
	return false;
}

/**
 * Macro function that returns the {@param value} if it is not {@code undefined} 
 * and not {@code null} otherwise returns ane empty string
 *
 * @param {Mixed} value to test
 * @return {String} teh string {@param value} or empty string
 * @api private
 */
function value(value) {
	if ((value !== undefined) && (value !== null))
		return value;
	return '';
}

/**
 * Macro function that returns the {@param value} with a {@param prefix} if it 
 * is not {@code undefined} and not {@code null} otherwise returns ane empty string
 *
 * @param {Mixed} value to test
 * @parem {String} the prefix
 * @return {String} the prefixed {@param value} or empty string
 * @api private
 */
function prefix(value, prefix) {
	if ((value !== undefined) && (value !== null))
		return prefix + value;
	return '';
}

/**
 * Macro function that returns the {@param value} with a {@param suffix} if it 
 * is not {@code undefined} and not {@code null} otherwise returns ane empty string
 *
 * @param {Mixed} value to test
 * @parem {String} the suffix
 * @return {String} the suffixed {@param value} or empty string
 * @api private
 */
function suffix(value, suffix) {
	if ((value !== undefined) && (value !== null))
		return value + suffix;
	return '';
}

/**
 * Parser constructor that takes some options for the parser used
 * to control parseMailTo and other things.
 *
 * @param {Object} options for the Parser
 * @api public
 */
function Parser (options) {
	this.options = options;
};


/**
 * Method that will parse a given {@param mailtoStr} into it's components
 * in either 'loose' (default) or 'strict' mode.
 *
 * @param {String} the MailTo string to be parsed
 * @param {Boolean} set if we want 'strict' parsing
 * @return {Object} parsed MailTo
 * @api public
 * {@see parseUri}
 */
Parser.prototype.parse = function (mailtoStr, strictMode) {
	if (strictMode === true) return parseMailTo (mailtoStr, "strict");
	return parseMailTo (mailtoStr);
};


/**
 * Method that will 'complete' a MailTo definition by combining the low level
 * components (if defined) into values for the higher level components.
 *
 * @param {Object} MailTo as components
 * @return {Object} completed MailTo with high level components
 * @api private
 */
Parser.prototype.complete = function (obj) {
	if (typeof obj === 'string') obj = this.parse(obj);
	if ((!isSet(obj.to)) && isSet(obj.addresses))
		obj.to = sortedAddresses(obj.addresses);
	if ((!isSet(obj.attributes)) && isSet(obj.attributeKey)) 
		obj.attributes = sortedAttributes(obj.attributeKey);
	if ((!isSet(obj.specification)) && isSet(obj.attributes))
		obj.specification = prefix(obj.attributes, "?");
	return obj;
};

/**
 * Method that will create a {String} from an MailTo thatis specified as a series of
 * URI components
 *
 * @param {Object} the MailTo components
 * @return {String} the formatted MailTo
 * @api public
 */
Parser.prototype.format = function (obj) {
	obj = this.complete(obj);
	return (suffix(obj.protocol, ':').toLowerCase() + 
			value(obj.addresses) + value(obj.specification));
};


/**
 * Expose the Parser
 */
module.exports = exports = Parser;
