import * as THREE from "three";
import Experience from "../Experience";

export default class Tentacles {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    // Options
    this.options = {};

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Tentacles");
    }

    // Setup
    this.resource = this.resources.items.tentaclesModel;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (this.debug.active) {
    }
    this.scene.add(this.model);
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    const tentacleOneAction = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    const tentacleTwoAction = this.animation.mixer.clipAction(
      this.resource.animations[1]
    );

    const tentacleThreeAction = this.animation.mixer.clipAction(
      this.resource.animations[2]
    );

    const tentacleFourAction = this.animation.mixer.clipAction(
      this.resource.animations[3]
    );

    const tentacleFiveAction = this.animation.mixer.clipAction(
      this.resource.animations[4]
    );
    const tentacleSixAction = this.animation.mixer.clipAction(
      this.resource.animations[5]
    );

    tentacleOneAction.play();
    tentacleTwoAction.play();
    tentacleThreeAction.play();
    tentacleFourAction.play();
    tentacleFiveAction.play();
    tentacleSixAction.play();
  }

  update() {
    // Tentacles animation
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
