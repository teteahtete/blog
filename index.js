///<reference path="./typings/node/node-0.10.d.ts"/>
///<reference path="./typings/bluebird/bluebird.d.ts" />
///<reference path="./core/core.d.ts"/>
var express = require("express");
var ghost = require('./core');
var errors = require('./core/server/errors');
require('./core/server/utils/startup-check').check();
var parentApp = express();
ghost().then(function (ghostServer) {
    parentApp.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    ghostServer.start(parentApp);
}).catch(function (err) {
    errors.logErrorAndExit(err, err.context, err.help);
});
