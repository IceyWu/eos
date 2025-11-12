import { Alert, Button, Space, Tag, Typography } from "antd";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const { Title, Text } = Typography;

export const ImageDemo: React.FC = () => {
	const [imageCounter, setImageCounter] = useState(10);
	const [loadingState, setLoadingState] = useState<
		"loading" | "loaded" | "error"
	>("loading");
	const [outputMessage, setOutputMessage] = useState("");
	const timeoutRef = useRef<number | null>(null);

	// 清理定时器
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleImageLoad = () => {
		setLoadingState("loaded");
		setOutputMessage("✓ 图片加载成功");

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => setOutputMessage(""), 2000);
	};

	const handleImageError = () => {
		setLoadingState("error");
		setOutputMessage("✗ 图片加载失败");

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => setOutputMessage(""), 2000);
	};

	const generateNewImage = () => {
		setImageCounter((prev) => prev + 1);
		setLoadingState("loading");
		setOutputMessage("");
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
							基础图片
						</Title>
						<Tag color="blue">Basic</Tag>
					</div>
					<Text type="secondary">展示图片组件的基础用法</Text>
					<div style={{ marginTop: "16px" }}>
						<Space direction="vertical" size="middle" style={{ width: "100%" }}>
							<div>
								<Text strong>普通图片</Text>
								<div style={{ marginTop: "8px" }}>
									<eos-image
										src="https://picsum.photos/300/200?random=1"
										alt="示例图片"
										width="300px"
										height="200px"
										style={{ borderRadius: "8px" }}
									/>
								</div>
							</div>

							<div>
								<Text strong>圆形图片</Text>
								<div style={{ marginTop: "8px" }}>
									<eos-image
										src="https://picsum.photos/150/150?random=2"
										alt="圆形图片"
										width="150px"
										height="150px"
										circle
									/>
								</div>
							</div>
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
							Object-fit 模式
						</Title>
						<Tag color="orange">Modes</Tag>
					</div>
					<Text type="secondary">展示不同的图片填充模式</Text>
					<div style={{ marginTop: "16px" }}>
						<Space wrap>
							<div style={{ textAlign: "center" }}>
								<eos-image
									src="https://picsum.photos/400/300?random=3"
									alt="cover 模式"
									width="120px"
									height="120px"
									object-fit="cover"
									style={{ border: "1px solid #d9d9d9", borderRadius: "8px" }}
								/>
								<div style={{ marginTop: "8px" }}>
									<Text type="secondary">cover</Text>
								</div>
							</div>

							<div style={{ textAlign: "center" }}>
								<eos-image
									src="https://picsum.photos/400/300?random=4"
									alt="contain 模式"
									width="120px"
									height="120px"
									object-fit="contain"
									style={{ border: "1px solid #d9d9d9", borderRadius: "8px" }}
								/>
								<div style={{ marginTop: "8px" }}>
									<Text type="secondary">contain</Text>
								</div>
							</div>

							<div style={{ textAlign: "center" }}>
								<eos-image
									src="https://picsum.photos/400/300?random=5"
									alt="fill 模式"
									width="120px"
									height="120px"
									object-fit="fill"
									style={{ border: "1px solid #d9d9d9", borderRadius: "8px" }}
								/>
								<div style={{ marginTop: "8px" }}>
									<Text type="secondary">fill</Text>
								</div>
							</div>
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
							事件监听
						</Title>
						<Tag color="green">Events</Tag>
					</div>
					<Text type="secondary">图片组件支持加载和错误事件监听</Text>
					<div style={{ marginTop: "16px", textAlign: "center" }}>
						<Space
							direction="vertical"
							size="middle"
							style={{ alignItems: "center" }}
						>
							<eos-image
								src={`https://picsum.photos/300/200?random=${imageCounter}`}
								alt="事件测试图片"
								width="300px"
								height="200px"
								onLoad={handleImageLoad}
								onError={handleImageError}
								style={{
									border: "1px solid #d9d9d9",
									borderRadius: "8px",
								}}
							/>
							<Button type="primary" onClick={generateNewImage}>
								生成新图片
							</Button>
							{outputMessage && (
								<Alert
									message={outputMessage}
									type={loadingState === "error" ? "error" : "success"}
									showIcon
									style={{ maxWidth: "300px" }}
								/>
							)}
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
							BlurHash 支持
						</Title>
						<Tag color="purple">Advanced</Tag>
					</div>
					<Text type="secondary">支持 BlurHash 模糊预览，提升用户体验</Text>
					<div style={{ marginTop: "16px" }}>
						<Space wrap>
							<div style={{ textAlign: "center" }}>
								<eos-image
									src="https://picsum.photos/200/150?random=6"
									alt="BlurHash 示例"
									width="200px"
									height="150px"
									blurhash="LyIXL4xYt7j[^-xWt7j[I:oIs;j]"
									style={{ borderRadius: "8px" }}
								/>
								<div style={{ marginTop: "8px" }}>
									<Text type="secondary">带 BlurHash 预览</Text>
								</div>
							</div>

							<div style={{ textAlign: "center" }}>
								<eos-image
									blurhash="LyIXL4xYt7j[^-xWt7j[I:oIs;j]"
									blurhash-only
									width="200px"
									height="150px"
									style={{ borderRadius: "8px" }}
								/>
								<div style={{ marginTop: "8px" }}>
									<Text type="secondary">仅显示 BlurHash</Text>
								</div>
							</div>
						</Space>
					</div>
				</div>
			</Space>
		</div>
	);
};
