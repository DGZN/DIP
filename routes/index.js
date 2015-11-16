var express = require('express');
var router = express.Router();
var Trace = require('../models/trace')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', {
    title: 'DIP Admin Dashboard'
  });
});

router.get('/menu', function(req, res, next) {
  res.render('menu', {
    title: 'DIP Admin Dashboard'
  });
});

module.exports = router;
