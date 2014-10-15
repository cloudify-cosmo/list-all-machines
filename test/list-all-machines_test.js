/*global describe,it*/
'use strict';
var assert = require('assert'),
  listAllMachines = require('../lib/list-all-machines.js');

describe('list-all-machines node module.', function() {
  it('must be awesome', function() {
    assert( listAllMachines.awesome(), 'awesome');
  });
});
