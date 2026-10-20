/* Run this expression in a browser with @eosjs/ui registered. The temporary
 * theme fixture remains for screenshots; remove #eos-progress-verification afterwards. */
(async () => {
	const results = [];
	const check = (condition, message) => {
		if (!condition) throw new Error(message);
		results.push(message);
	};
	const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	document.getElementById("eos-progress-verification")?.remove();
	const fixture = document.createElement("div");
	fixture.id = "eos-progress-verification";
	fixture.style.cssText =
		"position:fixed;inset:16px 16px auto auto;width:320px;max-width:calc(100vw - 32px);z-index:99999;font:14px system-ui;box-shadow:0 2px 12px #0004";
	document.body.append(fixture);
	const bars = [];
	const contrast = (a, b) => {
		const luminance = (rgb) =>
			rgb
				.match(/[\d.]+/g)
				.slice(0, 3)
				.map(Number)
				.map((x) => {
					x /= 255;
					return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
				})
				.reduce((sum, x, i) => sum + x * [0.2126, 0.7152, 0.0722][i], 0);
		const x = luminance(a),
			y = luminance(b);
		return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
	};
	const themes = [];
	for (const theme of ["light", "dark"]) {
		const surface = document.createElement("section");
		surface.style.cssText = `padding:16px;background:${theme === "dark" ? "#18181b" : "#ffffff"};color:${theme === "dark" ? "#fcfcfc" : "#18181b"}`;
		const title = document.createElement("div");
		title.textContent = `EOS progress · ${theme} · 23 segments`;
		const bar = document.createElement("eos-progress-bar");
		bar.setAttribute("data-eos-theme", theme);
		bar.total = 23;
		surface.append(title, bar);
		fixture.append(surface);
		bar.setState(5, 42);
		bars.push(bar);
		const fill = bar.getSegment(5).querySelector('[part~="fill"]');
		const track = bar.getSegment(5).querySelector('[part~="track"]');
		check(
			getComputedStyle(fill).display !== "none",
			`${theme}: first manual update displays a fill`,
		);
		check(
			bar.scrollWidth <= bar.clientWidth,
			`${theme}: 23 segments fit at 288px`,
		);
		const active = getComputedStyle(fill).backgroundColor,
			inactive = getComputedStyle(track).backgroundColor;
		const ratio = contrast(active, inactive);
		check(
			ratio >= 3,
			`${theme}: active/track contrast >= 3 (${ratio.toFixed(2)})`,
		);
		themes.push({ theme, active, inactive, contrast: ratio });
	}
	const bar = bars[0];
	const nodes = [...bar.shadowRoot.querySelectorAll("button")];
	const active = bar.getSegment(5).querySelector('[part~="fill"]');
	const observer = new MutationObserver(() => {});
	observer.observe(bar.shadowRoot, {
		childList: true,
		subtree: true,
		attributes: true,
	});
	let queries = 0;
	const q = bar.shadowRoot.querySelector,
		qa = bar.shadowRoot.querySelectorAll;
	bar.shadowRoot.querySelector = function (...args) {
		queries++;
		return q.apply(this, args);
	};
	bar.shadowRoot.querySelectorAll = function (...args) {
		queries++;
		return qa.apply(this, args);
	};
	const start = performance.now();
	for (let i = 0; i < 1000; i++) bar.setState(5, (i % 100) + 0.5);
	const elapsed = performance.now() - start;
	const mutations = observer.takeRecords();
	observer.disconnect();
	delete bar.shadowRoot.querySelector;
	delete bar.shadowRoot.querySelectorAll;
	check(queries === 0, "1000 external updates perform zero DOM queries");
	check(
		mutations.every(
			(r) =>
				r.type === "attributes" &&
				r.target === active &&
				r.attributeName === "style",
		),
		"steady-state updates only mutate the active fill style",
	);
	check(
		nodes.every((node, i) => node === bar.getSegment(i)),
		"updates retain all segment nodes",
	);
	bar.setProgress(NaN);
	check(bar.progress === 0, "NaN progress normalizes to zero");
	bar.setProgress(120);
	check(bar.progress === 100, "progress clamps at 100");
	bar.current = 100;
	check(bar.current === 22, "out-of-range current clamps");
	bar.total = 3;
	check(
		bar.current === 2 && bar.shadowRoot.querySelectorAll("button").length === 3,
		"shrinking total clamps current and rebuilds once",
	);
	bar.total = 0;
	check(
		bar.shadowRoot.querySelectorAll("button").length === 0,
		"empty progress has no buttons",
	);
	bar.total = 23;
	bar.setState(5, 42);
	bar.segmentLabels = ["<b>Start</b>", "Day one"];
	check(
		bar.getSegment(0).getAttribute("aria-label") === "<b>Start</b>" &&
			!bar.shadowRoot.querySelector("b"),
		"localized labels are plain text",
	);
	bar.setAttribute("dir", "rtl");
	bar.getSegment(5).focus();
	bar.getSegment(5).dispatchEvent(
		new KeyboardEvent("keydown", {
			key: "ArrowLeft",
			bubbles: true,
			composed: true,
			cancelable: true,
		}),
	);
	check(
		bar.shadowRoot.activeElement === bar.getSegment(6),
		"RTL arrow navigation follows visual direction",
	);
	const rtlFillStyle = getComputedStyle(
		bar.getSegment(5).querySelector('[part~="fill"]'),
	);
	check(
		Math.abs(
			Number.parseFloat(rtlFillStyle.transformOrigin) -
				Number.parseFloat(rtlFillStyle.width),
		) < 0.1,
		"RTL fills originate at the right edge",
	);
	bar.removeAttribute("dir");
	bar.style.width = "144px";
	bar.style.zoom = "2";
	check(
		bar.scrollWidth <= bar.clientWidth,
		"dense segments fit a 288px rendered control at 200% CSS zoom",
	);
	bar.style.width = "";
	bar.style.zoom = "";
	const beforeMove = bar.getSegment(5);
	const holder = document.createElement("div");
	fixture.append(holder);
	holder.append(bar);
	check(
		bar.progress === 42 && beforeMove === bar.getSegment(5),
		"moving between panel and stage preserves nodes and progress",
	);
	fixture.firstElementChild.append(bar);
	holder.remove();
	const selected = [];
	bar.addEventListener("segment-click", (event) =>
		selected.push(event.detail.index),
	);
	bar.getSegment(2).click();
	check(
		selected.join() === "2",
		"native button click emits one segment selection",
	);
	bar.getSegment(2).focus();
	bar.getSegment(2).dispatchEvent(
		new KeyboardEvent("keydown", {
			key: "ArrowRight",
			bubbles: true,
			composed: true,
			cancelable: true,
		}),
	);
	check(
		bar.shadowRoot.activeElement === bar.getSegment(3),
		"arrow key moves native button focus",
	);
	bar.getSegment(3).dispatchEvent(
		new KeyboardEvent("keydown", {
			key: "End",
			bubbles: true,
			composed: true,
			cancelable: true,
		}),
	);
	check(
		bar.shadowRoot.activeElement === bar.getSegment(22),
		"End focuses the last segment",
	);
	let complete = 0;
	bar.startProgress({ duration: 0, onComplete: () => complete++ });
	check(
		complete === 1 && bar.progress === 100,
		"zero-duration playback completes exactly once",
	);
	bar.startProgress({ duration: 10000 });
	await wait(35);
	bar.pauseProgress();
	const paused = bar.progress;
	await wait(35);
	check(bar.progress === paused, "pause freezes the internal clock");
	bar.resumeProgress();
	await wait(35);
	check(bar.progress > paused, "resume advances the saved fraction");
	bar.setProgress(42);
	await wait(35);
	check(bar.progress === 42, "external updates stop the internal clock");
	bar.position = "left";
	bar.style.height = "200px";
	bar.setProgress(25);
	check(
		bar.getSegment(bar.current).querySelector('[part~="fill"]').style
			.transform === "scaleY(0.25)",
		"vertical fills use transform without layout size updates",
	);
	bar.position = "bottom";
	bar.style.height = "";
	bar.setState(5, 42);
	const r = bar.getSegment(5).getBoundingClientRect();
	check(
		bar.getSegmentIndexAt(r.left + r.width / 2, r.top + r.height / 2) === 5,
		"pointer hit testing resolves a dense segment",
	);
	// Synthetic pointer events cannot acquire real capture; stub capture on this fixture only.
	const group = bar.shadowRoot.querySelector('[role="group"]');
	let captured = null;
	group.setPointerCapture = (id) => {
		captured = id;
	};
	group.hasPointerCapture = (id) => captured === id;
	group.releasePointerCapture = () => {
		captured = null;
	};
	bar.setAttribute("scrubbable", "");
	const point = (index) => {
		const rect = bar.getSegment(index).getBoundingClientRect();
		return {
			clientX: rect.left + rect.width / 2,
			clientY: rect.top + rect.height / 2,
		};
	};
	const pointer = (type, index) =>
		group.dispatchEvent(
			new PointerEvent(type, {
				bubbles: true,
				composed: true,
				pointerId: 7,
				isPrimary: true,
				button: 0,
				...point(index),
			}),
		);
	const beforeDrag = selected.length;
	pointer("pointerdown", 2);
	pointer("pointermove", 8);
	pointer("pointerup", 8);
	check(
		selected.length === beforeDrag + 1 && selected.at(-1) === 8,
		"drag commits the release segment once",
	);
	bar
		.getSegment(8)
		.dispatchEvent(
			new MouseEvent("click", { bubbles: true, composed: true, detail: 1 }),
		);
	check(
		selected.length === beforeDrag + 1,
		"post-pointer synthetic click does not select twice",
	);
	pointer("pointerdown", 2);
	pointer("pointercancel", 2);
	pointer("pointerup", 8);
	check(
		selected.length === beforeDrag + 1,
		"pointer cancellation does not commit a selection",
	);
	delete group.setPointerCapture;
	delete group.hasPointerCapture;
	delete group.releasePointerCapture;
	bar.removeAttribute("scrubbable");
	bar.startProgress({ duration: 10000 });
	await wait(25);
	bar.remove();
	const detached = bar.progress;
	await wait(30);
	check(bar.progress === detached, "disconnect stops the animation clock");
	fixture.firstElementChild.append(bar);
	bar.setState(5, 42);
	bar.shadowRoot.activeElement?.blur();
	return { passed: results.length, results, updateLoopMs: elapsed, themes };
})();
