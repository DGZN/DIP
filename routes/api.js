var express = require('express');
var router = express.Router();

var Trace = require('../models/trace')


router.get('/', function(req, res, next) {
  res.json({
    'ref': '/'
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
    , 'payload': req.body
    });
  });

});

module.exports = router;
