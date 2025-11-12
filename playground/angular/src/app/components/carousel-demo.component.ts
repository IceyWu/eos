import {
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	type ElementRef,
	signal,
	ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@Component({
	selector: "app-carousel-demo",
	standalone: true,
	imports: [
		MatCardModule,
		MatChipsModule,
		MatButtonModule,
		MatSlideToggleModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	template: `
    <div class="demo-container">
      <!-- 基础轮播 -->
      <mat-card class="demo-card">
        <mat-card-header>
          <mat-card-title>
            <span class="card-title">基础轮播</span>
            <mat-chip color="primary">Basic</mat-chip>
          </mat-card-title>
          <mat-card-subtitle>展示轮播图组件的基础用法</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <eos-carousel
            autoplay
            interval="3000"
            loop
            (change)="handleSlideChange($event)"
            style="--carousel-height: 300px;">
            <div class="carousel-slide slide-1">
              <div class="slide-content">
                <h2>第一张幻灯片</h2>
                <p>自动播放内容</p>
              </div>
            </div>
            <div class="carousel-slide slide-2">
              <div class="slide-content">
                <h2>第二张幻灯片</h2>
                <p>支持自定义内容</p>
              </div>
            </div>
            <div class="carousel-slide slide-3">
              <div class="slide-content">
                <h2>第三张幻灯片</h2>
                <p>响应式设计</p>
              </div>
            </div>
          </eos-carousel>
          
          <div class="slide-info">
            <span>当前幻灯片: {{ currentSlide() + 1 }}</span>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- 控制选项 -->
      <mat-card class="demo-card">
        <mat-card-header>
          <mat-card-title>
            <span class="card-title">控制选项</span>
            <mat-chip color="accent">Controls</mat-chip>
          </mat-card-title>
          <mat-card-subtitle>动态控制轮播图的各种参数和行为</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="controls-grid">
            <div class="control-section">
              <h4>参数设置</h4>
              <div class="control-group">
                <mat-slide-toggle 
                  [(ngModel)]="autoplayEnabled"
                  (change)="updateCarouselSettings()">
                  自动播放
                </mat-slide-toggle>
                
                <mat-slide-toggle 
                  [(ngModel)]="loopEnabled"
                  (change)="updateCarouselSettings()">
                  循环播放
                </mat-slide-toggle>
                
                <mat-form-field appearance="outline">
                  <mat-label>间隔时间 (ms)</mat-label>
                  <input matInput 
                         type="number" 
                         [(ngModel)]="intervalTime"
                         (ngModelChange)="updateCarouselSettings()"
                         min="1000" 
                         max="10000" 
                         step="500">
                </mat-form-field>
              </div>
            </div>
            
            <div class="control-section">
              <h4>手动控制</h4>
              <div class="manual-controls">
                <button mat-raised-button (click)="prevSlide()">上一张</button>
                <button mat-raised-button (click)="nextSlide()">下一张</button>
                <button mat-raised-button color="primary" (click)="goToSlide(0)">
                  跳转到第一张
                </button>
              </div>
            </div>
          </div>

          <div class="controlled-carousel">
            <h4>受控轮播</h4>
            <eos-carousel 
              #controlledCarousel
              [autoplay]="autoplayEnabled"
              [interval]="intervalTime.toString()"
              [loop]="loopEnabled"
              (change)="handleSlideChange($event)"
              style="--carousel-height: 250px;">
              <div class="carousel-slide" 
                   *ngFor="let slide of slides; let i = index"
                   [style.background]="getSlideBackground(i)">
                <div class="slide-content">
                  <h2>第 {{ i + 1 }} 张幻灯片</h2>
                  <p>可控制的轮播内容</p>
                </div>
              </div>
            </eos-carousel>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
	styles: [
		`
    .demo-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      width: 100%;
    }

    .demo-card {
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .card-title {
      margin-right: 12px;
    }

    .carousel-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      height: 100%;
    }

    .slide-1 {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .slide-2 {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .slide-3 {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }

    .slide-content {
      text-align: center;
    }

    .slide-content h2 {
      margin: 0 0 8px 0;
      font-size: 24px;
    }

    .slide-content p {
      margin: 0;
      font-size: 16px;
      opacity: 0.9;
    }

    .slide-info {
      text-align: center;
      margin-top: 12px;
      color: #666;
      font-size: 14px;
    }

    .controls-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      margin-bottom: 32px;
    }

    .control-section h4 {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .manual-controls {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .controlled-carousel {
      border-top: 1px solid #e0e0e0;
      padding-top: 24px;
    }

    .controlled-carousel h4 {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    @media (max-width: 768px) {
      .controls-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }
      
      .slide-content h2 {
        font-size: 20px;
      }
      
      .slide-content p {
        font-size: 14px;
      }
    }
  `,
	],
})
export class CarouselDemoComponent {
	@ViewChild("controlledCarousel", { static: false })
	controlledCarousel!: ElementRef;

	currentSlide = signal(0);
	autoplayEnabled = true;
	loopEnabled = true;
	intervalTime = 3000;

	slides = [1, 2, 3, 4, 5];

	handleSlideChange(event: any) {
		this.currentSlide.set(event.detail.currentIndex);
	}

	updateCarouselSettings() {
		// 更新受控轮播的设置
		if (this.controlledCarousel?.nativeElement) {
			const carousel = this.controlledCarousel.nativeElement;
			carousel.autoplay = this.autoplayEnabled;
			carousel.loop = this.loopEnabled;
			carousel.interval = this.intervalTime.toString();
		}
	}

	prevSlide() {
		if (this.controlledCarousel?.nativeElement) {
			this.controlledCarousel.nativeElement.prev();
		}
	}

	nextSlide() {
		if (this.controlledCarousel?.nativeElement) {
			this.controlledCarousel.nativeElement.next();
		}
	}

	goToSlide(index: number) {
		if (this.controlledCarousel?.nativeElement) {
			this.controlledCarousel.nativeElement.goTo(index);
		}
	}

	getSlideBackground(index: number): string {
		const hue = index * 60;
		return `linear-gradient(135deg, hsl(${hue}, 70%, 60%) 0%, hsl(${hue + 30}, 70%, 50%) 100%)`;
	}
}
