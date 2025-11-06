import { Component, signal, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { registerComponents } from '@eosjs/components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.less',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App implements OnInit {
  protected readonly buttonEvents = signal<string[]>([]);
  protected readonly carouselEvents = signal<string[]>([]);

  ngOnInit() {
    // Register Eos Web Components
    registerComponents();

    // Setup event listeners after a short delay to ensure components are registered
    setTimeout(() => {
      this.setupEventListeners();
    }, 100);
  }

  private setupEventListeners() {
    // Listen to button click events
    const buttons = document.querySelectorAll('e-button');
    buttons.forEach((button, index) => {
      button.addEventListener('e-click', ((e: CustomEvent) => {
        const timestamp = new Date().toLocaleTimeString();
        const message = `[${timestamp}] Button ${index + 1} clicked: ${e.detail.message}`;
        this.buttonEvents.update(events => [message, ...events].slice(0, 10));
      }) as EventListener);
    });

    // Listen to carousel events
    const carousel = document.querySelector('e-carousel');
    if (carousel) {
      carousel.addEventListener('change', ((e: CustomEvent) => {
        const timestamp = new Date().toLocaleTimeString();
        const message = `[${timestamp}] Slide changed: ${e.detail.previousIndex} → ${e.detail.currentIndex}`;
        this.carouselEvents.update(events => [message, ...events].slice(0, 10));
      }) as EventListener);

      carousel.addEventListener('slide-click', ((e: CustomEvent) => {
        const timestamp = new Date().toLocaleTimeString();
        const message = `[${timestamp}] Slide ${e.detail.index} clicked`;
        this.carouselEvents.update(events => [message, ...events].slice(0, 10));
      }) as EventListener);
    }
  }
}
