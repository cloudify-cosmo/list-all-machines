/*global describe,it*/
'use strict';
//var assert = require('assert');
var sendAlert = require('../lib/SendAlert');

var logger = require('log4js').getLogger('testSendAlert');

var conf = require('../lib/conf');
conf.initialize(require('../conf/dev/me.json'));

describe('sendAlert.', function() {
    it('sshould send notification', function( done ) {
        https://github.com/flowdock/node-flowdock#sending-messages
        sendAlert.send('@guy how are you?', function(err, message, result){
            logger.info('send successfully', err, message, result);
            logger.info(arguments);
            done();
        });
    });
});
