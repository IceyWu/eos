import "./image";
import { EosImageGroup } from "../components/image-group";
import { registerComponent } from "../register";

export * from "../components/image-group";

registerComponent("image-group", EosImageGroup);
