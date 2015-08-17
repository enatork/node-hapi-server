var http = require('http');
var https = require('https');
var Q = require('q');
var Qs = require('qs');

function requestHttp(host, path, method, data, headers) {
    if (host) {
        // set defaults
        path = path || '/';
        method = method || 'GET';

        // adjust the path based on data
        if (data && method === 'GET') {
            path = path + '?' + Qs.stringify(data);
        }

        // prepare a new promise
        var deferred = Q.defer();

        // options for the request
        var options = {
            hostname: host,
            path: path,
            method: method,
            headers: headers
        };

        var req = http.request(options, function callback(res) {
            var body = '';
            res.on('data', function onData(data) {
                body += data;
            });

            res.on('end', function onEnd() {
                if (res.statusCode > 199 && res.statusCode < 400) {
                    deferred.resolve(body);
                } else {
                    deferred.reject(body);
                }
            });

            res.on('error', function onError(error) {
                console.log('AuthToken: ', error.message);
                deferred.reject(err);
            });
        });
        if (data && method != 'GET') {
            req.write(data);
        }
        req.end();

        return deferred.promise;
    }
}

function requestHttps(host, path, method, data, headers) {
    if (host) {
        // set defaults
        path = path || '/';
        method = method || 'GET';

        // adjust the path based on data
        if (data && method === 'GET') {
            path = path + '?' + Qs.stringify(data);
        }

        // prepare a new promise
        var deferred = Q.defer();

        // options for the request
        var options = {
            hostname: host,
            path: path,
            method: method,
            headers: headers
        };

        var req = https.request(options, function callback(res) {
            var body = '';
            res.on('data', function onData(data) {
                body += data;
            });

            res.on('end', function onEnd() {
                if (res.statusCode > 199 && res.statusCode < 400) {
                    deferred.resolve(body);
                } else {
                    deferred.reject(body);
                }
            });

            res.on('error', function onError(error) {
                console.log('AuthToken: ', error.message);
                deferred.reject(err);
            });
        });
        if (data && method != 'GET') {
            req.write(data);
        }
        req.end();

        return deferred.promise;
    }
}

var httpManager = {
    http: requestHttp,
    https: requestHttps
};
 module.exports = httpManager;