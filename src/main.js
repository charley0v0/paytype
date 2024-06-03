import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';


library.add(faCircleCheck)
createApp(App)
.use(axios)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
