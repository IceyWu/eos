import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import "@eosjs/components";
import { registerComponents } from "@eosjs/components";

registerComponents();

interface FileItem {
	sec_uid: string;
	name: string;
	url: string;
	width: number;
	height: number;
	blurhash: string;
}

interface PostData {
	title: string;
	content: string;
	files: FileItem[];
	user: { username: string };
}

const DATA_SOURCES = ["/2.json"];

const CarouselTest: React.FC = () => {
	const [sourceIndex, setSourceIndex] = useState(0);
	const [data, setData] = useState<PostData | null>(null);
	const [current, setCurrent] = useState(0);
	const [loading, setLoading] = useState(true);
	const carouselRef = useRef<HTMLElement & { prev: () => void; next: () => void; goTo: (i: number) => void }>(null);

	const loadData = useCallback((idx: number) => {
		setLoading(true);
		setData(null);
		setCurrent(0);
		fetch(DATA_SOURCES[idx])
			.then((res) => res.json())
			.then((json: { data: PostData }) => {
				setData(json.data);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		loadData(sourceIndex);
	}, [sourceIndex, loadData]);

	useEffect(() => {
		const el = carouselRef.current;
		if (!el) return;
		const handler = (e: Event) => {
			const detail = (e as CustomEvent).detail;
			if (detail) {
				console.log("🎠 slide changed:", detail);
				setCurrent(detail.currentIndex);
			}
		};
		el.addEventListener("change", handler);
		return () => el.removeEventListener("change", handler);
	}, [data]);

	const switchSource = (idx: number) => {
		if (idx === sourceIndex) return;
		setSourceIndex(idx);
	};

	if (loading || !data) {
		return (
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#999" }}>
				加载中...
			</div>
		);
	}

	return (
		<div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "system-ui, sans-serif" }}>
			{DATA_SOURCES.length > 1 && (
				<div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
					{DATA_SOURCES.map((src, idx) => (
						<button
							key={src}
							onClick={() => switchSource(idx)}
							style={{
								...btnStyle,
								background: idx === sourceIndex ? "#1677ff" : "#fff",
								color: idx === sourceIndex ? "#fff" : "#333",
								borderColor: idx === sourceIndex ? "#1677ff" : "#d9d9d9",
							}}
						>
							数据源 {idx + 1}
						</button>
					))}
				</div>
			)}

			<h2 style={{ marginBottom: 8 }}>{data.title}</h2>
			<p style={{ color: "#666", marginBottom: 16, fontSize: 14 }}>
				by {data.user.username} · {data.files.length} 张图片
			</p>

			<eos-carousel
				ref={carouselRef}
				autoplay={false}
				loop
				interval="3000"
				indicator-style="tiktok"
				style={{ "--carousel-height": "450px", borderRadius: "12px", overflow: "hidden" } as React.CSSProperties}
			>
				{data.files.map((file) => (
					<eos-image
						key={file.sec_uid}
						src={`${file.url}?x-oss-process=image/format,avif/resize,w_1200`}
						alt={file.name}
						placeholder={file.blurhash}
						placeholder-type="blurhash"
						width="600"
						height="450"
						object-fit="cover"
					/>
				))}
			</eos-carousel>

			<div style={{ marginTop: 12, textAlign: "center", color: "#999", fontSize: 13 }}>
				{current + 1} / {data.files.length}
			</div>

			<div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
				<button onClick={() => carouselRef.current?.prev()} style={btnStyle}>上一张</button>
				<button onClick={() => carouselRef.current?.next()} style={btnStyle}>下一张</button>
			</div>
		</div>
	);
};

const btnStyle: React.CSSProperties = {
	padding: "8px 20px",
	border: "1px solid #d9d9d9",
	borderRadius: 6,
	background: "#fff",
	cursor: "pointer",
	fontSize: 14,
};

export default CarouselTest;
