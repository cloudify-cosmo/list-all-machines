/**
 * Created by liron on 1/4/15.
 */

var logger = require('log4js').getLogger('historyManager');

/** @constructor */

module.exports = function HistoryManager() {

    var elasticsearch = require('elasticsearch');

    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace'
    });

    this.saveHistory = function (wrappedResult) {

        /** mapping data: the properties hash is an object (wrappedResult json) */
        var body = {
            alert: {

                properties: {
                    total: {"type": "long"},
                    type: {"type": "string"},
                    description: {"type": "string"},
                    details: {"type": "string"}

                }

            }
        };

        client.indices.putMapping({index: "alerts", type: "alert", body: body}, function (error, response) {
            logger.info('putMapping ended well ',  response);
            if(!!error){
                logger.error('putMapping failed ' + error.getMessage());
            }
        });

        client.index({
            index: 'alerts',
            type: 'alert',
            body: wrappedResult,
            _timestamp: {
                "enabled": "true",
                "store": "yes",
                "format": "YYYY-MM-dd"
            }
        }, function (error, response) {
            logger.info('index ended well ',  response);
            if(!!error){
                logger.error('indexing failed ' + error.getMessage());
            }
        });


    };


    this.search = function (cloudType) {

        client.search({
            index: 'alerts',
            q: 'type :' + cloudType
        }).then(function (resp) {
            logger.info('search ended well ',  resp);
        });
    };

    this.clearAllHistory = function () {

        logger.info('clearing cache and all history!');
        client.indices.flush(true, function (error, response) {
            console.log(response);
            client.indices.clearCache(function (error, response) {
                console.log(response);
            });
        });

    };

};