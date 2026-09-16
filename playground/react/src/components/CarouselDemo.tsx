import type React from "react";

const image =
	"https://lpalette.oss-accelerate.aliyuncs.com/prod/1/1765959814881.JPEG";
const blurhash = "LCF~22^M0LEQ~A9vs:r=tmROV?f+";

export const CarouselDemo = () => (
	<div className="carousel-demo">
		<eos-carousel
			loop
			indicator-style="tiktok"
			show-navigation
			style={{ "--carousel-height": "min(42vw, 360px)" } as React.CSSProperties}
		>
			<div className="slide">
				<eos-image
					src={image}
					alt="Mountain landscape"
					placeholder={blurhash}
					placeholder-type="blurhash"
					object-fit="cover"
				/>
				<span className="slide-label">Mountain landscape</span>
			</div>
			<div className="slide">
				<eos-image
					src="https://lpalette.oss-accelerate.aliyuncs.com/prod/1/1765959816821.JPEG"
					alt="Landscape detail"
					object-fit="cover"
				/>
				<span className="slide-label">Landscape detail</span>
			</div>
			<div className="slide">
				<eos-image
					src="https://lpalette.oss-accelerate.aliyuncs.com/prod/1/1765959821196.JPEG"
					alt="Night landscape"
					object-fit="cover"
				/>
				<span className="slide-label">Night landscape</span>
			</div>
		</eos-carousel>
	</div>
);
