import { ButtonDemo } from "./ButtonDemo";
import { CarouselDemo } from "./CarouselDemo";
import { DemoCard } from "./DemoCard";
import { ImageDemo } from "./ImageDemo";
import { ProgressBarDemo } from "./ProgressBarDemo";
import { SelectDemo } from "./SelectDemo";

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
			<DemoCard
				kicker="Input"
				title="Select"
				meta="10,000 options"
				className="demo-card--select"
			>
				<SelectDemo />
			</DemoCard>
		</section>
	);
};
