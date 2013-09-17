# Level3MediaPortalAPI [![Build Status](https://secure.travis-ci.org/dublx/Level3MediaPortalAPI.png?branch=master)](http://travis-ci.org/dublx/Level3MediaPortalAPI)

Level 3 Communication Media Portal API Node.js Module

## Getting Started
Install the module with: `npm install Level3MediaPortalAPI`

## Documentation
Supported API methods:
/key
/usage

## Examples
```javascript
var api = require('Level3MediaPortalAPI');
var util = require('util');

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

api.request(api.methods.key, requestCallback);

api.request(api.methods.usage, requestCallback);

function requestCallback(err, response) {
	if (err) throw err;
	console.log(response.body);
};
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
2013-09-17: Added README.md example usage

## License
Copyright (c) 2013 Luis Faustino (Dublx)  
Licensed under the MIT license.
