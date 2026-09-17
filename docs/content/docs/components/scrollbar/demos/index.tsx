import { useEffect, useRef } from "react";
import "../../../../../../packages/ui/src/index.ts";

export default function Basic() {
	const containerRef = useRef<HTMLDivElement>(null);
	const scrollbarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const scrollbar = scrollbarRef.current as HTMLElement & {
			attach?: (element: HTMLElement) => void;
		};
		const container = containerRef.current;
		if (container && scrollbar?.attach) scrollbar.attach(container);
		return () =>
			(
				scrollbarRef.current as HTMLElement & { detach?: () => void }
			)?.detach?.();
	}, []);

	return (
		<div
			style={{
				alignItems: "stretch",
				display: "flex",
				gap: 12,
				height: 220,
				maxWidth: 560,
				width: "100%",
			}}
		>
			<div
				ref={containerRef}
				style={{
					border: "1px solid var(--eos-color-border, #dedee0)",
					borderRadius: 12,
					flex: 1,
					overflow: "auto",
					padding: 16,
				}}
			>
				<div style={{ display: "grid", gap: 12 }}>
					{Array.from({ length: 8 }, (_, index) => (
						<div
							key={index}
							style={{
								background: "var(--eos-color-surface-secondary, #f4f4f5)",
								borderRadius: 8,
								color: "var(--eos-color-foreground, #18181b)",
								padding: 14,
							}}
						>
							Scrollable content / {String(index + 1).padStart(2, "0")}
						</div>
					))}
				</div>
			</div>
			<eos-scrollbar
				ref={scrollbarRef}
				direction="vertical"
				thumb-size="6"
				style={{ height: "100%", width: 6 }}
			/>
		</div>
	);
}
