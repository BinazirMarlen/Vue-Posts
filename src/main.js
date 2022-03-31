import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI';

const app = createApp(App);

components.forEach(component => {
    createApp(App).component(component.name, component)
});
createApp(App).mount('#app');
