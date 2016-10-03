'use strict';

var https = require('https');
var bodyParser = require("body-parser"),
    logs=[],
    pretty = require("js-object-pretty-print").pretty,
    eventFlowStatus = {jobs:{}, //  { uuid<int>: { sent: int,  total: int}}
                           incomingevents : {},   // { channel<string>: receivedlastsecond, receivedthissecond,receivedtotal}
                           outstanding:0,   // overall throttler, only posts events if less than limit responses outstanding.   limits memory usage.
                           limit : 10000
                         };
                         ;

//////////////////////////////
// Requires
//////////////////////////////
const express = require('express');

const path = require('path');

const appEnv = require('./lib/env');
const renderer = require('./lib/render');

var subscribermessages=[];

//////////////////////////////
// App Variables
//////////////////////////////
const app = express();

app.use(express.static(__dirname+ '/html'));
//////////////////////////////
// UBX
/////////////////////////////


app.post("/regpubwithubx", bodyParser(), function (req,res) {
    var     subscriber = {
    	"providerName": "IBM",
    	"name": "Endpoint 2 for Node.js",
    	"description": "UBX Endpoint for Node.js 2",
    	"endpointTypes": {
    		"event": {
    			"source": {
    				"enabled": false
    			},
    			"destination": {
    				"url": appEnv.url + "/subscriber",
    				"enabled": true,
    				"destinationType": "push"
    			}
    		}
    	}
    };

    var jsonObject = JSON.stringify(subscriber);
    console.log("HOST" + appEnv.url);
    console.log(jsonObject);
    var authkey = req.body.endpointtext;
    console.log("Authkey " + authkey);

    var postheaders = {
    'Content-Type' : 'application/json',
    'Authorization' : "Bearer " + authkey
    };

    console.log("Headers " + JSON.stringify(postheaders))

    var optionspost = {
    host : 'api-01.ubx.ibmmarketingcloud.com',
    port : 443,
    path : '/v1/endpoint',
    method : 'PUT',
    headers : postheaders
    };


    // do the POST call
var reqPost = https.request(optionspost, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
    console.log("headers: ", res.headers);

    res.on('data', function(d) {
        console.info('POST result:\n');
        process.stdout.write(d);
        console.info('\n\nPOST completed');
        });
    });

    // write the json data
    reqPost.write(jsonObject);
    reqPost.end();
    reqPost.on('error', function(e) {
        console.error(e);
    });


});


app.post("/subscriber/v1/events",  bodyParser(), function (req,res) {
    var data= req.body;
    //log(">>>>> Event received from UBX at /subscriber/v1/events." + pretty(data,2,"PRINT",true));
    if (subscribermessages.length > 50) {  /// keep only last
        subscribermessages = [];
    }
    subscribermessages.push(pretty(data,2,"PRINT",true));
    try {
        eventFlowStatus.incomingevents[data.channel].receivedthissecond++;
        eventFlowStatus.incomingevents[data.channel].receivedtotal++;
    } catch (e) {
        eventFlowStatus.incomingevents[data.channel]= {receivedpersecond : 1, receivedtotal:1}
    }
    res.status(200).send(true);
});

app.use("/getevents",  bodyParser(), function (req,res) {
    res.status(200).send(pretty(subscribermessages,2,"PRINT",true));
//    subscribermessages=[];
});

app.use("/getNBevents",  bodyParser(), function (req,res) {
    res.status(200).send(pretty(subscribermessages.length,2,"PRINT",true));
//    subscribermessages=[];
});

function log(x) {
//    logs.push(x); // bloats memory!
    console.log(x);
}

//////////////////////////////
// Start the server
//////////////////////////////
app.listen(appEnv.port, () => {
  // Mean to console.log out, so disabling
  console.log(`Server starting on ${appEnv.url}`); // eslint-disable-line no-console
});
