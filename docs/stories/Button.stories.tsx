import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useRef } from "react";
import "@eosjs/components";

const meta: Meta = {
	title: "Components/Button",
	parameters: {
		docs: {
			description: {
				component: "A simple button component built with Web Components.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		text: {
			control: "text",
			description: "Button text content",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "Click me" },
			},
		},
		disabled: {
			control: "boolean",
			description: "Whether the button is disabled",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

interface ButtonElement extends HTMLElement {
	addEventListener(type: string, listener: (event: CustomEvent) => void): void;
	removeEventListener(
		type: string,
		listener: (event: CustomEvent) => void,
	): void;
}

export const Default: Story = {
	name: "Default",
	render: (args: Record<string, unknown>) => {
		const buttonRef = useRef<ButtonElement>(null);

		useEffect(() => {
			const button = buttonRef.current;
			if (!button) return;

			const handleClick = (e: CustomEvent) => {
				console.log("Button clicked:", e.detail);
			};

			button.addEventListener("e-click", handleClick);
			return () => button.removeEventListener("e-click", handleClick);
		}, []);

		return React.createElement(
			"eos-button",
			{
				ref: buttonRef,
				disabled: args.disabled,
			},
			args.text || "Click me",
		);
	},
	args: {
		text: "Click me",
		disabled: false,
	},
};

export const Multiple: Story = {
	name: "Multiple Buttons",
	render: () => {
		useEffect(() => {
			const buttons = document.querySelectorAll("eos-button");
			const handlers = [
				() => console.log("Primary clicked"),
				() => console.log("Secondary clicked"),
				() => console.log("Danger clicked"),
			];

			buttons.forEach((btn, i) => {
				btn.addEventListener("e-click", handlers[i]);
			});

			return () => {
				buttons.forEach((btn, i) => {
					btn.removeEventListener("e-click", handlers[i]);
				});
			};
		}, []);

		return React.createElement(
			"div",
			{
				style: {
					display: "flex",
					gap: "12px",
					flexWrap: "wrap",
				},
			},
			[
				React.createElement("eos-button", { key: "1" }, "Primary"),
				React.createElement("eos-button", { key: "2" }, "Secondary"),
				React.createElement("eos-button", { key: "3" }, "Danger"),
			],
		);
	},
};

export const ReactUsage: Story = {
	name: "React Usage",
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
	render: Default.render,
	args: Default.args,
};

export const VueUsage: Story = {
	name: "Vue Usage",
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
	render: Default.render,
	args: Default.args,
};

export const AngularUsage: Story = {
	name: "Angular Usage",
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
	render: Default.render,
	args: Default.args,
};

export const HTMLUsage: Story = {
	name: "HTML Usage",
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
	render: Default.render,
	args: Default.args,
};
