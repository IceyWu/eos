import React, { useState } from 'react';

export const ButtonDemo: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState('--:--:--');
  const [message, setMessage] = useState('');

  const handleButtonClick = () => {
    setClickCount(prev => prev + 1);
    setLastClickTime(new Date().toLocaleTimeString('zh-CN'));
  };

  const handleEventDemo = (e: any) => {
    setMessage(`✓ ${e.detail.message}`);
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="component-demo">
      <h2>Button 按钮组件</h2>

      <div className="demo-block">
        <h3>基础用法</h3>
        <div className="demo-content">
          <e-button>默认按钮</e-button>
          <e-button>提交</e-button>
          <e-button>取消</e-button>
        </div>
      </div>

      <div className="demo-block">
        <h3>事件监听</h3>
        <div className="demo-content">
          <e-button onEClick={handleEventDemo}>点击我</e-button>
          {message && (
            <div className="output success">{message}</div>
          )}
          {!message && (
            <div className="output">👆 点击按钮查看效果</div>
          )}
        </div>
      </div>

      <div className="demo-block">
        <h3>计数器演示</h3>
        <div className="demo-content">
          <e-button onEClick={handleButtonClick}>点击计数</e-button>
          <div className="stats">
            <div className="stat-card">
              <div className="stat-value">{clickCount}</div>
              <div className="stat-label">点击次数</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{lastClickTime}</div>
              <div className="stat-label">最后点击</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
