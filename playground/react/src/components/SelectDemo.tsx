import type { EosSelectOption } from "@eosjs/ui/select";
import { useEffect, useRef, useState } from "react";

const countries: EosSelectOption[] = [
	{ value: "fr", label: "France" },
	{ value: "de", label: "Germany" },
	{ value: "it", label: "Italy" },
	{ value: "jp", label: "Japan" },
	{ value: "nl", label: "Netherlands" },
];

export const SelectDemo = () => {
	const mount = useRef<HTMLDivElement>(null);
	const selectRef = useRef<
		| (HTMLElement & {
				open: boolean;
				placement: "auto" | "left" | "right" | "top" | "bottom";
		  })
		| null
	>(null);
	const [selected, setSelected] = useState("Italy");
	const [placement, setPlacement] = useState("closed");

	useEffect(() => {
		const element = document.createElement("eos-select") as HTMLElement & {
			options: readonly EosSelectOption[];
			value: string;
			open: boolean;
			placement: "auto" | "left" | "right" | "top" | "bottom";
		};
		element.setAttribute("aria-label", "Country");
		element.setAttribute("full-width", "");
		element.options = Array.from({ length: 10_000 }, (_, index) => {
			const country = countries[index % countries.length];
			if (!country) return { value: `fallback-${index}`, label: "Italy" };
			if (index === 5_002) return country;
			return {
				...country,
				value: `${country.value}-${index}`,
				label: country.label,
			};
		});
		element.value = "it";
		const onChange = (event: Event) => {
			const detail = (event as CustomEvent<{ option: EosSelectOption }>).detail;
			setSelected(detail.option.label);
		};
		element.addEventListener("change", onChange);
		selectRef.current = element;
		mount.current?.replaceChildren(element);
		const panel = element.shadowRoot?.querySelector<HTMLElement>(".panel");
		const placementObserver = panel
			? new MutationObserver(() => {
					setPlacement(
						panel.dataset.positioned === "true"
							? (panel.dataset.placement ?? "auto")
							: "opening",
					);
				})
			: undefined;
		if (panel)
			placementObserver?.observe(panel, {
				attributes: true,
				attributeFilter: ["data-placement", "data-positioned"],
			});
		return () => {
			element.removeEventListener("change", onChange);
			placementObserver?.disconnect();
			element.open = false;
			selectRef.current = null;
		};
	}, []);

	const previewPlacement = (side: "left" | "right" | "top" | "bottom") => {
		const element = selectRef.current;
		if (!element) return;
		setPlacement("opening");
		element.placement = side;
		element.open = true;
	};

	const restore = () => {
		if (!selectRef.current) return;
		selectRef.current.open = false;
		selectRef.current.placement = "auto";
		setPlacement("closed");
	};

	return (
		<div className="select-demo">
			<section
				className="select-debug-controls"
				aria-label="Select placement debugging"
			>
				<span>定位调试 · 当前方向：{placement}</span>
				{(["left", "right", "top", "bottom"] as const).map((side) => (
					<button
						key={side}
						type="button"
						onClick={() => previewPlacement(side)}
					>
						{side}
					</button>
				))}
				<button type="button" onClick={restore}>
					恢复布局
				</button>
			</section>
			<div ref={mount} />
			<p className="demo-feedback">
				Selected: {selected} · 10,000 records, virtualized
			</p>
		</div>
	);
};
