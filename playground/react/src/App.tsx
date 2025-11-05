import { useEffect, useRef, useState } from "react";
import "./App.css";

// 声明自定义元素类型
declare global {
	namespace JSX {
		interface IntrinsicElements {
			"e-button": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
			"e-carousel": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement> & {
					autoplay?: boolean;
					interval?: number;
					loop?: boolean;
					"show-controls"?: boolean;
				},
				HTMLElement
			>;
		}
	}
}

function App() {
	const [outputMessage, setOutputMessage] = useState("👆 点击按钮查看效果");
	const [showSuccess, setShowSuccess] = useState(false);
	const [clickCount, setClickCount] = useState(0);
	const [lastClickTime, setLastClickTime] = useState("--:--:--");
	const [buttonText, setButtonText] = useState("动态按钮");
	const [currentSlide, setCurrentSlide] = useState(0);

	const eventButtonRef = useRef<HTMLElement>(null);
	const counterButtonRef = useRef<HTMLElement>(null);
	const dynamicButtonRef = useRef<HTMLElement>(null);
	const carouselAutoRef = useRef<HTMLElement>(null);
	const carouselManualRef = useRef<HTMLElement>(null);

	const carouselItems = [
		{
			id: "slide-1",
			title: "Slide 1",
			style: {
				background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
			},
		},
		{
			id: "slide-2",
			title: "Slide 2",
			style: {
				background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
			},
		},
		{
			id: "slide-3",
			title: "Slide 3",
			style: {
				background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
			},
		},
		{
			id: "slide-4",
			title: "Slide 4",
			style: {
				background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
			},
		},
	];

	useEffect(() => {
		const handleClick = (e: Event) => {
			const customEvent = e as CustomEvent;
			setOutputMessage(`✓ ${customEvent.detail.message}`);
			setShowSuccess(true);

			setTimeout(() => {
				setOutputMessage("👆 点击按钮查看效果");
				setShowSuccess(false);
			}, 2000);
		};

		const handleCounter = () => {
			setClickCount((prev) => prev + 1);
			setLastClickTime(new Date().toLocaleTimeString("zh-CN"));
		};

		const handleCarouselChange = (e: Event) => {
			const customEvent = e as CustomEvent;
			setCurrentSlide(customEvent.detail.currentIndex);
		};

		const eventBtn = eventButtonRef.current;
		const counterBtn = counterButtonRef.current;
		const dynamicBtn = dynamicButtonRef.current;
		const carouselAuto = carouselAutoRef.current;

		eventBtn?.addEventListener("e-click", handleClick);
		counterBtn?.addEventListener("e-click", handleCounter);
		dynamicBtn?.addEventListener("e-click", handleClick);
		carouselAuto?.addEventListener("change", handleCarouselChange);

		return () => {
			eventBtn?.removeEventListener("e-click", handleClick);
			counterBtn?.removeEventListener("e-click", handleCounter);
			dynamicBtn?.removeEventListener("e-click", handleClick);
			carouselAuto?.removeEventListener("change", handleCarouselChange);
		};
	}, []);

	const buttonTexts = ["动态按钮", "已更改", "再次更改", "React State"];
	let textIndex = 0;

	const changeButtonText = () => {
		textIndex = (textIndex + 1) % buttonTexts.length;
		setButtonText(buttonTexts[textIndex]);
	};

	const playCarousel = () => {
		const carousel = carouselManualRef.current as HTMLElement & {
			play: () => void;
		};
		carousel?.play();
	};

	const pauseCarousel = () => {
		const carousel = carouselManualRef.current as HTMLElement & {
			pause: () => void;
		};
		carousel?.pause();
	};

	return (
		<div className="container">
			<h1>🎮 React Demo</h1>
			<span className="badge">React + TypeScript + Eos</span>

			<div className="demo-section">
				<h2>Carousel 自动播放</h2>
				<div className="demo-area">
					<e-carousel
						ref={carouselAutoRef}
						autoplay={true}
						interval={3000}
						loop={true}
						style={{ "--carousel-height": "300px" } as React.CSSProperties}
					>
						{carouselItems.map((item) => (
							<div
								key={item.id}
								className="carousel-slide"
								style={{
									...item.style,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									color: "white",
									fontSize: "48px",
									fontWeight: "bold",
								}}
							>
								{item.title}
							</div>
						))}
					</e-carousel>
				</div>
				<div className="output">当前 Slide: {currentSlide}</div>
			</div>

			<div className="demo-section">
				<h2>Carousel 手动控制</h2>
				<div className="demo-area">
					<e-carousel
						ref={carouselManualRef}
						style={{ "--carousel-height": "250px" } as React.CSSProperties}
					>
						<div
							className="carousel-slide"
							style={{
								background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
							}}
						>
							🎨 图片 1
						</div>
						<div
							className="carousel-slide"
							style={{
								background: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
							}}
						>
							🎭 图片 2
						</div>
						<div
							className="carousel-slide"
							style={{
								background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
								color: "#333",
							}}
						>
							🎪 图片 3
						</div>
					</e-carousel>
				</div>
				<div className="demo-area">
					<button type="button" className="control-btn" onClick={playCarousel}>
						播放
					</button>
					<button type="button" className="control-btn" onClick={pauseCarousel}>
						暂停
					</button>
				</div>
			</div>

			<div className="demo-section">
				<h2>Button 基础用法</h2>
				<div className="demo-area">
					<e-button>默认按钮</e-button>
					<e-button>提交</e-button>
					<e-button>取消</e-button>
				</div>
			</div>

			<div className="demo-section">
				<h2>事件监听</h2>
				<div className="demo-area">
					<e-button ref={eventButtonRef}>点击我</e-button>
				</div>
				<div className={`output ${showSuccess ? "success" : ""}`}>
					{outputMessage}
				</div>
			</div>

			<div className="demo-section">
				<h2>计数器演示</h2>
				<div className="demo-area">
					<e-button ref={counterButtonRef}>点击计数</e-button>
				</div>
				<div className="stats">
					<div className="stat-card">
						<div className="stat-value">{clickCount}</div>
						<div className="stat-label">点击次数</div>
					</div>
					<div className="stat-card">
						<div className="stat-value">{lastClickTime}</div>
						<div className="stat-label">最后点击</div>
					</div>
				</div>
			</div>

			<div className="demo-section">
				<h2>动态内容</h2>
				<div className="demo-area">
					<e-button ref={dynamicButtonRef}>{buttonText}</e-button>
					<button
						type="button"
						className="change-btn"
						onClick={changeButtonText}
					>
						更改文本
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
