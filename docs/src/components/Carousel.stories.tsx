import { registerComponents } from "@eosjs/components";
import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { useRef, useState } from "react";

// 扩展 JSX 类型
declare global {
	namespace JSX {
		interface IntrinsicElements {
			"eos-carousel": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				autoplay?: boolean;
				interval?: string | number;
				loop?: boolean;
				"show-indicators"?: boolean;
				"show-arrows"?: boolean;
				onChange?: (event: CustomEvent) => void;
				onSlideClick?: (event: CustomEvent) => void;
			};
		}
	}
}

// 注册组件
registerComponents();

const meta: Meta = {
	title: "组件/Carousel 轮播图",
	parameters: {
		docs: {
			description: {
				component: `
# Carousel 轮播图

轮播图组件，支持自动播放、手动控制、循环播放等功能，适用于图片展示、内容轮播等场景。

## 何时使用

- 展示多张图片或内容时
- 需要节省页面空间时
- 需要突出展示重要内容时
- 制作产品展示、广告轮播等

## 特性

- 🎠 **自动播放** - 支持自动轮播，可自定义间隔时间
- 🔄 **循环播放** - 支持无限循环播放
- 🎯 **指示器** - 显示当前位置和总数
- ⬅️➡️ **导航箭头** - 支持手动切换
- 📱 **触摸支持** - 支持移动端手势滑动
- ⚡ **事件支持** - 支持切换和点击事件监听
- 🎨 **自定义内容** - 支持任意 HTML 内容
        `,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		autoplay: {
			control: "boolean",
			description: "是否自动播放",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
				category: "行为",
			},
		},
		interval: {
			control: { type: "number", min: 1000, max: 10000, step: 500 },
			description: "自动播放间隔时间（毫秒）",
			table: {
				type: { summary: "string | number" },
				defaultValue: { summary: "3000" },
				category: "行为",
			},
		},
		loop: {
			control: "boolean",
			description: "是否循环播放",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" },
				category: "行为",
			},
		},
		"show-indicators": {
			control: "boolean",
			description: "是否显示指示器",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" },
				category: "外观",
			},
		},
		"show-arrows": {
			control: "boolean",
			description: "是否显示导航箭头",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" },
				category: "外观",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础示例
export const Default: Story = {
	name: "基础用法",
	render: (args) => (
		<eos-carousel
			autoplay={args.autoplay}
			interval={args.interval}
			loop={args.loop}
			show-indicators={args["show-indicators"]}
			show-arrows={args["show-arrows"]}
			style={{
				"--carousel-height": "300px",
				borderRadius: "8px",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "white",
					fontSize: "24px",
					fontWeight: "bold",
					height: "300px",
				}}
			>
				<div style={{ textAlign: "center" }}>
					<h2 style={{ margin: "0 0 8px 0" }}>第一张幻灯片</h2>
					<p style={{ margin: 0, opacity: 0.9 }}>这是第一张幻灯片的内容</p>
				</div>
			</div>
			<div
				style={{
					background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "white",
					fontSize: "24px",
					fontWeight: "bold",
					height: "300px",
				}}
			>
				<div style={{ textAlign: "center" }}>
					<h2 style={{ margin: "0 0 8px 0" }}>第二张幻灯片</h2>
					<p style={{ margin: 0, opacity: 0.9 }}>这是第二张幻灯片的内容</p>
				</div>
			</div>
			<div
				style={{
					background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "white",
					fontSize: "24px",
					fontWeight: "bold",
					height: "300px",
				}}
			>
				<div style={{ textAlign: "center" }}>
					<h2 style={{ margin: "0 0 8px 0" }}>第三张幻灯片</h2>
					<p style={{ margin: 0, opacity: 0.9 }}>这是第三张幻灯片的内容</p>
				</div>
			</div>
		</eos-carousel>
	),
	args: {
		autoplay: true,
		interval: 3000,
		loop: true,
		"show-indicators": true,
		"show-arrows": true,
	},
};

// 图片轮播
export const ImageCarousel: Story = {
	name: "图片轮播",
	render: () => (
		<eos-carousel
			autoplay
			interval={4000}
			loop
			style={{
				"--carousel-height": "400px",
				borderRadius: "8px",
				overflow: "hidden",
			}}
		>
			{[1, 2, 3, 4].map((i) => (
				<div key={i} style={{ position: "relative", height: "400px" }}>
					<img
						src={`https://picsum.photos/800/400?random=${i}`}
						alt={`图片 ${i}`}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
					<div
						style={{
							position: "absolute",
							bottom: "20px",
							left: "20px",
							background: "rgba(0, 0, 0, 0.7)",
							color: "white",
							padding: "12px 20px",
							borderRadius: "8px",
						}}
					>
						<h3 style={{ margin: "0 0 4px 0", fontSize: "18px" }}>
							图片标题 {i}
						</h3>
						<p style={{ margin: 0, fontSize: "14px", opacity: 0.9 }}>
							这是第 {i} 张图片的描述信息
						</p>
					</div>
				</div>
			))}
		</eos-carousel>
	),
	parameters: {
		docs: {
			description: {
				story: "轮播图常用于展示图片内容，可以添加标题和描述信息。",
			},
		},
	},
};

// 卡片轮播
export const CardCarousel: Story = {
	name: "卡片轮播",
	render: () => (
		<eos-carousel
			autoplay
			interval={3500}
			loop
			style={{ "--carousel-height": "350px" }}
		>
			{[
				{
					title: "产品特性",
					desc: "高性能、易使用、可扩展",
					icon: "🚀",
					color: "#1976d2",
				},
				{
					title: "技术栈",
					desc: "Web Components + TypeScript",
					icon: "⚡",
					color: "#388e3c",
				},
				{
					title: "兼容性",
					desc: "支持所有现代浏览器",
					icon: "🌐",
					color: "#f57c00",
				},
				{
					title: "开源协议",
					desc: "MIT License，免费商用",
					icon: "📄",
					color: "#7b1fa2",
				},
			].map((card) => (
				<div
					key={card.title}
					style={{
						background: card.color,
						color: "white",
						height: "350px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "center",
						padding: "40px",
					}}
				>
					<div style={{ fontSize: "60px", marginBottom: "20px" }}>
						{card.icon}
					</div>
					<h2 style={{ margin: "0 0 16px 0", fontSize: "28px" }}>
						{card.title}
					</h2>
					<p
						style={{
							margin: 0,
							fontSize: "18px",
							opacity: 0.9,
							lineHeight: 1.5,
						}}
					>
						{card.desc}
					</p>
				</div>
			))}
		</eos-carousel>
	),
	parameters: {
		docs: {
			description: {
				story: "轮播图可以用于展示产品特性、服务介绍等卡片式内容。",
			},
		},
	},
};

// 定义轮播图事件类型
interface CarouselChangeEvent extends CustomEvent {
	detail: {
		currentIndex: number;
		previousIndex: number;
	};
}

interface CarouselClickEvent extends CustomEvent {
	detail: {
		index: number;
	};
}

interface CarouselElement extends HTMLElement {
	prev(): void;
	next(): void;
	goTo(index: number): void;
}

// 手动控制
export const ManualControl: Story = {
	name: "手动控制",
	render: () => {
		const carouselRef = useRef<CarouselElement>(null);
		const [currentSlide, setCurrentSlide] = useState(0);

		const handleSlideChange = (event: CarouselChangeEvent) => {
			setCurrentSlide(event.detail.currentIndex);
		};

		const goToPrev = () => carouselRef.current?.prev();
		const goToNext = () => carouselRef.current?.next();
		const goToSlide = (index: number) => carouselRef.current?.goTo(index);

		return (
			<div>
				<eos-carousel
					ref={carouselRef}
					loop
					onChange={handleSlideChange}
					style={{
						"--carousel-height": "250px",
						borderRadius: "8px",
						overflow: "hidden",
						marginBottom: "20px",
					}}
				>
					{Array.from({ length: 5 }, (_, i) => (
						<div
							key={`slide-${i}`}
							style={{
								background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%) 0%, hsl(${i * 60 + 30}, 70%, 50%) 100%)`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "white",
								fontSize: "20px",
								fontWeight: "bold",
								height: "250px",
							}}
						>
							<div style={{ textAlign: "center" }}>
								<h2 style={{ margin: "0 0 8px 0" }}>幻灯片 {i + 1}</h2>
								<p style={{ margin: 0, opacity: 0.9 }}>手动控制演示</p>
							</div>
						</div>
					))}
				</eos-carousel>

				<div
					style={{
						display: "flex",
						gap: "12px",
						justifyContent: "center",
						flexWrap: "wrap",
					}}
				>
					<button
						onClick={goToPrev}
						style={{
							padding: "8px 16px",
							background: "#1976d2",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						上一张
					</button>
					<button
						onClick={goToNext}
						style={{
							padding: "8px 16px",
							background: "#1976d2",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						下一张
					</button>
					{Array.from({ length: 5 }, (_, i) => (
						<button
							key={`btn-${i}`}
							onClick={() => goToSlide(i)}
							style={{
								padding: "8px 12px",
								background: currentSlide === i ? "#4caf50" : "#f0f0f0",
								color: currentSlide === i ? "white" : "#333",
								border: "none",
								borderRadius: "4px",
								cursor: "pointer",
								fontSize: "14px",
							}}
						>
							{i + 1}
						</button>
					))}
				</div>

				<div
					style={{
						textAlign: "center",
						marginTop: "16px",
						fontSize: "14px",
						color: "#666",
					}}
				>
					当前幻灯片: {currentSlide + 1} / 5
				</div>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"轮播图支持通过 JavaScript API 进行手动控制，包括上一张、下一张和跳转到指定幻灯片。",
			},
		},
	},
};

// 不同配置
export const Configurations: Story = {
	name: "不同配置",
	render: () => (
		<div style={{ display: "grid", gap: "24px" }}>
			<div>
				<h4>无自动播放，显示指示器</h4>
				<eos-carousel
					show-indicators
					show-arrows
					style={{
						"--carousel-height": "200px",
						borderRadius: "8px",
						overflow: "hidden",
					}}
				>
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							style={{
								background: `hsl(${i * 120}, 60%, 70%)`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "white",
								fontSize: "18px",
								fontWeight: "bold",
								height: "200px",
							}}
						>
							手动切换 - 幻灯片 {i}
						</div>
					))}
				</eos-carousel>
			</div>

			<div>
				<h4>快速自动播放，无循环</h4>
				<eos-carousel
					autoplay
					interval={1500}
					loop={false}
					style={{
						"--carousel-height": "200px",
						borderRadius: "8px",
						overflow: "hidden",
					}}
				>
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							style={{
								background: `hsl(${i * 120 + 60}, 60%, 70%)`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "white",
								fontSize: "18px",
								fontWeight: "bold",
								height: "200px",
							}}
						>
							快速播放 - 幻灯片 {i}
						</div>
					))}
				</eos-carousel>
			</div>

			<div>
				<h4>隐藏控件</h4>
				<eos-carousel
					autoplay
					interval={2500}
					show-indicators={false}
					show-arrows={false}
					style={{
						"--carousel-height": "200px",
						borderRadius: "8px",
						overflow: "hidden",
					}}
				>
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							style={{
								background: `hsl(${i * 120 + 120}, 60%, 70%)`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "white",
								fontSize: "18px",
								fontWeight: "bold",
								height: "200px",
							}}
						>
							简洁模式 - 幻灯片 {i}
						</div>
					))}
				</eos-carousel>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"轮播图支持多种配置选项，可以根据需求调整自动播放、循环、指示器等功能。",
			},
		},
	},
};

// 事件处理
export const Events: Story = {
	name: "事件处理",
	render: () => {
		const [eventLog, setEventLog] = useState<string[]>([]);

		const addLog = (message: string) => {
			const timestamp = new Date().toLocaleTimeString();
			setEventLog((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 4)]);
		};

		const handleSlideChange = (event: CarouselChangeEvent) => {
			const { previousIndex, currentIndex } = event.detail;
			addLog(`幻灯片切换: ${previousIndex} → ${currentIndex}`);
		};

		const handleSlideClick = (event: CarouselClickEvent) => {
			const { index } = event.detail;
			addLog(`点击了第 ${index + 1} 张幻灯片`);
		};

		return (
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "24px",
					alignItems: "start",
				}}
			>
				<div>
					<h4>轮播图</h4>
					<eos-carousel
						autoplay
						interval={2000}
						onChange={handleSlideChange}
						onSlideClick={handleSlideClick}
						style={{
							"--carousel-height": "250px",
							borderRadius: "8px",
							overflow: "hidden",
						}}
					>
						{["🎨", "🚀", "⚡", "🌟"].map((icon, i) => (
							<div
								key={icon}
								style={{
									background: `hsl(${i * 90}, 60%, 70%)`,
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									color: "white",
									fontSize: "18px",
									fontWeight: "bold",
									height: "250px",
									cursor: "pointer",
								}}
							>
								<div style={{ fontSize: "48px", marginBottom: "12px" }}>
									{icon}
								</div>
								<div>点击我试试</div>
								<div style={{ fontSize: "14px", opacity: 0.8 }}>
									幻灯片 {i + 1}
								</div>
							</div>
						))}
					</eos-carousel>
				</div>

				<div>
					<h4>事件日志</h4>
					<div
						style={{
							background: "#f8f9fa",
							border: "1px solid #dee2e6",
							borderRadius: "4px",
							padding: "12px",
							minHeight: "250px",
							fontSize: "14px",
							fontFamily: "monospace",
						}}
					>
						{eventLog.length > 0 ? (
							eventLog.map((log) => (
								<div key={log} style={{ marginBottom: "4px" }}>
									{log}
								</div>
							))
						) : (
							<div style={{ color: "#666" }}>等待事件触发...</div>
						)}
					</div>
				</div>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"轮播图支持 change 和 slide-click 事件，可以监听幻灯片切换和点击操作。",
			},
		},
	},
};

// 综合示例
export const Playground: Story = {
	name: "交互演示",
	render: (args) => {
		const [isPlaying, setIsPlaying] = useState(true);
		const [currentSlide, setCurrentSlide] = useState(0);
		const carouselRef = useRef<CarouselElement>(null);

		const togglePlay = () => {
			setIsPlaying(!isPlaying);
			// 这里可以通过 ref 控制轮播图的播放状态
		};

		const handleSlideChange = (event: CarouselChangeEvent) => {
			setCurrentSlide(event.detail.currentIndex);
		};

		const slides = [
			{ title: "欢迎使用", desc: "Eos Components 轮播图", bg: "#1976d2" },
			{ title: "功能丰富", desc: "支持自动播放和手动控制", bg: "#388e3c" },
			{ title: "易于使用", desc: "简单的 API 设计", bg: "#f57c00" },
			{ title: "高度定制", desc: "支持各种配置选项", bg: "#7b1fa2" },
		];

		return (
			<div
				style={{
					padding: "24px",
					background: "#f5f5f5",
					borderRadius: "8px",
				}}
			>
				<h3 style={{ marginTop: 0, textAlign: "center" }}>轮播图演示</h3>

				<eos-carousel
					ref={carouselRef}
					autoplay={args.autoplay && isPlaying}
					interval={args.interval}
					loop={args.loop}
					show-indicators={args["show-indicators"]}
					show-arrows={args["show-arrows"]}
					onChange={handleSlideChange}
					style={{
						"--carousel-height": "300px",
						borderRadius: "8px",
						overflow: "hidden",
						marginBottom: "20px",
					}}
				>
					{slides.map((slide) => (
						<div
							key={slide.title}
							style={{
								background: slide.bg,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								color: "white",
								height: "300px",
								textAlign: "center",
								padding: "40px",
							}}
						>
							<h2 style={{ margin: "0 0 16px 0", fontSize: "32px" }}>
								{slide.title}
							</h2>
							<p style={{ margin: 0, fontSize: "18px", opacity: 0.9 }}>
								{slide.desc}
							</p>
						</div>
					))}
				</eos-carousel>

				<div style={{ textAlign: "center", marginBottom: "16px" }}>
					<button
						onClick={togglePlay}
						style={{
							padding: "8px 16px",
							background: isPlaying ? "#f44336" : "#4caf50",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
							marginRight: "8px",
						}}
					>
						{isPlaying ? "⏸️ 暂停" : "▶️ 播放"}
					</button>

					<span style={{ fontSize: "14px", color: "#666" }}>
						{currentSlide + 1} / {slides.length}
					</span>
				</div>

				<div style={{ textAlign: "center", fontSize: "14px", color: "#666" }}>
					<p>尝试调整右侧控件来查看不同效果</p>
				</div>
			</div>
		);
	},
	args: {
		autoplay: true,
		interval: 3000,
		loop: true,
		"show-indicators": true,
		"show-arrows": true,
	},
	parameters: {
		docs: {
			description: {
				story: "这是一个完整的交互示例，展示了轮播图的各种功能和配置选项。",
			},
		},
	},
};
