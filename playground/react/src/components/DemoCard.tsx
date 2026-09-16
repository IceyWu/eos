import type React from "react";
import "./component-showcase.css";

type DemoCardProps = {
	kicker: string;
	title: string;
	meta: string;
	className?: string;
	children: React.ReactNode;
};

export const DemoCard = ({
	kicker,
	title,
	meta,
	className = "",
	children,
}: DemoCardProps) => (
	<article className={`demo-card ${className}`}>
		<header className="demo-card-header">
			<div>
				<p className="card-kicker">{kicker}</p>
				<h2>{title}</h2>
			</div>
			<span className="card-tag">{meta}</span>
		</header>
		<div className="demo-body">{children}</div>
	</article>
);
