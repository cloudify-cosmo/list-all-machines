var logger = require('log4js').getLogger('ec2');
var softlayer = require('../lib/clouds/softlayer');
var path = require('path');
var conf = require( path.join(__dirname, '..', 'conf', 'dev', 'test.json') );

softlayer.list(conf.softlayer, function( err, data ){
    logger.info(arguments);
});

