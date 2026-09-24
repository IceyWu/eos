import { useEffect, useRef, useState } from "react";
import type { EosCardStack } from "../../../../../../packages/ui/src/components/card-stack";
import "../../../../../../packages/ui/src/index.ts";

const TOTAL = 10_000;

function renderCard(index: number) {
	const card = document.createElement("article");
	card.style.cssText = "display:flex;flex-direction:column;justify-content:space-between;padding:24px;width:100%;height:100%;background:var(--eos-color-surface);color:var(--eos-color-foreground)";
	const title = document.createElement("strong");
	title.style.cssText = "font-size:18px;font-weight:500;line-height:28px";
	title.textContent = `Card ${index + 1}`;
	const body = document.createElement("p");
	body.style.cssText = "font-size:14px;line-height:20px;color:var(--eos-color-foreground-muted)";
	body.textContent = "Drag left for the next card or right to go back. Use the buttons or arrow keys on a desktop.";
	const number = document.createElement("span");
	number.style.cssText = "font-size:12px;line-height:16px;color:var(--eos-color-foreground-muted);font-variant-numeric:tabular-nums";
	number.textContent = `${index + 1} / ${TOTAL}`;
	card.append(title, body, number);
	return card;
}

export default function Basic() {
	const ref = useRef<HTMLElement>(null);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const stack = ref.current as EosCardStack | null;
		if (!stack) return;
		stack.renderItem = renderCard;
		const onChange = (event: Event) => {
			setIndex((event as CustomEvent<{ currentIndex: number }>).detail.currentIndex);
		};
		stack.addEventListener("change", onChange);
		return () => {
			stack.removeEventListener("change", onChange);
			stack.renderItem = null;
		};
	}, []);

	return (
		<div style={{ maxWidth: 480, width: "100%" }}>
			<eos-card-stack
				ref={ref}
				item-count={TOTAL}
				style={{ "--card-stack-height": "320px" } as React.CSSProperties}
			/>
			<p style={{ color: "var(--eos-color-foreground-muted)", fontSize: 12, textAlign: "center" }}>
				Showing {index + 1} of {TOTAL.toLocaleString()} cards. At most four cards are mounted during a swipe.
			</p>
		</div>
	);
}
