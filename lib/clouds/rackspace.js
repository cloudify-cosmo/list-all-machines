var pkgcloud = require('pkgcloud');
var logger = require('log4js').getLogger('rackspace');
var _ = require('lodash');


/**
 *
 * @param config
 *
 * {
 *      'username' : __username__,
 *      'apiKey' : __apiKey__,
 *      'region' : __region__,
 *      'authUrl' : __authUrl__
 * }
 *
 * @param callback
 */

exports.list= function( config, callback ) {


    var rackspace = pkgcloud.compute.createClient(_.merge( { provider: 'rackspace' }, config));
    rackspace.getServers( function(err, servers){
        logger.info('rackspace servers', servers);
        callback(err, _.map(servers, function(s){ return { 'id' : s.id, 'description' : s.name }; }));
//        callback( err, _.map(servers, function(server){ return { 'id' : server.id, 'description' : server.name } }))
    } );
//
};
