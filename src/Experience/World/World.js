import Experience from "../Experience";
import Environment from "./Environment";
import Tentacles from "./Tentacles";
import Sea from "./Sea";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources to be loaded
    this.resources.on("ready", () => {
      // Setup
      this.tentacles = new Tentacles();
      this.sea = new Sea();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.tentacles) this.tentacles.update();
    if (this.sea) this.sea.update();
  }
}
