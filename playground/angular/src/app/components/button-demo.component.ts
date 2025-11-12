import {
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	type OnInit,
	signal,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";

@Component({
	selector: "app-button-demo",
	standalone: true,
	imports: [MatCardModule, MatChipsModule, MatButtonModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	template: `
    <div class="demo-container">
      <!-- 基础用法 -->
      <mat-card class="demo-card">
        <mat-card-header>
          <mat-card-title>
            <span class="card-title">基础用法</span>
            <mat-chip color="primary">Basic</mat-chip>
          </mat-card-title>
          <mat-card-subtitle>展示基础的按钮组件用法</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="section">
            <h4>按钮类型</h4>
            <div class="button-group">
              <eos-button>默认按钮</eos-button>
              <eos-button type="primary">主要按钮</eos-button>
              <eos-button type="success">成功按钮</eos-button>
              <eos-button type="warning">警告按钮</eos-button>
              <eos-button type="danger">危险按钮</eos-button>
            </div>
          </div>
          
          <div class="section">
            <h4>按钮状态</h4>
            <div class="button-group">
              <eos-button>普通状态</eos-button>
              <eos-button disabled>禁用状态</eos-button>
              <eos-button loading>加载中</eos-button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- 事件监听 -->
      <mat-card class="demo-card">
        <mat-card-header>
          <mat-card-title>
            <span class="card-title">事件监听</span>
            <mat-chip color="accent">Events</mat-chip>
          </mat-card-title>
          <mat-card-subtitle>按钮支持点击事件监听，可以获取点击的相关信息</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="event-demo">
            <eos-button (e-click)="handleButtonClick($event)" type="primary">
              点击我试试
            </eos-button>
            
            @if (lastClickMessage()) {
              <div class="event-message success">
                {{ lastClickMessage() }}
              </div>
            }
          </div>
        </mat-card-content>
      </mat-card>

      <!-- 交互演示 -->
      <mat-card class="demo-card">
        <mat-card-header>
          <mat-card-title>
            <span class="card-title">交互演示</span>
            <mat-chip color="warn">Interactive</mat-chip>
          </mat-card-title>
          <mat-card-subtitle>完整的交互示例，展示按钮在实际场景中的应用</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="interactive-demo">
            <div class="counter-section">
              <eos-button (e-click)="incrementCounter()" type="success">
                点击计数: {{ clickCount() }}
              </eos-button>
            </div>
            
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-value">{{ clickCount() }}</div>
                <div class="stat-label">总点击次数</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">{{ lastClickTime() }}</div>
                <div class="stat-label">最后点击时间</div>
              </div>
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

    .section {
      margin-bottom: 24px;
    }

    .section:last-child {
      margin-bottom: 0;
    }

    .section h4 {
      margin: 0 0 12px 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    .button-group {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      align-items: center;
    }

    .event-demo {
      text-align: center;
      padding: 24px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px dashed #dee2e6;
    }

    .event-message {
      margin-top: 16px;
      padding: 12px;
      border-radius: 6px;
      font-size: 14px;
    }

    .event-message.success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .interactive-demo {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .counter-section {
      text-align: center;
      padding: 24px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px dashed #dee2e6;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      border: 1px solid #e9ecef;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 600;
      color: #1976d2;
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 14px;
      color: #666;
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .button-group {
        justify-content: center;
      }
    }
  `,
	],
})
export class ButtonDemoComponent implements OnInit {
	clickCount = signal(0);
	lastClickTime = signal("--:--:--");
	lastClickMessage = signal("");

	ngOnInit() {
		// 组件初始化后设置事件监听
		setTimeout(() => {
			this.setupEventListeners();
		}, 100);
	}

	private setupEventListeners() {
		// 这里可以添加额外的事件监听逻辑
	}

	handleButtonClick(event: any) {
		const message = `✓ ${event.detail.message}`;
		this.lastClickMessage.set(message);

		// 2秒后清除消息
		setTimeout(() => {
			this.lastClickMessage.set("");
		}, 2000);
	}

	incrementCounter() {
		this.clickCount.update((count) => count + 1);
		this.lastClickTime.set(new Date().toLocaleTimeString("zh-CN"));
	}
}
