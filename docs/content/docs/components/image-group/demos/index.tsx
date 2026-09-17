import { useEffect, useRef, useState } from "react";
import "../../../../../../packages/ui/src/index.ts";
import { images } from "./data";

type ImageGroupElement = HTMLElement & {
	items: typeof images;
	layout: ImageGroupLayout;
	maxVisible: number;
};

type ImageGroupLayout = "featured" | "grid" | "pair";

const controlStyle = {
	accentColor: "var(--eos-color-accent, #006fee)",
	width: "100%",
};

const selectStyle = {
	boxSizing: "border-box" as const,
	width: "100%",
	border: "1px solid var(--eos-color-border, #dedee0)",
	borderRadius: 6,
	background: "var(--eos-color-surface, #fff)",
	color: "var(--eos-color-foreground, #18181b)",
	font: "13px/30px var(--eos-font-family, system-ui)",
	padding: "0 8px",
};

export default function ImageGroupDemo() {
	const groupRef = useRef<ImageGroupElement>(null);
	const [total, setTotal] = useState(Math.min(10, images.length));
	const [visible, setVisible] = useState(7);
	const [layout, setLayout] = useState<ImageGroupLayout>("grid");

	useEffect(() => {
		const group = groupRef.current;
		if (!group) return;
		group.layout = layout;
		group.maxVisible = Math.min(visible, total);
		group.items = images.slice(0, total);
	}, [layout, total, visible]);

	const updateTotal = (value: number) => {
		setTotal(value);
		setVisible((current) => Math.min(current, value));
	};

	return (
		<div
			className="image-group-demo"
			style={{
				display: "grid",
				alignItems: "center",
				gap: 28,
				boxSizing: "border-box",
				width: "min(700px, 90vw)",
			}}
		>
			<style>{`
				.image-group-demo {
					grid-template-columns: minmax(0, 1fr) 220px;
				}

				@media (max-width: 560px) {
					.image-group-demo {
						grid-template-columns: minmax(0, 1fr);
					}
				}
			`}</style>
			<eos-image-group ref={groupRef} />
			<div
				style={{
					display: "grid",
					gap: 20,
					minWidth: 0,
					font: "13px/20px var(--eos-font-family, system-ui)",
				}}
			>
				<label style={{ display: "grid", gap: 8 }}>
					<span style={{ display: "flex", justifyContent: "space-between" }}>
						items <output>{total}</output>
					</span>
					<input
						aria-label="Image count"
						max={images.length}
						min={1}
						onChange={(event) => updateTotal(Number(event.target.value))}
						style={controlStyle}
						type="range"
						value={total}
					/>
				</label>
				<label style={{ display: "grid", gap: 8 }}>
					<span>layout</span>
					<select
						aria-label="Layout"
						onChange={(event) =>
							setLayout(event.target.value as ImageGroupLayout)
						}
						style={selectStyle}
						value={layout}
					>
						<option value="grid">grid</option>
						<option value="featured">featured</option>
						<option value="pair">pair</option>
					</select>
				</label>
				<label style={{ display: "grid", gap: 8 }}>
					<span style={{ display: "flex", justifyContent: "space-between" }}>
						maxVisible <output>{visible}</output>
					</span>
					<input
						aria-label="Visible image count"
						max={total}
						min={1}
						onChange={(event) => setVisible(Number(event.target.value))}
						style={controlStyle}
						type="range"
						value={visible}
					/>
				</label>
				<small style={{ color: "var(--eos-color-foreground-muted, #71717a)" }}>
					{visible} shown · {total - visible} hidden
				</small>
			</div>
		</div>
	);
}
