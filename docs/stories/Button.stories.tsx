import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef } from 'react';
import '@eosjs/components';

const meta: Meta = {
  title: 'Components/Button',
  parameters: {
    docs: {
      description: {
        component: `
# Button 按钮组件

基础的按钮组件，支持自定义事件处理�?
## 特�?
- 🎨 自定义样�?- 📱 响应式设�? 
- �?自定义事�?- �?可访问性支�?`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '按钮文本',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础示例
export const Default: Story = {
  name: '默认按钮',
  render: (args: any) => {
    const buttonRef = useRef<any>(null);
    
    useEffect(() => {
      const button = buttonRef.current;
      if (!button) return;
      
      const handleClick = (e: CustomEvent) => {
        console.log('Button clicked:', e.detail);
        alert(`按钮被点击了！消息：${e.detail.message}`);
      };
      
      button.addEventListener('e-click', handleClick);
      return () => button.removeEventListener('e-click', handleClick);
    }, []);
    
    return React.createElement('e-button', {
      ref: buttonRef,
      disabled: args.disabled,
    }, args.text || '点击');
  },
  args: {
    text: '默认按钮',
    disabled: false,
  },
};

// React 代码示例
export const ReactExample: Story = {
  name: 'React 示例',
  parameters: {
    docs: {
      source: {
        language: 'jsx',
        code: `
import React, { useState, useEffect, useRef } from 'react';
import '@eosjs/components';

function ButtonDemo() {
  const [text, setText] = useState('点击我');
  const buttonRef = useRef(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    
    const handleClick = (e) => {
      console.log('Button clicked:', e.detail.message);
      setText('已点击！');
      
      setTimeout(() => {
        setText('点击我');
      }, 2000);
    };
    
    button.addEventListener('e-click', handleClick);
    return () => button.removeEventListener('e-click', handleClick);
  }, []);
  
  return (
    <e-button ref={buttonRef}>
      {text}
    </e-button>
  );
}

export default ButtonDemo;
`,
      },
    },
  },
  render: Default.render,
  args: Default.args,
};

// HTML 代码示例
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
    
    // 获取按钮元素
    const button = document.querySelector('e-button');
    
    // 添加事件监听
    button.addEventListener('e-click', (e) => {
      console.log('Button clicked:', e.detail.message);
      button.textContent = '已点击！';
      
      setTimeout(() => {
        button.textContent = '点击我';
      }, 2000);
    });
  </script>
</head>
<body>
  <e-button>点击我</e-button>
</body>
</html>
`,
      },
    },
  },
  render: Default.render,
  args: Default.args,
};

// 多个按钮示例
export const Multiple: Story = {
  name: '多个按钮',
  render: () => {
    useEffect(() => {
      const buttons = document.querySelectorAll('e-button');
      const handleSubmit = () => alert('提交');
      const handleCancel = () => alert('取消');
      const handleDelete = () => alert('删除');
      
      buttons[0]?.addEventListener('e-click', handleSubmit);
      buttons[1]?.addEventListener('e-click', handleCancel);
      buttons[2]?.addEventListener('e-click', handleDelete);
      
      return () => {
        buttons[0]?.removeEventListener('e-click', handleSubmit);
        buttons[1]?.removeEventListener('e-click', handleCancel);
        buttons[2]?.removeEventListener('e-click', handleDelete);
      };
    }, []);
    
    return React.createElement('div', { style: { display: 'flex', gap: '12px' } }, [
      React.createElement('e-button', { key: '1' }, '提交'),
      React.createElement('e-button', { key: '2' }, '取消'),
      React.createElement('e-button', { key: '3' }, '删除'),
    ]);
  },
};

