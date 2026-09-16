import { useEffect, useRef, useState } from "react";
import "@eosjs/components";
import { alt as defaultAlt, blurhash, source } from "./data";

const inputStyle = {
	minWidth: 0,
	border: "1px solid var(--eos-color-border, #dedee0)",
	borderRadius: 6,
	background: "var(--eos-color-surface, #fff)",
	color: "var(--eos-color-foreground, #18181b)",
	font: "13px/30px var(--eos-font-family, system-ui)",
	padding: "0 8px",
};

const fieldStyle = {
	display: "grid",
	gridTemplateColumns: "88px minmax(0, 1fr)",
	alignItems: "center",
	gap: 8,
};

export default function Basic() {
	const ref = useRef<HTMLElement>(null);
	const [status, setStatus] = useState("Loading image…");
	const [alt, setAlt] = useState(defaultAlt);
	const [src, setSrc] = useState(source);
	const [loading, setLoading] = useState<"lazy" | "eager">("lazy");
	const [placeholder, setPlaceholder] = useState(blurhash);
	const [placeholderType, setPlaceholderType] = useState<"blurhash" | "url">("blurhash");
	const [objectFit, setObjectFit] = useState("cover");
	const [placeholderFill, setPlaceholderFill] = useState(true);
	const [responsive, setResponsive] = useState(false);
	const [circle, setCircle] = useState(false);

	useEffect(() => {
		const element = ref.current;
		const onLoad = () => setStatus("Loaded");
		const onError = () => setStatus("Unable to load image");
		element?.addEventListener("load", onLoad);
		element?.addEventListener("error", onError);
		return () => {
			element?.removeEventListener("load", onLoad);
			element?.removeEventListener("error", onError);
		};
	}, []);

	useEffect(() => setStatus("Loading image…"), [src, loading]);

	return (
		<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "center", gap: 28, maxWidth: 760, width: "100%" }}>
			<div style={{ display: "grid", justifyItems: "center", gap: 12 }}>
				<eos-image ref={ref} src={src} alt={alt} loading={loading} placeholder={placeholder} placeholder-type={placeholderType} placeholder-fill={placeholderFill} responsive={responsive} circle={circle} object-fit={objectFit} style={{ aspectRatio: circle ? "1 / 1" : "4 / 3", borderRadius: circle ? "50%" : 12, height: "auto", maxHeight: 300, width: responsive ? "100%" : circle ? 220 : "min(100%, 390px)" }} />
				<small style={{ color: "var(--eos-color-foreground-muted, #71717a)" }}>{status}</small>
			</div>
			<div style={{ display: "grid", gap: 10, font: "13px/20px var(--eos-font-family, system-ui)" }}>
				<label style={fieldStyle}>alt <input style={inputStyle} value={alt} onChange={(event) => setAlt(event.target.value)} /></label>
				<label style={fieldStyle}>src <input style={inputStyle} value={src} onChange={(event) => setSrc(event.target.value)} /></label>
				<label style={fieldStyle}>loading <select style={inputStyle} value={loading} onChange={(event) => setLoading(event.target.value as "lazy" | "eager")}><option value="lazy">lazy</option><option value="eager">eager</option></select></label>
				<label style={fieldStyle}>placeholder <input style={inputStyle} value={placeholder} onChange={(event) => setPlaceholder(event.target.value)} /></label>
				<label style={fieldStyle}>placeholder-type <select style={inputStyle} value={placeholderType} onChange={(event) => setPlaceholderType(event.target.value as "blurhash" | "url")}><option value="blurhash">blurhash</option><option value="url">url</option></select></label>
				<label style={fieldStyle}>object-fit <select style={inputStyle} value={objectFit} onChange={(event) => setObjectFit(event.target.value)}><option>cover</option><option>contain</option><option>fill</option><option>none</option><option>scale-down</option></select></label>
				<label><input type="checkbox" checked={placeholderFill} onChange={(event) => setPlaceholderFill(event.target.checked)} /> placeholder-fill</label>
				<label><input type="checkbox" checked={responsive} onChange={(event) => setResponsive(event.target.checked)} /> responsive</label>
				<label><input type="checkbox" checked={circle} onChange={(event) => setCircle(event.target.checked)} /> circle</label>
			</div>
		</div>
	);
}
