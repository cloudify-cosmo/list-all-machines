/**
 * Created by liron on 12/3/14.
 */

var logger = require('log4js').getLogger('openstck');
var openstack = require('../lib/clouds/openstack');
var path = require('path');
var conf = require( path.join(__dirname, '..', 'conf', 'dev', 'test.json') );

openstack.list(conf.openstack, function( err, data ){
    logger.info(arguments);
});