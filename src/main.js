import { createApp } from 'vue';
import App from './App.vue';
import { VueTouch } from 'vue-touch';

const app = createApp(App);
app.use(VueTouch, { name: 'v-touch' });
app.mount('#app');
