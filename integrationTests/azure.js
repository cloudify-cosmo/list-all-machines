var logger = require('log4js').getLogger('azure');
var azure = require('../lib/clouds/azure');
var path = require('path');
var conf = require( path.join(__dirname, '..', 'conf', 'dev', 'test.json') );

azure.list(conf.azure, function( err, data ){
    logger.info(arguments);
});

