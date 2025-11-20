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
	const [progress, setProgress] = useState({ loaded: 0, total: 0, percent: 0 });
	const timeoutRef = useRef<number | null>(null);
	const imageRef = useRef<HTMLElement | null>(null);

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
		timeoutRef.current = window.setTimeout(() => setOutputMessage(""), 2000);
	};

	const handleImageError = () => {
		setLoadingState("error");
		setOutputMessage("✗ 图片加载失败");

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = window.setTimeout(() => setOutputMessage(""), 2000);
	};

	const handleImageProgress = (e: CustomEvent) => {
		const { loaded, total } = e.detail;
		const percent = total > 0 ? Math.round((loaded / total) * 100) : 0;
		setProgress({ loaded, total, percent });
	};

	// 设置图片事件处理器（通过属性，不是 addEventListener）
	useEffect(() => {
		const element = imageRef.current as any;
		if (!element) return;

		element.onimageload = handleImageLoad;
		element.onimageerror = handleImageError;
		element.onimageprogress = handleImageProgress;

		return () => {
			element.onimageload = null;
			element.onimageerror = null;
			element.onimageprogress = null;
		};
	}, [imageCounter]); // 依赖 imageCounter，确保每次图片变化都重新绑定

	const generateNewImage = () => {
		setImageCounter((prev) => prev + 1);
		setLoadingState("loading");
		setOutputMessage("");
		setProgress({ loaded: 0, total: 0, percent: 0 });
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
					<Text type="secondary">
						图片组件支持加载进度追踪和事件监听，点击按钮查看加载进度
					</Text>
					<div style={{ marginTop: "16px" }}>
						<Space direction="vertical" size="middle" style={{ width: "100%" }}>
							{/* 图片展示区 */}
							<div style={{ textAlign: "center" }}>
								<eos-image
									ref={imageRef}
									src={`https://picsum.photos/300/200?random=${imageCounter}`}
									alt="事件测试图片"
									width="300px"
									height="200px"
									style={{
										border: "1px solid #d9d9d9",
										borderRadius: "8px",
									}}
								/>
							</div>

							{/* 进度信息卡片 - 始终显示 */}
							<div
								style={{
									background: "#f5f5f5",
									border: "1px solid #d9d9d9",
									borderRadius: "8px",
									padding: "16px",
									minHeight: "100px",
								}}
							>
								<div
									style={{
										marginBottom: "12px",
										fontWeight: "bold",
										color: "#1890ff",
									}}
								>
									📊 加载进度信息
								</div>

								{/* 加载状态显示 */}
								<div style={{ marginBottom: "8px" }}>
									<Text strong>状态：</Text>
									<Tag
										color={
											loadingState === "loading"
												? "processing"
												: loadingState === "loaded"
													? "success"
													: "error"
										}
										style={{ marginLeft: "8px" }}
									>
										{loadingState === "loading"
											? "加载中..."
											: loadingState === "loaded"
												? "加载成功"
												: "加载失败"}
									</Tag>
								</div>

								{/* 进度详情 */}
								{progress.total > 0 && (
									<div style={{ marginTop: "12px" }}>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
												marginBottom: "8px",
												fontSize: "14px",
											}}
										>
											<Text>进度：{progress.percent}%</Text>
											<Text type="secondary">
												{(progress.loaded / 1024).toFixed(1)}KB /{" "}
												{(progress.total / 1024).toFixed(1)}KB
											</Text>
										</div>
										<div
											style={{
												height: "6px",
												background: "#e0e0e0",
												borderRadius: "3px",
												overflow: "hidden",
											}}
										>
											<div
												style={{
													height: "100%",
													background:
														loadingState === "loaded" ? "#52c41a" : "#1890ff",
													borderRadius: "3px",
													width: `${progress.percent}%`,
													transition: "all 0.3s ease",
												}}
											/>
										</div>
									</div>
								)}

								{/* 提示信息 */}
								{!progress.total && loadingState === "loading" && (
									<Text type="secondary" style={{ fontSize: "12px" }}>
										等待加载开始...
									</Text>
								)}
							</div>

							{/* 操作按钮 */}
							<div style={{ textAlign: "center" }}>
								<Button
									type="primary"
									size="large"
									onClick={generateNewImage}
									loading={loadingState === "loading"}
								>
									{loadingState === "loading" ? "加载中..." : "生成新图片"}
								</Button>
							</div>

							{/* 成功/失败消息 */}
							{outputMessage && (
								<Alert
									message={outputMessage}
									type={loadingState === "error" ? "error" : "success"}
									showIcon
									closable
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
