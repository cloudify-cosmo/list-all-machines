var logger = require('log4js').getLogger('hp');
var hp = require('../lib/clouds/hp');
var path = require('path');
var conf = require( path.join(__dirname, '..', 'conf', 'dev', 'test.json') );

hp.list(conf.hp, function( err, data ){
    logger.info(arguments);
});

