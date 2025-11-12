import { registerComponents } from "@eosjs/components";
import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { useState } from "react";

// 扩展 JSX 类型
declare global {
	namespace JSX {
		interface IntrinsicElements {
			"eos-image": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				src?: string;
				alt?: string;
				width?: string | number;
				height?: string | number;
				"object-fit"?: "cover" | "contain" | "fill" | "scale-down" | "none";
				circle?: boolean;
				responsive?: boolean;
				loading?: "lazy" | "eager";
				crossorigin?: "anonymous" | "use-credentials";
				blurhash?: string;
				"blurhash-only"?: boolean;
				onLoad?: (event: CustomEvent) => void;
				onError?: (event: CustomEvent) => void;
			};
		}
	}
}

// 注册组件
registerComponents();

const meta: Meta = {
	title: "组件/Image 图片",
	parameters: {
		docs: {
			description: {
				component: `
# Image 图片

可预览的图片组件，支持多种显示模式、懒加载、BlurHash 预览等高级功能。

## 何时使用

- 需要展示图片内容时
- 需要图片懒加载优化性能时
- 需要统一的图片展示样式时
- 需要图片加载状态反馈时

## 特性

- 🖼️ **多种显示模式** - 支持 cover、contain、fill 等 object-fit 模式
- 🔄 **懒加载支持** - 内置懒加载功能，优化页面性能
- 🎨 **BlurHash 预览** - 支持 BlurHash 模糊预览，提升用户体验
- 📱 **响应式设计** - 自适应不同屏幕尺寸
- ⚡ **事件支持** - 支持加载成功、失败等事件监听
- 🎯 **无障碍** - 完整的 alt 文本和屏幕阅读器支持
- 🔒 **跨域支持** - 支持 CORS 跨域图片加载
        `,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		src: {
			control: "text",
			description: "图片地址",
			table: {
				type: { summary: "string" },
				category: "基础",
			},
		},
		alt: {
			control: "text",
			description: "图片描述文本",
			table: {
				type: { summary: "string" },
				category: "基础",
			},
		},
		width: {
			control: "text",
			description: "图片宽度",
			table: {
				type: { summary: "string | number" },
				category: "尺寸",
			},
		},
		height: {
			control: "text",
			description: "图片高度",
			table: {
				type: { summary: "string | number" },
				category: "尺寸",
			},
		},
		"object-fit": {
			control: { type: "select" },
			options: ["cover", "contain", "fill", "scale-down", "none"],
			description: "图片填充模式",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "cover" },
				category: "外观",
			},
		},
		circle: {
			control: "boolean",
			description: "是否显示为圆形",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
				category: "外观",
			},
		},
		responsive: {
			control: "boolean",
			description: "是否响应式",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
				category: "行为",
			},
		},
		loading: {
			control: { type: "select" },
			options: ["lazy", "eager"],
			description: "加载方式",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "lazy" },
				category: "行为",
			},
		},
		crossorigin: {
			control: { type: "select" },
			options: ["anonymous", "use-credentials"],
			description: "跨域设置",
			table: {
				type: { summary: "string" },
				category: "行为",
			},
		},
		blurhash: {
			control: "text",
			description: "BlurHash 字符串",
			table: {
				type: { summary: "string" },
				category: "高级",
			},
		},
		"blurhash-only": {
			control: "boolean",
			description: "仅显示 BlurHash",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
				category: "高级",
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
		<eos-image
			src={args.src || "https://picsum.photos/300/200?random=1"}
			alt={args.alt || "示例图片"}
			width={args.width || "300px"}
			height={args.height || "200px"}
			{...args}
		/>
	),
	args: {
		src: "https://picsum.photos/300/200?random=1",
		alt: "示例图片",
		width: "300px",
		height: "200px",
	},
};

// 图片尺寸
export const Sizes: Story = {
	name: "不同尺寸",
	render: () => (
		<div
			style={{
				display: "flex",
				gap: "16px",
				alignItems: "flex-end",
				flexWrap: "wrap",
			}}
		>
			<div style={{ textAlign: "center" }}>
				<eos-image
					src="https://picsum.photos/100/100?random=2"
					alt="小图片"
					width="100px"
					height="100px"
				/>
				<p style={{ margin: "8px 0 0", fontSize: "14px", color: "#666" }}>
					100x100
				</p>
			</div>
			<div style={{ textAlign: "center" }}>
				<eos-image
					src="https://picsum.photos/200/150?random=3"
					alt="中图片"
					width="200px"
					height="150px"
				/>
				<p style={{ margin: "8px 0 0", fontSize: "14px", color: "#666" }}>
					200x150
				</p>
			</div>
			<div style={{ textAlign: "center" }}>
				<eos-image
					src="https://picsum.photos/300/200?random=4"
					alt="大图片"
					width="300px"
					height="200px"
				/>
				<p style={{ margin: "8px 0 0", fontSize: "14px", color: "#666" }}>
					300x200
				</p>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: "通过设置 width 和 height 属性可以控制图片的显示尺寸。",
			},
		},
	},
};

// Object-fit 模式
export const ObjectFit: Story = {
	name: "Object-fit 模式",
	render: () => (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
				gap: "16px",
			}}
		>
			{[
				{ mode: "cover", desc: "保持比例，填满容器" },
				{ mode: "contain", desc: "保持比例，完整显示" },
				{ mode: "fill", desc: "拉伸填满容器" },
				{ mode: "scale-down", desc: "缩小到合适尺寸" },
				{ mode: "none", desc: "保持原始尺寸" },
			].map(({ mode, desc }) => (
				<div key={mode} style={{ textAlign: "center" }}>
					<eos-image
						src="https://picsum.photos/400/300?random=5"
						alt={`${mode} 模式`}
						width="150px"
						height="150px"
						object-fit={mode as any}
						style={{ border: "1px solid #ddd", borderRadius: "8px" }}
					/>
					<h4 style={{ margin: "8px 0 4px", fontSize: "14px" }}>{mode}</h4>
					<p style={{ margin: 0, fontSize: "12px", color: "#666" }}>{desc}</p>
				</div>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"object-fit 属性控制图片在容器中的显示方式，类似于 CSS 的 object-fit 属性。",
			},
		},
	},
};

// 圆形图片
export const Circle: Story = {
	name: "圆形图片",
	render: () => (
		<div
			style={{
				display: "flex",
				gap: "16px",
				alignItems: "center",
				flexWrap: "wrap",
			}}
		>
			<div style={{ textAlign: "center" }}>
				<eos-image
					src="https://picsum.photos/100/100?random=6"
					alt="小头像"
					width="60px"
					height="60px"
					circle
				/>
				<p style={{ margin: "8px 0 0", fontSize: "14px", color: "#666" }}>
					60x60
				</p>
			</div>
			<div style={{ textAlign: "center" }}>
				<eos-image
					src="https://picsum.photos/150/150?random=7"
					alt="中头像"
					width="80px"
					height="80px"
					circle
				/>
				<p style={{ margin: "8px 0 0", fontSize: "14px", color: "#666" }}>
					80x80
				</p>
			</div>
			<div style={{ textAlign: "center" }}>
				<eos-image
					src="https://picsum.photos/200/200?random=8"
					alt="大头像"
					width="120px"
					height="120px"
					circle
				/>
				<p style={{ margin: "8px 0 0", fontSize: "14px", color: "#666" }}>
					120x120
				</p>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: "添加 circle 属性可以将图片显示为圆形，常用于头像展示。",
			},
		},
	},
};

// 响应式图片
export const Responsive: Story = {
	name: "响应式图片",
	render: () => (
		<div style={{ maxWidth: "600px" }}>
			<h4>响应式图片（会根据容器宽度自适应）</h4>
			<eos-image
				src="https://picsum.photos/800/400?random=9"
				alt="响应式图片"
				responsive
				style={{ border: "1px solid #ddd", borderRadius: "8px" }}
			/>
			<p style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
				调整浏览器窗口大小查看效果
			</p>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: "添加 responsive 属性可以让图片根据容器宽度自适应缩放。",
			},
		},
	},
};

// 懒加载
export const LazyLoading: Story = {
	name: "懒加载",
	render: () => (
		<div
			style={{
				height: "400px",
				overflowY: "auto",
				border: "1px solid #ddd",
				padding: "16px",
			}}
		>
			<p>向下滚动查看懒加载效果：</p>
			{Array.from({ length: 10 }, (_, i) => (
				<div key={i} style={{ marginBottom: "20px", textAlign: "center" }}>
					<h4>图片 {i + 1}</h4>
					<eos-image
						src={`https://picsum.photos/300/200?random=${i + 10}`}
						alt={`懒加载图片 ${i + 1}`}
						width="300px"
						height="200px"
						loading="lazy"
						style={{ border: "1px solid #ddd", borderRadius: "8px" }}
					/>
				</div>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'设置 loading="lazy" 可以启用懒加载，只有当图片进入视口时才开始加载。',
			},
		},
	},
};

// BlurHash 支持
export const BlurHash: Story = {
	name: "BlurHash 预览",
	render: () => (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
				gap: "16px",
			}}
		>
			<div style={{ textAlign: "center" }}>
				<h4>带 BlurHash 预览</h4>
				<eos-image
					src="https://picsum.photos/200/150?random=20"
					alt="BlurHash 示例"
					width="200px"
					height="150px"
					blurhash="LyIXL4xYt7j[^-xWt7j[I:oIs;j]"
					style={{ borderRadius: "8px" }}
				/>
				<p style={{ margin: "8px 0 0", fontSize: "12px", color: "#666" }}>
					加载时显示模糊预览
				</p>
			</div>

			<div style={{ textAlign: "center" }}>
				<h4>仅显示 BlurHash</h4>
				<eos-image
					blurhash="LyIXL4xYt7j[^-xWt7j[I:oIs;j]"
					blurhash-only
					width="200px"
					height="150px"
					style={{ borderRadius: "8px" }}
				/>
				<p style={{ margin: "8px 0 0", fontSize: "12px", color: "#666" }}>
					装饰性模糊背景
				</p>
			</div>

			<div style={{ textAlign: "center" }}>
				<h4>不同的 BlurHash</h4>
				<eos-image
					blurhash="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
					blurhash-only
					width="200px"
					height="150px"
					style={{ borderRadius: "8px" }}
				/>
				<p style={{ margin: "8px 0 0", fontSize: "12px", color: "#666" }}>
					另一种颜色风格
				</p>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"BlurHash 是一种将图片编码为短字符串的算法，可以在图片加载前显示模糊预览，提升用户体验。",
			},
		},
	},
};

// 事件处理
export const Events: Story = {
	name: "事件处理",
	render: () => {
		const [imageCounter, setImageCounter] = useState(1);
		const [loadStatus, setLoadStatus] = useState("");
		const [eventLog, setEventLog] = useState<string[]>([]);

		const addLog = (message: string) => {
			const timestamp = new Date().toLocaleTimeString();
			setEventLog((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 4)]);
		};

		const handleLoad = (event: any) => {
			setLoadStatus("loaded");
			addLog("✅ 图片加载成功");
		};

		const handleError = (event: any) => {
			setLoadStatus("error");
			addLog("❌ 图片加载失败");
		};

		const generateNewImage = () => {
			setImageCounter((prev) => prev + 1);
			setLoadStatus("loading");
			addLog("🔄 开始加载新图片...");
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
				<div style={{ textAlign: "center" }}>
					<h4>图片展示</h4>
					<eos-image
						src={`https://picsum.photos/300/200?random=${imageCounter + 30}`}
						alt="事件测试图片"
						width="300px"
						height="200px"
						onLoad={handleLoad}
						onError={handleError}
						style={{ border: "1px solid #ddd", borderRadius: "8px" }}
					/>

					<div style={{ marginTop: "16px" }}>
						<button
							onClick={generateNewImage}
							style={{
								padding: "8px 16px",
								background: "#1976d2",
								color: "white",
								border: "none",
								borderRadius: "4px",
								cursor: "pointer",
							}}
						>
							加载新图片
						</button>
					</div>

					{loadStatus && (
						<div
							style={{
								marginTop: "12px",
								padding: "8px",
								borderRadius: "4px",
								fontSize: "14px",
								background:
									loadStatus === "loaded"
										? "#d4edda"
										: loadStatus === "error"
											? "#f8d7da"
											: "#fff3cd",
								color:
									loadStatus === "loaded"
										? "#155724"
										: loadStatus === "error"
											? "#721c24"
											: "#856404",
							}}
						>
							状态:{" "}
							{loadStatus === "loaded"
								? "加载成功"
								: loadStatus === "error"
									? "加载失败"
									: "加载中..."}
						</div>
					)}
				</div>

				<div>
					<h4>事件日志</h4>
					<div
						style={{
							background: "#f8f9fa",
							border: "1px solid #dee2e6",
							borderRadius: "4px",
							padding: "12px",
							minHeight: "200px",
							fontSize: "14px",
							fontFamily: "monospace",
						}}
					>
						{eventLog.length > 0 ? (
							eventLog.map((log, index) => (
								<div key={index} style={{ marginBottom: "4px" }}>
									{log}
								</div>
							))
						) : (
							<div style={{ color: "#666" }}>暂无事件日志</div>
						)}
					</div>
				</div>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: "图片组件支持 load 和 error 事件，可以监听图片的加载状态。",
			},
		},
	},
};

// 综合示例
export const Playground: Story = {
	name: "交互演示",
	render: (args) => {
		const [currentImage, setCurrentImage] = useState(1);
		const [loadingState, setLoadingState] = useState<
			"loading" | "loaded" | "error"
		>("loaded");

		const images = [
			{
				id: 1,
				url: "https://picsum.photos/400/300?random=40",
				desc: "风景图片",
			},
			{
				id: 2,
				url: "https://picsum.photos/400/300?random=41",
				desc: "建筑图片",
			},
			{
				id: 3,
				url: "https://picsum.photos/400/300?random=42",
				desc: "自然图片",
			},
		];

		const handleImageChange = (imageId: number) => {
			setCurrentImage(imageId);
			setLoadingState("loading");
		};

		const handleLoad = () => {
			setLoadingState("loaded");
		};

		const handleError = () => {
			setLoadingState("error");
		};

		const currentImageData = images.find((img) => img.id === currentImage);

		return (
			<div
				style={{
					padding: "24px",
					background: "#f5f5f5",
					borderRadius: "8px",
				}}
			>
				<h3 style={{ marginTop: 0, textAlign: "center" }}>图片展示器</h3>

				<div style={{ textAlign: "center", marginBottom: "20px" }}>
					<eos-image
						src={currentImageData?.url}
						alt={currentImageData?.desc}
						width={args.width || "400px"}
						height={args.height || "300px"}
						object-fit={args["object-fit"] || "cover"}
						circle={args.circle}
						responsive={args.responsive}
						blurhash={args.blurhash}
						onLoad={handleLoad}
						onError={handleError}
						style={{
							border: "2px solid #ddd",
							borderRadius: args.circle ? "50%" : "8px",
							transition: "all 0.3s ease",
						}}
					/>
				</div>

				<div style={{ textAlign: "center", marginBottom: "16px" }}>
					<div
						style={{
							display: "flex",
							gap: "8px",
							justifyContent: "center",
							flexWrap: "wrap",
						}}
					>
						{images.map((image) => (
							<button
								key={image.id}
								onClick={() => handleImageChange(image.id)}
								style={{
									padding: "8px 16px",
									background: currentImage === image.id ? "#1976d2" : "#f0f0f0",
									color: currentImage === image.id ? "white" : "#333",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
									fontSize: "14px",
								}}
							>
								{image.desc}
							</button>
						))}
					</div>
				</div>

				<div style={{ textAlign: "center", fontSize: "14px", color: "#666" }}>
					<p>
						当前状态:{" "}
						{loadingState === "loading"
							? "🔄 加载中..."
							: loadingState === "loaded"
								? "✅ 加载完成"
								: "❌ 加载失败"}
					</p>
					<p>尝试调整右侧控件来查看不同效果</p>
				</div>
			</div>
		);
	},
	args: {
		width: "400px",
		height: "300px",
		"object-fit": "cover",
		circle: false,
		responsive: false,
		blurhash: "LyIXL4xYt7j[^-xWt7j[I:oIs;j]",
	},
	parameters: {
		docs: {
			description: {
				story: "这是一个完整的交互示例，展示了图片组件的各种功能和配置选项。",
			},
		},
	},
};
