var express = require('express');
var router = express.Router();

var Trace = require('../models/trace')


/* GET home page. */
router.get('/', function(req, res, next) {
  Trace.find(function (err, traces) {
    if (err) return console.error(err);
    res.render('index', {
      title: 'DIP Admin Dashboard'
    , traces: traces
    });
    console.log(require('util').inspect(traces, { depth: null }));
  })
});

module.exports = router;
