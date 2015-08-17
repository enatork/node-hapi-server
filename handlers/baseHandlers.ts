///<reference path="../typings/node/node.d.ts"/>
///<reference path="../model/models.ts"/>


var server = require("../server");

function initializeCourse (request:any, reply:any,handlError) {

    courseContent = {"courseContent": "courseContent"}


    reply(courseContent);
}


var baseHandlers={
    initializeCourse:initializeCourse
};
export = baseHandlers;