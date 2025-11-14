import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useRef, useState } from "react";
import "@eosjs/components";

// Button组件属性接口
interface ButtonProps {
	text?: string;
	disabled?: boolean;
}

// 扩展JSX类型
declare global {
	namespace JSX {
		interface IntrinsicElements {
			'eos-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
				disabled?: boolean;
			};
		}
	}
}

const meta: Meta<ButtonProps> = {
	title: "组件/Button 按钮",
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Button 按钮组件

一个简洁且可自定义的按钮组件，基于 Web Components 构建。

## 核心特性

- **📦 零依赖**: 纯 Web Components 实现，无需框架依赖
- **🎨 可定制**: 支持 CSS 变量自定义样式
- **⚡ 事件系统**: 完整的自定义事件支持
- **🔧 框架兼容**: 支持 React、Vue、Angular 等主流框架
- **♿ 无障碍**: 支持键盘导航和屏幕阅读器

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------| -----|
| \`disabled\` | boolean | false | 是否禁用按钮 |
| \`slot\` | string | 'Click me' | 按钮文本内容（通过 slot 传入）|

## CSS 自定义属性

组件支持以下 CSS 变量进行样式自定义：

\`\`\`css
eos-button {
  --button-bg: #007bff;              /* 背景色 */
  --button-color: white;              /* 文字色 */
  --button-hover-bg: #0056b3;        /* 悬停背景色 */
  --button-active-bg: #004085;       /* 激活背景色 */
  --button-padding: 8px 16px;        /* 内边距 */
  --button-font-size: 14px;          /* 字体大小 */
  --button-border-radius: 4px;       /* 圆角 */
  --button-border: none;             /* 边框 */
  --button-cursor: pointer;          /* 鼠标样式 */
}
\`\`\`

## 事件

- \`e-click\`: 按钮点击时触发，事件详情包含 \`{ message: 'Button clicked!' }\`
        `,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		text: {
			control: "text",
			description: "按钮文本内容",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "Click me" },
			},
		},
		disabled: {
			control: "boolean",
			description: "是否禁用按钮",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
	},
};

export default meta;
type Story = StoryObj<ButtonProps>;

interface ButtonElement extends HTMLElement {
	addEventListener(type: string, listener: (event: CustomEvent) => void): void;
	removeEventListener(
		type: string,
		listener: (event: CustomEvent) => void,
	): void;
}

// 基础示例
export const Default: Story = {
	name: '基础用法',
	args: {
		text: "Click me",
		disabled: false,
	},
	render: (args) => {
		const buttonRef = useRef<ButtonElement>(null);
		const [clickCount, setClickCount] = useState(0);

		useEffect(() => {
			const button = buttonRef.current;
			if (!button) return;

			const handleClick = (e: CustomEvent) => {
				console.log("Button clicked:", e.detail);
				setClickCount(count => count + 1);
			};

			button.addEventListener("e-click", handleClick);
			return () => button.removeEventListener("e-click", handleClick);
		}, []);

		return (
			<div style={{ textAlign: 'center' }}>
				<eos-button ref={buttonRef} disabled={args.disabled}>
					{args.text}
				</eos-button>
				<div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
					点击次数: {clickCount}
				</div>
			</div>
		);
	},
};

// 样式变体演示
export const StyleVariants: Story = {
	name: '样式变体演示',
	render: () => {
		const [lastClicked, setLastClicked] = useState<string>('');

		useEffect(() => {
			const buttons = document.querySelectorAll("eos-button");
			const handlers: Array<() => void> = [];

			buttons.forEach((btn, i) => {
				const handler = () => {
					const buttonText = btn.textContent || `Button ${i + 1}`;
					setLastClicked(buttonText);
					console.log(`${buttonText} clicked`);
				};
				handlers.push(handler);
				btn.addEventListener("e-click", handler);
			});

			return () => {
				buttons.forEach((btn, i) => {
					btn.removeEventListener("e-click", handlers[i]);
				});
			};
		}, []);

		return (
			<div style={{ padding: '20px' }}>
				<h3>按钮样式变体</h3>
				<p>通过 CSS 变量自定义不同的按钮样式：</p>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px', marginTop: '20px' }}>
					<eos-button style={{ '--button-bg': '#007bff', '--button-hover-bg': '#0056b3' } as any}>
						Primary
					</eos-button>
					<eos-button style={{ '--button-bg': '#6c757d', '--button-hover-bg': '#545b62' } as any}>
						Secondary
					</eos-button>
					<eos-button style={{ '--button-bg': '#28a745', '--button-hover-bg': '#1e7e34' } as any}>
						Success
					</eos-button>
					<eos-button style={{ '--button-bg': '#dc3545', '--button-hover-bg': '#bd2130' } as any}>
						Danger
					</eos-button>
					<eos-button style={{ '--button-bg': '#ffc107', '--button-color': '#212529', '--button-hover-bg': '#e0a800' } as any}>
						Warning
					</eos-button>
					<eos-button style={{ '--button-bg': '#17a2b8', '--button-hover-bg': '#117a8b' } as any}>
						Info
					</eos-button>
				</div>
				{lastClicked && (
					<div style={{ marginTop: '20px', padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
						<strong>最后点击:</strong> {lastClicked}
					</div>
				)}
			</div>
		);
	},
};

// 尺寸演示
export const SizeDemo: Story = {
	name: '尺寸演示',
	render: () => (
		<div style={{ padding: '20px' }}>
			<h3>按钮尺寸演示</h3>
			<div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
				<eos-button style={{ '--button-padding': '4px 8px', '--button-font-size': '12px' } as any}>
					Small
				</eos-button>
				<eos-button style={{ '--button-padding': '8px 16px', '--button-font-size': '14px' } as any}>
					Medium
				</eos-button>
				<eos-button style={{ '--button-padding': '12px 24px', '--button-font-size': '16px' } as any}>
					Large
				</eos-button>
			</div>
		</div>
	),
};

// 状态演示
export const StateDemo: Story = {
	name: '状态演示',
	render: () => (
		<div style={{ padding: '20px' }}>
			<h3>按钮状态演示</h3>
			<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
				<eos-button>正常状态</eos-button>
				<eos-button disabled>禁用状态</eos-button>
			</div>
		</div>
	),
};

// 框架使用示例
export const ReactUsage: Story = {
	name: 'React 使用方式',
	parameters: {
		docs: {
			source: {
				code: `import React, { useEffect, useRef } from 'react';
import '@eosjs/components';

function App() {
  const buttonRef = useRef(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    
    const handleClick = (e) => {
      console.log('Clicked:', e.detail.message);
    };
    
    button.addEventListener('e-click', handleClick);
    return () => button.removeEventListener('e-click', handleClick);
  }, []);
  
  return <eos-button ref={buttonRef}>Click me</eos-button>;
}`,
			},
		},
	},
	render: () => (
		<div style={{ padding: '20px' }}>
			<h3>React 使用方式</h3>
			<eos-button>React 中使用</eos-button>
		</div>
	),
};

export const VueUsage: Story = {
	name: 'Vue 使用方式',
	parameters: {
		docs: {
			source: {
				code: `<template>
  <eos-button @e-click="handleClick">Click me</eos-button>
</template>

<script setup>
import '@eosjs/components';

const handleClick = (e) => {
  console.log('Clicked:', e.detail.message);
};
</script>`,
			},
		},
	},
	render: () => (
		<div style={{ padding: '20px' }}>
			<h3>Vue 使用方式</h3>
			<eos-button>Vue 中使用</eos-button>
		</div>
	),
};

export const AngularUsage: Story = {
	name: 'Angular 使用方式',
	parameters: {
		docs: {
			source: {
				code: `import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@eosjs/components';

@Component({
  selector: 'app-root',
  template: '<eos-button>Click me</eos-button>',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const button = document.querySelector('eos-button');
    button?.addEventListener('e-click', (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Clicked:', customEvent.detail.message);
    });
  }
}`,
			},
		},
	},
	render: () => (
		<div style={{ padding: '20px' }}>
			<h3>Angular 使用方式</h3>
			<eos-button>Angular 中使用</eos-button>
		</div>
	),
};

export const HTMLUsage: Story = {
	name: '原生 HTML 使用方式',
	parameters: {
		docs: {
			source: {
				code: `<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import '@eosjs/components';
    
    const button = document.querySelector('eos-button');
    button.addEventListener('e-click', (e) => {
      console.log('Clicked:', e.detail.message);
    });
  </script>
</head>
<body>
  <eos-button>Click me</eos-button>
</body>
</html>`,
			},
		},
	},
	render: () => (
		<div style={{ padding: '20px' }}>
			<h3>原生 HTML 使用方式</h3>
			<eos-button>HTML 中使用</eos-button>
		</div>
	),
};
