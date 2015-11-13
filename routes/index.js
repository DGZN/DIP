var express = require('express');
var router = express.Router();

var Trace = require('../models/trace')


/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.sendfile(__dirname + '/public/admin/');
});

router.get('/admin/dashboard', function(req, res, next) {
  res.sendfile(__dirname + '/public/admin/dashboard.html');
});

module.exports = router;
