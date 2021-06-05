import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import 'ant-design-vue/dist/antd.css';
import "./styles/reset.css"
import "./styles/app.less"

const app = createApp(App);
app.use(VueAxios,axios);
app.use(Antd).mount('#app');
app.config.productionTip = false;

