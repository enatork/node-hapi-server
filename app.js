var server = require("./server");

var routes = require('./routes/routes');

server.route(routes.createRoutes());


server.start(function(){
    console.log('Server running at:',server.info.uri);
});