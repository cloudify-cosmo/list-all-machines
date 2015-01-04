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

        var expected = conf.alert.expected;

        if ( isNaN(parseInt(expected)) || !conf.alert.streamId ){
            logger.error('alert configuration incomplete', conf.alert);
            result.alertSent = 'NO: configuration incomplete [' + JSON.stringify(conf.alert) + ']';
            callback();
        }else{ // config is ok

            if ( expected >= result.total ){
                result.shouldSendAlert = false;
                callback();
                return;
            }

            var message = '@all [' + result.account + '] expected : ' + expected + ' machines to be up, but there are : ' + result.total + '. please remove redundant machines';
            sendAlert.send(conf.alert.streamId, message, function( err ){
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

//todo: continue implementing history
/*var HistoryManager = require('./historyManager');
var historyMgmt = new HistoryManager();*/


function listForAccount( account, callback ){

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

            //historyMgmt.saveHistory(wrappedResult);
        });


}

/** Description of the function
 * @typedef {function} ListCallback
 * @callback ListCallback
 * @name ListCallback
 * @function
 * @param {error} err
 */


/**
 * list all machines on all clouds cross accounts
 * @param config configuration
 * @param {ListCallback} callback
 **/


exports.list = function( config, callback ) {

    conf.initialize(config); //this is a bit strange, but supports treating this code as a library.

    async.each( conf.accounts, function(account, callback ){
            listForAccount( account, callback );
        },
        function( err ){
            if ( !!err ){
                callback(err);
                return;
            }
            var summary = _.map( results, function(r){ return { 'type' : r.type, 'account' : r.account , 'total' : r.total }; });

            var total = _.reduce(summary, function(sum , value){
                    return sum + value.total;
                },0);

            callback(err, { 'total' : total ,'timestamp' : new Date().getTime(), 'summary' : summary, 'details' : results} );


        }
    );
};