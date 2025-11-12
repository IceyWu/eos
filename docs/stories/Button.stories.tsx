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

export const Default: Story = {
	name: "Default",
	render: (args: any) => {
		const buttonRef = useRef<any>(null);

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
			"e-button",
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
			const buttons = document.querySelectorAll("e-button");
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
				React.createElement("e-button", { key: "1" }, "Primary"),
				React.createElement("e-button", { key: "2" }, "Secondary"),
				React.createElement("e-button", { key: "3" }, "Danger"),
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
  
  return <e-button ref={buttonRef}>Click me</e-button>;
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
  <e-button @e-click="handleClick">Click me</e-button>
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
  template: '<e-button>Click me</e-button>',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const button = document.querySelector('e-button');
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
    
    const button = document.querySelector('e-button');
    button.addEventListener('e-click', (e) => {
      console.log('Clicked:', e.detail.message);
    });
  </script>
</head>
<body>
  <e-button>Click me</e-button>
</body>
</html>`,
			},
		},
	},
	render: Default.render,
	args: Default.args,
};
