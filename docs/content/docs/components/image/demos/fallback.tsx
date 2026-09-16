import "../../../../../../packages/components/src/index.ts";

export default function Fallback() {
	return (
		<eos-image
			src="https://example.invalid/eos-image.jpg"
			alt="Unavailable mountain landscape"
			style={{ borderRadius: 12, height: 220, width: 360 }}
		>
			<span slot="error">Image unavailable</span>
		</eos-image>
	);
}
