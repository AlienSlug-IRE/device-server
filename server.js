var options = {
    user: 'admin',
    pass: 'vIxqCgBAVsiI'
};

var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    port = 3000,
    bodyParser = require('body-parser'),
    server = app.listen(port),
    request = require('request'),
    io = require('socket.io').listen(server);
// mongoose.connect('mongodb://localhost/ecomm_database');
mongoose.connect('mongodb://localhost/ubd', options);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.set('views', __dirname + '/views');
app.set('css', __dirname + '/public/css');
app.set('fonts', __dirname + '/public/fonts');
app.set('imgs', __dirname + '/public/img');
app.set('js', __dirname + '/public/js');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://192.168.1.9:9000");
    res.header("Access-Control-Allow-Origin", "http://localhost:9000");
    
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
});

io.on('connection', function(socket) {
    socket.on('subscribe', function(data) { 
        console.log('Device', data.channel, 'connected');
        io.emit('subscribe', { device: data.channel });
        socket.channel = data.channel;
        socket.join(data.channel); 
        request({
            uri: 'http://localhost:3000/api/device/' + socket.channel,
            method: 'put',
            timeout: 2000,
            strictSSL: false,
            json: {
                active: true,
            }
        }, function(err, res, body) {});
    })
    socket.on('unsubscribe', function(data) { 
        io.emit('unsubscribe', { device: data.channel });
        socket.join(data.channel); 
    })
    socket.on('trigger', function(data) { 
        io.emit('trigger', { device: data });
        console.log('Device Trigger', data);
    });
    socket.on('report', function(data) { 
        io.emit('report', { device: data });
        console.log('Device Report', data);
    });
    socket.on('disconnect', function(){
        console.log('Device',  socket.channel ,'lost');
        io.emit('disconnect', { device: socket.channel });
        request({
            uri: 'http://localhost:3000/api/device/' + socket.channel,
            method: 'put',
            timeout: 2000,
            strictSSL: false,
            json: {
                active: false,
            }
        }, function(err, res, body) {});
    });
});

var routes = require('./routes')(app, mongoose, io);
console.log("API Server " + port);


