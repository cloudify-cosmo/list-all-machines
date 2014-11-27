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
var sendAlert = require('./SendAlert');
var _ = require('lodash');
var async = require('async');
var conf = require('./conf');

var results = [];


function doAlert( conf, result, callback ){
    if ( !!conf.alert ){
        result.alertConfigured = true;
        if ( isNaN(parseInt(conf.alert.expected)) || !conf.alert.flowdockStreamId ){
            logger.error('alert configuration incomplete', conf.alert);
            result.alertSent = 'NO: configuration incomplete [' + JSON.stringify(conf.alert) + ']';
            callback();
        }else{ // config is ok

            if ( conf.alert.exected <= result.total ){
                result.shouldSendAlert = false;
            }

            var message = '@all [' + result.account + '] expected : ' + result.expected + ' machines to be up, but there are : ' + result.total + '. please remove redundant machines';
            sendAlert.send( conf.alert.flowdockStreamId , message,  function( err ){
                if ( !!err ){
                    logger.error(err);
                    result.alertSent = 'NO: ' + err;
                }else{
                    result.alertSent = 'Yes';
                }
                callback();
            });
        }
    }else{
        callback();
    }
}


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
            var wrappedResult = { 'total' : result.length, 'type' : account.type, 'account' : account.description, 'details' : result };

            function finishTask(){
                results.push(  wrappedResult );
                callback();
            }

            doAlert( account, wrappedResult, finishTask );
        });
    };

}

exports.list = function( config, callback ) {

    conf.initialize(config); //this is a bit strange, but supports treating this code as a library.

    var tasks = [];

    _.each(conf.accounts, function(account){
        tasks.push( listForAccount( account ));
    });

    async.parallel(
        tasks,
        function( err ){
            if ( !!err ){
                callback(err);
                return;
            }
            var summary = _.map( results, function(r){ return { 'type' : r.type, 'account' : r.account , 'total' : r.total }; });
            callback(err, { 'timestamp' : new Date().getTime(), 'summary' : summary, 'details' : results } );

        }
    );


};
