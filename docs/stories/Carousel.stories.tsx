import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import '@eosjs/components';

const meta: Meta = {
  title: 'Components/Carousel',
  parameters: {
    docs: {
      description: {
        component: 'A powerful carousel component with autoplay, touch swipe, and keyboard navigation support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    autoplay: {
      control: 'boolean',
      description: 'Enable autoplay',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    interval: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Autoplay interval in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3000' },
      },
    },
    loop: {
      control: 'boolean',
      description: 'Enable loop mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showControls: {
      control: 'boolean',
      description: 'Show navigation controls',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const createSlide = (index: number, gradient: string) => 
  React.createElement('div', { 
    key: index,
    style: { 
      background: gradient,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '48px',
      fontWeight: 'bold',
    } 
  }, `Slide ${index}`);

export const Default: Story = {
  name: 'Default',
  render: (args: any) => {
    return React.createElement('e-carousel', 
      {
        autoplay: args.autoplay,
        interval: args.interval,
        loop: args.loop,
        'show-controls': args.showControls,
        style: { '--carousel-height': '400px' } as any,
      },
      [
        createSlide(1, 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'),
        createSlide(2, 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'),
        createSlide(3, 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'),
        createSlide(4, 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'),
      ]
    );
  },
  args: {
    autoplay: true,
    interval: 3000,
    loop: true,
    showControls: true,
  },
};

export const WithoutAutoplay: Story = {
  name: 'Manual Control',
  render: Default.render,
  args: {
    autoplay: false,
    interval: 3000,
    loop: true,
    showControls: true,
  },
};

export const ReactUsage: Story = {
  name: 'React Usage',
  parameters: {
    docs: {
      source: {
        code: `import React, { useRef, useEffect } from 'react';
import '@eosjs/components';

function App() {
  const carouselRef = useRef(null);
  
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    const handleChange = (e) => {
      console.log('Slide changed:', e.detail);
    };
    
    carousel.addEventListener('change', handleChange);
    return () => carousel.removeEventListener('change', handleChange);
  }, []);
  
  return (
    <e-carousel ref={carouselRef} autoplay loop interval={3000}>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </e-carousel>
  );
}`,
      },
    },
  },
  render: Default.render,
  args: Default.args,
};

export const VueUsage: Story = {
  name: 'Vue Usage',
  parameters: {
    docs: {
      source: {
        code: `<template>
  <e-carousel 
    autoplay 
    loop 
    :interval="3000"
    @change="handleChange"
  >
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </e-carousel>
</template>

<script setup>
import '@eosjs/components';

const handleChange = (e) => {
  console.log('Slide changed:', e.detail);
};
</script>`,
      },
    },
  },
  render: Default.render,
  args: Default.args,
};

export const AngularUsage: Story = {
  name: 'Angular Usage',
  parameters: {
    docs: {
      source: {
        code: `import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@eosjs/components';

@Component({
  selector: 'app-root',
  template: \`
    <e-carousel autoplay loop [attr.interval]="3000">
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </e-carousel>
  \`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const carousel = document.querySelector('e-carousel');
    carousel?.addEventListener('change', (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Slide changed:', customEvent.detail);
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
  name: 'HTML Usage',
  parameters: {
    docs: {
      source: {
        code: `<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import '@eosjs/components';
    
    const carousel = document.querySelector('e-carousel');
    
    carousel.addEventListener('change', (e) => {
      console.log('Slide changed:', e.detail);
    });
    
    // Control methods
    setTimeout(() => carousel.pause(), 5000);
    setTimeout(() => carousel.play(), 10000);
  </script>
</head>
<body>
  <e-carousel autoplay loop interval="3000">
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </e-carousel>
</body>
</html>`,
      },
    },
  },
  render: Default.render,
  args: Default.args,
};
