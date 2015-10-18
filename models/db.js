var setting = require('../settings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(setting.db,new Server(setting.host,setting.port, {}), {safe: true});
