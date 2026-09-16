const image =
	"https://lpalette.oss-accelerate.aliyuncs.com/prod/1/1765959814881.JPEG";
const blurhash = "LCF~22^M0LEQ~A9vs:r=tmROV?f+";

export const ImageDemo = () => (
	<div className="image-demo">
		<eos-image
			src={image}
			alt="Mountain landscape"
			placeholder={blurhash}
			placeholder-type="blurhash"
			object-fit="cover"
		/>
	</div>
);
