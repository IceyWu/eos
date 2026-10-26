import { useEffect, useRef, useState } from "react";
import type { EosSelectOption } from "@eosjs/ui/select";
import "../../../../../../packages/ui/src/index.ts";

type Placement = "left" | "right" | "top" | "bottom";

const countries: EosSelectOption[] = [
	{ value: "fr", label: "France", prefix: "🇫🇷" },
	{ value: "de", label: "Germany", prefix: "🇩🇪" },
	{ value: "it", label: "Italy", prefix: "🇮🇹" },
	{ value: "jp", label: "Japan", prefix: "🇯🇵" },
	{ value: "nl", label: "Netherlands", prefix: "🇳🇱" },
];
const options: EosSelectOption[] = Array.from({ length: 10_000 }, (_, index) => {
	const country = countries[index % countries.length]!;
	if (index === 5_002) return country;
	return {
		...country,
		value: `${country.value}-${index}`,
		label: country.label,
	};
});

export default function Basic() {
	const mount = useRef<HTMLDivElement>(null);
	const selectRef = useRef<(HTMLElement & {
		options: typeof options;
		value: string;
		open: boolean;
		placement: Placement | "auto";
		boundary: Element | Element[] | { x: number; y: number; width: number; height: number } | undefined;
	}) | null>(null);
	const [selected, setSelected] = useState("Italy");
	const [actualPlacement, setActualPlacement] = useState("closed");
	const [requestedPlacement, setRequestedPlacement] = useState<Placement | "auto">("auto");

	useEffect(() => {
		const element = document.createElement("eos-select") as NonNullable<typeof selectRef.current>;
		element.setAttribute("aria-label", "Country");
		element.style.inlineSize = "100%";
		element.options = options;
		element.value = "it";
		const onChange = (event: Event) =>
			setSelected((event as CustomEvent<{ option: { label: string } }>).detail.option.label);
		element.addEventListener("change", onChange);
		selectRef.current = element;
		mount.current?.replaceChildren(element);
		const panel = element.shadowRoot?.querySelector<HTMLElement>(".panel");
		const observer = panel ? new MutationObserver(() => {
			setActualPlacement(panel.dataset.positioned === "true" ? panel.dataset.placement ?? "auto" : "opening");
		}) : undefined;
		if (panel) observer?.observe(panel, { attributes: true, attributeFilter: ["data-placement", "data-positioned"] });
		return () => {
			element.removeEventListener("change", onChange);
			observer?.disconnect();
			element.open = false;
			selectRef.current = null;
		};
	}, []);

	const previewPlacement = (side: Placement) => {
		const element = selectRef.current;
		if (!element) return;
		setRequestedPlacement(side);
		setActualPlacement("opening");
		element.placement = side;
		element.open = true;
	};

	const restore = () => {
		if (selectRef.current) {
			selectRef.current.open = false;
			selectRef.current.placement = "auto";
		}
		setRequestedPlacement("auto");
		setActualPlacement("closed");
	};
	const controlsColumn = requestedPlacement === "right" ? 1 : 3;
	const controlsTransform = actualPlacement === "bottom" ? "translateY(-103px)" : actualPlacement === "top" ? "translateY(60px)" : undefined;

	return (
		<div style={{ display: "grid", width: "100%", minHeight: 380, gridTemplateColumns: "minmax(0, 1fr) 220px minmax(0, 1fr)", gridTemplateRows: "1fr auto auto 1fr", columnGap: 12, rowGap: 8, alignItems: "center" }}>
			<div style={{ display: "grid", alignContent: "center", gap: 6, width: "min(168px, 100%)", gridColumn: controlsColumn, gridRow: "1 / 5", justifySelf: controlsColumn === 1 ? "start" : "end", color: "var(--eos-color-foreground-muted)", transform: controlsTransform }}>
				<span style={{ fontSize: 12 }}>Actual · {actualPlacement}</span>
				{(["left", "right", "top", "bottom"] as const).map((side) => (
					<button key={side} type="button" onClick={() => previewPlacement(side)} style={{ ...debugButtonStyle, width: "100%" }}>
						{side}
					</button>
				))}
				<button type="button" onClick={restore} style={{ ...debugButtonStyle, width: "100%" }}>Restore</button>
			</div>
			<div ref={mount} style={{ gridColumn: 2, gridRow: 2, inlineSize: "100%", justifySelf: "center" }} />
			<small style={{ gridColumn: 2, gridRow: 3, justifySelf: "center", color: "var(--eos-color-foreground-muted)" }}>Selected: {selected}</small>
		</div>
	);
}

const debugButtonStyle = {
	minHeight: 32,
	paddingInline: 10,
	border: "1px solid var(--eos-color-border)",
	borderRadius: 9999,
	background: "var(--eos-color-surface)",
	color: "var(--eos-color-foreground)",
	font: "inherit",
	cursor: "pointer",
};
