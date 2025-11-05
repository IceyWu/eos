import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import '@eosjs/components';

// 定义组件元数据
const meta: Meta = {
  title: 'Components/Carousel',
  parameters: {
    docs: {
      description: {
        component: `
# Carousel 轮播图组件

一个功能强大的轮播图组件，支持图片、视频混合轮播，自动播放,手势滑动等功能。

## 特性

- 🎬 支持视频和图片混合轮播
- ⏯️ 自动播放控制
- 📱 触摸滑动支持
- ⌨️ 键盘导航
- 🎯 自定义进度条
- ♻️ 循环播放
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    autoplay: {
      control: 'boolean',
      description: '是否自动播放',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    interval: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: '自动播放间隔时间（毫秒）',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3000' },
      },
    },
    loop: {
      control: 'boolean',
      description: '是否循环播放',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showControls: {
      control: 'boolean',
      description: '是否显示控制按钮',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// React 基础示例
export const Default: Story = {
  name: '基础示例',
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
        React.createElement('div', { 
          key: '1',
          style: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '48px' } 
        }, 'Slide 1'),
        React.createElement('div', { 
          key: '2',
          style: { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '48px' } 
        }, 'Slide 2'),
        React.createElement('div', { 
          key: '3',
          style: { background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '48px' } 
        }, 'Slide 3'),
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

// React 版本示例代码
export const ReactExample: Story = {
  name: 'React 示例',
  parameters: {
    docs: {
      source: {
        language: 'jsx',
        code: `
import React from 'react';
import '@eosjs/components';

function CarouselDemo() {
  return (
    <e-carousel 
      autoplay
      interval={3000}
      loop
      show-controls
      style={{ '--carousel-height': '400px' }}
    >
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '48px' }}>
        Slide 1
      </div>
      <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '48px' }}>
        Slide 2
      </div>
      <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '48px' }}>
        Slide 3
      </div>
    </e-carousel>
  );
}

export default CarouselDemo;
`,
      },
    },
  },
  render: Default.render,
  args: Default.args,
};

// HTML 版本示例
export const HTMLExample: Story = {
  name: 'HTML 示例',
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import '@eosjs/components';
  </script>
</head>
<body>
  <e-carousel 
    autoplay
    interval="3000"
    loop
    show-controls
    style="--carousel-height: 400px;"
  >
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 48px;">
      Slide 1
    </div>
    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 48px;">
      Slide 2
    </div>
    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 48px;">
      Slide 3
    </div>
  </e-carousel>
</body>
</html>
`,
      },
    },
  },
  render: Default.render,
  args: Default.args,
};

// 媒体混合轮播示例
export const MediaMixed: Story = {
  name: '视频+图片混合',
  parameters: {
    docs: {
      description: {
        story: '支持视频和图片混合轮播，视频播放时进度条跟随视频进度，图片显示时进度条匀速前进。',
      },
    },
  },
  render: () => {
    const carouselRef = React.useRef<any>(null);
    const currentVideoRef = React.useRef<HTMLVideoElement | null>(null);
    const IMAGE_DURATION = 3000;

    React.useEffect(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const handleSlideActive = (e: CustomEvent) => {
        const { mediaType, slide } = e.detail;
        
        // 停止之前的视频
        if (currentVideoRef.current) {
          currentVideoRef.current.pause();
          currentVideoRef.current.currentTime = 0;
        }
        
        if (mediaType === 'video') {
          carousel.enableCustomProgress();
          const videoElement = slide.querySelector('video') as HTMLVideoElement;
          if (videoElement) {
            currentVideoRef.current = videoElement;
            videoElement.currentTime = 0;
            videoElement.play().catch((err: any) => {
              console.warn('视频自动播放失败:', err);
            });
          }
        } else {
          // 图片类型，手动更新进度
          carousel.enableCustomProgress();
          currentVideoRef.current = null;
          
          let startTime = Date.now();
          const updateImageProgress = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / IMAGE_DURATION) * 100, 100);
            carousel.updateProgress(progress);
            
            if (progress < 100) {
              requestAnimationFrame(updateImageProgress);
            }
          };
          requestAnimationFrame(updateImageProgress);
        }
      };

      const handleVideoProgress = (e: Event) => {
        const video = e.target as HTMLVideoElement;
        if (video === currentVideoRef.current) {
          const progress = (video.currentTime / video.duration) * 100;
          carousel.updateProgress(progress);
        }
      };

      carousel.addEventListener('slide-active', handleSlideActive);
      
      // 监听所有视频的进度
      const videos = carousel.querySelectorAll('video');
      videos.forEach((video: HTMLVideoElement) => {
        video.addEventListener('timeupdate', handleVideoProgress);
      });

      return () => {
        carousel.removeEventListener('slide-active', handleSlideActive);
        videos.forEach((video: HTMLVideoElement) => {
          video.removeEventListener('timeupdate', handleVideoProgress);
        });
        if (currentVideoRef.current) {
          currentVideoRef.current.pause();
        }
      };
    }, []);

    return React.createElement('e-carousel',
      {
        ref: carouselRef,
        loop: true,
        style: { '--carousel-height': '500px' } as any,
      },
      [
        React.createElement('div', {
          key: '1',
          'data-media-type': 'image',
          style: { 
            background: 'linear-gradient(135deg, rgba(255,107,107,0.9) 0%, rgba(254,202,87,0.9) 100%), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800") center/cover',
            backgroundBlendMode: 'overlay',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '36px',
            fontWeight: 'bold'
          }
        }, '夏日海滩 🏖️'),
        React.createElement('div', {
          key: '2',
          'data-media-type': 'video',
          style: { height: '100%', position: 'relative' }
        }, [
          React.createElement('video', {
            key: 'video1',
            src: 'https://www.w3schools.com/html/mov_bbb.mp4',
            muted: true,
            playsInline: true,
            style: { width: '100%', height: '100%', objectFit: 'cover' }
          }),
          React.createElement('div', {
            key: 'overlay1',
            style: {
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'rgba(0,0,0,0.6)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '20px'
            }
          }, '🎬 精彩视频')
        ]),
        React.createElement('div', {
          key: '3',
          'data-media-type': 'image',
          style: { 
            background: 'linear-gradient(135deg, rgba(34,197,94,0.85) 0%, rgba(59,130,246,0.85) 100%), url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800") center/cover',
            backgroundBlendMode: 'overlay',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '36px',
            fontWeight: 'bold'
          }
        }, '自然风光 🏔️'),
      ]
    );
  },
};
