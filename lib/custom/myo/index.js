var Myo = require('myo');
window.Myo = Myo;

require('./plugins/flex');
require('./plugins/snap');
require('./plugins/orientation');

module.exports = Myo;
