#! /usr/bin/env node

'use strict';
var program = require('commander');
var logger = require('log4js').getLogger('cli');

var listAllMachines = require('./../lib/list-all-machines');


var command = process.argv[process.argv.length-1];



switch( command ){
    case 'list' : {
        program
            .version(require('./../package').version)
            .option('-f, --file [file]', 'The configuration file', 'conf/dev/me.json')
            .parse(process.argv);

        var configFile =  program.file || process.env.CONFIG_FILE ;
        listAllMachines.list(require(configFile), function(err, report){
            if ( !!err ){
                logger.error(err);
                process.exit(1);

            }
            logger.info( JSON.stringify(report, {},4 ) );
        });
        break;
    }
    default: {
        console.log('usage: list-all-machines [options] [command : list]');
    }
}

