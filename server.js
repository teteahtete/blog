///<reference path="./typings/node/node-0.10.d.ts"/>
///<reference path="./typings/bluebird/bluebird.d.ts" />
///<reference path="./core/core.d.ts"/>
// # Ghost Startup
// Orchestrates the startup of Ghost when run from command line.
// Proceed with startup
var express = require("express");
var ghost = require('./core');
var errors = require('./core/server/errors');
// Make sure dependencies are installed and file system permissions are correct.
require('./core/server/utils/startup-check').check();
// Create our parent express app instance.
var parentApp = express();
// Call Ghost to get an instance of GhostServer
ghost().then(function (ghostServer) {
    // Mount our Ghost instance on our desired subdirectory path if it exists.
    parentApp.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    // Let Ghost handle starting our server instance.
    ghostServer.start(parentApp);
}).catch(function (err) {
    errors.logErrorAndExit(err, err.context, err.help);
});
