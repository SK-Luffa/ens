// import Vue from 'vue'
import App from './App.vue'
import router from "./router"
// import ElementUI from "element-ui";
// import lang from 'element-ui/lib/locale/lang/en'
// import locale from 'element-ui/lib/locale'
// import locale from 'element-ui/lib/locale/lang/en'
import "element-ui/lib/theme-chalk/index.css";
import store from "@/components/store/store.js"
import Hotjar from 'vue-hotjar'
// import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
// import {BootstrapVue, BootstrapVueIcons} from "bootstrap-vue"
import './assets/css/public.less'

// import VueAwesomeSwiper from 'vue-awesome-swiper/dist/vue-awesome-swiper'
// import 'swiper/css/swiper.min.css'


// import "bootstrap/dist/css/bootstrap.css"
// import "bootstrap-vue/dist/bootstrap-vue.css"
import request from "@/components/axios/axios.js"
import crss from "@/components/axios/axios_v3.js"
// import config from "./components/axios/config";

Vue.prototype.rq = request;
Vue.prototype.v3 = crss;

Vue.config.productionTip = false;

if (process.env.NODE_ENV === "development") {
    Vue.prototype.$imgServer = "http://www.patternbuy.com";
} else {
    Vue.prototype.$imgServer = "";
}

// 设置语言
// locale.use(lang)
// Vue.prototype.$ELEMENT = { locale };
// Vue.use(ElementUI, { locale });
// Vue.use(BootstrapVueIcons)
// Vue.use(BootstrapVue)
// Vue.use(ViewUI);
Vue.use(VueAwesomeSwiper)
Vue.use(Hotjar, {
    id: '3204668' 
})

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')