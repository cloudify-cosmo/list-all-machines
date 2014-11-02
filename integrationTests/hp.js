var logger = require('log4js').getLogger('hp');
var hp = require('../lib/clouds/hp');
var path = require('path');
var conf = require( path.join(__dirname, '..', 'conf', 'dev', 'test.json') );

hp.list(conf.hp, function( err, data ){
    console.log('running the test');
    logger.info('and this is the final result', err, JSON.stringify(data, {}, 4));
});

