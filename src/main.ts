import { createApp } from "vue";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.css";
import "./assets/global.css";
import roteador from "./roteador";
import { key, store } from "./store";

createApp(App).use(roteador).use(store, key).mount("#app");
