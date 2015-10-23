var $ = require('jquery');

// Set jQuery on global where it is accessed in the next module
window.jQuery = $;

require('./blockrain.jquery.js');
$('.game').blockrain();
