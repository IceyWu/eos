import { registerComponents } from "@eosjs/components";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

// 扩展 JSX 类型
declare global {
	namespace JSX {
		interface IntrinsicElements {
			"eos-button": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				type?: "default" | "primary" | "success" | "warning" | "danger";
				size?: "small" | "medium" | "large";
				disabled?: boolean;
				loading?: boolean;
				onEClick?: (event: CustomEvent) => void;
			};
		}
	}
}

// 注册组件
registerComponents();

const meta: Meta = {
	title: "组件/Button 按钮",
	parameters: {
		docs: {
			description: {
				component: `
# Button 按钮

按钮用于触发一个操作，如提交表单、打开对话框、取消操作等。

## 何时使用

- 标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑
- 通过鼠标或键盘，让用户能够触发一个操作

## 特性

- 🎨 **多种类型** - 支持 default、primary、success、warning、danger 五种类型
- 📏 **多种尺寸** - 支持 small、medium、large 三种尺寸
- 🔒 **状态控制** - 支持禁用和加载状态
- ⚡ **事件支持** - 支持自定义点击事件
- 🎯 **无障碍** - 完整的键盘导航和屏幕阅读器支持
        `,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["default", "primary", "success", "warning", "danger"],
			description: "按钮类型",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "default" },
				category: "外观",
			},
		},
		size: {
			control: { type: "select" },
			options: ["small", "medium", "large"],
			description: "按钮尺寸",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "medium" },
				category: "外观",
			},
		},
		disabled: {
			control: "boolean",
			description: "是否禁用按钮",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
				category: "状态",
			},
		},
		loading: {
			control: "boolean",
			description: "是否显示加载状态",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
				category: "状态",
			},
		},
		children: {
			control: "text",
			description: "按钮内容",
			table: {
				type: { summary: "ReactNode" },
				category: "内容",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础示例
export const Default: Story = {
	name: "默认按钮",
	render: (args) => (
		<eos-button {...args}>{args.children || "默认按钮"}</eos-button>
	),
	args: {
		type: "default",
		children: "默认按钮",
	},
};

// 按钮类型
export const Types: Story = {
	name: "按钮类型",
	render: () => (
		<div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
			<eos-button type="default">默认按钮</eos-button>
			<eos-button type="primary">主要按钮</eos-button>
			<eos-button type="success">成功按钮</eos-button>
			<eos-button type="warning">警告按钮</eos-button>
			<eos-button type="danger">危险按钮</eos-button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"按钮有五种类型：默认按钮、主要按钮、成功按钮、警告按钮和危险按钮。",
			},
		},
	},
};

// 按钮尺寸
export const Sizes: Story = {
	name: "按钮尺寸",
	render: () => (
		<div
			style={{
				display: "flex",
				gap: "12px",
				alignItems: "center",
				flexWrap: "wrap",
			}}
		>
			<eos-button size="small" type="primary">
				小按钮
			</eos-button>
			<eos-button size="medium" type="primary">
				中按钮
			</eos-button>
			<eos-button size="large" type="primary">
				大按钮
			</eos-button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"按钮有三种尺寸：小、中、大。通过设置 size 为 small、medium、large 分别把按钮设为小、中、大尺寸。",
			},
		},
	},
};

// 禁用状态
export const Disabled: Story = {
	name: "禁用状态",
	render: () => (
		<div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
			<eos-button disabled>默认按钮</eos-button>
			<eos-button type="primary" disabled>
				主要按钮
			</eos-button>
			<eos-button type="success" disabled>
				成功按钮
			</eos-button>
			<eos-button type="warning" disabled>
				警告按钮
			</eos-button>
			<eos-button type="danger" disabled>
				危险按钮
			</eos-button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。",
			},
		},
	},
};

// 加载状态
export const Loading: Story = {
	name: "加载状态",
	render: () => (
		<div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
			<eos-button loading>默认按钮</eos-button>
			<eos-button type="primary" loading>
				主要按钮
			</eos-button>
			<eos-button type="success" loading>
				成功按钮
			</eos-button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"添加 loading 属性即可让按钮处于加载状态，通常用于异步操作等待过程中。",
			},
		},
	},
};

// 事件处理
export const Events: Story = {
	name: "事件处理",
	render: () => {
		const handleClick = (event: any) => {
			alert(`按钮被点击了！消息: ${event.detail.message}`);
		};

		return (
			<div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
				<eos-button type="primary" onEClick={handleClick}>
					点击我
				</eos-button>
				<eos-button type="success" onEClick={handleClick}>
					成功按钮
				</eos-button>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"按钮支持 e-click 事件，可以通过 onEClick 属性监听点击事件。事件对象包含 detail.message 等信息。",
			},
		},
	},
};

// 组合示例
export const Playground: Story = {
	name: "交互演示",
	render: (args) => {
		const [clickCount, setClickCount] = React.useState(0);
		const [isLoading, setIsLoading] = React.useState(false);

		const handleClick = () => {
			setClickCount((count) => count + 1);

			if (!isLoading) {
				setIsLoading(true);
				setTimeout(() => {
					setIsLoading(false);
				}, 2000);
			}
		};

		return (
			<div
				style={{
					padding: "24px",
					background: "#f5f5f5",
					borderRadius: "8px",
					textAlign: "center",
				}}
			>
				<h3 style={{ marginTop: 0 }}>交互演示</h3>
				<p>点击次数: {clickCount}</p>

				<eos-button
					type={args.type || "primary"}
					size={args.size || "medium"}
					disabled={args.disabled}
					loading={isLoading}
					onEClick={handleClick}
				>
					{isLoading ? "处理中..." : `点击我 (${clickCount})`}
				</eos-button>

				<div style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
					<p>点击按钮会触发加载状态，2秒后恢复</p>
				</div>
			</div>
		);
	},
	args: {
		type: "primary",
		size: "medium",
		disabled: false,
	},
	parameters: {
		docs: {
			description: {
				story: "这是一个完整的交互示例，展示了按钮的点击事件、加载状态等功能。",
			},
		},
	},
};
