var conf = require('../lib/conf');

var logger = require('log4js').getLogger('SendAlert');

var Client = require('node-rest-client').Client;
var client = new Client();
var url = "https://api.flowdock.com/v1/messages/chat/";


exports.send = function(streamId, message , callback){
    var args = {
        data: { content: message,
            "external_user_name":"Alert" },
        headers:{"Content-Type": "application/json"}
    };

    try {
        client.post(url + streamId, args, function () {
            callback(null);
        });
    }catch(e){
        callback(e);
    }


};




