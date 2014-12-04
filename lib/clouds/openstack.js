/**
 * Created by liron on 12/3/14.
 */
var pkgcloud = require('pkgcloud');
var _ = require('lodash');

exports.list= function( config, callback ) {


    var openstack = pkgcloud.compute.createClient(_.merge( { provider: 'openstack' }, config));
    openstack.getServers( function(err, servers){
        console.error('unable',err);
        callback(err, _.map(servers, function(s){ return { 'id' : s.id, 'description' : s.name }; }));

    } );

};

