import { createApp } from 'vue'
import '../src/style.css';
import unionPay from '../src/views/unionPay.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';


library.add(faCircleCheck)
createApp(unionPay)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
