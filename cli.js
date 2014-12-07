#! /usr/bin/env node

'use strict';
var program = require('commander');
var logger = require('log4js').getLogger('cli');

var listAllMachines = require('./lib/list-all-machines');


var command = process.argv[process.argv.length-1];



switch( command ){
    case 'list' : {
        program
            .version(require('./package').version)
            .option('-f, --file [file]', 'The configuration file', 'conf/dev/me.json')
            .option('-o, --output [output]', 'The output file', 'list-all-machines.output')
            .parse(process.argv);

        listAllMachines.list(require(program.file || process.env.CONFIG_FILE), function(err, report){
            if ( !!err ){
                logger.error(err);
                process.exit(1);

            }
            var output = require('path').resolve(program.output);
            logger.info('writing output to [', output ,']');
            require('fs').writeFile(output, JSON.stringify(report, {},4 ) );
        });
        break;
    }
    default: {
        console.log('usage: list-all-machines [options] [command : list]');
    }
}

