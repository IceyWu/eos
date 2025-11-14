import { createApp } from "vue";
import "./style.css";
// import { registerComponents } from "@eosjs/components";
import { registerComponents } from "../../../packages/components/src/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";

// 注册 Web Components
registerComponents();

const app = createApp(App);

// 注册 Element Plus
app.use(ElementPlus);

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.mount("#app");
