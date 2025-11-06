import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import '@eosjs/components';

const meta: Meta = {
  title: 'Components/Carousel',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Carousel Component

A powerful and flexible carousel component with multiple indicator styles, positions, and interactive features.

## Features
- 🎨 **Multiple Styles**: Default progress bars, dots, or TikTok-style indicators
- 📍 **Flexible Positioning**: Place indicators on any side (top, bottom, left, right)
- ⚡ **Auto-play Support**: Configurable intervals with play/pause control
- 🖱️ **Interactive**: Touch swipe, keyboard navigation, and click navigation
- 🎯 **Initial Index**: Start from any slide
- ♾️ **Loop Mode**: Seamless infinite scrolling
        `,
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
    showNavigation: {
      control: 'boolean',
      description: 'Show navigation buttons (prev/next)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    initialIndex: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description: 'Initial slide index',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    indicatorPosition: {
      control: { type: 'select', options: ['top', 'bottom', 'left', 'right'] },
      description: 'Position of the indicator bars',
      table: {
        type: { summary: 'top | bottom | left | right' },
        defaultValue: { summary: 'bottom' },
      },
    },
    indicatorStyle: {
      control: { type: 'select', options: ['default', 'dots', 'tiktok'] },
      description: 'Style of the indicator bars',
      table: {
        type: { summary: 'default | dots | tiktok' },
        defaultValue: { summary: 'default' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Professional slide content with beautiful gradients and imagery simulation
const slides = [
  {
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    title: 'Innovation',
    subtitle: 'Pushing boundaries',
    icon: '🚀'
  },
  {
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    title: 'Creative',
    subtitle: 'Design excellence',
    icon: '🎨'
  },
  {
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    title: 'Technology',
    subtitle: 'Future forward',
    icon: '⚡'
  },
  {
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    title: 'Growth',
    subtitle: 'Sustainable progress',
    icon: '🌱'
  },
  {
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    title: 'Success',
    subtitle: 'Achieving goals',
    icon: '🏆'
  }
];

const createSlide = (slideData: typeof slides[0], index: number) => 
  React.createElement('div', { 
    key: index,
    style: { 
      background: slideData.gradient,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      padding: '40px',
      boxSizing: 'border-box',
    } 
  }, [
    React.createElement('div', {
      key: 'icon',
      style: { fontSize: '72px', marginBottom: '20px' }
    }, slideData.icon),
    React.createElement('h2', {
      key: 'title',
      style: { 
        margin: 0, 
        fontSize: '42px', 
        fontWeight: 'bold',
        marginBottom: '10px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
      }
    }, slideData.title),
    React.createElement('p', {
      key: 'subtitle',
      style: { 
        margin: 0, 
        fontSize: '18px', 
        opacity: 0.9,
        letterSpacing: '1px'
      }
    }, slideData.subtitle)
  ]);

export const Default: Story = {
  name: '🎮 Playground',
  render: (args: any) => {
    return React.createElement('div', {
      style: {
        width: '800px',
        maxWidth: '90vw',
        margin: '0 auto',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        background: '#fff',
      }
    }, [
      // Header
      React.createElement('div', {
        key: 'header',
        style: {
          padding: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
        }
      }, [
        React.createElement('h3', {
          style: { margin: 0, fontSize: '20px', fontWeight: '600' }
        }, 'Carousel Component Demo'),
        React.createElement('p', {
          style: { margin: '5px 0 0', opacity: 0.9, fontSize: '14px' }
        }, 'Use the controls below to explore different configurations')
      ]),
      // Carousel container
      React.createElement('div', {
        key: 'carousel-container',
        style: {
          position: 'relative',
          background: '#f5f5f5',
        }
      }, 
        React.createElement('e-carousel', 
          {
            autoplay: args.autoplay,
            interval: args.interval,
            loop: args.loop,
            'show-navigation': args.showNavigation,
            'initial-index': args.initialIndex,
            'indicator-position': args.indicatorPosition,
            'indicator-style': args.indicatorStyle,
            style: { 
              '--carousel-height': '450px',
              '--progress-bar-color': 'rgba(255, 255, 255, 0.3)',
              '--progress-bar-active-color': 'rgba(255, 255, 255, 1)',
            } as any,
          },
          slides.map((slide, index) => createSlide(slide, index))
        )
      ),
      // Info footer
      React.createElement('div', {
        key: 'footer',
        style: {
          padding: '15px 20px',
          background: '#f9f9f9',
          borderTop: '1px solid #e0e0e0',
          fontSize: '12px',
          color: '#666',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }
      }, [
        React.createElement('span', { key: 'tip' }, '💡 Try different indicator styles and positions using the controls'),
        React.createElement('span', { key: 'keyboard' }, '⌨️ Use arrow keys to navigate')
      ])
    ]);
  },
  args: {
    autoplay: true,
    interval: 3000,
    loop: true,
    showNavigation: true,
    initialIndex: 0,
    indicatorPosition: 'bottom',
    indicatorStyle: 'default',
  },
  parameters: {
    docs: {
      source: {
        code: `
<e-carousel
  autoplay
  loop
  interval="3000"
  show-navigation
  initial-index="0"
  indicator-position="bottom"
  indicator-style="default"
>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
  <div>Slide 5</div>
</e-carousel>
        `,
      },
    },
  },
};

