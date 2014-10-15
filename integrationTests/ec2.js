var logger = require('log4js').getLogger('ec2');
var ec2 = require('../lib/clouds/aws-ec2');
var path = require('path');
var conf = require( path.join(__dirname, '..', 'conf', 'dev', 'test.json') );

ec2.list(conf.ec2, function( err, data ){
    logger.info(arguments);
});

