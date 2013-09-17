# Level3MediaPortalAPI [![Build Status](https://secure.travis-ci.org/dublx/Level3MediaPortalAPI.png?branch=master)](http://travis-ci.org/dublx/Level3MediaPortalAPI)

Level 3 Communication Media Portal API Node.js Module

## Getting Started
Install the module with: `npm install level3mediaportalapi`

## Documentation
Supported API methods:
/key
/usage

## Examples
```javascript
var api = require('level3mediaportalapi');
var util = require('util');
var xml2js = require('xml2js');


api.config.key = "YOUR-API-KEY";
api.config.secret = "YOUR-API-SECRET";

api.methods.usage.setParameters({
	ag: YOUR-ACCESS-GROUP,
	scid: "YOUR-SERVICE-IDENTIFIER",
	ni: null,
	serviceType: 'caching || streaming || origin',
	dateFrom: 'yyyyMMddhhmm',
	dateTo: 'yyyyMMddhhmm',
	dateInterval: 'monthly | daily'
});


api.request(api.methods.key, keyRequestCallback);
api.request(api.methods.usage, usageRequestCallback);


function keyRequestCallback(err, response) {
	if (err) throw err;
	console.log('/key response', response.body);
};
function usageRequestCallback(err, response) {
	if (err) throw err;
	console.log('/usage response', response.body);
	getObjectFromXml(response.body, function(err, result){
		if(err) throw err;
		console.log('volume=', result.accessGroup.services[0].service[0].summaryData[0].volume);
	});
};
function getObjectFromXml(data, cb) {
	var parser = new xml2js.Parser();
	var parseSuccess = true;
	parser.addListener('error', function(err) {
		parseSuccess = false;
		cb(err, null);
	});
	parser.addListener('end', function(result) {
		if (parseSuccess) cb(null, result);
	});
	parser.parseString(data);
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
2013-09-17: Added README.md example usage

## License
Copyright (c) 2013 Luis Faustino (Dublx)  
Licensed under the MIT license.
