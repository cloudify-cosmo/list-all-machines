var util = require('util');
var _ = require('lodash');
var logger = require('log4js').getLogger('softlayer');
var http = require('https');


/**
 *
 * @param config
 *
 * {
 *      'apiKey' : __apiKey__,
 *      'apiSecretKey' : __apiSecretKey__
 * }
 *
 * @param callback
 *
 * the function to call when I am done
 *
 * @returns list of machines on softlayer
 * [ { ''id' : __id__ , 'description' : __description } , ... ]
 *
 */



exports.list = function (config, callback) {
    var url = util.format('https://%s:%s@api.softlayer.com/rest/v3/SoftLayer_Account/VirtualGuests.json',config.apiKey, config.apiSecretKey);
    http.get(url, function (res) {
        var datas = [];

        res.on('data', function (data) {
            datas.push(data.toString());
        });

        res.on('end', function () {
            var data = JSON.parse(datas.join(''));
            callback(null,  _.map(data, function(item){ return { 'id': item.id, 'description' : item.hostname }; }));
        });
    }).on('error', function (e) {
        logger.error("Got error: " + e.message);
        callback(e);
        return;
    });
};