module.exports = PingProbe;

var PingProbe = function(options) {
  this.probeType = 'ping';
  this._options = options;
  this._status = 'stopped';
  return this;
};

PingProbe.prototype.start = function() {

};

PingProbe.prototype.stop = function() {

};

PingProbe.prototype.ping = function() {

};
