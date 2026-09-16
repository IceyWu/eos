import { useEffect, useRef, useState } from "react";
import "@eosjs/components";

export default function Basic() {
	const ref = useRef<HTMLElement>(null);
	const [count, setCount] = useState(0);

	useEffect(() => {
		const element = ref.current;
		const onClick = () => setCount((value) => value + 1);
		element?.addEventListener("click", onClick);
		return () => element?.removeEventListener("click", onClick);
	}, []);

	return (
		<div style={{ display: "grid", gap: 16, alignContent: "center", justifyItems: "center", minHeight: 180 }}>
			<eos-button ref={ref}>Try the button</eos-button>
			<small style={{ color: "var(--eos-color-foreground-muted, #71717a)" }}>Activated {count} times</small>
		</div>
	);
}
