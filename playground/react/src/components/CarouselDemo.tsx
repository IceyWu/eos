import {
	Button,
	Col,
	InputNumber,
	Row,
	Space,
	Switch,
	Tag,
	Typography,
} from "antd";
import type React from "react";
import { useRef, useState } from "react";

const { Title, Text } = Typography;

export const CarouselDemo: React.FC = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [autoplay, setAutoplay] = useState(true);
	const [loop, setLoop] = useState(true);
	const [interval, setInterval] = useState(3000);
	const carouselRef = useRef<any>(null);

	const handleSlideChange = (e: any) => {
		setCurrentSlide(e.detail.currentIndex);
	};

	const prevSlide = () => carouselRef.current?.prev();
	const nextSlide = () => carouselRef.current?.next();
	const goToSlide = (index: number) => carouselRef.current?.goTo(index);

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
							基础轮播
						</Title>
						<Tag color="blue">Basic</Tag>
					</div>
					<Text type="secondary">展示轮播图组件的基础用法</Text>
					<div style={{ marginTop: "16px" }}>
						<eos-carousel
							autoplay
							interval="3000"
							loop
							onChange={handleSlideChange}
							style={{ "--carousel-height": "300px" } as React.CSSProperties}
						>
							<div
								style={{
									background:
										"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
									<h2>第一张幻灯片</h2>
									<p>自动播放内容</p>
								</div>
							</div>
							<div
								style={{
									background:
										"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
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
									<h2>第二张幻灯片</h2>
									<p>支持自定义内容</p>
								</div>
							</div>
							<div
								style={{
									background:
										"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
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
									<h2>第三张幻灯片</h2>
									<p>响应式设计</p>
								</div>
							</div>
						</eos-carousel>
						<div style={{ marginTop: "12px", textAlign: "center" }}>
							<Text type="secondary">当前幻灯片: {currentSlide + 1}</Text>
						</div>
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
							控制选项
						</Title>
						<Tag color="orange">Controls</Tag>
					</div>
					<Text type="secondary">动态控制轮播图的各种参数和行为</Text>

					<Row gutter={[24, 24]} style={{ marginTop: "16px" }}>
						<Col span={12}>
							<div>
								<Title level={5}>参数设置</Title>
								<Space
									direction="vertical"
									size="middle"
									style={{ width: "100%" }}
								>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<Text>自动播放</Text>
										<Switch checked={autoplay} onChange={setAutoplay} />
									</div>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<Text>循环播放</Text>
										<Switch checked={loop} onChange={setLoop} />
									</div>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<Text>间隔时间</Text>
										<InputNumber
											value={interval}
											onChange={(value) => setInterval(value || 3000)}
											min={1000}
											max={10000}
											step={500}
											suffix="ms"
										/>
									</div>
								</Space>
							</div>
						</Col>

						<Col span={12}>
							<div>
								<Title level={5}>手动控制</Title>
								<Space
									direction="vertical"
									size="middle"
									style={{ width: "100%" }}
								>
									<Space>
										<Button onClick={prevSlide}>上一张</Button>
										<Button onClick={nextSlide}>下一张</Button>
									</Space>
									<Button
										type="primary"
										onClick={() => goToSlide(0)}
										style={{ width: "100%" }}
									>
										跳转到第一张
									</Button>
								</Space>
							</div>
						</Col>
					</Row>

					<div style={{ marginTop: "24px" }}>
						<Title level={5}>受控轮播</Title>
						<eos-carousel
							ref={carouselRef}
							autoplay={autoplay}
							interval={interval.toString()}
							loop={loop}
							onChange={handleSlideChange}
							style={{ "--carousel-height": "250px" } as React.CSSProperties}
						>
							{[1, 2, 3, 4, 5].map((i) => (
								<div
									key={i}
									style={{
										background: `linear-gradient(135deg, 
                    hsl(${i * 60}, 70%, 60%) 0%, 
                    hsl(${i * 60 + 30}, 70%, 50%) 100%)`,
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
										<h2>第 {i} 张幻灯片</h2>
										<p>可控制的轮播内容</p>
									</div>
								</div>
							))}
						</eos-carousel>
					</div>
				</div>
			</Space>
		</div>
	);
};
