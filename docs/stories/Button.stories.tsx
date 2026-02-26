import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useRef, useState } from "react";
import "@eosjs/components";

interface ButtonProps {
  text?: string;
  disabled?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "eos-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { disabled?: boolean };
    }
  }
}

const meta: Meta<ButtonProps> = {
  title: "组件/Button 按钮",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
基于 Web Components 的按钮组件，零框架依赖，支持 CSS 变量自定义和全框架集成。

### CSS 自定义属性

` + '```' + `css
eos-button {
  --button-bg: #007bff;
  --button-color: white;
  --button-hover-bg: #0056b3;
  --button-active-bg: #004085;
  --button-padding: 8px 16px;
  --button-font-size: 14px;
  --button-border-radius: 4px;
  --button-border: none;
}
` + '```' + `

### 事件

| 事件名 | 触发时机 | event.detail |
|--------|---------|--------------|
| \`e-click\` | 按钮点击 | \`{ message: 'Button clicked!' }\` |
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "按钮文本（通过 slot 传入）",
      table: { type: { summary: "string" }, defaultValue: { summary: "Click me" } },
    },
    disabled: {
      control: "boolean",
      description: "是否禁用",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

//  基础用法 
export const Default: Story = {
  name: "基础用法",
  args: { text: "Click me", disabled: false },
  render: (args) => {
    const buttonRef = useRef<HTMLElement>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
      const el = buttonRef.current;
      if (!el) return;
      const handler = (e: Event) => {
        console.log("e-click:", (e as CustomEvent).detail);
        setCount((n) => n + 1);
      };
      el.addEventListener("e-click", handler);
      return () => el.removeEventListener("e-click", handler);
    }, []);

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <eos-button ref={buttonRef} disabled={args.disabled}>
          {args.text}
        </eos-button>
        <span style={{ fontSize: "13px", color: "#64748b" }}>
          已点击 <strong>{count}</strong> 次
        </span>
      </div>
    );
  },
};

//  样式变体 
export const StyleVariants: Story = {
  name: "样式变体",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", padding: "8px 0" }}>
      <eos-button style={{ "--button-bg": "#6366f1", "--button-hover-bg": "#4f46e5" } as React.CSSProperties}>
        Primary
      </eos-button>
      <eos-button style={{ "--button-bg": "#64748b", "--button-hover-bg": "#475569" } as React.CSSProperties}>
        Secondary
      </eos-button>
      <eos-button style={{ "--button-bg": "#22c55e", "--button-hover-bg": "#16a34a" } as React.CSSProperties}>
        Success
      </eos-button>
      <eos-button style={{ "--button-bg": "#ef4444", "--button-hover-bg": "#dc2626" } as React.CSSProperties}>
        Danger
      </eos-button>
      <eos-button
        style={{
          "--button-bg": "#f59e0b",
          "--button-color": "#1e293b",
          "--button-hover-bg": "#d97706",
        } as React.CSSProperties}
      >
        Warning
      </eos-button>
      <eos-button style={{ "--button-bg": "#06b6d4", "--button-hover-bg": "#0891b2" } as React.CSSProperties}>
        Info
      </eos-button>
    </div>
  ),
};

//  尺寸对比 
export const SizeDemo: Story = {
  name: "尺寸对比",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
      <eos-button style={{ "--button-padding": "4px 10px", "--button-font-size": "12px" } as React.CSSProperties}>
        Small
      </eos-button>
      <eos-button style={{ "--button-padding": "8px 16px", "--button-font-size": "14px" } as React.CSSProperties}>
        Medium
      </eos-button>
      <eos-button style={{ "--button-padding": "12px 24px", "--button-font-size": "16px" } as React.CSSProperties}>
        Large
      </eos-button>
    </div>
  ),
};

//  状态 
export const StateDemo: Story = {
  name: "状态",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <eos-button>正常</eos-button>
      <eos-button disabled>禁用</eos-button>
    </div>
  ),
};

//  框架集成 
export const ReactUsage: Story = {
  name: "React 集成",
  parameters: {
    docs: {
      source: {
        code: `import React, { useEffect, useRef } from 'react';
import '@eosjs/components';

export function MyButton() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => console.log('clicked:', e.detail.message);
    el.addEventListener('e-click', handler);
    return () => el.removeEventListener('e-click', handler);
  }, []);

  return <eos-button ref={ref}>Click me</eos-button>;
}`,
      },
    },
  },
  render: () => <eos-button>React 示例</eos-button>,
};

export const VueUsage: Story = {
  name: "Vue 集成",
  parameters: {
    docs: {
      source: {
        code: `<template>
  <eos-button @e-click="handleClick">Click me</eos-button>
</template>

<script setup>
import '@eosjs/components';

function handleClick(e) {
  console.log('clicked:', e.detail.message);
}
</script>`,
      },
    },
  },
  render: () => <eos-button>Vue 示例</eos-button>,
};

export const AngularUsage: Story = {
  name: "Angular 集成",
  parameters: {
    docs: {
      source: {
        code: `import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@eosjs/components';

@Component({
  selector: 'app-button',
  template: '<eos-button (e-click)="onClick($event)">Click me</eos-button>',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonComponent {
  onClick(e: CustomEvent) {
    console.log('clicked:', e.detail.message);
  }
}`,
      },
    },
  },
  render: () => <eos-button>Angular 示例</eos-button>,
};

export const HTMLUsage: Story = {
  name: "原生 HTML 集成",
  parameters: {
    docs: {
      source: {
        code: `<script type="module">
  import '@eosjs/components';
  document.querySelector('eos-button')
    .addEventListener('e-click', (e) => {
      console.log('clicked:', e.detail.message);
    });
</script>

<eos-button>Click me</eos-button>`,
      },
    },
  },
  render: () => <eos-button>HTML 示例</eos-button>,
};
