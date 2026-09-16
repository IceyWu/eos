import { ButtonDemo } from "./ButtonDemo";
import { CarouselDemo } from "./CarouselDemo";
import { DemoCard } from "./DemoCard";
import { ImageDemo } from "./ImageDemo";
import { ProgressBarDemo } from "./ProgressBarDemo";

export const ComponentShowcase = () => {
	return (
		<section className="component-grid" aria-label="EOS components">
			<DemoCard kicker="Action" title="Button" meta="4 states">
				<ButtonDemo />
			</DemoCard>
			<DemoCard kicker="Media" title="Image" meta="BlurHash">
				<ImageDemo />
			</DemoCard>
			<DemoCard
				kicker="Media"
				title="Carousel"
				meta="3 slides"
				className="demo-card--carousel"
			>
				<CarouselDemo />
			</DemoCard>
			<DemoCard kicker="Feedback" title="ProgressBar" meta="3 variants">
				<ProgressBarDemo />
			</DemoCard>
		</section>
	);
};
