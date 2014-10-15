var pkgcloud = require('pkgcloud');
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

    var hp = pkgcloud.compute.createClient(_.merge( { provider: 'hp' }, config));

    hp.getServers( function(err, servers){
        callback( err, _.map(servers, function(server){ return { 'id' : server.id, 'description' : server.name };  }));
    } );

};
