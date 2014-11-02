var pkgcloud = require('pkgcloud');
var _ = require('lodash');
var async = require('async');


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

function listMachinesForProject( config, project, result  ){

    return function(callback) {
        var hp = pkgcloud.compute.createClient(_.merge({ provider: 'hp' }, config));
        hp.getServers(function (err, servers) {
            if ( !!err ){
                callback(err);
                return;

            }else{
                var foundServers = _.map(servers, function (server) {
                    return { 'id': server.id, 'description': server.name, 'project': project };
                });
                result.instances = result.instances.concat(foundServers);
                callback();
            }

        });
    };
}

exports.list= function( config, callback ) {
    var result = { instances : [] };

    var funcs = [];

    if ( !!config.projects ){
        _.each( config.projects, function(project){
            funcs.push( listMachinesForProject(_.merge({ 'tenantId' : project.id }, config ) , project,  result) );
        } );
    } else {
        funcs.push(listMachinesForProject( config, {}, result ));
    }


    async.waterfall(funcs, function( error ) { callback( error, result.instances ); });

};
