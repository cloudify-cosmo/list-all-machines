var conf = require('./conf');

var logger = require('log4js').getLogger('SendAlert');

// https://github.com/flowdock/node-flowdock#sending-messages
//
exports.send = function( streamId, message, callback ){
    var Session = require('flowdock').Session;
    var session = new Session(conf.flowdock.apiToken);
    session.on('error', function (e) { logger.error('error from flowdock session',e); });
    session.message(conf.flowdock.streamId, message, callback);
};