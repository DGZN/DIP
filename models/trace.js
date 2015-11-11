var mongoose = require('mongoose');

var Trace = mongoose.model('Trace', {
  dip_id: String
, client_id: String
, asset: {
    name: String
  , size: String
  },
  trace: {
    error: String
  , status: String
  , message: String
  , code: String
}
});

module.exports = Trace;
