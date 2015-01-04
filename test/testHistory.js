/**
 * Created by liron on 1/4/15.
 */
'use strict';
//var assert = require('assert'),
    //listAllMachines = require('../lib/list-all-machines.js');
var HistoryManager = require('../lib/historyManager');

/*var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});*/

var historyMgmt = new HistoryManager();

/*var arg = {
    "name" : "liron",
    "age" : "26"
}*/
//historyMgmt.saveHistory(arg);

var result = "11";

var account = {
    "type" : "openstack",
    "description" : "my openstack account"
};
var wrappedResult = { 'total' : result.length, 'type' : account.type, 'account' : account.description, 'details' : result };

historyMgmt.saveHistory(wrappedResult);

historyMgmt.search('openstack');

//historyMgmt.clearAllHistory();

/*client.search({
    index: 'myindex',
    q: 'title:test'
}, function (error, response) {
    // ...
});*/

/*describe('list-all-machines node module.', function() {
    it('should have a list function', function() {
        //assert( typeof(listAllMachines.list), 'function');
        listAllMachines.es(client);
    });
});*/
