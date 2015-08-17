var path = require('path');
var packageJson = require(__dirname + '/package.json');

var Hapi = require('hapi');
var Good = require('good');

var server = new Hapi.Server({
    connections: {
        router: {
            isCaseSensitive: false
        }
    }
});
var config = require('rc')(packageJson.name, {
    port: 3000,
    basePath: 'http://localhost:3000'
});
server.connection({port: config.port, routes: {cors: true}});

console.log("server is instantiated!!!!!!!!!");


server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        },{
            reporter: require('good-file'),
            events: { error: '*' },
            config: './log/hapi_error_log.dat'
        },{
            reporter: require('good-file'),
            events: { log: '*' },
            config: './log/hapi_log.dat'
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
var pack = require('package'),
    swaggerOptions = {
        apiVersion: pack.version,
        basePath: config.basePath
    };

server.register({
    register: require('hapi-swagger'),
    options: swaggerOptions
}, function (err) {
    if (err) {
        server.log(['error'], 'hapi-swagger load error: ' + err)
    } else {
        server.log(['start'], 'hapi-swagger interface loaded')
    }
});

module.exports = server;