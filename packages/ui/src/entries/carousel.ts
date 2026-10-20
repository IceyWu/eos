import "./progress-bar";
import { EosCarousel } from "../components/carousel";
import { registerComponent } from "../register";

export * from "../components/carousel";

registerComponent("carousel", EosCarousel);
