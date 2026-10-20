import { COMPONENT_CONFIG } from "./config";

/** Register an element once; safe to import during server rendering. */
export function registerComponent(
	name: string,
	component: CustomElementConstructor,
) {
	if (typeof customElements === "undefined") return;
	try {
		const tagName = COMPONENT_CONFIG.getTagName(name);
		if (!customElements.get(tagName)) {
			customElements.define(tagName, component);
		}
	} catch (error) {
		console.error(`Failed to register component ${name}:`, error);
	}
}
