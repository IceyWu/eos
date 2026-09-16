import "../../index";

const rowStyle = {
	display: "flex",
	flexWrap: "wrap" as const,
	gap: 8,
	alignItems: "center",
};

export default function Variants() {
	return (
		<div style={{ display: "grid", gap: 20 }}>
			<div style={rowStyle}>
				<eos-button color="default" variant="solid">Default</eos-button>
				<eos-button color="primary" variant="solid">Primary</eos-button>
				<eos-button color="secondary" variant="solid">Secondary</eos-button>
				<eos-button color="success" variant="solid">Success</eos-button>
				<eos-button color="warning" variant="solid">Warning</eos-button>
				<eos-button color="danger" variant="solid">Danger</eos-button>
			</div>
			<div style={rowStyle}>
				<eos-button color="secondary" variant="bordered">Bordered purple</eos-button>
				<eos-button color="success" variant="light">Light success</eos-button>
				<eos-button color="warning" variant="ghost">Ghost warning</eos-button>
			</div>
			<div style={rowStyle}>
				<eos-button>Primary</eos-button>
				<eos-button variant="secondary">Secondary</eos-button>
				<eos-button variant="tertiary">Tertiary</eos-button>
				<eos-button variant="outline">Outline</eos-button>
				<eos-button variant="ghost">Ghost</eos-button>
			</div>
			<div style={rowStyle}>
				<eos-button variant="danger">Danger</eos-button>
				<eos-button variant="dangerSoft">Soft danger</eos-button>
				<eos-button size="sm">Small</eos-button>
				<eos-button>Medium</eos-button>
				<eos-button size="lg">Large</eos-button>
			</div>
			<div style={rowStyle}>
				<eos-button loading>Loading</eos-button>
				<eos-button disabled>Disabled</eos-button>
				<eos-button icon-only aria-label="Settings">
					<svg slot="start" viewBox="0 0 16 16" aria-hidden="true">
						<path
							d="M8 1.5 9.15 3l1.75.5 1.7-.65.8 1.4-1.05 1.55.2 1.8 1.2 1.2-.8 1.4-1.85-.25-1.55 1.05L9.2 13.5H6.8l-.35-1.5L4.9 10.95l-1.85.25-.8-1.4 1.2-1.2.2-1.8L2.6 5.25l.8-1.4 1.7.65L6.85 4 8 1.5Z"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.2"
						/>
						<circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
					</svg>
				</eos-button>
			</div>
		</div>
	);
}
