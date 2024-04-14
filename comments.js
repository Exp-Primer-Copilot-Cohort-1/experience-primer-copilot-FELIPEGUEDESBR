// Create Web Server

// Load required modules
var http = require('http'); // http server core module
var fs = require('fs'); // file system core module
var path = require('path');
var url = require('url');
var qs = require('querystring');
var comments = require('./comments.json');

// Create http server
var server = http.createServer(function (req, res) {
    // Add headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Set the response type to JSON
    res.setHeader('Content-Type', 'application/json');

    // Parse the URL
    var url_parts = url.parse(req.url);

    // Check the request method
    switch (req.method) {
        case 'GET':
            if (url_parts.pathname === '/comments') {
                res.end(JSON.stringify(comments));
            } else {
                res.end('Invalid endpoint');
            }
            break;
        case 'POST':
            if (url_parts.pathname === '/comments') {
                var body = '';
                req.on('data', function (data) {
                    body += data;
                });
                req.on('end', function () {
                    var newComment = qs.parse(body);
                    comments.push(newComment);
                    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function (err) {
                        if (err) {
                            res.end('Error saving comment');
                        } else {
                            res.end('Comment saved');
                        }
                    });
                });
            } else {
                res.end('Invalid endpoint');
            }
            break;
        case 'OPTIONS':
            res.end();
            break;
        default:
            res.end('Invalid request method');
    }
});

// Start the server
server.listen(3000, function () {
    console.log('Server running at http://