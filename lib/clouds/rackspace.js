var pkgcloud = require('pkgcloud');
var _ = require('lodash');


/**
 *
 * @callback ListRackspaceCallback
 *
 * @param {object} config
 * @param {string} config.username
 * @param {string} config.apiKey
 * @param {string} config.region
 * @param {string} config.authUrl

 * @param {ListRackspaceCallback} callback
 */

exports.list= function( config, callback ) {


    var rackspace = pkgcloud.compute.createClient(_.merge( { provider: 'rackspace' }, config));
    rackspace.getServers( function(err, servers){
        callback(err, _.map(servers, function(s){ return { 'id' : s.id, 'description' : s.name }; }));
//        callback( err, _.map(servers, function(server){ return { 'id' : server.id, 'description' : server.name } }))
    } );
//
};
