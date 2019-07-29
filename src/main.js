import Vue from 'vue'
import App from './App.vue'
import store from './store'

import VTooltip from 'v-tooltip'
import VueCustomElement from 'vue-custom-element'

Vue.use(VTooltip)
Vue.use(VueCustomElement)

Vue.config.productionTip = false

// new Vue({
//   store,
//   render: h => h(App)
// }).$mount('#app')

App.store = store
Vue.customElement('vue-kommunekassen', App)
