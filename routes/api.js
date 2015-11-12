var express = require('express');
var router = express.Router();

var Trace = require('../models/trace')


router.get('/', function(req, res, next) {
  res.json({
    'ref': '/'
  });
});

router.get('/dip/traces', function(req, res, next) {
  Trace.find(function (err, traces) {
    if (err) return console.error(err);
    res.json(traces)
  })
});

router.delete('/dip/traces/:id', function(req, res, next) {
  Trace.remove({ _id: req.params.id }, function (err, trace) {
    if (err)
      return res.json({
        status: 500
      , error: {
          message: err.message
        , errors: {
            errors: err.errors
          }
        }
      })
    Trace.find(function (err, traces) {
      if (err) return console.error(err);
      res.json(traces)
    })
  });
});

router.post('/dip/traces', function(req, res, next) {
  var trace = new Trace(req.body);
  trace.save(function (err) {
    if (err)
      return res.json({
        status: 500
      , error: {
          message: err.message
        , errors: {
            errors: err.errors
          }
        }
      })
    return res.json({
      'route': '/dip/traces'
    , 'method': req.method
    , 'payload': req.body
    });
  });

});

module.exports = router;
