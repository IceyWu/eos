import "@eosjs/components";

const rowStyle = { display: "flex", flexWrap: "wrap" as const, gap: 8, alignItems: "center" };

export default function Variants() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			<div style={rowStyle}>
				<eos-button>Primary</eos-button>
				<eos-button variant="secondary">Secondary</eos-button>
				<eos-button variant="tertiary">Tertiary</eos-button>
				<eos-button variant="outline">Outline</eos-button>
				<eos-button variant="ghost">Ghost</eos-button>
			</div>
			<div style={rowStyle}>
				<eos-button color="secondary">Secondary color</eos-button>
				<eos-button color="success">Success</eos-button>
				<eos-button color="warning">Warning</eos-button>
				<eos-button color="danger">Danger</eos-button>
				<eos-button color="danger" variant="dangerSoft">Soft danger</eos-button>
			</div>
			<div style={rowStyle}>
				<eos-button size="sm">Small</eos-button>
				<eos-button>Medium</eos-button>
				<eos-button size="lg">Large</eos-button>
				<eos-button loading>Loading</eos-button>
				<eos-button disabled>Disabled</eos-button>
				<eos-button icon-only aria-label="Settings">
					<svg slot="start" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" /><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2" stroke="currentColor" /></svg>
				</eos-button>
			</div>
		</div>
	);
}
