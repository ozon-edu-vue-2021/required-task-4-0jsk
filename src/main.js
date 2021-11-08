import Vue from "vue";
import App from "./App.vue";
import Fragment from "vue-fragment";

// eslint-disable-next-line no-unused-vars
import globalCss from "@/assets/global.scss";

Vue.use(Fragment.Plugin);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
