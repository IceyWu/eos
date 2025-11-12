import { CommonModule } from "@angular/common";
import {
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	type OnInit,
	signal,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterOutlet } from "@angular/router";
import { registerComponents } from "@eosjs/components";

import { ButtonDemoComponent } from "./components/button-demo.component";
import { CarouselDemoComponent } from "./components/carousel-demo.component";
import { ImageDemoComponent } from "./components/image-demo.component";

interface ComponentItem {
	key: string;
	label: string;
	icon: string;
	component: any;
}

@Component({
	selector: "app-root",
	imports: [
		RouterOutlet,
		CommonModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatIconModule,
		MatButtonModule,
		MatChipsModule,
		ButtonDemoComponent,
		ImageDemoComponent,
		CarouselDemoComponent,
	],
	templateUrl: "./app.html",
	styleUrl: "./app.less",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App implements OnInit {
	selectedComponent = signal<string>("button");

	components: ComponentItem[] = [
		{
			key: "button",
			label: "Button 按钮",
			icon: "smart_button",
			component: ButtonDemoComponent,
		},
		{
			key: "image",
			label: "Image 图片",
			icon: "image",
			component: ImageDemoComponent,
		},
		{
			key: "carousel",
			label: "Carousel 轮播图",
			icon: "view_carousel",
			component: CarouselDemoComponent,
		},
	];

	ngOnInit() {
		// Register Eos Web Components
		registerComponents();
	}

	selectComponent(key: string) {
		this.selectedComponent.set(key);
	}

	getCurrentComponent() {
		const current = this.components.find(
			(comp) => comp.key === this.selectedComponent(),
		);
		return current?.component || ButtonDemoComponent;
	}

	isSelected(key: string): boolean {
		return this.selectedComponent() === key;
	}
}
