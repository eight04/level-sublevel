

var pull = require('pull-stream')
var defer = require('pull-defer/source')
// Currently this uses pull streams,
// and not levelup's readstream, but in theory
// I should be able pretty much just drop that in.

module.exports = function pullReadStream (options, makeData) {
  var stream = defer()

  stream.setIterator = function (iterator) {
    stream.resolve(function (end, cb) {
      if(!end) iterator.next(function (err, key, value) {
                if(err) return cb(err)
                if(key === undefined || value === undefined)
                        return cb(true)
                cb(null, makeData(key, value))
      })
      else
        iterator.end(cb)
    })
  }

  return stream
}
