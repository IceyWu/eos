import { useEffect, useRef, useState } from "react";
import "../../../../../../packages/ui/src/index.ts";

export default function Basic() {
	const ref = useRef<HTMLElement>(null);
	const [count, setCount] = useState(0);
	const [control, setControl] = useState({ danger: false, disabled: false, glass: false, loading: false, shadow: false, size: "default", type: "primary", variant: "solid" });
	const update = (key: string, value: boolean | string) => setControl((current) => ({ ...current, [key]: value }));

	useEffect(() => {
		const element = ref.current;
		const onClick = () => setCount((value) => value + 1);
		element?.addEventListener("click", onClick);
		return () => element?.removeEventListener("click", onClick);
	}, []);

	return (
		<div
			style={{
				display: "grid",
				gap: 16,
				alignContent: "center",
				justifyItems: "center",
				minHeight: 180,
			}}
		>
			<div className="eos-button-playground">
				<div className="eos-button-playground__stage"><eos-button ref={ref} {...control}>Button</eos-button><small style={{ color: "var(--eos-color-foreground-muted, #71717a)" }}>Activated {count} times</small></div>
				<aside className="eos-button-playground__controls" aria-label="Button controls">
					{["danger", "disabled", "glass", "loading", "shadow"].map((key) => <label key={key}><span>{key}</span><input type="checkbox" checked={Boolean(control[key as keyof typeof control])} onChange={(event) => update(key, event.target.checked)} /></label>)}
					<label><span>size</span><select value={control.size} onChange={(event) => update("size", event.target.value)}><option>large</option><option>default</option><option>small</option></select></label>
					<label><span>type</span><select value={control.type} onChange={(event) => update("type", event.target.value)}><option>primary</option><option>default</option><option>text</option><option>link</option></select></label>
					<label><span>variant</span><select value={control.variant} onChange={(event) => update("variant", event.target.value)}><option>solid</option><option>bordered</option><option>light</option><option>flat</option><option>ghost</option></select></label>
				</aside>
			</div>
		</div>
	);
}
