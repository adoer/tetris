import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import 'ant-design-vue/dist/antd.css';
import "./styles/reset.css"
import "./styles/app.less"

let instance = axios.create({
  baseURL: '/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

const app = createApp(App);
app.use(VueAxios,instance);
app.use(Antd).mount('#app');

app.config.productionTip = false;

