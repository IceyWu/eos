import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";

@Component({
	selector: "app-image-demo",
	standalone: true,
	imports: [MatCardModule, MatChipsModule, MatButtonModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	template: `
    <div class="demo-container">
      <!-- 基础图片 -->
      <mat-card class="demo-card">
        <mat-card-header>
          <mat-card-title>
            <span class="card-title">基础图片</span>
            <mat-chip color="primary">Basic</mat-chip>
          </mat-card-title>
          <mat-card-subtitle>展示图片组件的基础用法</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="image-grid">
            <div class="image-item">
              <h4>普通图片</h4>
              <eos-image 
                src="https://picsum.photos/300/200?random=1" 
                alt="示例图片"
                width="300px"
                height="200px"
                style="border-radius: 8px;">
              </eos-image>
            </div>
            
            <div class="image-item">
              <h4>圆形图片</h4>
              <eos-image 
                src="https://picsum.photos/150/150?random=2" 
                alt="圆形图片"
                width="150px"
                height="150px"
                circle>
              </eos-image>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Object-fit 模式 -->
      <mat-card class="demo-card">
        <mat-card-header>
          <mat-card-title>
            <span class="card-title">Object-fit 模式</span>
            <mat-chip color="accent">Modes</mat-chip>
          </mat-card-title>
          <mat-card-subtitle>展示不同的图片填充模式</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="object-fit-grid">
            <div class="fit-item">
              <eos-image 
                src="https://picsum.photos/400/300?random=3" 
                alt="cover 模式"
                width="120px"
                height="120px"
                object-fit="cover"
                style="border: 1px solid #ddd; border-radius: 8px;">
              </eos-image>
              <span>cover</span>
            </div>
            
            <div class="fit-item">
              <eos-image 
                src="https://picsum.photos/400/300?random=4" 
                alt="contain 模式"
                width="120px"
                height="120px"
                object-fit="contain"
                style="border: 1px solid #ddd; border-radius: 8px;">
              </eos-image>
              <span>contain</span>
            </div>
            
            <div class="fit-item">
              <eos-image 
                src="https://picsum.photos/400/300?random=5" 
                alt="fill 模式"
                width="120px"
                height="120px"
                object-fit="fill"
                style="border: 1px solid #ddd; border-radius: 8px;">
              </eos-image>
              <span>fill</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- 事件监听 -->
      <mat-card class="demo-card">
        <mat-card-header>
          <mat-card-title>
            <span class="card-title">事件监听</span>
            <mat-chip color="warn">Events</mat-chip>
          </mat-card-title>
          <mat-card-subtitle>图片组件支持加载和错误事件监听</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="event-demo">
            <eos-image 
              [src]="'https://picsum.photos/300/200?random=' + imageCounter()"
              alt="事件测试图片"
              width="300px"
              height="200px"
              (load)="handleImageLoad()"
              (error)="handleImageError()"
              style="border: 1px solid #ddd; border-radius: 8px;">
            </eos-image>
            
            <button mat-raised-button color="primary" (click)="generateNewImage()">
              生成新图片
            </button>
            
            @if (eventMessage()) {
              <div class="event-message" [class]="eventMessageType()">
                {{ eventMessage() }}
              </div>
            }
          </div>
        </mat-card-content>
      </mat-card>

      <!-- BlurHash 支持 -->
      <mat-card class="demo-card">
        <mat-card-header>
          <mat-card-title>
            <span class="card-title">BlurHash 支持</span>
            <mat-chip style="background: #9c27b0; color: white;">Advanced</mat-chip>
          </mat-card-title>
          <mat-card-subtitle>支持 BlurHash 模糊预览，提升用户体验</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="blurhash-grid">
            <div class="blurhash-item">
              <eos-image 
                src="https://picsum.photos/200/150?random=6"
                alt="BlurHash 示例"
                width="200px"
                height="150px"
                blurhash="LyIXL4xYt7j[^-xWt7j[I:oIs;j]"
                style="border-radius: 8px;">
              </eos-image>
              <span>带 BlurHash 预览</span>
            </div>
            
            <div class="blurhash-item">
              <eos-image 
                blurhash="LyIXL4xYt7j[^-xWt7j[I:oIs;j]"
                blurhash-only
                width="200px"
                height="150px"
                style="border-radius: 8px;">
              </eos-image>
              <span>仅显示 BlurHash</span>
            </div>
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

    .image-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .image-item {
      text-align: center;
    }

    .image-item h4 {
      margin: 0 0 12px 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    .object-fit-grid {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .fit-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .fit-item span {
      font-size: 14px;
      color: #666;
    }

    .event-demo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 24px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .event-message {
      padding: 12px;
      border-radius: 6px;
      font-size: 14px;
      max-width: 300px;
      text-align: center;
    }

    .event-message.success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .event-message.error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .blurhash-grid {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .blurhash-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .blurhash-item span {
      font-size: 14px;
      color: #666;
    }

    @media (max-width: 768px) {
      .image-grid {
        grid-template-columns: 1fr;
      }
      
      .object-fit-grid,
      .blurhash-grid {
        justify-content: center;
      }
    }
  `,
	],
})
export class ImageDemoComponent {
	imageCounter = signal(10);
	eventMessage = signal("");
	eventMessageType = signal("");

	handleImageLoad() {
		this.eventMessage.set("✓ 图片加载成功");
		this.eventMessageType.set("success");
		this.clearMessageAfterDelay();
	}

	handleImageError() {
		this.eventMessage.set("✗ 图片加载失败");
		this.eventMessageType.set("error");
		this.clearMessageAfterDelay();
	}

	generateNewImage() {
		this.imageCounter.update((counter) => counter + 1);
		this.eventMessage.set("");
	}

	private clearMessageAfterDelay() {
		setTimeout(() => {
			this.eventMessage.set("");
		}, 2000);
	}
}
