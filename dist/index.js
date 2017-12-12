'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router, GA_TRACKING_ID) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (typeof router === 'function') {
    router(function (url) {
      configPagePath(url, GA_TRACKING_ID, opts);
      if (opts.debug) log(url);
    });
  } else {
    router.afterEach(function (to) {
      configPagePath(to.fullPath, GA_TRACKING_ID, opts);
      if (opts.debug) log(to.fullPath);
    });
  }
};

/**
 * Append gtag script to DOM
 * @param  {String} trackId GA_TRACKING_ID
 * @param  {String} id      script id
 */
function appendGtagScript(trackId, id) {
  var s = document.createElement('script');
  s.id = id;
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + trackId;
  var n = document.getElementsByTagName('head')[0];
  if (!n) n = document.body;
  n.appendChild(s);
}

/**
 * initialize gtag
 * @param  {String} trackId GA_TRACKING_ID
 * @param  {Object} opts  {debug,scriptId}
 */
function initialize(trackId, opts) {
  var w = window;
  if (w.gtag) return;
  appendGtagScript(trackId, opts.scriptId || 'gtagjs');
  w.dataLayer = w.dataLayer || [];
  var gtag = w.gtag = w.gtag || function () {
    w.dataLayer.push(arguments);
  };
  var gtagOpt = opts.gtagOpt || {};
  gtag('js', new Date());
  gtag('config', trackId, gtagOpt);
}

/**
 * set page path and send page_view event
 * @param  {String} pathPath
 * @param  {String} trackId GA_TRACKING_ID
 * @param  {Object} opts
 */
function configPagePath(pathPath, trackId, opts) {
  initialize(trackId, opts);
  gtag('config', trackId, { 'page_path': pathPath });
}

function log(url) {
  console.log('set page path to: ' + url);
}
