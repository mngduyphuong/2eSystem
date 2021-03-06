import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as VueGoogleMaps from "vue2-google-maps" 

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_API,
    libraries: "places"
  }
});


Vue.config.productionTip = false;
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
