import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CarouselTest from "./CarouselTest";

const root = document.getElementById("root");
if (root) {
	createRoot(root).render(
		<StrictMode>
			<CarouselTest />
		</StrictMode>,
	);
}
