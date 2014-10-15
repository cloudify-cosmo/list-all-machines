var AWS = require('aws-sdk');
var _ = require('lodash');
//var logger = require('log4js').getLogger('terminateMachines');

var ec2=null;




exports.list = function( config, callback ){

    ec2 = new AWS.EC2(config);

    ec2.describeInstances({}, function processList( err, data ){


        var instances = [];
        // filter those who have tag Name with Value ec2blu*
        _.each(data.Reservations, function(item){
            instances = instances.concat(item.Instances);
        });

        instances = _.map(instances,function(inst){
            var description = 'unavailable descritpion';
            try{
                description = _.find(inst.Tags, {'Key' : 'Name'}).Value;
            }catch(e){ /** ignore errors **/  }
            return { 'id' : inst.InstanceId, 'description' : description };
        });
        callback(null, instances);
    } );
};