var _ = require('lodash');
var util = require('util');
var async = require('async'); // to help search on all regions
var pkgcloud = require('pkgcloud');

var regions = ['ap-northeast-1', 'ap-southeast-1', 'ap-southeast-2', 'eu-central-1  ', 'eu-west-1     ', 'sa-east-1     ', 'us-east-1     ', 'us-west-1     ', 'us-west-2     '];



function listServersForRegion( config, result ){
    return function( callback ){
        var amazon = pkgcloud.compute.createClient({
            provider: 'amazon',
            key: config.secretAccessKey,
            keyId: config.accessKeyId,
            region: config.region
        });




        amazon.getServers(function (err, servers) {
            if ( !!err ){
                callback(err);
                return;
            }
            debugger;
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
                return { 'id': inst.id, 'description': description, 'region': config.region, 'status' : inst.status };
            });
            result.instances = result.instances.concat(_.filter(instances, {'status' : 'RUNNING'}));
            callback();
        });
    };
}


exports.list = function (config, callback) {

    delete config.region; // backward compatibility.
    var result = { instances : [] };
    var funcs = _.map(regions, function(region){
          return listServersForRegion(_.merge({ 'region' : region.trim() }, config), result );
    });

    async.waterfall(
        funcs,
        function( error ){
           callback(error,result.instances);
        }
    );
};