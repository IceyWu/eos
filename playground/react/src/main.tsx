import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { registerComponents } from "@eosjs/components";
import App from "./App.tsx";

// 注册 Web Components
registerComponents();

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
