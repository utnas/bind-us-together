/*global require, module, __dirname */
/*jslint node: true */
'use strict';
(function () {
    var express = require('express')();
    var bindUsTogether = require('http').Server(express);
    var io = require('socket.io')(bindUsTogether);

    express.get('/', function (req, res) {
        res.sendfile('index.html');
    });

    io.on('connection', function (socket) {
        socket.on('chat message', function (msg) {
            io.emit('chat message', msg);
        });
    });

    bindUsTogether.listen(3000, function () {
        console.log('Server starting on port %d', bindUsTogether.address().port);
    });
}());