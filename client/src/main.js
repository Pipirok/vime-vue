import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "buefy/dist/buefy.css";
import "@mdi/font/css/materialdesignicons.css";

import Buefy from "buefy";

Vue.config.productionTip = false;
Vue.use(Buefy);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
