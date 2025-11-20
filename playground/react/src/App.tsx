import {
	AppstoreOutlined,
	InboxOutlined,
	PictureOutlined,
	SwapOutlined,
	ThunderboltOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Empty, Layout, Menu, Space, Tag, Typography } from "antd";
import type React from "react";
import { useState } from "react";
import "./styles.css";
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
			"eos-button": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				type?: string;
				disabled?: boolean;
				loading?: boolean;
				onEClick?: (event: CustomEvent) => void;
			};
			"eos-carousel": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				autoplay?: boolean;
				interval?: string;
				loop?: boolean;
				onChange?: (event: CustomEvent) => void;
			};
			"eos-image": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
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
				onImageLoad?: (event: CustomEvent) => void;
				onImageError?: (event: CustomEvent) => void;
				onImageProgress?: (event: CustomEvent) => void;
			};
		}
	}
}

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const App: React.FC = () => {
	const [selectedKey, setSelectedKey] = useState<string>("button");

	// 处理菜单选择
	const handleMenuSelect: MenuProps["onClick"] = ({ key }) => {
		setSelectedKey(key);
	};

	// 渲染当前选中的组件
	const renderActiveComponent = () => {
		switch (selectedKey) {
			case "button":
				return <ButtonDemo />;
			case "image":
				return <ImageDemo />;
			case "carousel":
				return <CarouselDemo />;
			default:
				return <ButtonDemo />;
		}
	};

	// 菜单项配置
	const menuItems: MenuProps["items"] = [
		{
			key: "button",
			icon: <AppstoreOutlined />,
			label: "Button 按钮",
		},
		{
			key: "image",
			icon: <PictureOutlined />,
			label: "Image 图片",
		},
		{
			key: "carousel",
			icon: <SwapOutlined />,
			label: "Carousel 轮播图",
		},
	];

	return (
		<Layout style={{ height: "100vh", background: "var(--bg-body)" }}>
			{/* 头部 */}
			<Header
				style={{
					background: "var(--bg-container)",
					borderBottom: "1px solid var(--border-color)",
					padding: "0 24px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					boxShadow: "var(--shadow-sm)",
					zIndex: 1000,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
					<ThunderboltOutlined
						style={{ fontSize: "24px", color: "var(--primary-color)" }}
					/>
					<Title
						level={3}
						style={{
							margin: 0,
							color: "var(--text-primary)",
							fontSize: "20px",
						}}
					>
						Eos Components
					</Title>
				</div>
				<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
					<Tag color="blue">React Playground</Tag>
					<Text type="secondary" style={{ fontSize: "12px" }}>
						v0.0.1
					</Text>
				</div>
			</Header>

			<Layout style={{ height: "calc(100vh - 64px)" }}>
				{/* 侧边栏 */}
				<Sider
					width={280}
					style={{
						background: "var(--bg-container)",
						borderRight: "1px solid var(--border-color)",
						boxShadow: "2px 0 8px rgba(0, 0, 0, 0.04)",
					}}
				>
					<div
						style={{
							padding: "20px 24px",
							borderBottom: "1px solid var(--border-color)",
							background: "var(--ant-color-bg-elevated)",
						}}
					>
						<Title
							level={5}
							style={{ margin: "0 0 4px", color: "var(--text-primary)" }}
						>
							组件列表
						</Title>
						<Text type="secondary" style={{ fontSize: "12px" }}>
							Component Library
						</Text>
					</div>

					<Menu
						mode="inline"
						selectedKeys={[selectedKey]}
						items={menuItems}
						onClick={handleMenuSelect}
						style={{
							borderRight: "none",
							padding: "12px 16px",
							background: "var(--bg-container)",
						}}
					/>

					<div
						style={{
							padding: "16px 24px",
							borderTop: "1px solid var(--border-color)",
							background: "var(--ant-color-bg-elevated)",
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
						}}
					>
						<Space
							direction="vertical"
							size="small"
							style={{ width: "100%", textAlign: "center" }}
						>
							<Text type="secondary" style={{ fontSize: "12px" }}>
								基于 Web Components
							</Text>
							<Text type="secondary" style={{ fontSize: "12px" }}>
								支持 React 19 + TypeScript
							</Text>
						</Space>
					</div>
				</Sider>

				{/* 主内容区 */}
				<Content
					style={{ background: "var(--bg-body)", padding: 0, overflow: "auto" }}
				>
					<div style={{ padding: "24px", minHeight: "100%" }}>
						<div
							style={{
								animation: "fadeIn 0.4s ease",
							}}
						>
							{renderActiveComponent()}
						</div>
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};

export default App;
