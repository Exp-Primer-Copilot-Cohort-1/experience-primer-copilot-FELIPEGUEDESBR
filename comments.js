// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');

// Create server
http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    // If path is /, render index.html
    if (pathname === '/') {
        fs.readFile('index.html', 'utf8', function (err, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(data);
        });
    }

    // If path is /comments, render comments.json
    else if (pathname === '/comments') {
        fs.readFile('comments.json', 'utf8', function (err, data) {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(data);
        });
    }

    // If path is /new_comment, add new comment to comments.json
    else if (pathname === '/new_comment') {
        var body = '';
        request.on('data', function (data)