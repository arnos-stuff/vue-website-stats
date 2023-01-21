import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import Router from './router'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(Router)
  .mount('#app')
