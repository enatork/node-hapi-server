///<reference path="../typings/node/node.d.ts"/>
///<reference path="../model/models.ts"/>
var server = require("../server");
function initializeCourse(request, reply, handlError) {
    courseContent = { "courseContent": "courseContent" };
    reply(courseContent);
}
var baseHandlers = {
    initializeCourse: initializeCourse
};
module.exports = baseHandlers;
