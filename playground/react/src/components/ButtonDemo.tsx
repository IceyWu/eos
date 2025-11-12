import { Space, Tag, Typography } from "antd";
import type React from "react";
import { useState } from "react";

const { Title, Text } = Typography;

export const ButtonDemo: React.FC = () => {
	const [clickCount, setClickCount] = useState(0);
	const [lastClickTime, setLastClickTime] = useState("--:--:--");

	const handleButtonClick = () => {
		setClickCount((prev) => prev + 1);
		setLastClickTime(new Date().toLocaleTimeString("zh-CN"));
	};

	return (
		<div className="component-demo">
			<Space direction="vertical" size="large" style={{ width: "100%" }}>
				<div
					style={{
						background: "white",
						padding: "24px",
						borderRadius: "8px",
						boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "8px",
							marginBottom: "16px",
						}}
					>
						<Title level={4} style={{ margin: 0 }}>
							基础按钮
						</Title>
						<Tag color="blue">Basic</Tag>
					</div>
					<Text type="secondary">展示基础的按钮组件用法</Text>
					<div style={{ marginTop: "16px" }}>
						<Space wrap>
							<eos-button>默认按钮</eos-button>
							<eos-button type="primary">主要按钮</eos-button>
							<eos-button type="success">成功按钮</eos-button>
							<eos-button type="warning">警告按钮</eos-button>
							<eos-button type="danger">危险按钮</eos-button>
						</Space>
					</div>
				</div>

				<div
					style={{
						background: "white",
						padding: "24px",
						borderRadius: "8px",
						boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "8px",
							marginBottom: "16px",
						}}
					>
						<Title level={4} style={{ margin: 0 }}>
							按钮状态
						</Title>
						<Tag color="orange">States</Tag>
					</div>
					<Text type="secondary">展示按钮的不同状态</Text>
					<div style={{ marginTop: "16px" }}>
						<Space wrap>
							<eos-button>普通状态</eos-button>
							<eos-button disabled>禁用状态</eos-button>
							<eos-button loading>加载中</eos-button>
						</Space>
					</div>
				</div>

				<div
					style={{
						background: "white",
						padding: "24px",
						borderRadius: "8px",
						boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "8px",
							marginBottom: "16px",
						}}
					>
						<Title level={4} style={{ margin: 0 }}>
							交互演示
						</Title>
						<Tag color="green">Interactive</Tag>
					</div>
					<Text type="secondary">点击按钮查看交互效果</Text>
					<div style={{ marginTop: "16px", textAlign: "center" }}>
						<eos-button
							onEClick={handleButtonClick}
							type="primary"
							style={{ fontSize: "16px" }}
						>
							点击计数: {clickCount}
						</eos-button>
						<div style={{ marginTop: "12px" }}>
							<Text type="secondary">最后点击时间: {lastClickTime}</Text>
						</div>
					</div>
				</div>
			</Space>
		</div>
	);
};
