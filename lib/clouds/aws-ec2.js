var _ = require('lodash');
var logger = require('log4js').getLogger('list-aws-ec2');
var util = require('util');
var pkgcloud = require('pkgcloud');

exports.list = function (config, callback) {


    var amazon = pkgcloud.compute.createClient({
        provider: 'amazon',
        key: config.secretAccessKey,
        keyId: config.accessKeyId
    });


    amazon.getServers(function (err, servers) {
        if ( !!err ){
            callback(err);
            return;
        }
        var instances = _.map(servers, function (inst) {
            var description = 'unavailable description';
            try {
                var tags = inst.amazon.tagSet.item;
                if (util.isArray(tags)) {
                    description = _.find(tags, {'key': 'Name'}).value;
                } else {
                    description = tags.value;
                }

            } catch (e) {
                /** ignore errors **/
            }
            return { 'id': inst.id, 'description': description };
        });
        callback(null, instances);
    });

};