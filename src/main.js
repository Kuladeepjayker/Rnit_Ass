import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import SlotBlock from '../src/components/SlotBlock.vue'
import router from './router'
import store from './store'

createApp(App)
.use(store)
.use(router)
.use('slot-block',SlotBlock)
.mount('#app')
