import React, { useState } from 'react';

// 扩展 JSX 类型定义
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "e-image": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          width?: string | number;
          height?: string | number;
          "object-fit"?: string;
          circle?: boolean;
          responsive?: boolean;
          loading?: string;
          crossorigin?: string;
          blurhash?: string;
          "blurhash-only"?: boolean;
          onLoad?: (event: CustomEvent) => void;
          onError?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
    }
  }
}

export const ImageDemo: React.FC = () => {
  const [imageCounter, setImageCounter] = useState(10);
  const [imageSrc, setImageSrc] = useState(`https://picsum.photos/200/200?random=10`);
  const [eventLog, setEventLog] = useState('等待图片加载...');
  const [logClass, setLogClass] = useState('');

  const handleImageLoad = (e: any) => {
    setEventLog(`✅ 图片加载成功: ${e.detail.src}`);
    setLogClass('success');
  };

  const handleImageError = (e: any) => {
    setEventLog(`❌ 图片加载失败: ${e.detail.src}`);
    setLogClass('error');
  };

  const changeImage = () => {
    const newCounter = imageCounter + 1;
    setImageCounter(newCounter);
    setImageSrc(`https://picsum.photos/200/200?random=${newCounter}`);
  };

  const loadErrorImage = () => {
    setImageSrc('https://invalid-test-url.com/image.jpg');
  };

  return (
    <div className="component-demo">
      <h2>Image 图片组件</h2>

      <div className="demo-block">
        <h3>基础用法</h3>
        <div className="demo-content image-grid">
          <div className="image-item">
            <p>默认加载</p>
            <e-image
              src="https://picsum.photos/200/200?random=1"
              alt="示例图片"
              width="200"
              height="200"
            />
          </div>
          <div className="image-item">
            <p>圆形图片</p>
            <e-image
              src="https://picsum.photos/200/200?random=2"
              alt="圆形图片"
              circle
              width="200"
              height="200"
            />
          </div>
          <div className="image-item">
            <p>加载失败</p>
            <e-image
              src="https://invalid-url.com/image.jpg"
              alt="加载失败"
              width="200"
              height="200"
            />
          </div>
        </div>
      </div>

      <div className="demo-block">
        <h3>BlurHash 支持</h3>
        <div className="demo-content image-grid">
          <div className="image-item">
            <p>BlurHash 加载预览</p>
            <e-image
              src="https://picsum.photos/400/300?random=blurhash1"
              blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
              alt="BlurHash 预览"
              width="200"
              height="200"
            />
          </div>
          <div className="image-item">
            <p>仅显示 BlurHash</p>
            <e-image
              blurhash="LKO2:N%2Tw=w]~RBVZRi};RPxuwH"
              blurhash-only
              alt="仅 BlurHash"
              width="200"
              height="200"
            />
          </div>
          <div className="image-item">
            <p>带 BlurHash 的慢加载</p>
            <e-image
              src="https://picsum.photos/800/600?random=blurhash2"
              blurhash="L6PZfSjE.AyE_3t7t7R**0o#DgR4"
              alt="慢速加载"
              width="200"
              height="200"
            />
          </div>
        </div>
      </div>

      <div className="demo-block">
        <h3>自定义插槽</h3>
        <div className="demo-content image-grid">
          <div className="image-item">
            <p>自定义 Loading</p>
            <e-image
              src="https://picsum.photos/200/200?random=loading"
              alt="自定义loading"
              width="200"
              height="200"
            >
              <div slot="loading" className="custom-loading">
                <div className="spinner"></div>
                <p>精彩即将呈现...</p>
              </div>
            </e-image>
          </div>
          <div className="image-item">
            <p>自定义 Error</p>
            <e-image
              src="https://invalid-custom-error.com/image.jpg"
              alt="自定义错误"
              width="200"
              height="200"
            >
              <div slot="error" className="custom-error">
                <div className="error-icon">😢</div>
                <p>图片走丢了</p>
                <button className="retry-btn">重试</button>
              </div>
            </e-image>
          </div>
          <div className="image-item">
            <p>骨架屏 Loading</p>
            <e-image
              src="https://picsum.photos/200/200?random=skeleton"
              alt="骨架屏"
              width="200"
              height="200"
            >
              <div slot="loading" className="skeleton-loading"></div>
            </e-image>
          </div>
        </div>
      </div>

      <div className="demo-block">
        <h3>Object-fit 模式</h3>
        <div className="demo-content image-grid">
          <div className="image-item">
            <p>Cover</p>
            <e-image
              src="https://picsum.photos/300/200?random=3"
              alt="Cover"
              object-fit="cover"
              width="150"
              height="150"
            />
          </div>
          <div className="image-item">
            <p>Contain</p>
            <e-image
              src="https://picsum.photos/300/200?random=4"
              alt="Contain"
              object-fit="contain"
              width="150"
              height="150"
              style={{ background: '#f0f0f0' }}
            />
          </div>
          <div className="image-item">
            <p>Fill</p>
            <e-image
              src="https://picsum.photos/300/200?random=5"
              alt="Fill"
              object-fit="fill"
              width="150"
              height="150"
            />
          </div>
        </div>
      </div>

      <div className="demo-block">
        <h3>事件处理</h3>
        <div className="demo-content">
          <div className="image-item">
            <e-image
              src={imageSrc}
              alt="事件测试"
              width="200"
              height="200"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            <div className={`event-log ${logClass}`}>
              {eventLog}
            </div>
          </div>
          <div className="controls">
            <button className="control-btn" onClick={changeImage}>切换图片</button>
            <button className="control-btn" onClick={loadErrorImage}>加载错误图片</button>
          </div>
        </div>
      </div>
    </div>
  );
};
