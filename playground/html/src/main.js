import "./style.css";
import { registerComponents } from "@eosjs/components";
import { renderLayout } from "./layout.js";

// 注册 Web Components
registerComponents();

// 渲染应用布局
renderLayout();
