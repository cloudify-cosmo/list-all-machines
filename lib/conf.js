
var _ = require('lodash');
exports.initialize = function( fileOrObject ){
    if ( typeof(fileOrObject) === 'string' ){ // this is file
        _.merge(exports, require(process.env.CONFIG_FILE));
    }else{ // this is an object
        _.merge(exports, fileOrObject);
    }
};

