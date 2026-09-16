import "@eosjs/components";

const slideStyle = {
	alignItems: "center",
	borderRadius: 12,
	color: "#f7f5f1",
	display: "flex",
	height: 220,
	justifyContent: "center",
	letterSpacing: ".08em",
};

export default function Basic() {
	return (
		<div style={{ display: "grid", gap: 12, maxWidth: 560, width: "100%" }}>
			<eos-carousel autoplay loop interval={3200} style={{ "--carousel-height": "220px", width: "100%" } as React.CSSProperties}>
				<div style={{ ...slideStyle, background: "linear-gradient(135deg,#272442,#17161e)" }}>SLIDE / 01</div>
				<div style={{ ...slideStyle, background: "linear-gradient(135deg,#3a2935,#17161e)" }}>SLIDE / 02</div>
				<div style={{ ...slideStyle, background: "linear-gradient(135deg,#20363a,#17161e)" }}>SLIDE / 03</div>
			</eos-carousel>
			<small style={{ color: "var(--eos-color-foreground-muted, #71717a)", textAlign: "center" }}>
				Use the arrows, swipe, or keyboard focus to navigate. Autoplay pauses after manual interaction.
			</small>
		</div>
	);
}
