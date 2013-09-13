/*
 * Level3MediaPortalAPI
 * https://github.com/dublx/Level3MediaPortalAPI
 *
 * Copyright (c) 2013 Luis Faustino
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');
var _ = require('underscore');
var dateFormat = require('dateformat');
var crypto = require('crypto');

var methods = {
	"key": {
		"verb": "GET",
		"sourceuri": "https://ws.level3.com",
		"path": "/key/v1.0",
		"parameters" : "",
		"content" : "",
		"setParameters": function(options) {
		},
		"url": function() {
			return this.sourceuri + this.path + this.parameters;
		}
	},
	"usage": {
		"verb": "GET",
		"sourceuri": "https://ws.level3.com",
		"path": "/usage/cdn/v1.0",
		"parameters" : "",
		"content" : "",
		"setParameters": function(options) {
			var params= "";
			params+= (options.ag ? "/" + options.ag + "/" : "");
			params+= (options.scid ? options.scid + "/" : "");
			params+= (options.ni ? options.ni + "/" : "");
			params+= (options.serviceType ? "?serviceType=" + options.serviceType : "");
			params+= (options.dateFrom ? "&dateFrom=" + options.dateFrom : "");
			params+= (options.dateTo ? "&dateTo=" + options.dateTo : "");
			params+= (options.dateInterval ? "&dateInterval=" + options.dateInterval : "");
			this.parameters = params;
		},
		"url": function() {
			return this.sourceuri + this.path + this.parameters;
		}
	}
};

var config = {
	key: "",
	secret: "",
	algorithm: "sha1",
	encoding: "base64",
};

var defaultRequestHeaders = {
	"Accept": "text/xml",
	"Content-Type": "text/xml",
	"Authorization": "",
	"Date": ""
}

function getMPASignature(options) {
	var hmac = crypto.createHmac(options.algorithm, options.secret);
	hmac.update(options.data);
	return hmac.digest(options.encoding);
}

var doRequest = function(apiMethod) {
	console.log('Request: ',apiMethod.url());

	var headers = {};
	_.extend(headers, defaultRequestHeaders);
	var reqDate = dateFormat(Date.now(), "ddd, d mmm yyyy HH:MM:ss", false) + " +0100";
	headers.Date = reqDate;

	var contentMD5 = ""; //todo get content-md5 from apiMethod.content
	var data = headers.Date + "\n" + apiMethod.path + apiMethod.parameters + "\n" + "text/xml" + "\n" + apiMethod.verb + "\n" + contentMD5;
console.log('data', data);
	var hash = getMPASignature({
		algorithm: config.algorithm,
		encoding: config.encoding,
		secret: config.secret,
		data: data
	});
	headers.Authorization = "MPA " + config.key + ":" + hash;

	var reqOptions = {
		"uri": apiMethod.url(),
		"headers": headers
	};

	request(reqOptions, function(error, response, body) {
		if (error) {
			return console.error('request error:', error);
		}
		console.info('Level3MediaPortalAPI response:\n' + body);
	});
};

module.exports = {
	request: doRequest,
	config: config,
	methods: methods
};