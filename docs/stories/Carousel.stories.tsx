import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useState } from "react";
import "@eosjs/components";

// Carousel 组件属性接口
interface CarouselProps {
	autoplay?: boolean;
	interval?: number;
	loop?: boolean;
	'show-navigation'?: boolean;
	'initial-index'?: number;
	'indicator-position'?: 'top' | 'bottom' | 'left' | 'right';
	'indicator-style'?: 'default' | 'dots' | 'tiktok';
}

// 扩展 JSX 类型
declare global {
	namespace JSX {
		interface IntrinsicElements {
			'eos-carousel': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & CarouselProps;
		}
	}
}

const meta: Meta<CarouselProps> = {
	title: "组件/Carousel 轮播图",
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
# Carousel 轮播图组件

一个功能强大且灵活的轮播图组件，支持多种指示器样式、位置和交互特性。

## 核心特性

- **🎨 多样式指示器**: 支持进度条、圆点、抖音风格等指示器
- **📍 灵活定位**: 指示器可放置在任意边（上、下、左、右）
- **⚡ 自动播放**: 可配置间隔时间的自动播放功能
- **🖱️ 丰富交互**: 支持触摸滑动、键盘导航、点击导航
- **🎯 初始位置**: 可从任意幻灯片开始播放
- **♾️ 循环模式**: 无缝无限滚动
- **📱 触摸友好**: 完整的移动端触摸手势支持
- **🔧 事件系统**: 完整的生命周期和交互事件

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| \`autoplay\` | boolean | false | 是否自动播放 |
| \`interval\` | number | 3000 | 自动播放间隔时间（毫秒）|
| \`loop\` | boolean | false | 是否启用循环模式 |
| \`show-navigation\` | boolean | true | 是否显示导航按钮 |
| \`initial-index\` | number | 0 | 初始显示的幻灯片索引 |
| \`indicator-position\` | 'top' \\| 'bottom' \\| 'left' \\| 'right' | 'bottom' | 指示器位置 |
| \`indicator-style\` | 'default' \\| 'dots' \\| 'tiktok' | 'default' | 指示器样式 |

## CSS 自定义属性

\`\`\`css
eos-carousel {
  --carousel-height: 400px;           /* 轮播图高度 */
  --progress-bar-color: #e0e0e0;      /* 进度条背景色 */
  --progress-bar-active-color: #007bff; /* 进度条激活色 */
  --control-bg: rgba(0,0,0,0.5);     /* 控制按钮背景 */
  --control-color: white;             /* 控制按钮颜色 */
  --dot-size: 8px;                    /* 圆点大小 */
  --tiktok-bar-width: 3px;           /* TikTok风格进度条宽度 */
}
\`\`\`

## 事件

- \`change\`: 幻灯片切换时触发，包含当前和上一个索引
- \`slide-click\`: 幻灯片被点击时触发，包含索引信息
        `,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		autoplay: {
			control: "boolean",
			description: "启用自动播放",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		interval: {
			control: { type: "number", min: 1000, max: 10000, step: 500 },
			description: "自动播放间隔时间（毫秒）",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "3000" },
			},
		},
		loop: {
			control: "boolean",
			description: "启用循环模式",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		'show-navigation': {
			control: "boolean",
			description: "显示导航按钮（上一页/下一页）",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" },
			},
		},
		'initial-index': {
			control: { type: "number", min: 0, max: 10, step: 1 },
			description: "初始显示的幻灯片索引",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "0" },
			},
		},
		'indicator-position': {
			control: { type: "select", options: ["top", "bottom", "left", "right"] },
			description: "指示器位置",
			table: {
				type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
				defaultValue: { summary: "'bottom'" },
			},
		},
		'indicator-style': {
			control: { type: "select", options: ["default", "dots", "tiktok"] },
			description: "指示器样式",
			table: {
				type: { summary: "'default' | 'dots' | 'tiktok'" },
				defaultValue: { summary: "'default'" },
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Professional slide content with beautiful gradients and imagery simulation
const slides = [
	{
		gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		title: "Innovation",
		subtitle: "Pushing boundaries",
		icon: "🚀",
	},
	{
		gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
		title: "Creative",
		subtitle: "Design excellence",
		icon: "🎨",
	},
	{
		gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
		title: "Technology",
		subtitle: "Future forward",
		icon: "⚡",
	},
	{
		gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
		title: "Growth",
		subtitle: "Sustainable progress",
		icon: "🌱",
	},
	{
		gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
		title: "Success",
		subtitle: "Achieving goals",
		icon: "🏆",
	},
];

const createSlide = (slideData: (typeof slides)[0], index: number) =>
	React.createElement(
		"div",
		{
			key: index,
			style: {
				background: slideData.gradient,
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				color: "white",
				padding: "40px",
				boxSizing: "border-box",
			},
		},
		[
			React.createElement(
				"div",
				{
					key: "icon",
					style: { fontSize: "72px", marginBottom: "20px" },
				},
				slideData.icon,
			),
			React.createElement(
				"h2",
				{
					key: "title",
					style: {
						margin: 0,
						fontSize: "42px",
						fontWeight: "bold",
						marginBottom: "10px",
						textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
					},
				},
				slideData.title,
			),
			React.createElement(
				"p",
				{
					key: "subtitle",
					style: {
						margin: 0,
						fontSize: "18px",
						opacity: 0.9,
						letterSpacing: "1px",
					},
				},
				slideData.subtitle,
			),
		],
	);

export const Default: Story = {
	name: '基础用法',
	args: {
		autoplay: true,
		interval: 3000,
		loop: true,
		'show-navigation': true,
		'initial-index': 0,
		'indicator-position': 'bottom',
		'indicator-style': 'default',
	},
	render: (args: any) => {
		const [currentSlide, setCurrentSlide] = useState(0);
		const [events, setEvents] = useState<string[]>([]);

		useEffect(() => {
			const carousel = document.querySelector('eos-carousel');
			if (!carousel) return;

			const handleChange = (e: CustomEvent) => {
				setCurrentSlide(e.detail.currentIndex);
				setEvents(prev => [...prev.slice(-4), `切换到幻灯片 ${e.detail.currentIndex + 1}`]);
			};

			const handleSlideClick = (e: CustomEvent) => {
				setEvents(prev => [...prev.slice(-4), `点击了幻灯片 ${e.detail.index + 1}`]);
			};

			carousel.addEventListener('change', handleChange);
			carousel.addEventListener('slide-click', handleSlideClick);

			return () => {
				carousel.removeEventListener('change', handleChange);
				carousel.removeEventListener('slide-click', handleSlideClick);
			};
		}, []);

		return (
			<div style={{ padding: '20px' }}>
				<h3>轮播图组件演示</h3>
				<p>使用右侧控件调整各种参数体验不同配置</p>

				<div style={{ width: '600px', maxWidth: '100%', margin: '20px 0' }}>
					<eos-carousel
						autoplay={args.autoplay}
						interval={args.interval}
						loop={args.loop}
						show-navigation={args['show-navigation']}
						initial-index={args['initial-index']}
						indicator-position={args['indicator-position']}
						indicator-style={args['indicator-style']}
						style={{ height: '300px' }}
					>
						{slides.map((slide, index) =>
							React.createElement('div', {
								key: index,
								style: {
									background: slide.gradient,
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									color: 'white',
									fontSize: '24px',
									fontWeight: 'bold',
									textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
								}
							}, [
								React.createElement('div', { key: 'icon', style: { fontSize: '48px', marginBottom: '10px' } }, slide.icon),
								React.createElement('h2', { key: 'title', style: { margin: 0, marginBottom: '5px' } }, slide.title),
								React.createElement('p', { key: 'subtitle', style: { margin: 0, fontSize: '16px', opacity: 0.9 } }, slide.subtitle),
							])
						)}
					</eos-carousel>
				</div>

				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
					<div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
						<h4>当前状态</h4>
						<p><strong>当前幻灯片:</strong> {currentSlide + 1} / {slides.length}</p>
						<p><strong>总计:</strong> {slides.length} 张幻灯片</p>
					</div>
					<div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
						<h4>最近事件</h4>
						<div style={{ fontSize: '14px', color: '#666' }}>
							{events.length === 0 ? '暂无事件' : events.map((event, i) =>
								React.createElement('div', { key: i }, event)
							)}
						</div>
					</div>
				</div>

				<div style={{ marginTop: '20px', padding: '15px', background: '#e7f3ff', borderRadius: '8px' }}>
					<h4>💡 交互提示</h4>
					<ul style={{ margin: 0, paddingLeft: '20px' }}>
						<li>使用左右箭头键进行导航</li>
						<li>点击幻灯片查看点击事件</li>
						<li>在移动设备上支持触摸滑动</li>
						<li>尝试不同的指示器样式和位置</li>
					</ul>
				</div>
			</div>
		);
	},
};
