/*global describe,it*/
'use strict';
var assert = require('assert'),
  listAllMachines = require('../lib/list-all-machines.js');

describe('list-all-machines node module.', function() {
  it('should have a list function', function() {
    assert( typeof(listAllMachines.list), 'function');
  });
});
