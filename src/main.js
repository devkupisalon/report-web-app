import { createApp } from 'vue';
import App from './App.vue';
import { VueTouch } from 'vue-touch';
import { VueTelegramPlugin } from 'vue-tg';
import 'animate.css';

const app = createApp(App);
app.use(VueTouch, { name: 'v-touch' });
app.use(VueTelegramPlugin);
app.mount('#app');
