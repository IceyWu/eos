import "@eosjs/components";
import { alt, source } from "./data";

export default function Responsive() {
	return <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", maxWidth: 520 }}><eos-image src={source} alt={alt} responsive object-fit="cover" style={{ aspectRatio: "3 / 2", borderRadius: 12, height: "auto", width: "100%" }} /><eos-image src={source} alt={alt} circle object-fit="cover" style={{ height: 180, width: 180 }} /></div>;
}
