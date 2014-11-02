/*global require, module, __dirname */
/*jslint node: true */
'use strict';

(function () {
    var express = require('express')(),
        bindUsTogether = require('http').Server(express),
        io = require('socket.io')(bindUsTogether),
    socket = io('http://localhost');

    socket.on('connection', function (socket) {
        socket.on('chat message', function (msg) {
            socket.emit('chat message', msg);
        });
    });

}());