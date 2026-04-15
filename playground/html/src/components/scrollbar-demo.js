export class ScrollbarDemo {
	constructor() {
		this.scrollbar = null;
		this.scrollbar2 = null;
	}

	render(container) {
		container.innerHTML = `
      <div class="demo-card">
        <div class="card-header">
          <h2 class="card-title">水平滚动条</h2>
          <span class="card-badge">Horizontal</span>
        </div>
        <p class="card-subtitle">绑定到水平可滚动容器，自动同步滚动位置</p>
        <div class="card-content">
          <div id="h-scroll-container" style="
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 16px;
            scrollbar-width: none;
          ">
            ${Array.from({ length: 20 }, (_, i) => `
              <div style="
                display: inline-block;
                width: 150px;
                height: 120px;
                margin-right: 12px;
                border-radius: 8px;
                background: linear-gradient(135deg, hsl(${i * 18}, 70%, 60%) 0%, hsl(${i * 18 + 30}, 70%, 50%) 100%);
                color: white;
                font-weight: bold;
                font-size: 14px;
                line-height: 120px;
                text-align: center;
                flex-shrink: 0;
              ">Item ${i + 1}</div>
            `).join("")}
          </div>
          <div style="margin-top: 8px;">
            <eos-scrollbar id="h-scrollbar" direction="horizontal" thumb-color="rgba(100,100,100,0.5)" track-color="rgba(0,0,0,0.08)" thumb-size="6"></eos-scrollbar>
          </div>
          <div style="margin-top: 8px; color: #666; font-size: 13px;">
            滚动位置: <span id="h-scroll-pos">0%</span>
          </div>
        </div>
      </div>

      <div class="demo-card">
        <div class="card-header">
          <h2 class="card-title">垂直滚动条</h2>
          <span class="card-badge" style="background: #9c27b0;">Vertical</span>
        </div>
        <p class="card-subtitle">绑定到垂直可滚动容器，支持拖拽和点击轨道跳转</p>
        <div class="card-content">
          <div style="display: flex; gap: 8px; height: 300px;">
            <div id="v-scroll-container" style="
              flex: 1;
              overflow-y: auto;
              overflow-x: hidden;
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              padding: 16px;
              scrollbar-width: none;
            ">
              ${Array.from({ length: 30 }, (_, i) => `
                <div style="
                  padding: 12px 16px;
                  margin-bottom: 8px;
                  border-radius: 6px;
                  background: ${i % 2 === 0 ? "#f5f5f5" : "#fafafa"};
                  border: 1px solid #eee;
                  font-size: 14px;
                  color: #333;
                ">列表项 ${i + 1} — 这是一段示例文本内容</div>
              `).join("")}
            </div>
            <eos-scrollbar id="v-scrollbar" direction="vertical" thumb-color="rgba(156,39,176,0.5)" track-color="rgba(156,39,176,0.1)" thumb-size="6"></eos-scrollbar>
          </div>
        </div>
      </div>

      <div class="demo-card">
        <div class="card-header">
          <h2 class="card-title">自动隐藏</h2>
          <span class="card-badge" style="background: #ff9800;">Auto Hide</span>
        </div>
        <p class="card-subtitle">无交互时自动淡出，滚动时显示</p>
        <div class="card-content">
          <div id="auto-scroll-container" style="
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 16px;
            scrollbar-width: none;
          ">
            ${Array.from({ length: 15 }, (_, i) => `
              <div style="
                display: inline-block;
                width: 200px;
                height: 100px;
                margin-right: 12px;
                border-radius: 8px;
                background: linear-gradient(135deg, hsl(${i * 24 + 180}, 60%, 55%) 0%, hsl(${i * 24 + 210}, 60%, 45%) 100%);
                color: white;
                font-weight: bold;
                font-size: 14px;
                line-height: 100px;
                text-align: center;
              ">Card ${i + 1}</div>
            `).join("")}
          </div>
          <div style="margin-top: 8px;">
            <eos-scrollbar id="auto-scrollbar" direction="horizontal" auto-hide thumb-color="rgba(255,152,0,0.6)" track-color="rgba(255,152,0,0.1)" thumb-size="4"></eos-scrollbar>
          </div>
          <p style="margin-top: 8px; color: #999; font-size: 12px;">滚动容器查看自动隐藏效果</p>
        </div>
      </div>

      <div class="demo-card">
        <div class="card-header">
          <h2 class="card-title">虚拟列表</h2>
          <span class="card-badge" style="background: #00bcd4;">Virtual</span>
        </div>
        <p class="card-subtitle">支持虚拟列表场景，10,000 条数据仅渲染可见行</p>
        <div class="card-content">
          <div style="display: flex; gap: 8px; height: 300px;">
            <div id="virtual-viewport" style="
              flex: 1;
              overflow: hidden;
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              position: relative;
            ">
              <div id="virtual-content" style="position: absolute; top: 0; left: 0; right: 0;"></div>
            </div>
            <eos-scrollbar id="virtual-scrollbar" direction="vertical" thumb-color="rgba(0,188,212,0.5)" track-color="rgba(0,188,212,0.1)" thumb-size="6"></eos-scrollbar>
          </div>
          <div style="margin-top: 8px; color: #666; font-size: 13px;">
            总数据: 10,000 条 | 当前偏移: <span id="virtual-offset">0</span>px | 可见行: <span id="virtual-visible">0</span>
          </div>
        </div>
      </div>
    `;

		this.setupEventListeners();
	}

	setupEventListeners() {
		// 水平滚动条
		const hContainer = document.getElementById("h-scroll-container");
		const hScrollbar = document.getElementById("h-scrollbar");
		const hPosLabel = document.getElementById("h-scroll-pos");

		if (hContainer && hScrollbar) {
			hScrollbar.attach(hContainer);
			hScrollbar.addEventListener("scroll-change", (e) => {
				if (hPosLabel) {
					hPosLabel.textContent = `${Math.round(e.detail.position * 100)}%`;
				}
			});
		}

		// 垂直滚动条
		const vContainer = document.getElementById("v-scroll-container");
		const vScrollbar = document.getElementById("v-scrollbar");

		if (vContainer && vScrollbar) {
			vScrollbar.attach(vContainer);
		}

		// 自动隐藏滚动条
		const autoContainer = document.getElementById("auto-scroll-container");
		const autoScrollbar = document.getElementById("auto-scrollbar");

		if (autoContainer && autoScrollbar) {
			autoScrollbar.attach(autoContainer);
		}

		// 虚拟列表滚动条
		this.setupVirtualList();
	}

	setupVirtualList() {
		const TOTAL_ITEMS = 10000;
		const ITEM_HEIGHT = 40;
		const viewport = document.getElementById("virtual-viewport");
		const content = document.getElementById("virtual-content");
		const scrollbar = document.getElementById("virtual-scrollbar");
		const offsetLabel = document.getElementById("virtual-offset");
		const visibleLabel = document.getElementById("virtual-visible");

		if (!viewport || !content || !scrollbar) return;

		const viewportHeight = viewport.clientHeight;
		const contentHeight = TOTAL_ITEMS * ITEM_HEIGHT;
		const visibleCount = Math.ceil(viewportHeight / ITEM_HEIGHT) + 1;
		let scrollOffset = 0;

		if (visibleLabel) visibleLabel.textContent = String(visibleCount);

		const renderItems = (offset) => {
			const startIndex = Math.floor(offset / ITEM_HEIGHT);
			let html = "";
			for (let i = startIndex; i < Math.min(startIndex + visibleCount + 1, TOTAL_ITEMS); i++) {
				const top = i * ITEM_HEIGHT - offset;
				const hue = (i * 3) % 360;
				html += '<div style="'
					+ 'position: absolute;'
					+ 'top: ' + top + 'px;'
					+ 'left: 0; right: 0;'
					+ 'height: ' + (ITEM_HEIGHT - 4) + 'px;'
					+ 'margin: 2px 12px;'
					+ 'padding: 0 16px;'
					+ 'line-height: ' + (ITEM_HEIGHT - 4) + 'px;'
					+ 'border-radius: 6px;'
					+ 'background: hsl(' + hue + ', 45%, 96%);'
					+ 'border: 1px solid hsl(' + hue + ', 30%, 90%);'
					+ 'font-size: 13px;'
					+ 'color: #333;'
					+ 'box-sizing: border-box;'
					+ '">第 ' + (i + 1) + ' 行 — 虚拟列表项</div>';
			}
			content.innerHTML = html;
		};

		// 初始渲染
		renderItems(0);
		scrollbar.setVirtualScroll({
			contentSize: contentHeight,
			viewportSize: viewportHeight,
			scrollOffset: 0,
		});

		// 监听滚动条拖拽 → 更新虚拟列表
		scrollbar.addEventListener("scroll-change", (e) => {
			if (e.detail.scrollOffset !== undefined) {
				scrollOffset = Math.round(e.detail.scrollOffset);
				renderItems(scrollOffset);
				if (offsetLabel) offsetLabel.textContent = String(scrollOffset);
			}
		});

		// 监听鼠标滚轮 → 更新虚拟列表和滚动条
		viewport.addEventListener("wheel", (e) => {
			e.preventDefault();
			scrollOffset = Math.max(0, Math.min(contentHeight - viewportHeight, scrollOffset + e.deltaY));
			renderItems(scrollOffset);
			scrollbar.setVirtualScroll({
				contentSize: contentHeight,
				viewportSize: viewportHeight,
				scrollOffset,
			});
			if (offsetLabel) offsetLabel.textContent = String(Math.round(scrollOffset));
		}, { passive: false });
	}
}
