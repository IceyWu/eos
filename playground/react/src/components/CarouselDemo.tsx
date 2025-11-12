import React, { useState, useRef } from 'react';

export const CarouselDemo: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<any>(null);

  const handleSlideChange = (e: any) => {
    setCurrentSlide(e.detail.currentIndex);
  };

  const playCarousel = () => carouselRef.current?.play();
  const pauseCarousel = () => carouselRef.current?.pause();
  const prevSlide = () => carouselRef.current?.prev();
  const nextSlide = () => carouselRef.current?.next();

  return (
    <div className="component-demo">
      <h2>Carousel 轮播图组件</h2>

      <div className="demo-block">
        <h3>自动播放轮播</h3>
        <div className="demo-content">
          <e-carousel
            autoplay
            interval="3000"
            loop
            onChange={handleSlideChange}
            style={{ '--carousel-height': '300px' } as React.CSSProperties}
          >
            <div className="carousel-slide" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold'
            }}>
              Slide 1
            </div>
            <div className="carousel-slide" style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold'
            }}>
              Slide 2
            </div>
            <div className="carousel-slide" style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold'
            }}>
              Slide 3
            </div>
          </e-carousel>
          <div className="output">当前 Slide: {currentSlide}</div>
        </div>
      </div>

      <div className="demo-block">
        <h3>手动控制轮播</h3>
        <div className="demo-content">
          <e-carousel
            ref={carouselRef}
            style={{ '--carousel-height': '250px' } as React.CSSProperties}
          >
            <div className="carousel-slide" style={{
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '36px'
            }}>
              🎨 图片 1
            </div>
            <div className="carousel-slide" style={{
              background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '36px'
            }}>
              🎭 图片 2
            </div>
            <div className="carousel-slide" style={{
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#333',
              fontSize: '36px'
            }}>
              🎪 图片 3
            </div>
          </e-carousel>
          <div className="controls">
            <button className="control-btn" onClick={prevSlide}>上一张</button>
            <button className="control-btn" onClick={nextSlide}>下一张</button>
            <button className="control-btn" onClick={playCarousel}>播放</button>
            <button className="control-btn" onClick={pauseCarousel}>暂停</button>
          </div>
        </div>
      </div>
    </div>
  );
};
