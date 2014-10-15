var logger = require('log4js').getLogger('list-all-machines');
var listAll = require('../lib/list-all-machines');
var path = require('path');
var conf = require( path.join(__dirname, '..', 'conf', 'dev', 'test.json') );


listAll.list( conf.listAll , function callback( err, result ){
   logger.info(JSON.stringify(result, {} ,4));
});