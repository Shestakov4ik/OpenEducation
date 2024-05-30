import { createApp } from 'vue';
import Main from './Main.vue';
import VueTheMask from 'vue-the-mask';

// Создание приложения Vue и регистрация плагина `vue-the-mask`
const app = createApp(Main);
app.use(VueTheMask);
app.mount('#main');
