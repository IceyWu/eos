import { useState, useEffect } from "react";
import "./App.css";
import "@eosjs/components";
import { registerComponents } from "@eosjs/components";
import { ButtonDemo } from "./components/ButtonDemo";
import { CarouselDemo } from "./components/CarouselDemo";
import { ImageDemo } from "./components/ImageDemo";

// 注册 Web Components
registerComponents();

// 扩展 JSX 类型定义
declare global {
	namespace JSX {
		interface IntrinsicElements {
			"e-button": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement> & {
					onEClick?: (event: CustomEvent) => void;
				},
				HTMLElement
			>;
			"e-carousel": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement> & {
					autoplay?: boolean;
					interval?: string;
					loop?: boolean;
					onChange?: (event: CustomEvent) => void;
				},
				HTMLElement
			>;
			"e-image": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement> & {
					src?: string;
					alt?: string;
					width?: string | number;
					height?: string | number;
					"object-fit"?: string;
					circle?: boolean;
					responsive?: boolean;
					loading?: string;
					crossorigin?: string;
					blurhash?: string;
					"blurhash-only"?: boolean;
					onLoad?: (event: CustomEvent) => void;
					onError?: (event: CustomEvent) => void;
				},
				HTMLElement
			>;
		}
	}
}

// 组件列表
const components = [
	{ id: 'button', name: 'Button 按钮', icon: '🔘', component: ButtonDemo },
	{ id: 'carousel', name: 'Carousel 轮播图', icon: '🎠', component: CarouselDemo },
	{ id: 'image', name: 'Image 图片', icon: '🖼️', component: ImageDemo }
];

function App() {
	const [activeComponent, setActiveComponent] = useState('button');

	// 根据 URL hash 设置初始组件
	useEffect(() => {
		const hash = window.location.hash.slice(1);
		if (hash && components.find(c => c.id === hash)) {
			setActiveComponent(hash);
		}

		// 监听 hash 变化
		const handleHashChange = () => {
			const newHash = window.location.hash.slice(1);
			if (newHash && components.find(c => c.id === newHash)) {
				setActiveComponent(newHash);
			}
		};

		window.addEventListener('hashchange', handleHashChange);
		return () => window.removeEventListener('hashchange', handleHashChange);
	}, []);

	const handleNavClick = (componentId: string) => {
		setActiveComponent(componentId);
		window.location.hash = componentId;
	};

	// 获取当前活动组件
	const ActiveComponent = components.find(c => c.id === activeComponent)?.component;

	return (
		<div className="layout-container">
			{/* 侧边栏 */}
			<aside className="sidebar">
				<div className="sidebar-header">
					<h1>Eos Components</h1>
					<span className="badge">React Playground</span>
				</div>
				<nav className="sidebar-nav">
					{components.map(comp => (
						<button
							key={comp.id}
							className={`nav-item ${activeComponent === comp.id ? 'active' : ''}`}
							onClick={() => handleNavClick(comp.id)}
						>
							<span className="nav-icon">{comp.icon}</span>
							<span className="nav-text">{comp.name}</span>
						</button>
					))}
				</nav>
				<div className="sidebar-footer">
					<div className="version">v0.0.1</div>
				</div>
			</aside>

			{/* 主内容区 */}
			<main className="main-content">
				<div id="demo-container">
					{ActiveComponent ? (
						<ActiveComponent />
					) : (
						<div className="welcome">
							<h2>欢迎使用 Eos Components</h2>
							<p>请从左侧菜单选择一个组件查看演示</p>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}

export default App;
