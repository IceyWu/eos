const rows = [
	{ label: "Default", variant: "default" },
	{ label: "Dots", variant: "dots" },
	{ label: "TikTok", variant: "tiktok" },
] as const;

export const ProgressBarDemo = () => (
	<div className="progress-demo">
		{rows.map(({ label, variant }) => (
			<div className="progress-row" key={variant}>
				<span>{label}</span>
				<eos-progress-bar total="5" current="2" variant={variant} />
			</div>
		))}
	</div>
);
