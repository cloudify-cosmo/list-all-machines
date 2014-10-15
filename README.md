#  [![Build Status](https://travis-ci.org/guy-mograbi-at-gigaspaces/list-all-machines.svg?branch=master)](http://travis-ci.org/guy-mograbi-at-gigaspaces/list-all-machines)

> Lists machines on the cloud



## Getting Started

Install the module with: `npm install list-all-machines`

```js
var list-all-machines = require('list-all-machines');
list-all-machines.list(config, function callback(err, result) { ... } );
```

Install with cli command

```sh
$ npm install -g "https://github.com/guy-mograbi-at-gigaspaces/list-all-machines.git"
$ list-all-machines --help list
$ list-all-machines --version list
$ list-all-machines --file /path/to/configuration/file.json list
```




## Documentation

This command line requires a lot of configuration.

Here is a small documentation to how this configuration file should look like.


```json
{
    "accounts": [
        {
            "type": "ec2",
            "description": "my ec2 account",
            "accessKeyId": "the access key",
            "secretAccessKey": "the secret access key",
            "region": "the region code : http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html"
        },
        {
            "type": "softlayer",
            "description": "my softlayer account",
            "apiKey": "usually the username",
            "apiSecretKey": "the api key"
        },
        {
            "type": "hp",
            "description": "my hp account",
            "username": "NOT USERNAME - it is the API ID!!",
            "tenantId": "NOT TENANT ID!! - it is the project ID - really long number",
            "apiKey": "the secret api key",
            "region": "looks like : region-a.geo-1. this link might be helpful : https://docs.hpcloud.com/api/compute#3.2RegionsandAvailabilityZones",
            "authUrl": "must be (limitation of the library we are using): https://region-a.geo-1.identity.hpcloudsvc.com:35357/"

        },
        {
            "type": "rackspace",
            "description" : "my rackspace account",
            "username": "the username",
            "apiKey": "the api key",
            "region": "3 letters (DFW,ORD..) full list at : http://www.rackspace.com/knowledge_center/article/about-regions "

        },
        {
            "type" : "azure",
            "description" : "my azure account",
            "subscriptionId" : "the subscription ID",
            "key" : "the .key file. to create new one see : https://github.com/pkgcloud/pkgcloud/blob/master/docs/providers/azure.md#azure-manage-cert ",
            "cert" : "the .pem file. to create new one see : https://github.com/pkgcloud/pkgcloud/blob/master/docs/providers/azure.md#azure-manage-cert"

        }
    ]
}
```


## Examples

The output example looks like so

```json

   {
       "summary" : [ // total counts of machines detected per account
            {
                "account" : the account's description
                "total" : number of machines detected
            },
            ... more accounts
       ],

       "details" : [
          {
              "total" : the total again,
              "account" : the account's description,
              "details" : [
                    {
                        "id" : machine's ID,
                        "description" : a description of the machine. usually its name.
                    },
                    ... more machines
              ]
          },
          ... more accounts
       ]

   }

```


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com).


## License

Copyright (c) 2014   
Licensed under the MIT license.
