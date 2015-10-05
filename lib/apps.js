var path = require('path');
var through = require('through2');
var fs = require('vinyl-fs');


function retrieveApps (cb) {
  var root = path.join(__dirname, '..', 'apps', '*', 'package.json');
  var packages = [];
  return fs.src(root).pipe(through.obj(function (file, enc, callback) {
    var root = path.dirname(file.relative);
    var data = JSON.parse(file.contents.toString('utf-8'));

    var myPackage = {
      appRoot: root,
      html: path.join(root, data.html || 'index.html'),
      entry: path.join(root, data.main),
      name: data.name
    };

    if (data.style) {
      myPackage.entryStyle = path.join(root, data.style);
    }

    packages.push(myPackage);

    this.push(file);
    callback();
  }, cb.bind(null, packages)));
}

function isApp (appName, apps) {
  return apps.some(function (app) {
    return app.name === appName;
  });
}

var notFound = {
  appRoot: '',
  entry: '',
  entryStyle: '',
  outputRoot: '',
  jsOutput: '',
  cssOutput: '',
  name: '404 - Not Found',
  main: ''
};

function findApp(appName, apps) {
  var filtered = apps.filter(function (app) {
    return app.name === appName;
  });
  if (!filtered || !filtered.length) return notFound;
  return filtered[0];
}

module.exports.retrieve = retrieveApps;
module.exports.isApp = isApp;
module.exports.findApp = findApp;
