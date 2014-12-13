module.exports = function(app, mongoose) {        /*
		******************************************************************************
		Device CRUD
		******************************************************************************
	*/
    var getAllDevices = function(cb) {
        return DeviceModel.find({}, function(err, devices) {
            return cb(err, devices);
        });
    };
    var getDevice = function(cb, id) {
        return DeviceModel.findById(id, function(err, device) {
            return cb(err, device);
        });
    };

    var async = require('async');
    var DeviceModel = mongoose.model('Device', require('../models/device')(mongoose));
    app.post('/api/device', function(req, res, next) {
        var device = new DeviceModel({
            name: req.body.name
        });
        device.save(function(err) {
            if (!err) {
                return res.send({
                    success: true,
                    device: device
                });
            } else {
                return res.send({
                    success: false
                });
            }
        });
    });
    app.get('/api/device', function(req, res, next) {
        getAllDevices(function(err, results) {
            if (!err) {
                return res.send({
                    success: true,
                    devices: results
                });
            } else {
                return res.send({
                    success: false
                });
            }
        });
    });
    app.get('/api/device/:id', function(req, res, next) {
        getDevice(function(err, device) {
            if (!err) {
                return res.send({
                    success: true,
                    device: device
                });
            } else {
                return res.send({
                    success: false
                });
            }
        }, req.params.id);
    });
    app.delete('/api/device/:id', function(req, res, next) {
        return DeviceModel.findById(req.params.id, function(err, device) {
            return device.remove(function(err) {
                if (!err) {
                    return res.send({
                        success: true
                    });
                } else {
                    return res.send({
                        success: false
                    });
                }
            });
        });
    });
    app.put('/api/device/:id', function(req, res, next) {
        return DeviceModel.findById(req.params.id, function(err, device) {
            var body = ['active', 'name', 'settings', 'config', 'supports'];
            for (var i in body) {
                if (req.body[body[i]] !== undefined) {
                    device[body[i]] = req.body[body[i]];
                }
            }
            device.save(function(err) {
                getDevice(function(err, results) {
                    if (!err) {
                        return res.send({
                            success: true,
                            data: results
                        });
                    } else {
                        return res.send({
                            success: false
                        });
                    }
                }, req.params.id);
            });

        });
    });
    /*
		******************************************************************************
		IO CRUD
		******************************************************************************
	*/
    var IOModel = mongoose.model('IO', require('../models/io')(mongoose));
    app.post('/api/io', function(req, res, next) {
        var obj = {};
        var body = ['name', 'type', 'settings', 'mode'];
        for (var i in body) {
            if (req.body[body[i]] !== undefined) {
                obj[body[i]] = req.body[body[i]];
            }
        }
        var io = new IOModel(obj);
        io.save(function(err) {
            if (!err) {
                return res.send({
                    success: true,
                    io: io
                });
            } else {
                return res.send({
                    success: false
                });
            }
        });
    });
    app.get('/api/io', function(req, res, next) {
        return IOModel.find({}, function(err, results) {
            if (!err) {
                return res.send({
                    success: true,
                    ios: results
                });
            } else {
                return res.send({
                    success: false
                });
            }
        });
    });
    app.get('/api/io/:id', function(req, res, next) {
        return IOModel.findById(req.params.id, function(err, io) {
            if (!err) {
                return res.send({
                    success: true,
                    io: io
                });
            } else {
                return res.send({
                    success: false
                });
            }
        });
    });
    app.delete('/api/io/:id', function(req, res, next) {
        return IOModel.findById(req.params.id, function(err, io) {
            return io.remove(function(err) {
                if (!err) {
                    return res.send({
                        success: true
                    });
                } else {
                    return res.send({
                        success: false
                    });
                }
            });
        });
    });
    app.put('/api/io/:id', function(req, res, next) {
        return IOModel.findById(req.params.id, function(err, io) {
            var body = ['name', 'type', 'settings', 'mode'];
            for (var i in body) {
                if (req.body[body[i]] !== undefined) {
                    io[body[i]] = req.body[body[i]];
                }
            }
            return io.save(function(err) {
                if (!err) {
                    return res.send({
                        success: true,
                        io: io
                    });
                } else {
                    return res.send({
                        success: false
                    });
                }
            });
        });
    });
    /*
		******************************************************************************
		Watchers
		******************************************************************************
	*/
    /*
		******************************************************************************
		Home
		******************************************************************************
	*/
    app.get('/home', function(req, res) {
        res.render('index', {
            title: 'Home'
        });
    });
    app.get('/devices', function(req, res) {
        getAllDevices(function(err, devices) {
            res.render('devices', {
                title: 'Devices',
                devices: devices
            });
        });
    });
    app.get('/device/:id', function(req, res) {
        getDevice(function(err, results) {
            return res.render('device', results);
        }, req.params.id);
    });
};