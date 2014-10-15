/*
 * 
 * user/repo
 *
 * Copyright (c) 2014 
 * Licensed under the MIT license.
 */

'use strict';

var clouds = require('./clouds');
var logger = require('log4js').getLogger('list-all-machines');
var _ = require('lodash');
var async = require('async');

var results = [];

function listForAccount( account ){
    return function listImpl( callback ){
        if ( !clouds.hasOwnProperty(account.type)){
            throw new Error('unsupported account type [' + account.type + '] for ' + account.description );
        }
        clouds[account.type].list( account , function( err , result ){
            if ( !!err ){
                logger.error('unable to list machines for ', account.description );
                callback(err);
            }

            results.push( { 'total' : result.length, 'account' : account.description, 'details' : result } );
            callback();
        });
    };

}

exports.list = function( config, callback ) {

    var tasks = [];

    _.each(config.accounts, function(account){
        tasks.push( listForAccount( account ));
    });

    async.parallel(
        tasks,
        function( err ){
            if ( !!err ){
                callback(err);
                return;
            }
            var summary = _.map( results, function(r){ return { 'account' : r.account , 'total' : r.total }; });
            callback(err, { 'summary' : summary, 'details' : results } );

        }
    );


};
