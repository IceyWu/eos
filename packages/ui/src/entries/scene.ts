import { EosScene, EosSceneItem } from "../components/scene";
import { registerComponent } from "../register";

export * from "../components/scene";

registerComponent("scene", EosScene);
registerComponent("scene-item", EosSceneItem);
