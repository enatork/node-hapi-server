/**
 * Created by mtony on 7/1/15.
 */
///<reference path="../typings/node/node.d.ts"/>
var request = require('request');
var Q = require('q');
function call(options, method) {
    console.log('logging the url', options.uri);
    return Q.ninvoke(request, method.trim(), options).then(function (result) {
        return result[0].statusCode > 299 ? Q.reject(result[0].body, result[0].statusCode) : Q.resolve(result[0].body);
    });
}
var httpService = {
    request: call
};
module.exports = httpService;
//# sourceMappingURL=HttpService.js.map