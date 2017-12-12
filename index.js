/**
 * Append gtag script to DOM
 * @param  {String} trackId GA_TRACKING_ID
 * @param  {String} id      script id
 */
function appendGtagScript (trackId, id) {
  const s = document.createElement('script')
  s.id = id
  s.async = true
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + trackId
  const n = document.getElementsByTagName('head')[0]
  if (!n) n = document.body
  n.appendChild(s)
}

/**
 * initialize gtag
 * @param  {String} trackId GA_TRACKING_ID
 * @param  {Object} opts  {debug,scriptId}
 */
function initialize (trackId, opts) {
  const w = window
  if (w.gtag) return
  appendGtagScript(trackId, opts.scriptId || 'gtagjs')
  w.dataLayer = w.dataLayer || []
  const gtag = w.gtag = w.gtag || function () {
    w.dataLayer.push(arguments)
  }
  const gtagOpt = opts.gtagOpt || {}
  gtag('js', new Date())
  gtag('config', trackId, gtagOpt)
}

/**
 * set page path and send page_view event
 * @param  {String} pathPath
 * @param  {String} trackId GA_TRACKING_ID
 * @param  {Object} opts
 */
function configPagePath (pathPath, trackId, opts) {
  initialize(trackId, opts)
  gtag('config', trackId, {'page_path': pathPath})
}

function log (url) {
  console.log('set page path to: ' + url)
}

export default function (router, GA_TRACKING_ID, opts = {}) {
  if (typeof router === 'function') {
    router(url => {
      configPagePath(url, GA_TRACKING_ID, opts)
      if (opts.debug) log(url)
    })
  } else {
    router.afterEach(to => {
      configPagePath(to.fullPath, GA_TRACKING_ID, opts)
      if (opts.debug) log(to.fullPath)
    })
  }
}
