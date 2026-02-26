import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useRef, useState } from "react";
import "@eosjs/components";

interface CarouselProps {
  autoplay?: boolean;
  interval?: number;
  loop?: boolean;
  "show-navigation"?: boolean;
  "initial-index"?: number;
  "indicator-position"?: "top" | "bottom" | "left" | "right";
  "indicator-style"?: "default" | "dots" | "tiktok";
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "eos-carousel": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        CarouselProps;
    }
  }
}

const meta: Meta<CarouselProps> = {
  title: "组件/Carousel 轮播图",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
支持多种指示器样式与位置的轮播图组件，内置触摸滑动、键盘导航与自动播放。

### CSS 自定义属性

| 变量 | 默认值 | 说明 |
|------|--------|------|
| \`--carousel-height\` | 400px | 轮播图高度 |
| \`--progress-bar-color\` | #e0e0e0 | 进度条背景色 |
| \`--progress-bar-active-color\` | #007bff | 进度条激活色 |
| \`--control-bg\` | rgba(0,0,0,0.5) | 导航按钮背景 |
| \`--dot-size\` | 8px | 圆点大小（dots 模式）|

### 事件

| 事件名 | 触发时机 | event.detail |
|--------|---------|--------------|
| \`change\` | 切换幻灯片 | \`{ currentIndex, previousIndex }\` |
| \`slide-click\` | 点击幻灯片 | \`{ index }\` |
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    autoplay: {
      control: "boolean",
      description: "自动播放",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    interval: {
      control: { type: "number", min: 500, max: 10000, step: 500 },
      description: "自动播放间隔（毫秒）",
      table: { type: { summary: "number" }, defaultValue: { summary: "3000" } },
    },
    loop: {
      control: "boolean",
      description: "循环模式",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    "show-navigation": {
      control: "boolean",
      description: "显示导航箭头",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
    "initial-index": {
      control: { type: "number", min: 0, max: 4, step: 1 },
      description: "初始幻灯片索引",
      table: { type: { summary: "number" }, defaultValue: { summary: "0" } },
    },
    "indicator-position": {
      control: { type: "select", options: ["top", "bottom", "left", "right"] },
      description: "指示器位置",
      table: { type: { summary: "'top' | 'bottom' | 'left' | 'right'" }, defaultValue: { summary: "'bottom'" } },
    },
    "indicator-style": {
      control: { type: "select", options: ["default", "dots", "tiktok"] },
      description: "指示器样式",
      table: { type: { summary: "'default' | 'dots' | 'tiktok'" }, defaultValue: { summary: "'default'" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

//  幻灯片数据 
const slides = [
  { gradient: "linear-gradient(135deg, #667eea, #764ba2)", icon: "", title: "Innovation" },
  { gradient: "linear-gradient(135deg, #f093fb, #f5576c)", icon: "", title: "Creative" },
  { gradient: "linear-gradient(135deg, #4facfe, #00f2fe)", icon: "", title: "Technology" },
  { gradient: "linear-gradient(135deg, #43e97b, #38f9d7)", icon: "", title: "Growth" },
  { gradient: "linear-gradient(135deg, #fa709a, #fee140)", icon: "", title: "Success" },
];

function SlideContent({ icon, title }: { icon: string; title: string }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        gap: "12px",
      }}
    >
      <span style={{ fontSize: "56px" }}>{icon}</span>
      <strong style={{ fontSize: "28px", textShadow: "0 2px 4px rgba(0,0,0,0.25)" }}>{title}</strong>
    </div>
  );
}

//  基础用法 
export const Default: Story = {
  name: "基础用法",
  args: {
    autoplay: false,
    interval: 3000,
    loop: true,
    "show-navigation": true,
    "initial-index": 0,
    "indicator-position": "bottom",
    "indicator-style": "default",
  },
  render: (args: any) => {
    const carouselRef = useRef<HTMLElement>(null);
    const [current, setCurrent] = useState(Number(args["initial-index"]) || 0);
    const [lastEvent, setLastEvent] = useState<string>("");

    useEffect(() => {
      const el = carouselRef.current;
      if (!el) return;

      const onChange = (e: Event) => {
        const detail = (e as CustomEvent).detail;
        setCurrent(detail.currentIndex);
        setLastEvent(`change  第 ${detail.currentIndex + 1} 张（上一张：${detail.previousIndex + 1}）`);
      };
      const onClick = (e: Event) => {
        const detail = (e as CustomEvent).detail;
        setLastEvent(`slide-click  第 ${detail.index + 1} 张`);
      };

      el.addEventListener("change", onChange);
      el.addEventListener("slide-click", onClick);
      return () => {
        el.removeEventListener("change", onChange);
        el.removeEventListener("slide-click", onClick);
      };
    }, []);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ width: "640px", maxWidth: "100%" }}>
          <eos-carousel
            ref={carouselRef}
            autoplay={args.autoplay}
            interval={args.interval}
            loop={args.loop}
            show-navigation={args["show-navigation"]}
            initial-index={args["initial-index"]}
            indicator-position={args["indicator-position"]}
            indicator-style={args["indicator-style"]}
            style={{ height: "320px" }}
          >
            {slides.map((s, i) => (
              <div key={i} style={{ background: s.gradient, height: "100%" }}>
                <SlideContent icon={s.icon} title={s.title} />
              </div>
            ))}
          </eos-carousel>
        </div>

        <div style={{ display: "flex", gap: "12px", fontSize: "13px", color: "#64748b" }}>
          <span>
            当前：<strong style={{ color: "#6366f1" }}>{current + 1}</strong> / {slides.length}
          </span>
          {lastEvent && (
            <span>
              最近事件：<code style={{ background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>{lastEvent}</code>
            </span>
          )}
        </div>
      </div>
    );
  },
};

//  指示器样式对比 
export const IndicatorStyles: Story = {
  name: "指示器样式对比",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {(["default", "dots", "tiktok"] as const).map((style) => (
        <div key={style}>
          <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#64748b", fontFamily: "monospace" }}>
            indicator-style="{style}"
          </p>
          <eos-carousel
            loop
            indicator-style={style}
            style={{ height: "200px", width: "480px", maxWidth: "100%" }}
          >
            {slides.map((s, i) => (
              <div key={i} style={{ background: s.gradient, height: "100%" }}>
                <SlideContent icon={s.icon} title={s.title} />
              </div>
            ))}
          </eos-carousel>
        </div>
      ))}
    </div>
  ),
};

//  指示器位置对比 
export const IndicatorPositions: Story = {
  name: "指示器位置对比",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
      {(["top", "bottom", "left", "right"] as const).map((pos) => (
        <div key={pos}>
          <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#64748b", fontFamily: "monospace" }}>
            indicator-position="{pos}"
          </p>
          <eos-carousel
            loop
            indicator-position={pos}
            style={{ height: "180px" }}
          >
            {slides.slice(0, 3).map((s, i) => (
              <div key={i} style={{ background: s.gradient, height: "100%" }}>
                <SlideContent icon={s.icon} title={s.title} />
              </div>
            ))}
          </eos-carousel>
        </div>
      ))}
    </div>
  ),
};

//  自动播放 
export const AutoPlay: Story = {
  name: "自动播放",
  args: {
    autoplay: true,
    interval: 2000,
    loop: true,
    "show-navigation": true,
    "indicator-style": "tiktok",
  },
  render: (args: any) => (
    <eos-carousel
      autoplay={args.autoplay}
      interval={args.interval}
      loop={args.loop}
      show-navigation={args["show-navigation"]}
      indicator-style={args["indicator-style"]}
      style={{ height: "280px", width: "560px", maxWidth: "100%" }}
    >
      {slides.map((s, i) => (
        <div key={i} style={{ background: s.gradient, height: "100%" }}>
          <SlideContent icon={s.icon} title={s.title} />
        </div>
      ))}
    </eos-carousel>
  ),
};
