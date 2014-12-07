/**
 * Created by liron on 12/3/14.
 */
var pkgcloud = require('pkgcloud');
var logger = require('log4js').getLogger('openstack');
var _ = require('lodash');

exports.list= function( config, callback ) {


    var openstack = pkgcloud.compute.createClient(_.merge( { provider: 'openstack' }, config));
    openstack.getServers( function(err, servers){
        if ( !!err ) {
            logger.error('unable to get machines for openstack', err);
            callback(err);
            return;
        }
        callback(err, _.map(servers, function(s){ return { 'id' : s.id, 'description' : s.name }; }));



    } );

};

