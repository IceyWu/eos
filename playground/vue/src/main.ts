import { createApp } from "vue";
import "./style.css";
import { registerComponents } from "@eosjs/components";
import App from "./App.vue";

// 注册 Web Components
registerComponents();

createApp(App).mount("#app");
