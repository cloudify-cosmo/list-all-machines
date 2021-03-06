

var pkgcloud = require('pkgcloud');
var _ = require('lodash');
var fs = require('fs');
var logger = require('log4js').getLogger('azure');
var async = require('async');

/**
 *
 * @callback ListAzureCallback
 *
 *
 *
 * @param {object} config
 * @param {string} config.subscriptionId
 * @param {string} config.key
 * @param {string} config.cert
 *
 * @param {ListAzureCallback} callback
 */

exports.list= function( config, callback ) {

    //
// Create a pkgcloud compute instance
//
    config.provider = 'azure';

    async.parallel(
        [
            function readKey( callback ){

                if ( config.key.indexOf('----') === 0 ){ // this is the certificate itself,  no need to read it..
                  callback();
                  return;
                }

                fs.readFile(config.key, function( err, data){
                    if ( !!err ){
                        callback(err);
                        return;
                    }

                    config.key = data.toString();
                    callback();
                });
            },
            function readCert( callback ){

                if ( config.cert.indexOf('----') === 0 ){
                    callback();
                    return;
                }

                fs.readFile(config.cert, function( err, data){
                    if ( !!err ){
                        callback(err);
                        return;
                    }

                    config.cert = data.toString();
                    callback();
                });
            }
        ], function actualList( err ){

            if ( !!err ){
                logger.error('unable to read files');
                callback(err);
                return;
            }

            var azure = pkgcloud.compute.createClient(config);

            azure.getServers( function(err, servers){
                callback( err, _.map(servers, function(server){ return { 'id' : server.id, 'description' : server.name }; }) );
            } );


        }
    );
//    config.key  = fs.readFileSync(config.key, 'ascii' );
//    config.cert = fs.readFileSync(config.cert, 'ascii');

//    azure = pkgcloud.compute.createClient(config);
//
//    azure.getServers( function(err, servers){
//        callback( err, _.map(servers, function(server){ return { 'id' : server.id, 'description' : server.name } }))
//    } );

};
