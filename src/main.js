import { createApp } from 'vue';
import Main from './Main.vue';
import router from './router.js';
import VueTheMask from 'vue-the-mask';


const app = createApp(Main);
app.config.globalProperties.auth = false;
app.use(router);
app.use(VueTheMask);
app.mount('#main');
