/**
 * Created by liron on 1/4/15.
 */

var logger = require('log4js').getLogger('historyManager');
var elasticsearch = require('elasticsearch');


/**
 * @class HistoryManager
 * @description
 * handles communication to the DB.
 *
 * <pre>
 * {
        host: 'localhost:9200',
        log: 'trace'
    }
    </pre>
 *
 * after you saved reports, you can get latest 10 by new to old with the following URL
 * https://your_es_host/reports/_search?size=10&sort=timestamp:desc
 *
 *
 * @constructor
 * @param {object} conf
 * @param {object} conf.dbDetails
 * @param {string} [conf.dbDetails.host='localhost:9200']
 * @param {string} [conf.dbDetails.log='trace'] the log level
 * */

module.exports = function HistoryManager( conf ) {



    var client = new elasticsearch.Client( conf );
    logger.info('client is ready');

    this.saveReport = function(report, callback ){
        logger.info('saving');

        client.create({
            index: 'reports',
            type: 'report',
            body: report
        }, function(){
            logger.info('finished saving',arguments);
            callback.apply(null, arguments);
        });
        return this;
    };

    this.close = function(){
        try {
            client.close();
        }catch(e){}
    };


};