#!/usr/bin/env node
'use strict';

//var UP_LINE = "\\033[1A";
//var DELETE_LINE = "\\033[K";

var meow = require('meow');
var mcperadar = require('./');
var cli = meow({
  help: [
    'Usage',
    '  mcperadar',
    ''
  ].join('\n')
});
console.log(cli.input); // This is just to pass tests for now

var clients = {};

setInterval(function(){
  for(var clientId in clients){
    if(clients.hasOwnProperty(clientId) && clients[clientId] != null){
      if(clients[clientId].updateTime+1500 < new Date().getTime()){
        if(cli.flags.format === "log") {
          console.log(clientId + " has been timed out.");
        }
        clients[clientId] = null;
      }
    }
  }
}, 500);

mcperadar.on("connect", function(data){
  console.log("Connected " + data.clientId);
});
mcperadar.on("reconnect", function(data){
  console.log("Reconnected " + data.clientId);
});
mcperadar.on("discover", function(data){
  console.log("Discovered " + data.clientId);
});
mcperadar.on("disconnect", function(data){
  console.log("Disconnected " + data.clientId);
});

