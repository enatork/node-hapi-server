///<reference path="../typings/node/node.d.ts"/>
///<reference path="../handlers/baseHandlers"/>
var baseHandlers = require("../handlers/baseHandlers");
var Joi = require('joi');
function createRoutes() {
    var routes = [
        {
            method: 'GET',
            path: '/course/{courseId}',
            config: {
                handler: baseHandlers.initializeCourse,
                description: 'Initialize course',
                notes: ' use DRSSZS51BSDQNXQNZ234 as courseId if you want some data comes back',
                tags: ['api'],
                validate: {
                    params: {
                        courseId: Joi.string()
                            .required()
                            .description('the courseid for the course')
                    }
                }
            }
        }
    ];
    return routes;
}
var BaseRoutes = {
    createRoutes: createRoutes
};
module.exports = BaseRoutes;
