import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { registerComponents } from "@eosjs/components";

registerComponents();

@Component({
	selector: "app-root",
	templateUrl: "./app.html",
	styleUrl: "./app.less",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {}
