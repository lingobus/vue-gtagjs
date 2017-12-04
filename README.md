# vue-gtagjs

Google gtag.js for Vue.js

Install
====
> yarn add vue-gtagjs

Usage
====

## with vue router
```js
import gtagjs from 'vue-gtagjs'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const router = new VueRouter()
gtagjs(router, GA_TRACKING_ID, {debug: true, scriptId: 'gtagjs'})
```

## Without vue router
```js
import gtagjs from 'vue-gtagjs'
gtagjs(set => set(location.pathname), GA_TRACKING_ID, {debug: true, scriptId: 'customId'})
```
