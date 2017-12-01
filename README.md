# vue-gtag

Google gtag.js for Vue.js

Install
====
> yarn add vue-gtagjs

Usage
====

```
import gtagjs from 'vue-gtagjs'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter()
gtagjs(router, GA_TRACKING_ID, {debug: true, scriptId: 'gtagjs'})
export default router
```