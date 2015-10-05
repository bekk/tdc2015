var st = require('st');
var http = require('http');
var appManager = require('./lib/apps');
var views = require('./lib/views');
var st = require('st');

var merge = require('merge-stream');
var through = require('through2');

var build = require('./tasks/build');
var less = require('./tasks/less');

const PORT = process.env.PORT || 8000;

var mount = st({ path: __dirname + '/public', url: '/' });

function shouldMount (name, apps) {
  if (name === '') return false;
  if (name === 'load-apps') return false;
  if (appManager.isApp(name, apps)) return false;
  return true;
}

function startServer (apps) {
  console.log('Serving Apps:');
  console.log(apps);

  http.createServer(function(req, res) {
    var name = req.url.substring(1);
    if (shouldMount(name, apps)) {
      return mount(req, res);
    }

    if (name === 'load-apps') {
      return reloadApps(function (newApps) {
        apps = newApps;
        res.end('Apps loaded');
      });
    }

    res.writeHeader(200, {'Content-Type': 'text/html'});

    if (name === '') {
      // Home page
      return res.end(views.home(apps));
    }

    var app = appManager.findApp(name, apps);
    return res.end(views.app(app));
  }).listen(PORT);

  console.log('Starting server at http://localhost:' + PORT);
}

reloadApps(startServer);

function reloadApps (cb) {
  return appManager.retrieve(function (newApps) {
    console.log('Building apps:', newApps);
    merge(
      build(newApps),
      less(newApps)
    ).pipe(through.obj(null, cb.bind(null, newApps)));
  });
}
