"use strict";

var fs = require('fs');
var path = require('path');
var ReactDOMServer = require('react-dom/server');
var layout = fs.readFileSync(path.join(__dirname, '..', '_layout.html')).toString('utf-8');

var DOM = require('react').DOM;

module.exports.app = function (app) {
  var html = fs.readFileSync(path.join(__dirname, '..', 'apps', app.html)).toString('utf-8');
  var style = styleTemplate(app.name);
  var script = scriptTemplate(app.name);

  var body = ReactDOMServer.renderToString(SingleApp({ html }));

  return template({
    body, style, script
  });
}

module.exports.home = function (apps) {
  var body = ReactDOMServer.renderToString(Home({ apps }));
  var style = '';
  var script = '';

  return template({
    body, style, script
  });
};

function shortName(name) {
  var splitted = name.split('-');
  var first = (str) => str.substring(0,1);
  var second = (str) => str.substring(1,2);

  var newName = (splitted.length > 1) ?
    `${first(splitted[0])}${first(splitted[1])}` :
    `${first(name)}${second(name)}`;

  return newName.toUpperCase();
}

function AppItem (props) {
  return DOM.li({ className: 'app-item', key: props.name },
    DOM.h2({}, DOM.a({
      href: `/${props.name}`
    },
      DOM.div({ className: 'illustrationCircle app-icon'},
        DOM.p({ className: 'illustrationCircle-text' }, shortName(props.name))
      ),
      DOM.span({ className: 'app-name'}, props.name)
    ))
  );
}

function AppsOverview (props) {
  var apps = props.apps;

  return DOM.section({ className: 'apps-overview' },
    DOM.ul({ className: 'app-list' },
      apps.map(app => AppItem(app))
    )
  );
}

function Header (props) {
  return DOM.div({  className: 'navigationFixed' },
    DOM.div({  className: 'navigation-wrapper' },
      DOM.h1({},
        DOM.a({ href: '/' }, DOM.img({ alt: 'BEKK', src: '/assets/BEKK_logo.svg'}))
      ),
      DOM.a({
        href: '/load-apps'
      }, 'Load apps')
    )
  );
}

function Home (props) {
  return DOM.div({ className: 'container' },
    Header(props),
    AppsOverview(props)
  );
}

function SingleApp (props) {
  return DOM.div({},
    Header(props),
    DOM.div({
      dangerouslySetInnerHTML: {__html: props.html }
    })
  );
}

function styleTemplate (name) {
  if (!name) return '';
  return `<link href="apps/${name}.bundle.css" rel="stylesheet" />`;
}

function scriptTemplate (name) {
  if (!name) return '';
  return `<script src="apps/${name}.bundle.js"></script>`;
}

function template (obj) {
  return Object.keys(obj).reduce((str, tmplKey) =>
    replace(str, tmplKey, obj[tmplKey])
  , layout);
}

function replace(tmpl, name, val) {
  return tmpl.replace(new RegExp('\{\{' + name + '\}\}', 'g'), val);
}
