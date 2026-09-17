import { useEffect, useRef, useState } from "react";
import "../../../../../../packages/ui/src/index.ts";

const labelStyle = {
	color: "var(--eos-color-foreground-muted, #71717a)",
	font: "500 12px/16px var(--eos-font-family, system-ui)",
};

export default function Basic() {
	const ref = useRef<HTMLElement>(null);
	const [current, setCurrent] = useState(1);

	useEffect(() => {
		const element = ref.current;
		const onClick = (event: Event) =>
			setCurrent((event as CustomEvent<{ index: number }>).detail.index);
		element?.addEventListener("segment-click", onClick);
		return () => element?.removeEventListener("segment-click", onClick);
	}, []);

	return (
		<div style={{ display: "grid", gap: 20, maxWidth: 560, width: "100%" }}>
			<div style={{ display: "grid", gap: 8 }}>
				<span style={labelStyle}>Default · clickable segments</span>
				<eos-progress-bar
					ref={ref}
					total="4"
					current={String(current)}
					variant="default"
				/>
			</div>
			<div style={{ display: "grid", gap: 8 }}>
				<span style={labelStyle}>Dots</span>
				<eos-progress-bar total="4" current="1" variant="dots" />
			</div>
			<div style={{ display: "grid", gap: 8 }}>
				<span style={labelStyle}>TikTok</span>
				<eos-progress-bar total="4" current="2" variant="tiktok" />
			</div>
			<small
				style={{
					color: "var(--eos-color-foreground-muted, #71717a)",
					textAlign: "center",
				}}
			>
				Active segment: {current + 1} / 4
			</small>
		</div>
	);
}
