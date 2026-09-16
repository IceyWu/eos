import type React from "react";
import { ComponentShowcase } from "./components/ComponentShowcase";

const App: React.FC = () => (
	<div className="playground">
		<header className="topbar">
			<div className="brand-mark">EOS UI</div>
			<span className="topbar-context">React Playground</span>
		</header>
		<main className="content">
			<section className="intro" aria-labelledby="page-title">
				<p className="eyebrow">Components</p>
				<h1 id="page-title">Playground</h1>
				<p className="lede">A compact view of the EOS Web Components.</p>
			</section>
			<ComponentShowcase />
		</main>
	</div>
);

export default App;
