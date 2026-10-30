import { useEffect, useRef, useState } from "react";
import "@/components/scene-demo.css";
import "../../../../../../packages/ui/src/index.ts";
import { alt, source } from "../../image/demos/data";

const initialPoints = [
	{ id: "ridge", x: 0.58, y: 0.1, label: "层叠山脊", description: "草坡沿着高原山脊起伏延伸，远处山线与云层交叠。" },
	{ id: "meadow", x: 0.28, y: 0.79, label: "野花草甸", description: "黄色野花铺满开阔的草甸，远处山坡连着高原天际。" },
	{ id: "horse", x: 0.6, y: 0.64, label: "高原牧马", description: "一匹马在开阔的高原草地上休息。" },
	{ id: "camp", x: 0.83, y: 0.64, label: "徒步装备", description: "背包和登山杖留在草甸旁，记录这段高原徒步。" },
];

const controlButton = "inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium text-[var(--scene-foreground)] transition-colors hover:bg-[color-mix(in_srgb,var(--scene-foreground)_8%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--scene-accent)]";
const groupButton = "inline-flex size-9 items-center justify-center rounded-lg px-2 text-sm font-medium text-[var(--scene-foreground)] transition-colors hover:bg-[color-mix(in_srgb,var(--scene-foreground)_8%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--scene-accent)]";

export default function SceneDemo() {
	const [points, setPoints] = useState(initialPoints);
	const [active, setActive] = useState<string | null>(null);
	const [container, setContainer] = useState({ scale: 1, x: 0, y: 0 });
	const [dragging, setDragging] = useState(false);
	const [debugMode, setDebugMode] = useState<"idle" | "naming" | "placing">("idle");
	const [draftLabel, setDraftLabel] = useState("");
	const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number } | null>(null);
	const stageRef = useRef<HTMLDivElement | null>(null);
	const frameRef = useRef<HTMLDivElement | null>(null);
	const pointDrag = useRef<{ id: string; pointerId: number; clientX: number; clientY: number; moved: boolean } | null>(null);
	const suppressPointClick = useRef<string | null>(null);
	const dragStart = useRef<{
		pointerId: number;
		clientX: number;
		clientY: number;
		x: number;
		y: number;
	} | null>(null);
	const selected = points.find((point) => point.id === active);
	const getSceneCoordinates = (clientX: number, clientY: number) => {
		const frame = frameRef.current;
		if (!frame) return { x: 0.5, y: 0.5 };
		const rect = frame.getBoundingClientRect();
		return {
			x: Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)),
			y: Math.max(0, Math.min(1, (clientY - rect.top) / rect.height)),
		};
	};
	const onStageClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (debugMode !== "placing") return;
		const path = event.nativeEvent.composedPath();
		const clickedMarker = path.some((target) => target instanceof Element && target.localName === "eos-scene-item");
		const clickedControl = path.some((target) => target instanceof HTMLElement && target.matches("button, input"));
		if (clickedControl && !clickedMarker) return;
		const id = `custom-${Date.now()}`;
		const position = getSceneCoordinates(event.clientX, event.clientY);
		setPoints((current) => [...current, { id, ...position, label: draftLabel.trim(), description: `自定义调试标记：${draftLabel.trim()}。` }]);
		setActive(id);
		setDraftLabel("");
		setPreviewPosition(null);
		setDebugMode("idle");
	};
	const onStagePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
		if (debugMode === "placing") {
			setPreviewPosition(getSceneCoordinates(event.clientX, event.clientY));
		}
	};
	const onMarkerPointerDown = (event: React.PointerEvent<HTMLButtonElement>, id: string) => {
		if (debugMode !== "idle" || !event.isPrimary || event.button !== 0) return;
		pointDrag.current = { id, pointerId: event.pointerId, clientX: event.clientX, clientY: event.clientY, moved: false };
		event.currentTarget.setPointerCapture(event.pointerId);
	};
	const onMarkerPointerMove = (event: React.PointerEvent<HTMLButtonElement>, id: string) => {
		const drag = pointDrag.current;
		if (!drag || drag.id !== id || drag.pointerId !== event.pointerId) return;
		if (!drag.moved && Math.hypot(event.clientX - drag.clientX, event.clientY - drag.clientY) < 3) return;
		drag.moved = true;
		const position = getSceneCoordinates(event.clientX, event.clientY);
		setPoints((current) => current.map((point) => point.id === id ? { ...point, ...position } : point));
	};
	const onMarkerPointerEnd = (event: React.PointerEvent<HTMLButtonElement>, id: string) => {
		const drag = pointDrag.current;
		if (!drag || drag.id !== id || drag.pointerId !== event.pointerId) return;
		if (drag.moved) suppressPointClick.current = id;
		pointDrag.current = null;
	};
	const getOffsetBounds = (scale: number) => {
		const stage = stageRef.current;
		if (!stage) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
		const width = stage.clientWidth;
		const height = stage.clientHeight;
		return {
			minX: Math.min(0, width * (1 - scale)),
			maxX: Math.max(0, width * (1 - scale)),
			minY: Math.min(0, height * (1 - scale)),
			maxY: Math.max(0, height * (1 - scale)),
		};
	};
	const resizeContainer = (delta: number) => {
		setContainer((current) => {
			const scale = Math.max(0.75, Math.min(1.5, Number((current.scale + delta).toFixed(2))));
			const bounds = getOffsetBounds(scale);
			return {
				scale,
				x: Math.max(bounds.minX, Math.min(bounds.maxX, current.x)),
				y: Math.max(bounds.minY, Math.min(bounds.maxY, current.y)),
			};
		});
	};
	useEffect(() => {
		const stage = stageRef.current;
		if (!stage) return;
		const onWheel = (event: WheelEvent) => {
			event.preventDefault();
			event.stopPropagation();
			const rect = stage.getBoundingClientRect();
			const anchorX = event.clientX - rect.left;
			const anchorY = event.clientY - rect.top;
			setContainer((current) => {
				const scale = Math.max(0.75, Math.min(1.5, Number((current.scale * Math.exp(-event.deltaY * 0.001)).toFixed(3))));
				const scaleRatio = scale / current.scale;
				const bounds = getOffsetBounds(scale);
				return {
					scale,
					x: Math.max(bounds.minX, Math.min(bounds.maxX, anchorX - (anchorX - current.x) * scaleRatio)),
					y: Math.max(bounds.minY, Math.min(bounds.maxY, anchorY - (anchorY - current.y) * scaleRatio)),
				};
			});
		};
		stage.addEventListener("wheel", onWheel, { passive: false });
		return () => stage.removeEventListener("wheel", onWheel);
	}, []);
	const onFramePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
		if (debugMode !== "idle" || !event.isPrimary || event.button !== 0) return;
		const startedOnItem = event.nativeEvent.composedPath().some(
			(target) => target instanceof Element && target.localName === "eos-scene-item",
		);
		if (startedOnItem) return;
		event.preventDefault();
		dragStart.current = {
			pointerId: event.pointerId,
			clientX: event.clientX,
			clientY: event.clientY,
			x: container.x,
			y: container.y,
		};
		event.currentTarget.setPointerCapture(event.pointerId);
		setDragging(true);
	};
	const onFramePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
		const start = dragStart.current;
		if (!start || start.pointerId !== event.pointerId) return;
		setContainer((current) => {
			const bounds = getOffsetBounds(current.scale);
			return {
				...current,
				x: Math.max(bounds.minX, Math.min(bounds.maxX, start.x + event.clientX - start.clientX)),
				y: Math.max(bounds.minY, Math.min(bounds.maxY, start.y + event.clientY - start.clientY)),
			};
		});
	};
	const onFramePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
		if (dragStart.current?.pointerId !== event.pointerId) return;
		dragStart.current = null;
		setDragging(false);
	};

	return (
		<div className="scene-demo w-full max-w-[900px] text-[var(--scene-foreground)]">
			<div className="relative z-[1] mb-2.5 flex flex-wrap items-center gap-2.5 text-xs leading-[18px] text-[var(--scene-muted)]">
				<span>外部容器模拟</span>
				<div className="flex items-center gap-1 rounded-[10px] border border-[var(--scene-border)] bg-[var(--scene-surface)] p-[3px] shadow-[0_2px_8px_rgb(0_0_0_/_8%)]" role="group" aria-label="缩放外部容器">
					<button className={groupButton} type="button" aria-label="缩小外部容器" title="缩小外部容器" onClick={() => resizeContainer(-0.1)}>−</button>
					<button className={groupButton} type="button" aria-label="放大外部容器" title="放大外部容器" onClick={() => resizeContainer(0.1)}>+</button>
				</div>
				<div className="flex items-center gap-1 rounded-[10px] border border-[var(--scene-border)] bg-[var(--scene-surface)] p-[3px] shadow-[0_2px_8px_rgb(0_0_0_/_8%)]" role="group" aria-label="重置外部容器">
					<button className={groupButton} type="button" aria-label="重置外部容器" title="重置外部容器" onClick={() => setContainer({ scale: 1, x: 0, y: 0 })}>↺</button>
				</div>
				<button className={controlButton} type="button" onClick={() => { setDraftLabel(""); setPreviewPosition(null); setActive(null); setDebugMode("naming"); }}>＋ 添加调试标记</button>
			</div>
			{debugMode === "naming" ? (
				<form className="mb-2.5 flex flex-wrap items-end gap-2 rounded-xl border border-[var(--scene-border)] bg-[var(--scene-surface)] p-3" onSubmit={(event) => { event.preventDefault(); if (draftLabel.trim()) setDebugMode("placing"); }}>
					<label className="grid min-w-0 flex-[1_1_180px] gap-1 text-xs leading-4 text-[var(--scene-muted)]" htmlFor="scene-demo-label">标记名称
						<input className="min-h-9 w-full rounded-lg border border-[var(--scene-border)] bg-[var(--scene-surface)] px-2.5 text-sm leading-5 text-[var(--scene-foreground)] placeholder:text-[var(--scene-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--scene-accent)]" id="scene-demo-label" autoFocus required maxLength={24} value={draftLabel} onChange={(event) => setDraftLabel(event.currentTarget.value)} placeholder="例如：溪流转弯处" />
					</label>
					<button className={controlButton} type="submit">选择位置</button>
					<button className={controlButton} type="button" onClick={() => { setDebugMode("idle"); setPreviewPosition(null); }}>取消</button>
				</form>
			) : null}
			<div className="scene-demo__stage @container relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[var(--scene-surface)]" ref={stageRef} onClick={onStageClick} onPointerMove={onStagePointerMove} onPointerLeave={() => setPreviewPosition(null)}>
			<div
				ref={frameRef}
				className={`scene-demo__frame absolute left-0 top-0 w-full origin-top-left touch-none select-none motion-reduce:transition-none ${debugMode === "placing" ? "cursor-crosshair" : dragging ? "cursor-grabbing transition-none" : "cursor-grab transition-transform duration-200"}`}
				style={{ transform: `translate(${container.x}px, ${container.y}px) scale(${container.scale})` }}
				onPointerDown={onFramePointerDown}
				onPointerMove={onFramePointerMove}
				onPointerUp={onFramePointerEnd}
				onPointerCancel={onFramePointerEnd}
				onDragStart={(event) => event.preventDefault()}
			>
			<eos-scene aria-label="理塘风景中的多个交互点">
				<eos-image
					slot="content"
					src={source}
					alt={alt}
					object-fit="cover"
				/>
				{points.map((point) => (
					<eos-scene-item key={point.id} suppressHydrationWarning x={point.x} y={point.y} anchor="center" z-index={active === point.id ? 4 : 1}>
						<div className={`relative size-11${point.id === "camp" ? " scene-pin--camp" : ""}`}>
							<button
								className={`scene-marker group relative inline-grid size-11 place-items-center rounded-full bg-transparent p-0 touch-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--scene-accent)]${debugMode === "placing" ? " cursor-crosshair" : pointDrag.current?.id === point.id ? " cursor-grabbing" : " cursor-grab"}`}
								type="button"
								aria-label={`${active === point.id ? "收起" : "查看"}${point.label}详情`}
								aria-pressed={active === point.id}
								onPointerDown={(event) => onMarkerPointerDown(event, point.id)}
								onPointerMove={(event) => onMarkerPointerMove(event, point.id)}
								onPointerUp={(event) => onMarkerPointerEnd(event, point.id)}
								onPointerCancel={(event) => onMarkerPointerEnd(event, point.id)}
								onClick={() => {
									if (suppressPointClick.current === point.id) { suppressPointClick.current = null; return; }
									if (debugMode === "idle") setActive(active === point.id ? null : point.id);
								}}
							>
								<span className="block size-5 rounded-full border-[3px] border-[var(--scene-surface)] bg-[color-mix(in_srgb,var(--scene-foreground)_42%,transparent)] shadow-[0_1px_5px_rgb(0_0_0_/_32%)] group-hover:bg-[var(--scene-accent)] group-aria-pressed:bg-[var(--scene-accent)]" />
								<span className="scene-marker__label absolute left-[calc(100%+2px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[color-mix(in_srgb,var(--scene-border)_82%,transparent)] bg-[color-mix(in_srgb,var(--scene-surface)_94%,transparent)] px-2.5 py-1 text-xs leading-4 font-medium text-[var(--scene-foreground)] shadow-[0_1px_5px_rgb(0_0_0_/_14%)]">{point.label}</span>
							</button>
						</div>
					</eos-scene-item>
				))}
				{selected ? (
					<eos-scene-item suppressHydrationWarning x={selected.x} y={selected.y} anchor={selected.y < 0.2 ? (selected.x > 0.5 ? "top-right" : "top-left") : (selected.x > 0.5 ? "bottom-right" : "bottom-left")} z-index="3">
						<article
							className={`scene-card relative box-border w-[min(300px,70vw)] rounded-xl border border-[var(--scene-border)] bg-[var(--scene-surface)] p-4 text-[var(--scene-foreground)] shadow-[0_8px_24px_rgb(0_0_0_/_18%)]${selected.x > 0.5 ? " scene-card--right translate-x-6" : " scene-card--left -translate-x-6"}${selected.y < 0.2 ? " scene-card--below translate-y-[18px]" : " -translate-y-[18px]"}`}
							aria-live="polite"
						>
							<h3 className="mb-1 text-base leading-6 font-medium">{selected.label}</h3>
							<p className="m-0 text-sm leading-5 text-[var(--scene-muted)]">{selected.description}</p>
						</article>
					</eos-scene-item>
				) : null}
			</eos-scene>
			</div>
			{debugMode === "placing" && previewPosition ? (
				<div className="scene-demo__cursor pointer-events-none absolute z-[3] size-11 -translate-x-1/2 -translate-y-1/2" style={{ left: `${previewPosition.x * 100}%`, top: `${previewPosition.y * 100}%` }} aria-hidden="true">
					<span className="scene-demo__cursor-point rounded-full border-2 border-[var(--scene-surface)] bg-[var(--scene-accent)] shadow-[0_0_0_2px_var(--scene-accent),0_1px_6px_rgb(0_0_0_/_40%)]" />
					<span className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--scene-accent)] px-2.5 py-1 text-xs leading-4 font-medium text-[var(--scene-accent-foreground)] shadow-[0_2px_8px_rgb(0_0_0_/_22%)]${previewPosition.x > 0.72 ? " right-[calc(100%+4px)]" : " left-[calc(100%+4px)]"}`}>{draftLabel}</span>
				</div>
			) : null}
			{debugMode === "placing" ? (
				<div className="absolute inset-block-start-3 inset-inline-start-1/2 z-[2] flex max-w-[calc(100%-24px)] -translate-x-1/2 items-center gap-2.5 rounded-xl border border-[var(--scene-border)] bg-[var(--scene-surface)] py-2 pr-2.5 pl-3.5 text-[13px] leading-[18px] font-medium text-[var(--scene-foreground)] shadow-[0_4px_16px_rgb(0_0_0_/_14%)]" role="status">
					<span>移动准星定位后点击，放置“{draftLabel}”</span>
					<button className={controlButton} type="button" onClick={() => { setDebugMode("idle"); setPreviewPosition(null); }}>取消</button>
				</div>
			) : null}
			</div>
			<p className="mt-3 mb-0 text-xs leading-4 text-[var(--scene-muted)]">
				点击标记查看详情，再次点击收起。可在预览区域滚动缩放、拖动图片移动；点“添加调试标记”输入名称后，在图片上选点并拖动微调。
			</p>
		</div>
	);
}
