var logger = require('log4js').getLogger('rackspace');
var rackspace = require('../lib/clouds/rackspace');
var path = require('path');
var conf = require( path.join(__dirname, '..', 'conf', 'dev', 'test.json') );

rackspace.list(conf.rackspace, function( err, data ){
    logger.info(arguments);
});

